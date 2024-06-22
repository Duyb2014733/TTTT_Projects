<template>
    <a-row gutter={16}>
        <a-col :span="18">
            <div style="padding: 10px">
                <a-card title="Thông tin thanh toán" :bordered="false">
                    <a-table :columns="columns" :dataSource="paymentData" rowKey="id" />
                </a-card>
            </div>
        </a-col>
        <a-col :span="6">
            <div style="background: #ececec; padding: 10px">
                <a-card title="Thông tin người dùng" :bordered="false">
                    <p v-if="selectedKhachHang">Tên: {{ selectedKhachHang.name }}</p>
                    <p v-if="selectedKhachHang">Email: {{ selectedKhachHang.email }}</p>
                    <p v-if="selectedKhachHang">Số điện thoại: {{ selectedKhachHang.phone }}</p>
                    <p v-if="selectedKhachHang">Địa chỉ: {{ selectedKhachHang.address }}</p>
                </a-card>
            </div>
        </a-col>
    </a-row>
</template>

<script>
import KhachHangService from '@/services/KhachHangService';
import ThanhToanService from '@/services/ThanhToanService';
import { notification } from 'ant-design-vue';

export default {
    data() {
        return {
            selectedKhachHang: null,
            paymentData: [],
            columns: [
                {
                    title: 'Mã thanh toán',
                    dataIndex: 'maThanhToan',
                    key: 'maThanhToan',
                },
                {
                    title: 'Ngày thanh toán',
                    dataIndex: 'ngayThanhToan',
                    key: 'ngayThanhToan',
                },
                {
                    title: 'Số tiền',
                    dataIndex: 'soTien',
                    key: 'soTien',
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
                }
            } catch (error) {
                console.error("Error fetching customer data:", error);
            }
        },
        async fetchPaymentData() {
            try {
                const token = localStorage.getItem('accessToken');
                if (token) {
                    this.paymentData = await ThanhToanService.getAllThanhToans(token);
                } else {
                    console.error("No access token found");
                }
            } catch (error) {
                console.error("Error fetching payment data:", error);
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
        this.fetchKhachHang();
        this.fetchPaymentData();
    },
};
</script>

<style scoped>
/* General styles */
body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #fff;
}

/* Card and table styles */
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

/* Miscellaneous */
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
