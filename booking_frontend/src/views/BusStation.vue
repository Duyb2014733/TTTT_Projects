<template>
    <div class="container">
        <div class="header">
            <h1>Quản lý trạm xe buýt</h1>
            <a-button type="primary" @click="showAddModal">
                <i class="fa-solid fa-plus"></i>
                <span class="ms-2">Thêm Trạm</span>
            </a-button>
        </div>

        <a-table :columns="columns" :data-source="busStations" rowKey="_id">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                    <a-button @click="showEditModal(record)">
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
        <a-modal title="Thêm Trạm" v-model:open="isAddModalVisible" @cancel="handleAddCancel" @ok="addBusStation">
            <a-form ref="addFormRef" :model="newBusStation" layout="vertical" name="add_form">
                <a-form-item name="name" label="Tên Trạm"
                    :rules="[{ required: true, message: 'Vui lòng nhập tên trạm!' }]">
                    <a-input v-model:value="newBusStation.name" placeholder="Tên Trạm" />
                </a-form-item>
                <a-form-item name="location" label="Địa Điểm"
                    :rules="[{ required: true, message: 'Vui lòng nhập địa điểm!' }]">
                    <a-input v-model:value="newBusStation.location" placeholder="Địa Điểm" />
                </a-form-item>
            </a-form>
        </a-modal>

        <!-- Edit Bus Station Modal -->
        <a-modal title="Chỉnh Sửa Trạm" v-model:open="isEditModalVisible" @cancel="handleEditCancel"
            @ok="editBusStation">
            <a-form ref="editFormRef" :model="currentBusStation" layout="vertical" name="edit_form">
                <a-form-item name="name" label="Tên Trạm"
                    :rules="[{ required: true, message: 'Vui lòng nhập tên trạm!' }]">
                    <a-input v-model:value="currentBusStation.name" placeholder="Tên Trạm" />
                </a-form-item>
                <a-form-item name="location" label="Địa Điểm"
                    :rules="[{ required: true, message: 'Vui lòng nhập địa điểm!' }]">
                    <a-input v-model:value="currentBusStation.location" placeholder="Địa Điểm" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<script>
import BusStationService from "@/services/BusStationService";
import { notification } from 'ant-design-vue';

export default {
    data() {
        return {
            columns: [
                { title: 'Tên Trạm', dataIndex: 'name', key: 'name' },
                { title: 'Địa Điểm', dataIndex: 'location', key: 'location' },
                { title: 'Hành Động', key: 'action' },
            ],
            busStations: [],
            isAddModalVisible: false,
            isEditModalVisible: false,
            newBusStation: { name: '', location: '' },
            currentBusStation: null,
        };
    },
    methods: {
        async fetchBusStations() {
            try {
                this.busStations = await BusStationService.getAllBusStations();
            } catch (error) {
                console.error('Error fetching bus stations:', error);
            }
        },
        showAddModal() {
            this.isAddModalVisible = true;
        },
        async addBusStation() {
            try {
                await this.$refs.addFormRef.validate();
                await BusStationService.createBusStation(this.newBusStation);
                await this.fetchBusStations();
                this.isAddModalVisible = false;
                this.resetNewBusStation();
                this.showNotification('success', 'Bus station added successfully');
            } catch (error) {
                console.error('Error adding bus station:', error);
            }
        },
        handleAddCancel() {
            this.isAddModalVisible = false;
            this.resetNewBusStation();
        },
        resetNewBusStation() {
            this.newBusStation = { name: '', location: '' };
        },
        showEditModal(busStation) {
            this.currentBusStation = { ...busStation };
            this.isEditModalVisible = true;
        },
        async editBusStation() {
            try {
                await this.$refs.editFormRef.validate();
                await BusStationService.updateBusStation(this.currentBusStation._id, this.currentBusStation);
                await this.fetchBusStations();
                this.isEditModalVisible = false;
                this.showNotification('success', 'Bus station updated successfully');
            } catch (error) {
                console.error('Error updating bus station:', error);
            }
        },
        handleEditCancel() {
            this.isEditModalVisible = false;
        },
        async deleteRecord(busStationId) {
            if (confirm('Bạn có chắc muốn xóa trạm này không?')) {
                try {
                    await BusStationService.deleteBusStation(busStationId);
                    await this.fetchBusStations();
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
        this.fetchBusStations();
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
