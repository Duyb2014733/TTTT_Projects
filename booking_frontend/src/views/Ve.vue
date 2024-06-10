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
                <template v-else>
                    {{ record[column.dataIndex] }}
                </template>
            </template>
        </a-table>

        <!-- Add Ve Modal -->
        <a-modal title="Thêm Vé" v-model:open="isAddModalVisible" @cancel="handleAddCancel" @ok="addVe">
            <a-form ref="addFormRef" :model="newVe" layout="vertical" name="add_form">
                <a-form-item name="customer_id" label="ID Khách Hàng"
                    :rules="[{ required: true, message: 'Vui lòng nhập ID khách hàng!' }]">
                    <a-select v-model:value="newVe.customer_id" placeholder="Chọn ID Khách Hàng">
                        <a-select-option v-for="khachHang in khachHangs" :key="khachHang._id" :value="khachHang._id">
                            {{ khachHang.name }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item name="trip_id" label="ID Chuyến Xe"
                    :rules="[{ required: true, message: 'Vui lòng nhập ID chuyến xe!' }]">
                    <a-select v-model:value="newVe.trip_id" placeholder="Chọn ID Chuyến Xe">
                        <a-select-option v-for="chuyenXe in chuyenXes" :key="chuyenXe._id" :value="chuyenXe._id">
                            {{ chuyenXe.name }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item name="seat_number" label="Số Ghế"
                    :rules="[{ required: true, message: 'Vui lòng nhập số ghế!' }]">
                    <a-input v-model:value="newVe.seat_number" placeholder="Số Ghế" />
                </a-form-item>
                <a-form-item name="purchase_date" label="Ngày Mua"
                    :rules="[{ required: true, message: 'Vui lòng nhập ngày mua!' }]">
                    <a-date-picker v-model:value="newVe.purchase_date" show-time placeholder="Chọn ngày giờ" />
                </a-form-item>
                <a-form-item name="price" label="Giá" :rules="[{ required: true, message: 'Vui lòng nhập giá!' }]">
                    <a-input v-model:value="newVe.price" placeholder="Giá" />
                </a-form-item>
                <a-form-item name="payment_id" label="ID Thanh Toán"
                    :rules="[{ required: true, message: 'Vui lòng nhập ID thanh toán!' }]">
                    <a-input v-model:value="newVe.payment_id" placeholder="ID Thanh Toán" />
                </a-form-item>
            </a-form>
        </a-modal>

        <!-- Edit Ve Modal -->
        <a-modal title="Chỉnh Sửa Vé" v-model:open="isEditModalVisible" @cancel="handleEditCancel" @ok="editVe">
            <a-form ref="editFormRef" :model="currentVe" layout="vertical" name="edit_form">
                <a-form-item name="customer_id" label="ID Khách Hàng"
                    :rules="[{ required: true, message: 'Vui lòng nhập ID khách hàng!' }]">
                    <a-select v-model:value="currentVe.customer_id" placeholder="Chọn ID Khách Hàng">
                        <a-select-option v-for="khachHang in khachHangs" :key="khachHang._id" :value="khachHang._id">
                            {{ khachHang.name }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item name="trip_id" label="ID Chuyến Xe"
                    :rules="[{ required: true, message: 'Vui lòng nhập ID chuyến xe!' }]">
                    <a-select v-model:value="currentVe.trip_id" placeholder="Chọn ID Chuyến Xe">
                        <a-select-option v-for="chuyenXe in chuyenXes" :key="chuyenXe._id" :value="chuyenXe._id">
                            {{ chuyenXe.name }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item name="seat_number" label="Số Ghế"
                    :rules="[{ required: true, message: 'Vui lòng nhập số ghế!' }]">
                    <a-input v-model:value="currentVe.seat_number" placeholder="Số Ghế" />
                </a-form-item>
                <a-form-item name="purchase_date" label="Ngày Mua"
                    :rules="[{ required: true, message: 'Vui lòng nhập ngày mua!' }]">
                    <a-date-picker v-model="currentVe.purchase_date" show-time placeholder="Chọn ngày giờ" />
                </a-form-item>
                <a-form-item name="price" label="Giá" :rules="[{ required: true, message: 'Vui lòng nhập giá!' }]">
                    <a-input v-model:value="currentVe.price" placeholder="Giá" />
                </a-form-item>
                <a-form-item name="payment_id" label="ID Thanh Toán"
                    :rules="[{ required: true, message: 'Vui lòng nhập ID thanh toán!' }]">
                    <a-input v-model:value="currentVe.payment_id" placeholder="ID Thanh Toán" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script>
import ChuyenXeService from "@/services/ChuyenXeService";
import KhachHangService from "@/services/KhachHangService";
import VeService from "@/services/VeService";
import { notification } from 'ant-design-vue';
import { format, parseISO } from 'date-fns';

export default {
    data() {
        return {
            columns: [
                { title: 'ID Khách Hàng', dataIndex: 'customer_id', key: 'customer_id' },
                { title: 'ID Chuyến Xe', dataIndex: 'trip_id', key: 'trip_id' },
                { title: 'Số Ghế', dataIndex: 'seat_number', key: 'seat_number' },
                { title: 'Ngày Mua', dataIndex: 'purchase_date', key: 'purchase_date' },
                { title: 'Giá', dataIndex: 'price', key: 'price' },
                { title: 'ID Thanh Toán', dataIndex: 'payment_id', key: 'payment_id' },
                { title: 'Hành Động', key: 'action' },
            ],
            ves: [],
            khachHangs: [],
            chuyenXes: [],
            isAddModalVisible: false,
            isEditModalVisible: false,
            newVe: { customer_id: '', trip_id: '', seat_number: '', purchase_date: null, price: '', payment_id: '' },
            currentVe: { customer_id: '', trip_id: '', seat_number: '', purchase_date: null, price: '', payment_id: '' },
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
        async fetchKhachHangs() {
            try {
                this.khachHangs = await KhachHangService.getAllKhachHangs();
            } catch (error) {
                console.error('Error fetching customers:', error);
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
                await this.$refs.addFormRef.validate();
                await VeService.createVe(this.newVe);
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
            this.newVe = { customer_id: '', trip_id: '', seat_number: '', purchase_date: null, price: '', payment_id: '' };
        },
        showEditModal(ve) {
            this.currentVe = { ...ve, purchase_date: parseISO(ve.purchase_date) };
            this.isEditModalVisible = true;
        },
        async editVe() {
            try {
                await this.$refs.editFormRef.validate();
                this.currentVe.purchase_date = format(this.currentVe.purchase_date, "yyyy-MM-dd'T'HH:mm:ssxxx");
                await VeService.updateVe(this.currentVe._id, this.currentVe);
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
                    await VeService.deleteVe(veId);
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
        await this.fetchKhachHangs();
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
