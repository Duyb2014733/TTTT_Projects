<template>
    <div class="container">
        <div class="header">
            <h1>Quản lý Chuyến Xe</h1>
            <a-button type="primary" @click="showAddModal">
                <i class="fa-solid fa-plus"></i>
                <span class="ms-2">Thêm chuyến xe</span>
            </a-button>
        </div>

        <a-table :columns="columns" :data-source="ChuyenXes" rowKey="_id">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                    <a-button danger @click="showEditModal(record)">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </a-button>
                    <a-button type="primary" danger @click="deleteRecord(record._id)" style="margin-left: 10px;">
                        <i class="fa-solid fa-trash"></i>
                    </a-button>
                </template>
                <template v-else-if="column.key === 'bus_id'">
                    {{ record.bus_id.company_name }}
                </template>
                <template v-else-if="column.key === 'route_id'">
                    {{ record.route_id.departure_city }} - {{ record.route_id.arrival_city }}
                </template>
                <template v-else>
                    {{ record[column.dataIndex] }}
                </template>
            </template>
        </a-table>

        <!-- Add chuyến xe Modal -->
        <a-modal title="Thêm chuyến xe" v-model:open="isAddModalVisible" @cancel="handleAddCancel" @ok="addChuyenXe">
            <a-form ref="addFormRef" :model="newChuyenXe" layout="vertical" name="add_form">
                <a-form-item name="bus_id" label="Id nhà xe"
                    :rules="[{ required: true, message: 'Vui lòng chọn Id nhà xe!' }]">
                    <a-select v-model:value="newChuyenXe.bus_id" placeholder="Id nhà xe">
                        <a-select-option v-for="NhaXe in NhaXes" :key="NhaXe._id" :value="NhaXe._id">
                            {{ NhaXe.company_name }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item name="route_id" label="Id tuyến đường"
                    :rules="[{ required: true, message: 'Vui lòng nhập Id tuyến đường!' }]">
                    <a-select v-model:value="newChuyenXe.route_id" placeholder="Id tuyến đường">
                        <a-select-option v-for="TuyenDuong in TuyenDuongs" :key="TuyenDuong._id"
                            :value="TuyenDuong._id">
                            {{ TuyenDuong.departure_city }} - {{ TuyenDuong.arrival_city }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item name="departure_time" label="Thời gian xuất phát"
                    :rules="[{ required: true, message: 'Vui lòng nhập thời gian xuất phát!' }]">
                    <a-date-picker v-model:value="newChuyenXe.departure_time" show-time
                        placeholder="Chọn ngày và giờ xuất phát" />
                </a-form-item>
                <a-form-item name="arrival_time" label="Thời gian đến"
                    :rules="[{ required: true, message: 'Vui lòng nhập thời gian đến!' }]">
                    <a-date-picker v-model:value="newChuyenXe.arrival_time" show-time
                        placeholder="Chọn ngày và giờ xuất phát" />
                </a-form-item>
            </a-form>
        </a-modal>

        <!-- Edit chuyến xe Modal -->
        <a-modal title="Chỉnh Sửa Trạm" v-model:open="isEditModalVisible" @cancel="handleEditCancel" @ok="editChuyenXe">
            <a-form ref="editFormRef" :model="currentChuyenXe" layout="vertical" name="edit_form">
                <a-form-item name="bus_id" label="Id nhà xe"
                    :rules="[{ required: true, message: 'Vui lòng chọn Id nhà xe!' }]">
                    <a-select v-model:value="currentChuyenXe.bus_id" placeholder="Id nhà xe">
                        <a-select-option v-for="NhaXe in NhaXes" :key="NhaXe._id" :value="NhaXe._id">
                            {{ NhaXe.company_name }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item name="route_id" label="Id tuyến đường"
                    :rules="[{ required: true, message: 'Vui lòng nhập Id tuyến đường!' }]">
                    <a-select v-model:value="currentChuyenXe.route_id" placeholder="Id tuyến đường">
                        <a-select-option v-for="TuyenDuong in TuyenDuongs" :key="TuyenDuong._id"
                            :value="TuyenDuong._id">
                            {{ TuyenDuong.departure_city }} - {{ TuyenDuong.arrival_city }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item name="departure_time" label="Thời gian xuất phát"
                    :rules="[{ required: true, message: 'Vui lòng nhập thời gian xuất phát!' }]">
                    <a-date-picker v-model="currentChuyenXe.departure_time" show-time
                        placeholder="Chọn ngày và giờ xuất phát" />
                </a-form-item>
                <a-form-item name="arrival_time" label="Thời gian đến"
                    :rules="[{ required: true, message: 'Vui lòng nhập thời gian đến!' }]">
                    <a-date-picker v-model="currentChuyenXe.arrival_time" show-time
                        placeholder="Chọn ngày và giờ xuất phát" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script>
import ChuyenXeService from '@/services/ChuyenXeService';
import NhaXeService from '@/services/NhaXeService';
import TuyenDuongService from '@/services/TuyenDuongService';
import { notification } from 'ant-design-vue';

export default {
    data() {
        return {
            columns: [
                { title: 'ID Nhà xe', dataIndex: 'bus_id', key: 'bus_id' },
                { title: 'ID Tuyến đường', dataIndex: 'route_id', key: 'route_id' },
                { title: 'Thời gian xuất phát', dataIndex: 'departure_time', key: 'departure_time' },
                { title: 'Thời gian đến', dataIndex: 'arrival_time', key: 'arrival_time' },
                { title: 'Hành Động', key: 'action' },
            ],
            ChuyenXes: [],
            NhaXes: [],
            TuyenDuongs: [],
            isAddModalVisible: false,
            isEditModalVisible: false,
            newChuyenXe: { bus_id: '', route_id: '', departure_time: '', arrival_time: '', },
            currentChuyenXe: null,
        };
    },
    methods: {
        async fetchChuyenXes() {
            try {
                this.ChuyenXes = await ChuyenXeService.getAllChuyenXes();
            } catch (error) {
                console.error('Error fetching chuyen xe:', error);
            }
        },
        async fetchNhaXes() {
            try {
                this.NhaXes = await NhaXeService.getAllNhaXes();
            } catch (error) {
                console.error('Error fetching nha xe:', error);
            }
        },
        async fetchTuyenDuongs() {
            try {
                this.TuyenDuongs = await TuyenDuongService.getAllTuyenDuongs();
            } catch (error) {
                console.error('Error fetching tuyen duong:', error);
            }
        },
        showAddModal() {
            this.isAddModalVisible = true;
        },
        showAddModal() {
            this.isAddModalVisible = true;
        },
        async addChuyenXe() {
            try {
                await this.$refs.addFormRef.validate();
                await ChuyenXeService.createChuyenXe(this.newChuyenXe);
                await this.fetchChuyenXes();
                this.isAddModalVisible = false;
                this.resetNewChuyenXe();
                this.showNotification('success', 'Thêm thông tin chuyến xe thành công!');
            } catch (error) {
                console.error('Lỗi khi thêm chuyến xe:', error);
            }
        },
        handleAddCancel() {
            this.isAddModalVisible = false;
            this.resetNewChuyenXe();
        },
        resetNewChuyenXe() {
            this.newChuyenXe = { bus_id: '', route_id: '', departure_time: '', arrival_time: '', };
        },
        showEditModal(ChuyenXe) {
            this.currentChuyenXe = { ...ChuyenXe };
            this.isEditModalVisible = true;
        },
        async editChuyenXe() {
            try {
                await this.$refs.editFormRef.validate();
                await ChuyenXeService.updateChuyenXe(this.currentChuyenXe._id, this.currentChuyenXe);
                await this.fetchChuyenXes();
                this.isEditModalVisible = false;
                this.showNotification('success', 'Cập nhật thông tin chuyến xe thành công!');
            } catch (error) {
                console.error('Lỗi khi cập nhật chuyến xe:', error);
            }
        },
        handleEditCancel() {
            this.isEditModalVisible = false;
        },
        async deleteRecord(ChuyenXeId) {
            if (confirm('Bạn có chắc muốn xóa chuyến xe này không?')) {
                try {
                    await ChuyenXeService.deleteChuyenXe(ChuyenXeId);
                    await this.fetchChuyenXes();
                    this.showNotification('success', 'Xóa thông tin chuyến xe thành công!');
                } catch (error) {
                    console.error('Lỗi khi xóa chuyến xe:', error);
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
        this.fetchChuyenXes();
        this.fetchNhaXes();
        this.fetchTuyenDuongs();
    },
}
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