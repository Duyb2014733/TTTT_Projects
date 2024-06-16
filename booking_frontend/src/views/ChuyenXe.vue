<template>
    <div class="container">
        <div class="header">
            <h1>Quản lý Chuyến Xe</h1>
            <a-button type="primary" @click="showAddModal">
                <i class="fa-solid fa-plus"></i>
                <span class="ms-2">Thêm chuyến xe</span>
            </a-button>
        </div>

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

        <!-- Add chuyến xe Modal -->
        <a-modal title="Thêm chuyến xe" v-model="isAddModalVisible" @cancel="handleAddCancel" @ok="addChuyenXe">
            <a-form ref="addFormRef" :model="newChuyenXe" layout="vertical">
                <a-form-item label="Id nhà xe" :rules="{ required: true, message: 'Vui lòng chọn Id nhà xe!' }">
                    <a-select v-model:value="newChuyenXe.bus_id" placeholder="Chọn Id nhà xe">
                        <a-select-option v-for="nhaXe in NhaXes" :key="nhaXe._id" :value="nhaXe._id">
                            {{ nhaXe.company_name }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="Id tuyến đường"
                    :rules="{ required: true, message: 'Vui lòng chọn Id tuyến đường!' }">
                    <a-select v-model:value="newChuyenXe.route_id" placeholder="Chọn Id tuyến đường">
                        <a-select-option v-for="tuyenDuong in TuyenDuongs" :key="tuyenDuong._id"
                            :value="tuyenDuong._id">
                            {{ tuyenDuong.departure_city }} - {{ tuyenDuong.arrival_city }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="Thời gian xuất phát"
                    :rules="{ required: true, message: 'Vui lòng nhập thời gian xuất phát!' }">
                    <a-date-picker v-model:value="newChuyenXe.departure_time" show-time
                        placeholder="Chọn thời gian xuất phát" />
                </a-form-item>
                <a-form-item label="Thời gian đến" :rules="{ required: true, message: 'Vui lòng nhập thời gian đến!' }">
                    <a-date-picker v-model:value="newChuyenXe.arrival_time" show-time
                        placeholder="Chọn thời gian đến" />
                </a-form-item>
                <a-form-item label="Hình ảnh">
                    <a-upload :before-upload="beforeUpload" :show-upload-list="false" @change="handleAddImageChange">
                        <a-button>
                            <upload-outlined></upload-outlined> Chọn file
                        </a-button>
                    </a-upload>
                    <img v-if="newChuyenXe.image" :src="newChuyenXe.image" alt="Preview"
                        style="max-width: 100px; margin-top: 10px;" />
                </a-form-item>
            </a-form>
        </a-modal>

        <!-- Edit chuyến xe Modal -->
        <a-modal title="Chỉnh sửa chuyến xe" v-model="isEditModalVisible" @cancel="handleEditCancel" @ok="editChuyenXe">
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
                    <a-select v-model:value="currentChuyenXe.route_id" placeholder="Chọn Id tuyến đường">
                        <a-select-option v-for="tuyenDuong in TuyenDuongs" :key="tuyenDuong._id"
                            :value="tuyenDuong._id">
                            {{ tuyenDuong.departure_city }} - {{ tuyenDuong.arrival_city }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="Thời gian xuất phát"
                    :rules="{ required: true, message: 'Vui lòng nhập thời gian xuất phát!' }">
                    <a-date-picker v-model:value="currentChuyenXe.departure_time" show-time
                        placeholder="Chọn thời gian xuất phát" />
                </a-form-item>
                <a-form-item label="Thời gian đến" :rules="{ required: true, message: 'Vui lòng nhập thời gian đến!' }">
                    <a-date-picker v-model:value="currentChuyenXe.arrival_time" show-time
                        placeholder="Chọn thời gian đến" />
                </a-form-item>
                <a-form-item label="Hình ảnh">
                    <a-upload :before-upload="beforeUpload" :show-upload-list="false" @change="handleEditImageChange">
                        <a-button>
                            <upload-outlined></upload-outlined> Chọn file
                        </a-button>
                    </a-upload>
                    <img v-if="currentChuyenXe.image" :src="currentChuyenXe.image" alt="Preview"
                        style="max-width: 100px; margin-top: 10px;" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>


<script>
import ChuyenXeService from '@/services/ChuyenXeService';
import NhaXeService from '@/services/NhaXeService';
import TuyenDuongService from '@/services/TuyenDuongService';
import { UploadOutlined } from '@ant-design/icons-vue';
import { message, notification } from 'ant-design-vue';

export default {
    components: {
        UploadOutlined,
    },
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
        handleAddCancel() {
            this.isAddModalVisible = false;
        },
        async addChuyenXe() {
            try {
                await ChuyenXeService.createChuyenXe(this.newChuyenXe);
                message.success('Thêm chuyến xe thành công');
                this.fetchChuyenXes();
                this.isAddModalVisible = false;
            } catch (error) {
                console.error('Error adding chuyen xe:', error);
                notification.error({ message: 'Thêm chuyến xe thất bại' });
            }
        },
        showEditModal(record) {
            this.currentChuyenXe = { ...record };
            this.isEditModalVisible = true;
        },
        handleEditCancel() {
            this.isEditModalVisible = false;
        },
        async editChuyenXe() {
            try {
                await ChuyenXeService.updateChuyenXe(this.currentChuyenXe._id, this.currentChuyenXe);
                message.success('Chỉnh sửa chuyến xe thành công');
                this.fetchChuyenXes();
                this.isEditModalVisible = false;
            } catch (error) {
                console.error('Error editing chuyen xe:', error);
                notification.error({ message: 'Chỉnh sửa chuyến xe thất bại' });
            }
        },
        async deleteRecord(id) {
            try {
                await ChuyenXeService.deleteChuyenXe(id);
                message.success('Xóa chuyến xe thành công');
                this.fetchChuyenXes();
            } catch (error) {
                console.error('Error deleting chuyen xe:', error);
                notification.error({ message: 'Xóa chuyến xe thất bại' });
            }
        },
        beforeUpload(file) {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                message.error('You can only upload JPG/PNG file!');
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error('Image must smaller than 2MB!');
            }
            return isJpgOrPng && isLt2M;
        },
        async handleAddImageChange({ file }) {
            const formData = new FormData();
            formData.append('image', file.originFileObj);

            try {
                const response = await ChuyenXeService.uploadImage(formData);
                this.newChuyenXe.image = response.data.url;
            } catch (error) {
                console.error('Error uploading image:', error);
                notification.error({ message: 'Upload image failed' });
            }
        },
        async handleEditImageChange({ file }) {
            const formData = new FormData();
            formData.append('image', file.originFileObj);

            try {
                const response = await ChuyenXeService.uploadImage(formData);
                this.currentChuyenXe.image = response.data.url;
            } catch (error) {
                console.error('Error uploading image:', error);
                notification.error({ message: 'Upload image failed' });
            }
        },
    },
    created() {
        this.fetchChuyenXes();
        this.fetchNhaXes();
        this.fetchTuyenDuongs();
    },
};
</script>


<style scoped>
/* Điều chỉnh style cho modal và các phần tử trong modal */
.container {
    padding: 20px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.ms-2 {
    margin-left: 8px;
}
</style>
