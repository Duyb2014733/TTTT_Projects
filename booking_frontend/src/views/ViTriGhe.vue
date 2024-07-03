<template>
    <div class="container">
        <div class="header">
            <h1>Quản lý Vị Trí Ghế</h1>
            <a-button type="primary" @click="showAddModal">
                <i class="fa-solid fa-plus"></i>
                <span class="ms-2">Thêm vị trí ghế</span>
            </a-button>
        </div>

        <a-table :columns="columns" :dataSource="viTriGhes" rowKey="_id">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                    <a-button type="primary" @click="showEditModal(record)">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </a-button>
                    <a-button type="primary" danger @click="deleteRecord(record._id)" style="margin-left: 10px;">
                        <i class="fa-solid fa-trash"></i>
                    </a-button>
                </template>
                <template v-else-if="column.key === 'vitrighe_status'">
                    <a-tag :color="getStatusColor(record.vitrighe_status)">
                        {{ getStatusText(record.vitrighe_status) }}
                    </a-tag>
                </template>
                <template v-else-if="column.key === 'vitrighe_vehicle'">
                    {{ record.vitrighe_vehicle.bus_number }}
                </template>
            </template>
        </a-table>

        <!-- Add ViTriGhe Modal -->
        <a-modal title="Thêm vị trí ghế" v-model:open="isAddModalVisible" @ok="addViTriGhe" @cancel="handleAddCancel">
            <a-form :model="newViTriGhe" layout="vertical">
                <a-form-item label="Tên vị trí ghế" name="vitrighe_name"
                    :rules="[{ required: true, message: 'Vui lòng nhập tên vị trí ghế!' }]">
                    <a-input v-model:value="newViTriGhe.vitrighe_name" />
                </a-form-item>
                <a-form-item label="Trạng thái" name="vitrighe_status"
                    :rules="[{ required: true, message: 'Vui lòng chọn trạng thái!' }]">
                    <a-select v-model:value="newViTriGhe.vitrighe_status">
                        <a-select-option value="available">Còn trống</a-select-option>
                        <a-select-option value="booked">Đã đặt</a-select-option>
                        <a-select-option value="unavailable">Không khả dụng</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="Xe" name="vitrighe_vehicle"
                    :rules="[{ required: true, message: 'Vui lòng chọn xe!' }]">
                    <a-select v-model:value="newViTriGhe.vitrighe_vehicle">
                        <a-select-option v-for="xe in xes" :key="xe._id" :value="xe._id">
                            {{ xe.bus_number }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
            </a-form>
        </a-modal>

        <!-- Edit ViTriGhe Modal -->
        <a-modal title="Chỉnh sửa vị trí ghế" v-model:open="isEditModalVisible" @ok="editViTriGhe"
            @cancel="handleEditCancel">
            <a-form :model="currentViTriGhe" layout="vertical">
                <a-form-item label="Tên vị trí ghế" name="vitrighe_name"
                    :rules="[{ required: true, message: 'Vui lòng nhập tên vị trí ghế!' }]">
                    <a-input v-model:value="currentViTriGhe.vitrighe_name" />
                </a-form-item>
                <a-form-item label="Trạng thái" name="vitrighe_status"
                    :rules="[{ required: true, message: 'Vui lòng chọn trạng thái!' }]">
                    <a-select v-model:value="currentViTriGhe.vitrighe_status">
                        <a-select-option value="available">Còn trống</a-select-option>
                        <a-select-option value="booked">Đã đặt</a-select-option>
                        <a-select-option value="unavailable">Không khả dụng</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="Xe" name="vitrighe_vehicle"
                    :rules="[{ required: true, message: 'Vui lòng chọn xe!' }]">
                    <a-select v-model:value="currentViTriGhe.vitrighe_vehicle">
                        <a-select-option v-for="xe in xes" :key="xe._id" :value="xe._id">
                            {{ xe.bus_number }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script>
import ViTriGheService from '@/services/ViTriGheService';
import XeService from '@/services/XeService';
import { notification } from 'ant-design-vue';
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            viTriGhes: [],
            xes: [],
            columns: [
                { title: 'Tên vị trí ghế', dataIndex: 'vitrighe_name', key: 'vitrighe_name' },
                { title: 'Trạng thái', dataIndex: 'vitrighe_status', key: 'vitrighe_status' },
                { title: 'Xe', dataIndex: ['vitrighe_vehicle', 'xe_name'], key: 'vitrighe_vehicle' },
                { title: 'Hành động', key: 'action' },
            ],
            isAddModalVisible: false,
            isEditModalVisible: false,
            newViTriGhe: {
                vitrighe_name: '',
                vitrighe_status: 'available',
                vitrighe_vehicle: '',
            },
            currentViTriGhe: null,
        };
    },
    methods: {
        async fetchViTriGhes() {
            try {
                const viTriGhes = await ViTriGheService.getAllViTriGhe();
                this.viTriGhes = viTriGhes.sort((a, b) => {
                    return a.vitrighe_name.localeCompare(b.vitrighe_name); // Sắp xếp theo tên vị trí ghế từ A-Z
                });
            } catch (error) {
                console.error('Lỗi khi lấy danh sách vị trí ghế:', error);
                this.showNotification('error', 'Không thể lấy danh sách vị trí ghế');
            }
        },

        async fetchXes() {
            try {
                this.xes = await XeService.getAllXes();
            } catch (error) {
                console.error('Lỗi khi lấy danh sách xe:', error);
                this.showNotification('error', 'Không thể lấy danh sách xe');
            }
        },
        showAddModal() {
            this.isAddModalVisible = true;
        },
        handleAddCancel() {
            this.isAddModalVisible = false;
            this.resetNewViTriGhe();
        },
        async addViTriGhe() {
            try {
                const accessToken = localStorage.getItem('accessToken');
                await ViTriGheService.createViTriGhe(this.newViTriGhe, accessToken);
                this.isAddModalVisible = false;
                this.resetNewViTriGhe();
                await this.fetchViTriGhes();
                this.showNotification('success', 'Thêm vị trí ghế thành công');
            } catch (error) {
                console.error('Lỗi khi thêm vị trí ghế:', error);
                this.showNotification('error', 'Không thể thêm vị trí ghế');
            }
        },
        showEditModal(record) {
            this.currentViTriGhe = { ...record };
            this.isEditModalVisible = true;
        },
        handleEditCancel() {
            this.isEditModalVisible = false;
        },
        async editViTriGhe() {
            try {
                const accessToken = localStorage.getItem('accessToken');
                await ViTriGheService.updateViTriGhe(this.currentViTriGhe._id, this.currentViTriGhe, accessToken);
                this.isEditModalVisible = false;
                await this.fetchViTriGhes();
                this.showNotification('success', 'Cập nhật vị trí ghế thành công');
            } catch (error) {
                console.error('Lỗi khi cập nhật vị trí ghế:', error);
                this.showNotification('error', 'Không thể cập nhật vị trí ghế');
            }
        },
        async deleteRecord(viTriGheId) {
            if (confirm('Bạn có chắc chắn muốn xóa vị trí ghế này?')) {
                try {
                    const accessToken = localStorage.getItem('accessToken');
                    await ViTriGheService.deleteViTriGhe(viTriGheId, accessToken);
                    await this.fetchViTriGhes();
                    this.showNotification('success', 'Xóa vị trí ghế thành công');
                } catch (error) {
                    console.error('Lỗi khi xóa vị trí ghế:', error);
                    this.showNotification('error', 'Không thể xóa vị trí ghế');
                }
            }
        },
        resetNewViTriGhe() {
            this.newViTriGhe = {
                vitrighe_name: '',
                vitrighe_status: 'available',
                vitrighe_vehicle: '',
            };
        },
        showNotification(type, message) {
            notification[type]({
                message: 'Thông báo',
                description: message,
            });
        },
        getStatusColor(status) {
            const colors = {
                available: 'green',
                booked: 'blue',
                unavailable: 'red',
            };
            return colors[status] || 'default';
        },
        getStatusText(status) {
            const texts = {
                available: 'Còn trống',
                booked: 'Đã đặt',
                unavailable: 'Không khả dụng',
            };
            return texts[status] || status;
        },
    },
    mounted() {
        this.fetchViTriGhes();
        this.fetchXes();
    },
});
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