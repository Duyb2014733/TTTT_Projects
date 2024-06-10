<template>
    <div class="container">
        <div class="header">
            <h1>Quản lý Nhà Xe</h1>
            <a-button type="primary" @click="showAddModal">
                <i class="fa-solid fa-plus"></i>
                <span class="ms-2">Thêm nhà xe</span>
            </a-button>
        </div>

        <a-table :columns="columns" :data-source="NhaXes" rowKey="_id">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                    <a-button danger @click="showEditModal(record)">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </a-button>
                    <a-button type="primary" danger @click="deleteRecord(record._id)" style="margin-left: 10px;">
                        <i class="fa-solid fa-trash"></i>
                    </a-button>
                </template>
                <template v-else>
                    {{ record[column.dataIndex] }}
                </template>
            </template>
        </a-table>

        <!-- Add Bus Station Modal -->
        <a-modal title="Thêm Trạm" v-model:open="isAddModalVisible" @cancel="handleAddCancel" @ok="addNhaXe">
            <a-form ref="addFormRef" :model="newNhaXe" layout="vertical" name="add_form">
                <a-form-item name="company_name" label="Tên Công Ty"
                    :rules="[{ required: true, message: 'Vui lòng nhập tên công ty!' }]">
                    <a-input v-model:value="newNhaXe.company_name" placeholder="Tên Công Ty" />
                </a-form-item>
                <a-form-item name="bus_number" label="Số Xe"
                    :rules="[{ required: true, message: 'Vui lòng nhập số xe!' }]">
                    <a-input v-model:value="newNhaXe.bus_number" placeholder="Số Xe" />
                </a-form-item>
                <a-form-item name="bus_type" label="Loại Xe"
                    :rules="[{ required: true, message: 'Vui lòng nhập loại xe!' }]">
                    <a-input v-model:value="newNhaXe.bus_type" placeholder="Loại Xe" />
                </a-form-item>
            </a-form>
        </a-modal>

        <!-- Edit Bus Station Modal -->
        <a-modal title="Chỉnh Sửa Trạm" v-model:open="isEditModalVisible" @cancel="handleEditCancel" @ok="editNhaXe">
            <a-form ref="editFormRef" :model="currentNhaXe" layout="vertical" name="edit_form">
                <a-form-item name="company_name" label="Tên Công Ty"
                    :rules="[{ required: true, message: 'Vui lòng nhập tên công ty!' }]">
                    <a-input v-model:value="currentNhaXe.company_name" placeholder="Tên Công Ty" />
                </a-form-item>
                <a-form-item name="bus_number" label="Số Xe"
                    :rules="[{ required: true, message: 'Vui lòng nhập số xe!' }]">
                    <a-input v-model:value="currentNhaXe.bus_number" placeholder="Số Xe" />
                </a-form-item>
                <a-form-item name="bus_type" label="Loại Xe"
                    :rules="[{ required: true, message: 'Vui lòng nhập loại xe!' }]">
                    <a-input v-model:value="currentNhaXe.bus_type" placeholder="Loại Xe" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<script>
import NhaXeService from "@/services/NhaXeService";
import { notification } from 'ant-design-vue';

export default {
    data() {
        return {
            columns: [
                { title: 'Tên Công Ty', dataIndex: 'company_name', key: 'company_name' },
                { title: 'Số Xe', dataIndex: 'bus_number', key: 'bus_number' },
                { title: 'Loại Xe', dataIndex: 'bus_type', key: 'bus_type' },
                { title: 'Hành Động', key: 'action' },
            ],
            NhaXes: [],
            isAddModalVisible: false,
            isEditModalVisible: false,
            newNhaXe: { company_name: '', bus_number: '', bus_type: '' },
            currentNhaXe: null,
        };
    },
    methods: {
        async fetchNhaXes() {
            try {
                this.NhaXes = await NhaXeService.getAllNhaXes();
            } catch (error) {
                console.error('Error fetching bus stations:', error);
            }
        },
        showAddModal() {
            this.isAddModalVisible = true;
        },
        async addNhaXe() {
            try {
                await this.$refs.addFormRef.validate();
                await NhaXeService.createNhaXe(this.newNhaXe);
                await this.fetchNhaXes();
                this.isAddModalVisible = false;
                this.resetNewNhaXe();
                this.showNotification('success', 'Bus station added successfully');
            } catch (error) {
                console.error('Error adding bus station:', error);
            }
        },
        handleAddCancel() {
            this.isAddModalVisible = false;
            this.resetNewNhaXe();
        },
        resetNewNhaXe() {
            this.newNhaXe = { company_name: '', bus_number: '', bus_type: '' };
        },
        showEditModal(NhaXe) {
            this.currentNhaXe = { ...NhaXe };
            this.isEditModalVisible = true;
        },
        async editNhaXe() {
            try {
                await this.$refs.editFormRef.validate();
                await NhaXeService.updateNhaXe(this.currentNhaXe._id, this.currentNhaXe);
                await this.fetchNhaXes();
                this.isEditModalVisible = false;
                this.showNotification('success', 'Bus station updated successfully');
            } catch (error) {
                console.error('Error updating bus station:', error);
            }
        },
        handleEditCancel() {
            this.isEditModalVisible = false;
        },
        async deleteRecord(NhaXeId) {
            if (confirm('Bạn có chắc muốn xóa trạm này không?')) {
                try {
                    await NhaXeService.deleteNhaXe(NhaXeId);
                    await this.fetchNhaXes();
                    this.showNotification('success', 'Bus station deleted successfully');
                } catch (error) {
                    console.error('Error deleting bus station:', error);
                }
            }
        },
        showNotification(type, message) {
            notification[type]({
                message: 'Thông báo',
                description: message,
            });
        },
    },
    mounted() {
        this.fetchNhaXes();
    },
};
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

h1 {
    font-size: 24px;
    font-weight: bold;
}

.ms-2 {
    margin-left: 0.5rem;
}
</style>
