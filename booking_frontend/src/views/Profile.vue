<template>
    <div class="container">
        <a-row :gutter="16">
            <a-col :span="18">
                <div style="padding: 10px">
                    <a-card title="Thông tin thanh toán" :bordered="false">
                        <a-table :columns="columns" :dataSource="paymentData" rowKey="_id" />
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
                    </a-card>
                </div>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import KhachHangService from '@/services/KhachHangService';
import ThanhToanService from '@/services/ThanhToanService';
import { notification } from 'ant-design-vue';
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            selectedKhachHang: null,
            paymentData: [],
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