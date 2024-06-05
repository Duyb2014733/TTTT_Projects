<template>
    <div class="container">
        <div class="header">
            <h1>Quản lý xe</h1>
            <a-button type="primary" @click="showAddModal">
                <i class="fa-solid fa-plus"></i>Thêm Xe
            </a-button>
        </div>

        <a-table :columns="columns" :data-source="vehicles" rowKey="key">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                    <a-button @click="showEditModal(record)">Edit</a-button>
                    <a-button @click="deleteRecord(record._id)" style="margin-left: 10px;">Delete</a-button>
                </template>
                <template v-else>
                    {{ record[column.dataIndex] }}
                </template>
            </template>
        </a-table>

        <!-- Add Vehicle Modal -->
        <a-modal title="Thêm Xe" v-model:open="isAddModalVisible" @cancel="handleAddCancel" @ok="addVehicle">
            <a-form ref="addFormRef" :model="newVehicle" layout="vertical" name="add_form">
                <a-form-item name="name_vehicle" label="Tên Xe"
                    :rules="[{ required: true, message: 'Please input the vehicle name!' }]">
                    <a-input v-model:value="newVehicle.name_vehicle" placeholder="Tên Xe" />
                </a-form-item>
                <a-form-item name="type" label="Loại Xe"
                    :rules="[{ required: true, message: 'Please input the vehicle type!' }]">
                    <a-input v-model:value="newVehicle.type" placeholder="Loại Xe" />
                </a-form-item>
                <a-form-item name="seats" label="Chỗ Ngồi"
                    :rules="[{ required: true, message: 'Please input the number of seats!' }]">
                    <a-input v-model:value="newVehicle.seats" placeholder="Chỗ Ngồi" />
                </a-form-item>
            </a-form>
        </a-modal>

        <!-- Edit Vehicle Modal -->
        <a-modal title="Chỉnh Sửa Xe" v-model:open="isEditModalVisible" @cancel="handleEditCancel" @ok="editVehicle">
            <a-form ref="editFormRef" :model="currentVehicle" layout="vertical" name="edit_form">
                <a-form-item name="name_vehicle" label="Tên Xe"
                    :rules="[{ required: true, message: 'Please input the vehicle name!' }]">
                    <a-input v-model:value="currentVehicle.name_vehicle" placeholder="Tên Xe" />
                </a-form-item>
                <a-form-item name="type" label="Loại Xe"
                    :rules="[{ required: true, message: 'Please input the vehicle type!' }]">
                    <a-input v-model:value="currentVehicle.type" placeholder="Loại Xe" />
                </a-form-item>
                <a-form-item name="seats" label="Chỗ Ngồi"
                    :rules="[{ required: true, message: 'Please input the number of seats!' }]">
                    <a-input v-model:value="currentVehicle.seats" placeholder="Chỗ Ngồi" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script>
import VehicleService from "@/services/VehicleService";
import { notification } from 'ant-design-vue';

export default {
    data() {
        return {
            columns: [
                { title: 'Tên Xe', dataIndex: 'name_vehicle', key: 'name_vehicle' },
                { title: 'Loại Xe', dataIndex: 'type', key: 'type' },
                { title: 'Chỗ Ngồi', dataIndex: 'seats', key: 'seats' },
                { title: 'Hành Động', key: 'action' },
            ],
            vehicles: [],
            isAddModalVisible: false,
            isEditModalVisible: false,
            newVehicle: { name_vehicle: '', type: '', seats: '' },
            currentVehicle: null,
        };
    },
    methods: {
        async fetchVehicles() {
            try {
                this.vehicles = await VehicleService.getAllVehicles();
            } catch (error) {
                console.error('Error fetching vehicles:', error);
            }
        },
        showAddModal() {
            this.isAddModalVisible = true;
        },
        async addVehicle() {
            try {
                await this.$refs.addFormRef.validate();
                await VehicleService.createVehicle(this.newVehicle);
                await this.fetchVehicles();
                this.isAddModalVisible = false;
                this.resetNewVehicle();
                this.showNotification('success', 'Vehicle added successfully');
            } catch (error) {
                console.error('Error adding vehicle:', error);
            }
        },
        handleAddCancel() {
            this.isAddModalVisible = false;
            this.resetNewVehicle();
        },
        resetNewVehicle() {
            this.newVehicle = { name_vehicle: '', type: '', seats: '' };
        },
        showEditModal(vehicle) {
            this.currentVehicle = { ...vehicle };
            this.isEditModalVisible = true;
        },
        async editVehicle() {
            try {
                await this.$refs.editFormRef.validate();
                await VehicleService.updateVehicle(this.currentVehicle._id, this.currentVehicle);
                await this.fetchVehicles();
                this.isEditModalVisible = false;
                this.showNotification('success', 'Vehicle updated successfully');
            } catch (error) {
                console.error('Error updating vehicle:', error);
            }
        },
        handleEditCancel() {
            this.isEditModalVisible = false;
        },
        async deleteRecord(vehicleId) {
            if (confirm('Bạn có chắc muốn xóa xe này không?')) {
                try {
                    await VehicleService.deleteVehicle(vehicleId);
                    await this.fetchVehicles();
                    this.showNotification('success', 'Vehicle deleted successfully');
                } catch (error) {
                    console.error('Error deleting vehicle:', error);
                }
            }
        },
        showNotification(type, message) {
            notification[type]({
                message: 'Notification',
                description: message,
            });
        },
    },
    mounted() {
        this.fetchVehicles();
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
</style>
