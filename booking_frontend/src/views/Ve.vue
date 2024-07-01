<template>
    <div class="container">
        <div class="header">
            <h1>Quản lý vé</h1>
            <a-button type="primary" @click="showAddModal">
                <i class="fa-solid fa-plus"></i>
                <span class="ms-2">Thêm Vé</span>
            </a-button>
        </div>

        <a-table :columns="columns" :data-source="ves" rowKey="_id">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                    <a-button @click="showEditModal(record)">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </a-button>
                    <a-button type="primary" danger @click="deleteRecord(record._id)" style="margin-left: 10px;">
                        <i class="fa-solid fa-trash"></i>
                    </a-button>
                </template>
                <template v-else-if="column.key === 'trip_id'">
                    {{ record.trip_id.chuyenXe_name }}
                </template>
                <template v-else-if="column.key === 'seat_id'">
                    {{ record.seat_id.vitrighe_name }}
                </template>
                <template v-else>
                    {{ record[column.dataIndex] }}
                </template>
            </template>
        </a-table>

        <!-- Add Ve Modal -->
        <a-modal title="Thêm Vé" v-model:open="isAddModalVisible" @cancel="handleAddCancel" @ok="addVe">
            <a-form ref="addFormRef" :model="newVe" layout="vertical" name="add_form">
                <a-form-item name="trip_id" label="ID Chuyến Xe"
                    :rules="[{ required: true, message: 'Vui lòng nhập ID chuyến xe!' }]">
                    <a-select v-model:value="newVe.trip_id" placeholder="Chọn ID Chuyến Xe">
                        <a-select-option v-for="chuyenXe in chuyenXes" :key="chuyenXe._id" :value="chuyenXe._id">
                            {{ chuyenXe.route_id.departure_city }} - {{ chuyenXe.route_id.arrival_city }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item name="seat_id" label="Số Ghế"
                    :rules="[{ required: true, message: 'Vui lòng nhập số ghế!' }]">
                    <a-input v-model:value="newVe.seat_id" placeholder="Số Ghế" />
                </a-form-item>
                <a-form-item name="ve_name" label="Giá" :rules="[{ required: true, message: 'Vui lòng nhập giá!' }]">
                    <a-input v-model:value="newVe.ve_name" placeholder="Giá" />
                </a-form-item>
            </a-form>
        </a-modal>

        <!-- Edit Ve Modal -->
        <a-modal title="Chỉnh Sửa Vé" v-model:open="isEditModalVisible" @cancel="handleEditCancel" @ok="editVe">
            <a-form ref="editFormRef" :model="currentVe" layout="vertical" name="edit_form">
                <a-form-item name="trip_id" label="ID Chuyến Xe"
                    :rules="[{ required: true, message: 'Vui lòng nhập ID chuyến xe!' }]">
                    <a-select v-model:value="currentVe.trip_id" placeholder="Chọn ID Chuyến Xe">
                        <a-select-option v-for="chuyenXe in chuyenXes" :key="chuyenXe._id" :value="chuyenXe._id">
                            {{ chuyenXe.trip_id.route_id.departure_city }} - {{ chuyenXe.trip_id.route_id.arrival_city
                            }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item name="seat_id" label="Số Ghế"
                    :rules="[{ required: true, message: 'Vui lòng nhập số ghế!' }]">
                    <a-input v-model:value="currentVe.seat_id" placeholder="Số Ghế" />
                </a-form-item>
                <a-form-item name="ve_name" label="Giá" :rules="[{ required: true, message: 'Vui lòng nhập giá!' }]">
                    <a-input v-model:value="currentVe.ve_name" placeholder="Giá" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<script>
import ChuyenXeService from "@/services/ChuyenXeService";
import VeService from "@/services/VeService";
import { notification } from 'ant-design-vue';

export default {
    data() {
        return {
            columns: [
                { title: 'ID Chuyến Xe', dataIndex: 'trip_id', key: 'trip_id' },
                { title: 'Tên Vé', dataIndex: 've_name', key: 've_name' },
                { title: 'ID Ghế', dataIndex: 'seat_id', key: 'seat_id' },
                { title: 'Hành Động', key: 'action' },
            ],
            ves: [],
            chuyenXes: [],
            isAddModalVisible: false,
            isEditModalVisible: false,
            newVe: { trip_id: '', ve_name: '', seat_id: '' },
            currentVe: { trip_id: '', ve_name: '', seat_id: '' },
        };
    },
    methods: {
        async fetchVes() {
            try {
                this.ves = await VeService.getAllVes();
            } catch (error) {
                console.error('Error fetching Ves:', error);
            }
        },
        async fetchChuyenXes() {
            try {
                this.chuyenXes = await ChuyenXeService.getAllChuyenXes();
            } catch (error) {
                console.error('Error fetching trips:', error);
            }
        },
        showAddModal() {
            this.isAddModalVisible = true;
        },
        async addVe() {
            try {
                const token = await localStorage.getItem('accessToken');
                await this.$refs.addFormRef.validate();
                await VeService.createVe(this.newVe, token);
                await this.fetchVes();
                this.isAddModalVisible = false;
                this.resetNewVe();
                this.showNotification('success', 'Ve added successfully');
            } catch (error) {
                console.error('Error adding Ve:', error);
            }
        },
        handleAddCancel() {
            this.isAddModalVisible = false;
            this.resetNewVe();
        },
        resetNewVe() {
            this.newVe = { trip_id: '', seat_id: '', ve_name: '' };
        },
        showEditModal(ve) {
            this.currentVe = { ...ve };
            this.isEditModalVisible = true;
        },
        async editVe() {
            try {
                const token = await localStorage.getItem('accessToken');
                await this.$refs.editFormRef.validate();
                await VeService.updateVe(this.currentVe._id, this.currentVe, token);
                await this.fetchVes();
                this.isEditModalVisible = false;
                this.showNotification('success', 'Ve updated successfully');
            } catch (error) {
                console.error('Error updating Ve:', error);
            }
        },
        handleEditCancel() {
            this.isEditModalVisible = false;
        },
        async deleteRecord(veId) {
            if (confirm('Bạn có chắc muốn xóa vé này không?')) {
                try {
                    const token = await localStorage.getItem('accessToken');
                    await VeService.deleteVe(veId, token);
                    await this.fetchVes();
                    this.showNotification('success', 'Ve deleted successfully');
                } catch (error) {
                    console.error('Error deleting Ve:', error);
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
    async mounted() {
        await this.fetchVes();
        await this.fetchChuyenXes();
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
