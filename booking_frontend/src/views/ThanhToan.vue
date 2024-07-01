<template>
    <div class="container-fluid">
        <div class="header">
            <h1>Quản lý Thanh Toán</h1>
            <a-button type="primary" @click="showAddModal">
                <i class="fa-solid fa-plus"></i>
                <span class="ms-2">Thêm thanh toán</span>
            </a-button>
        </div>

        <a-table :columns="columns" :data-source="ThanhToans" rowKey="_id">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                    <a-button danger @click="showEditModal(record)">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </a-button>
                    <a-button type="primary" danger @click="deleteRecord(record._id)" style="margin-left: 10px;">
                        <i class="fa-solid fa-trash"></i>
                    </a-button>
                </template>
                <template v-else-if="column.key === 'customer_id'">
                    {{ record.customer_id.name }}
                </template>
                <template v-else>
                    {{ record[column.dataIndex] }}
                </template>
            </template>
        </a-table>

        <!-- Add chuyến xe Modal -->
        <a-modal title="Thêm chuyến xe" v-model:open="isAddModalVisible" @cancel="handleAddCancel" @ok="addThanhToan">
            <a-form ref="addFormRef" :model="newThanhToan" layout="vertical" name="add_form">
                <a-form-item name="customer_id" label="Id khách hàng"
                    :rules="[{ required: true, message: 'Vui lòng chọn Id khách hàng!' }]">
                    <a-select v-model:value="newThanhToan.customer_id" placeholder="Id khách hàng">
                        <a-select-option v-for="KhachHang in KhachHangs" :key="KhachHang._id" :value="KhachHang._id">
                            {{ KhachHang.name }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item name="amount" label="Amount"
                    :rules="[{ required: true, message: 'Vui lòng nhập số lượng!' }]">
                    <a-input v-model:value="newThanhToan.amount" placeholder="Amount" />
                </a-form-item>
                <a-form-item name="payment_date" label="Ngày thanh toán"
                    :rules="[{ required: true, message: 'Vui lòng nhập ngày thanh toán!' }]">
                    <a-date-picker v-model:value="newThanhToan.payment_date" show-time placeholder="Ngày thanh toán" />
                </a-form-item>
                <a-form-item name="payment_method" label="Phương thức thanh toán"
                    :rules="[{ required: true, message: 'Vui lòng nhập số lượng!' }]">
                    <a-input v-model:value="newThanhToan.payment_method" placeholder="Phương thức thanh toán" />
                </a-form-item>
            </a-form>
        </a-modal>

        <!-- Edit chuyến xe Modal -->
        <a-modal title="Chỉnh Sửa Trạm" v-model:open="isEditModalVisible" @cancel="handleEditCancel"
            @ok="editThanhToan">
            <a-form ref="editFormRef" :model="currentThanhToan" layout="vertical" name="edit_form">
                <a-form-item name="customer_id" label="Id khách hàng"
                    :rules="[{ required: true, message: 'Vui lòng chọn Id khách hàng!' }]">
                    <a-select v-model="currentThanhToan.customer_id" placeholder="Id khách hàng">
                        <a-select-option v-for="KhachHang in KhachHangs" :key="KhachHang._id" :value="KhachHang._id">
                            {{ KhachHang.name }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item name="amount" label="Amount"
                    :rules="[{ required: true, message: 'Vui lòng nhập số lượng!' }]">
                    <a-input v-model:value="currentThanhToan.amount" placeholder="Amount" />
                </a-form-item>
                <a-form-item name="payment_date" label="Ngày thanh toán"
                    :rules="[{ required: true, message: 'Vui lòng nhập ngày thanh toán!' }]">
                    <a-date-picker v-model="currentThanhToan.payment_date" show-time placeholder="Ngày thanh toán" />
                </a-form-item>
                <a-form-item name="payment_method" label="Phương thức thanh toán"
                    :rules="[{ required: true, message: 'Vui lòng nhập số lượng!' }]">
                    <a-input v-model:value="currentThanhToan.payment_method" placeholder="Phương thức thanh toán" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script>
import KhachHangService from '@/services/KhachHangService';
import ThanhToanService from '@/services/ThanhToanService';
import { notification } from 'ant-design-vue';

export default {
    data() {
        return {
            columns: [
                { title: 'ID khách hàng', dataIndex: 'customer_id', key: 'customer_id' },
                { title: 'Số lượng', dataIndex: 'amount', key: 'amount' },
                { title: 'Ngày thanh toán', dataIndex: 'payment_date', key: 'payment_date' },
                { title: 'Phương thức thanh toán', dataIndex: 'payment_method', key: 'payment_method' },
                { title: 'Hành Động', key: 'action' },
            ],
            ThanhToans: [],
            KhachHangs: [],
            isAddModalVisible: false,
            isEditModalVisible: false,
            newThanhToan: { customer_id: '', amount: '', payment_date: '', payment_method: '', },
            currentThanhToan: null,
        };
    },
    methods: {
        async fetchThanhToans() {
            try {
                this.ThanhToans = await ThanhToanService.getAllThanhToans();
            } catch (error) {
                console.error('Lỗi tìm nạp chuyến xe:', error);
            }
        },
        async fetchKhachHangs() {
            try {
                this.KhachHangs = await KhachHangService.getAllKhachHangs();
            } catch (error) {
                console.error('Lỗi tìm nạp khách hàng:', error);
            }
        },
        showAddModal() {
            this.isAddModalVisible = true;
        },
        showAddModal() {
            this.isAddModalVisible = true;
        },
        async addThanhToan() {
            try {
                await this.$refs.addFormRef.validate();
                await ThanhToanService.createThanhToan(this.newThanhToan);
                await this.fetchThanhToans();
                this.isAddModalVisible = false;
                this.resetNewThanhToan();
                this.showNotification('success', 'Thêm thông tin thanh toán thành công!');
            } catch (error) {
                console.error('Lỗi khi thêm thanh toán:', error);
            }
        },
        handleAddCancel() {
            this.isAddModalVisible = false;
            this.resetNewThanhToan();
        },
        resetNewThanhToan() {
            this.newThanhToan = { customer_id: '', amount: '', payment_date: '', payment_method: '', };
        },
        showEditModal(ThanhToan) {
            this.currentThanhToan = { ...ThanhToan };
            this.isEditModalVisible = true;
        },
        async editThanhToan() {
            try {
                await this.$refs.editFormRef.validate();
                await ThanhToanService.updateThanhToan(this.currentThanhToan._id, this.currentThanhToan);
                await this.fetchThanhToans();
                this.isEditModalVisible = false;
                this.showNotification('success', 'Cập nhật thông tin thanh toán thành công!');
            } catch (error) {
                console.error('Lỗi khi cập nhật thanh toán:', error);
            }
        },
        handleEditCancel() {
            this.isEditModalVisible = false;
        },
        async deleteRecord(ThanhToanId) {
            if (confirm('Bạn có chắc muốn xóa thanh toán này không?')) {
                try {
                    await ThanhToanService.deleteThanhToan(ThanhToanId);
                    await this.fetchThanhToans();
                    this.showNotification('success', 'Xóa thông tin thanh toán thành công!');
                } catch (error) {
                    console.error('Lỗi khi xóa thanh toán:', error);
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
        this.fetchThanhToans();
        this.fetchKhachHangs();
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