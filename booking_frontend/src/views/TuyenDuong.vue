<template>
    <div class="container">
        <div class="header">
            <h1>Quản lý tuyến đường</h1>
            <a-button type="primary" @click="showAddModal">
                <i class="fa-solid fa-plus"></i>
                <span class="ms-2">Thêm tuyến đường</span>
            </a-button>
        </div>

        <a-table :columns="columns" :data-source="TuyenDuongs" rowKey="_id">
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

        <!-- Add TuyenDuong Modal -->
        <a-modal title="Thêm tuyến đường" v-model:open="isAddModalVisible" @cancel="handleAddCancel"
            @ok="addTuyenDuong">
            <a-form ref="addFormRef" :model="newTuyenDuong" layout="vertical" name="add_form">
                <a-form-item name="departure_city" label="Địa điểm xuất phát"
                    :rules="[{ required: true, message: 'Vui lòng nhập địa điểm xuất phát!' }]">
                    <a-input v-model:value="newTuyenDuong.departure_city" placeholder="Tên địa điểm xuất phát" />
                </a-form-item>
                <a-form-item name="arrival_city" label="Địa điểm đến"
                    :rules="[{ required: true, message: 'Vui lòng nhập địa điểm đến!' }]">
                    <a-input v-model:value="newTuyenDuong.arrival_city" placeholder="Tên địa điểm đến" />
                </a-form-item>
                <a-form-item name="distance" label="Khoảng cách"
                    :rules="[{ required: true, message: 'Vui lòng nhập khoảng cách!' }]">
                    <a-input v-model:value="newTuyenDuong.distance" placeholder="Khoảng cách" />
                </a-form-item>
                <a-form-item name="duration" label="Khoảng thời gian"
                    :rules="[{ required: true, message: 'Vui lòng nhập khoảng thời gian!' }]">
                    <a-input v-model:value="newTuyenDuong.duration" placeholder="Khoảng thời gian" />
                </a-form-item>
            </a-form>
        </a-modal>

        <!-- Edit TuyenDuong Modal -->
        <a-modal title="Chỉnh sửa tuyến đường" v-model:open="isEditModalVisible" @cancel="handleEditCancel"
            @ok="editTuyenDuong">
            <a-form ref="editFormRef" :model="currentTuyenDuong" layout="vertical" name="edit_form">
                <a-form-item name="departure_city" label="Địa điểm xuất phát"
                    :rules="[{ required: true, message: 'Vui lòng nhập địa điểm xuất phát!' }]">
                    <a-input v-model:value="currentTuyenDuong.departure_city" placeholder="Tên địa điểm xuất phát" />
                </a-form-item>
                <a-form-item name="arrival_city" label="Địa điểm đến"
                    :rules="[{ required: true, message: 'Vui lòng nhập địa điểm đến!' }]">
                    <a-input v-model:value="currentTuyenDuong.arrival_city" placeholder="Tên địa điểm đến" />
                </a-form-item>
                <a-form-item name="distance" label="Khoảng cách"
                    :rules="[{ required: true, message: 'Vui lòng nhập khoảng cách!' }]">
                    <a-input v-model:value="currentTuyenDuong.distance" placeholder="Khoảng cách" />
                </a-form-item>
                <a-form-item name="duration" label="Khoảng thời gian"
                    :rules="[{ required: true, message: 'Vui lòng nhập khoảng thời gian!' }]">
                    <a-input v-model:value="currentTuyenDuong.duration" placeholder="Khoảng thời gian" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script>
import TuyenDuongService from "@/services/TuyenDuongService";
import { notification } from 'ant-design-vue';

export default {
    data() {
        return {
            columns: [
                { title: 'Địa điểm xuất phát', dataIndex: 'departure_city', key: 'departure_city' },
                { title: 'Địa điểm đến', dataIndex: 'arrival_city', key: 'arrival_city' },
                { title: 'Khoảng cách', dataIndex: 'distance', key: 'distance' },
                { title: 'Khoảng thời gian', dataIndex: 'duration', key: 'duration' },
                { title: 'Hành Động', key: 'action' },
            ],
            TuyenDuongs: [],
            isAddModalVisible: false,
            isEditModalVisible: false,
            newTuyenDuong: { departure_city: '', arrival_city: '', distance: '', duration: '' },
            currentTuyenDuong: null,
        };
    },
    methods: {
        async fetchTuyenDuongs() {
            try {
                this.TuyenDuongs = await TuyenDuongService.getAllTuyenDuongs();
            } catch (error) {
                console.error('Error fetching TuyenDuongs:', error);
            }
        },
        showAddModal() {
            this.isAddModalVisible = true;
        },
        async addTuyenDuong() {
            try {
                await this.$refs.addFormRef.validate();
                await TuyenDuongService.createTuyenDuong(this.newTuyenDuong);
                await this.fetchTuyenDuongs();
                this.isAddModalVisible = false;
                this.resetNewTuyenDuong();
                this.showNotification('success', 'TuyenDuong added successfully');
            } catch (error) {
                console.error('Error adding TuyenDuong:', error);
            }
        },
        handleAddCancel() {
            this.isAddModalVisible = false;
            this.resetNewTuyenDuong();
        },
        resetNewTuyenDuong() {
            this.newTuyenDuong = { departure_city: '', arrival_city: '', distance: '', duration: '' };
        },
        showEditModal(TuyenDuong) {
            this.currentTuyenDuong = { ...TuyenDuong };
            this.isEditModalVisible = true;
        },
        async editTuyenDuong() {
            try {
                await this.$refs.editFormRef.validate();
                await TuyenDuongService.updateTuyenDuong(this.currentTuyenDuong._id, this.currentTuyenDuong);
                await this.fetchTuyenDuongs();
                this.isEditModalVisible = false;
                this.showNotification('success', 'TuyenDuong updated successfully');
            } catch (error) {
                console.error('Error updating TuyenDuong:', error);
            }
        },
        handleEditCancel() {
            this.isEditModalVisible = false;
        },
        async deleteRecord(TuyenDuongId) {
            if (confirm('Bạn có chắc muốn xóa tuyến đường này không?')) {
                try {
                    await TuyenDuongService.deleteTuyenDuong(TuyenDuongId);
                    await this.fetchTuyenDuongs();
                    this.showNotification('success', 'TuyenDuong deleted successfully');
                } catch (error) {
                    console.error('Error deleting TuyenDuong:', error);
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
        this.fetchTuyenDuongs();
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
