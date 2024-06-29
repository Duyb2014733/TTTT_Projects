<template>
    <div class="container-fluid">
        <div class="header">
            <h1>Quản lý Chuyến Xe</h1>
            <a-button type="primary" @click="showAddModal">
                <i class="fa-solid fa-plus"></i>
                <span class="ms-2">Thêm chuyến xe</span>
            </a-button>
        </div>

        <!-- Table để hiển thị danh sách Chuyen Xes -->
        <a-table :columns="columns" :dataSource="ChuyenXes" rowKey="_id">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                    <a-button @click="showEditModal(record)">
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
                <template v-else-if="column.key === 'image'">
                    <img :src="record.image" alt="Chuyến Xe Image" style="max-width: 100px;" />
                </template>
                <template v-else>
                    {{ record[column.dataIndex] }}
                </template>
            </template>
        </a-table>

        <!-- Modal Thêm Chuyen Xe -->
        <a-modal title="Thêm chuyến xe" v-model:visible="isAddModalVisible" @cancel="handleAddCancel" @ok="addChuyenXe">
            <a-form ref="addFormRef" :model="newChuyenXe" layout="vertical">
                <a-form-item name="bus_id" label="Id nhà xe"
                    :rules="{ required: true, message: 'Vui lòng chọn Id nhà xe!' }">
                    <a-select v-model:value="newChuyenXe.bus_id" placeholder="Chọn Id nhà xe">
                        <a-select-option v-for="nhaXe in NhaXes" :key="nhaXe._id" :value="nhaXe._id">
                            {{ nhaXe.company_name }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item name="route_id" label="Id tuyến đường"
                    :rules="{ required: true, message: 'Vui lòng chọn Id tuyến đường!' }">
                    <a-select v-model:value="newChuyenXe.route_id" placeholder="Chọn Id tuyến đường">
                        <a-select-option v-for="tuyenDuong in TuyenDuongs" :key="tuyenDuong._id"
                            :value="tuyenDuong._id">
                            {{ tuyenDuong.departure_city }} - {{ tuyenDuong.arrival_city }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item name="departure_time" label="Thời gian xuất phát">
                    <a-date-picker v-model:value="newChuyenXe.departure_time" show-time />
                </a-form-item>
                <a-form-item name="arrival_time" label="Thời gian đến">
                    <a-date-picker v-model:value="newChuyenXe.arrival_time" show-time />
                </a-form-item>
                <a-form-item name="image" label="Hình ảnh">
                    <a-upload :before-upload="beforeUpload" @change="handleAddImageChange"
                        :customRequest="customRequest">
                        <a-button icon="upload">Chọn file</a-button>
                    </a-upload>
                    <!-- <img v-if="newChuyenXe.image" :src="newChuyenXe.image" alt="Preview"
                        style="max-width: 200px; margin-top: 10px;" /> -->
                </a-form-item>
            </a-form>
        </a-modal>

        <!-- Modal Chỉnh sửa Chuyen Xe -->
        <a-modal title="Chỉnh sửa chuyến xe" v-model:visible="isEditModalVisible" @cancel="handleEditCancel"
            @ok="editChuyenXe">
            <a-form ref="editFormRef" :model="currentChuyenXe" layout="vertical">
                <a-form-item label="Id nhà xe" :rules="{ required: true, message: 'Vui lòng chọn Id nhà xe!' }">
                    <a-select v-model="currentChuyenXe.bus_id" placeholder="Chọn Id nhà xe">
                        <a-select-option v-for="nhaXe in NhaXes" :key="nhaXe._id" :value="nhaXe._id">
                            {{ nhaXe.company_name }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="Id tuyến đường"
                    :rules="{ required: true, message: 'Vui lòng chọn Id tuyến đường!' }">
                    <a-select v-model="currentChuyenXe.route_id" placeholder="Chọn Id tuyến đường">
                        <a-select-option v-for="tuyenDuong in TuyenDuongs" :key="tuyenDuong._id"
                            :value="tuyenDuong._id">
                            {{ tuyenDuong.departure_city }} - {{ tuyenDuong.arrival_city }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="Thời gian xuất phát">
                    <a-date-picker v-model="currentChuyenXe.departure_time" show-time />
                </a-form-item>
                <a-form-item label="Thời gian đến">
                    <a-date-picker v-model="currentChuyenXe.arrival_time" show-time />
                </a-form-item>
                <a-form-item label="Hình ảnh">
                    <a-upload :before-upload="beforeUpload" @change="handleEditImageChange"
                        :customRequest="customRequest">
                        <a-button icon="upload">
                            Chọn file
                        </a-button>
                    </a-upload>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script>
import ChuyenXeService from '@/services/ChuyenXeService';
import NhaXeService from '@/services/NhaXeService';
import TuyenDuongService from '@/services/TuyenDuongService';
import { message, notification } from 'ant-design-vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ChuyenXeManagement',
    data() {
        return {
            columns: [
                { title: 'ID Nhà xe', dataIndex: 'bus_id', key: 'bus_id' },
                { title: 'ID Tuyến đường', dataIndex: 'route_id', key: 'route_id' },
                { title: 'Thời gian xuất phát', dataIndex: 'departure_time', key: 'departure_time' },
                { title: 'Thời gian đến', dataIndex: 'arrival_time', key: 'arrival_time' },
                { title: 'Hình ảnh', dataIndex: 'image', key: 'image' },
                { title: 'Hành Động', key: 'action' },
            ],
            ChuyenXes: [],
            NhaXes: [],
            TuyenDuongs: [],
            isAddModalVisible: false,
            isEditModalVisible: false,
            newChuyenXe: {
                bus_id: '',
                route_id: '',
                departure_time: '',
                arrival_time: '',
                image: null,
            },
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
        async addChuyenXe() {
            try {
                await this.$refs.addFormRef.validate();
                const token = await localStorage.getItem("accessToken");

                // Create FormData object
                const formData = new FormData();
                Object.keys(this.newChuyenXe).forEach(key => {
                    if (key === 'image' && this.newChuyenXe[key] instanceof File) {
                        formData.append(key, this.newChuyenXe[key]);
                    } else {
                        formData.append(key, this.newChuyenXe[key]);
                    }
                });

                await ChuyenXeService.createChuyenXe(formData, token);
                await this.fetchChuyenXes();
                this.isAddModalVisible = false;
                message.success('Chuyến xe được thêm thành công');
            } catch (error) {
                console.error('Error adding chuyen xe:', error);
                message.error('Đã xảy ra lỗi khi thêm chuyến xe');
            }
        },
        showEditModal(record) {
            this.currentChuyenXe = { ...record };
            this.isEditModalVisible = true;
        },
        async editChuyenXe() {
            try {
                await this.$refs.editFormRef.validate();
                const token = await localStorage.getItem("accessToken");

                // Create FormData object
                const formData = new FormData();
                Object.keys(this.currentChuyenXe).forEach(key => {
                    if (key === 'image' && this.currentChuyenXe[key] instanceof File) {
                        formData.append(key, this.currentChuyenXe[key]);
                    } else if (key !== '_id') {
                        formData.append(key, this.currentChuyenXe[key]);
                    }
                });

                await ChuyenXeService.updateChuyenXe(this.currentChuyenXe._id, formData, token);
                await this.fetchChuyenXes();
                this.isEditModalVisible = false;
                message.success('Chuyến xe được cập nhật thành công');
            } catch (error) {
                console.error('Error updating chuyen xe:', error);
                message.error('Đã xảy ra lỗi khi cập nhật chuyến xe');
            }
        },
        async deleteRecord(id) {
            try {
                await ChuyenXeService.deleteChuyenXe(id);
                await this.fetchChuyenXes();
                message.success('Chuyến xe được xóa thành công');
            } catch (error) {
                console.error('Error deleting chuyen xe:', error);
                message.error('Đã xảy ra lỗi khi xóa chuyến xe');
            }
        },
        handleAddCancel() {
            this.$refs.addFormRef.resetFields();
            this.isAddModalVisible = false;
        },
        handleEditCancel() {
            this.isEditModalVisible = false;
        },
        beforeUpload(file) {
            const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            const isImage = validImageTypes.includes(file.type);
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isImage) {
                notification.error({ message: 'Bạn chỉ có thể tải lên các file JPG, JPEG, PNG, GIF hoặc WEBP!' });
            } else if (!isLt2M) {
                notification.error({ message: 'Kích thước file phải nhỏ hơn 2MB!' });
            }

            return isImage && isLt2M;
        },

        handleAddImageChange(info) {
            if (info.file.status === 'done') {
                this.newChuyenXe.image = info.file.originFileObj;
            }
        },
        customRequest({ file, onSuccess }) {
            setTimeout(() => {
                onSuccess("ok");
            }, 0);
        },
        handleEditImageChange(info) {
            if (info.file.status === 'done') {
                this.currentChuyenXe.image = info.file.originFileObj;
            }
        },
    },
    mounted() {
        this.fetchChuyenXes();
        this.fetchNhaXes();
        this.fetchTuyenDuongs();
    },
});
</script>

<style scoped>
.container {
    padding: 20px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
</style>
