<template>
    <div class="container">
        <a-row :gutter="16">
            <a-col :span="18">
                <div style="padding: 10px">
                    <a-card title="Thông tin thanh toán" :bordered="false">
                        <a-table :columns="columns" :dataSource="paymentData" rowKey="_id">
                            <template #bodyCell="{ column, record }">
                                <template v-if="column.key === 'action'">
                                    <a-button type="primary" danger @click="handleDelete(record._id)">Xóa</a-button>
                                </template>
                            </template>
                        </a-table>
                    </a-card>
                </div>
            </a-col>
            <a-col :span="6">
                <div class="ececec-background">
                    <a-card title="Thông tin người dùng" :bordered="false">
                        <p v-if="selectedKhachHang">Tên: {{ selectedKhachHang.name }}</p>
                        <p v-if="selectedKhachHang">Email: {{ selectedKhachHang.email }}</p>
                        <p v-if="selectedKhachHang">Số điện thoại: {{ selectedKhachHang.phone }}</p>
                        <p v-if="selectedKhachHang">Địa chỉ: {{ selectedKhachHang.address }}</p>
                        <a-button type="primary" @click="showUpdateModal">Cập nhật thông tin</a-button>
                    </a-card>
                </div>
            </a-col>
        </a-row>

        <a-modal title="Cập nhật thông tin" :visible="updateModalVisible" @ok="handleUpdate"
            @cancel="updateModalVisible = false">
            <a-form :model="updateForm" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                <a-form-item label="Tên">
                    <a-input v-model:value="updateForm.name" />
                </a-form-item>
                <a-form-item label="Email">
                    <a-input v-model:value="updateForm.email" />
                </a-form-item>
                <a-form-item label="Số điện thoại">
                    <a-input v-model:value="updateForm.phone" />
                </a-form-item>
                <a-form-item label="Địa chỉ">
                    <a-input v-model:value="updateForm.address" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script>
import KhachHangService from '@/services/KhachHangService';
import ThanhToanService from '@/services/ThanhToanService';
import ViTriGheService from '@/services/ViTriGheService';
import { Modal, notification } from 'ant-design-vue';
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            selectedKhachHang: null,
            paymentData: [],
            updateModalVisible: false,
            updateForm: {
                name: '',
                email: '',
                phone: '',
                address: '',
            },
            columns: [
                {
                    title: 'Mã thanh toán',
                    dataIndex: '_id',
                    key: '_id',
                },
                {
                    title: 'Số vé',
                    dataIndex: 've_id',
                    key: 've_id',
                    customRender: ({ text }) => text.length,
                },
                {
                    title: 'Số tiền',
                    dataIndex: 'amount',
                    key: 'amount',
                    customRender: ({ text }) => `${text.toLocaleString()} đ`,
                },
                {
                    title: 'Ngày thanh toán',
                    dataIndex: 'payment_date',
                    key: 'payment_date',
                    customRender: ({ text }) => new Date(text).toLocaleDateString('vi-VN'),
                },
                {
                    title: 'Phương thức thanh toán',
                    dataIndex: 'payment_method',
                    key: 'payment_method',
                    customRender: ({ text }) => this.getPaymentMethodText(text),
                },
                {
                    title: 'Hành động',
                    key: 'action',
                },
            ],
        };
    },
    methods: {
        async fetchKhachHang() {
            try {
                const token = localStorage.getItem('accessToken');
                const idKhachHang = localStorage.getItem('idKhachHang');
                if (token && idKhachHang) {
                    this.selectedKhachHang = await KhachHangService.getKhachHangById(idKhachHang, token);
                    this.updateForm = { ...this.selectedKhachHang };
                } else {
                    console.error("No access token or customer ID found");
                    this.showNotification('error', 'Không thể lấy thông tin khách hàng. Vui lòng đăng nhập lại.');
                }
            } catch (error) {
                console.error("Error fetching customer data:", error);
                this.showNotification('error', 'Đã xảy ra lỗi khi lấy thông tin khách hàng.');
            }
        },
        async fetchPaymentData() {
            try {
                const token = localStorage.getItem('accessToken');
                const idKhachHang = localStorage.getItem('idKhachHang');
                if (token && idKhachHang) {
                    this.paymentData = await ThanhToanService.getThanhToansByCustomerId(idKhachHang, token);
                } else {
                    console.error("No access token or customer ID found");
                    this.showNotification('error', 'Không thể lấy thông tin thanh toán. Vui lòng đăng nhập lại.');
                }
            } catch (error) {
                console.error("Error fetching payment data:", error);
                this.showNotification('error', 'Đã xảy ra lỗi khi lấy thông tin thanh toán.');
            }
        },
        showNotification(type, message) {
            notification[type]({
                message: 'Thông báo',
                description: message,
            });
        },
        getPaymentMethodText(method) {
            const methods = {
                'cash': 'Tiền mặt',
                'card': 'Thẻ tín dụng',
                'transfer': 'Chuyển khoản'
            };
            return methods[method] || method;
        },
        handleDelete(id) {
            Modal.confirm({
                title: 'Xác nhận xóa',
                content: 'Bạn có chắc chắn muốn xóa thanh toán này?',
                okText: 'Xóa',
                okType: 'danger',
                cancelText: 'Hủy',
                onOk: () => this.deletePayment(id),
            });
        },
        async deletePayment(id) {
            try {
                const token = localStorage.getItem('accessToken');
                const payment = await ThanhToanService.getThanhToanById(id, token);

                // First, update seat status to 'available'
                for (const ticket of payment.ve_id) {
                    // Assuming each ticket has a 'vitrighe_id' field
                    if (ticket.seat_id) {
                        await ViTriGheService.updateSeatsStatus(ticket.seat_id, 'available', token);
                    } else {
                        console.warn(`No seat_id found for ticket: ${ticket._id}`);
                    }
                }

                // Then delete the payment
                await ThanhToanService.deleteThanhToan(id, token);

                this.showNotification('success', 'Xóa thanh toán thành công và cập nhật trạng thái ghế');
                this.fetchPaymentData();
            } catch (error) {
                console.error("Error deleting payment or updating seat status:", error);
                this.showNotification('error', 'Đã xảy ra lỗi khi xóa thanh toán hoặc cập nhật trạng thái ghế');
            }
        },
        showUpdateModal() {
            this.updateModalVisible = true;
        },
        async handleUpdate() {
            try {
                const token = localStorage.getItem('accessToken');
                const idKhachHang = localStorage.getItem('idKhachHang');
                await KhachHangService.updateKhachHang(idKhachHang, this.updateForm, token);
                this.showNotification('success', 'Cập nhật thông tin thành công');
                this.updateModalVisible = false;
                this.fetchKhachHang();
            } catch (error) {
                console.error("Error updating customer info:", error);
                this.showNotification('error', 'Đã xảy ra lỗi khi cập nhật thông tin');
            }
        },
    },
    mounted() {
        this.fetchKhachHang();
        this.fetchPaymentData();
    },
});
</script>

<style scoped>
/* Styles remain the same as in the previous version */
body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #fff;
}

.a-card {
    margin-bottom: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.a-card .ant-card-body {
    padding: 20px;
}

.a-table-thead>tr>th {
    background-color: #001529;
    color: #fff;
}

.a-table {
    margin-bottom: 16px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.ms-2 {
    margin-left: 10px;
}

.ececec-background {
    background-color: #ececec;
    padding: 10px;
}

.ant-card-head-title {
    font-size: 1.2rem;
    font-weight: 500;
}
</style>