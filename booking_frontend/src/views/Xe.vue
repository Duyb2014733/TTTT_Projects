<template>
    <div class="container-fluid">
        <div class="header">
            <h1>Quản lý Xe</h1>
            <a-button type="primary" @click="showAddModal">
                <i class="fa-solid fa-plus"></i>
                <span class="ms-2">Thêm xe</span>
            </a-button>
        </div>

        <a-table :columns="columns" :data-source="Xes" rowKey="_id">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                    <a-button danger @click="showEditModal(record)">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </a-button>
                    <a-button type="primary" danger @click="deleteRecord(record._id)" style="margin-left: 10px;">
                        <i class="fa-solid fa-trash"></i>
                    </a-button>
                </template>
            </template>
        </a-table>

        <!-- Add Xe Modal -->
        <a-modal title="Thêm Xe" v-model:open="isAddModalVisible" @cancel="handleAddCancel" @ok="addXe">
            <a-form ref="addFormRef" :model="newXe" layout="vertical" name="add_form">
                <a-form-item name="bus_number" label="Số Xe"
                    :rules="[{ required: true, message: 'Vui lòng nhập số xe!' }]">
                    <a-input v-model:value="newXe.bus_number" placeholder="Số Xe" />
                </a-form-item>
                <a-form-item name="bus_type" label="Loại Xe"
                    :rules="[{ required: true, message: 'Vui lòng nhập loại xe!' }]">
                    <a-input v-model:value="newXe.bus_type" placeholder="Loại Xe" />
                </a-form-item>
                <a-form-item name="nha_xe" label="Nhà Xe"
                    :rules="[{ required: true, message: 'Vui lòng chọn nhà xe!' }]">
                    <a-select v-model:value="newXe.nha_xe" placeholder="Chọn Nhà Xe">
                        <a-select-option v-for="nhaXe in nhaXes" :key="nhaXe._id" :value="nhaXe._id">
                            {{ nhaXe.company_name }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
            </a-form>
        </a-modal>

        <!-- Edit Xe Modal -->
        <a-modal title="Chỉnh Sửa Xe" v-model:open="isEditModalVisible" @cancel="handleEditCancel" @ok="editXe">
            <a-form ref="editFormRef" :model="currentXe" layout="vertical" name="edit_form">
                <a-form-item name="bus_number" label="Số Xe"
                    :rules="[{ required: true, message: 'Vui lòng nhập số xe!' }]">
                    <a-input v-model:value="currentXe.bus_number" placeholder="Số Xe" />
                </a-form-item>
                <a-form-item name="bus_type" label="Loại Xe"
                    :rules="[{ required: true, message: 'Vui lòng nhập loại xe!' }]">
                    <a-input v-model:value="currentXe.bus_type" placeholder="Loại Xe" />
                </a-form-item>
                <a-form-item name="nha_xe" label="Nhà Xe"
                    :rules="[{ required: true, message: 'Vui lòng chọn nhà xe!' }]">
                    <a-select v-model:value="currentXe.nha_xe" placeholder="Chọn Nhà Xe">
                        <a-select-option v-for="nhaXe in nhaXes" :key="nhaXe._id" :value="nhaXe._id">
                            {{ nhaXe.company_name }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script>
import NhaXeService from "@/services/NhaXeService";
import XeService from "@/services/XeService";
import { notification } from "ant-design-vue";

export default {
    data() {
        return {
            columns: [
                { title: "Số Xe", dataIndex: "bus_number", key: "bus_number" },
                { title: "Loại Xe", dataIndex: "bus_type", key: "bus_type" },
                { title: "Nhà Xe", dataIndex: ["nha_xe", "company_name"], key: "nha_xe" },
                { title: "Hành Động", key: "action" },
            ],
            Xes: [],
            nhaXes: [],
            isAddModalVisible: false,
            isEditModalVisible: false,
            newXe: { bus_number: "", bus_type: "", nha_xe: "" },
            currentXe: null,
        };
    },
    methods: {
        async fetchXes() {
            try {
                this.Xes = await XeService.getAllXes();
            } catch (error) {
                console.error("Error fetching buses:", error);
            }
        },
        async fetchNhaXes() {
            try {
                this.nhaXes = await NhaXeService.getAllNhaXes();
            } catch (error) {
                console.error("Error fetching nha xes:", error);
            }
        },
        showAddModal() {
            this.isAddModalVisible = true;
        },
        async addXe() {
            try {
                const token = await localStorage.getItem("accessToken");
                await this.$refs.addFormRef.validate();
                await XeService.createXe(this.newXe, token);
                await this.fetchXes();
                this.isAddModalVisible = false;
                this.resetNewXe();
                this.showNotification("success", "Xe added successfully");
            } catch (error) {
                console.error("Error adding xe:", error);
            }
        },
        handleAddCancel() {
            this.isAddModalVisible = false;
            this.resetNewXe();
        },
        resetNewXe() {
            this.newXe = { bus_number: "", bus_type: "", nha_xe: "" };
        },
        showEditModal(Xe) {
            this.currentXe = { ...Xe };
            this.isEditModalVisible = true;
        },
        async editXe() {
            try {
                const token = await localStorage.getItem("accessToken");
                await this.$refs.editFormRef.validate();
                await XeService.updateXe(this.currentXe._id, this.currentXe, token);
                await this.fetchXes();
                this.isEditModalVisible = false;
                this.showNotification("success", "Xe updated successfully");
            } catch (error) {
                console.error("Error updating xe:", error);
            }
        },
        handleEditCancel() {
            this.isEditModalVisible = false;
        },
        async deleteRecord(XeId) {
            if (confirm("Bạn có chắc muốn xóa xe này không?")) {
                try {
                    const token = await localStorage.getItem("accessToken");
                    await XeService.deleteXe(XeId, token);
                    await this.fetchXes();
                    this.showNotification("success", "Xe deleted successfully");
                } catch (error) {
                    console.error("Error deleting xe:", error);
                }
            }
        },
        showNotification(type, message) {
            notification[type]({
                message: "Thông báo",
                description: message,
            });
        },
    },
    mounted() {
        this.fetchXes();
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