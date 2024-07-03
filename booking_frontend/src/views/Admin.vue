<template>
    <div class="container">
        <h2>Chào Mừng Quản Trị Viên</h2>
        <hr>
        <div class="row">
            <div class="col-4">
                <a-card>
                    <template #title>
                        <span class="text-title">{{ totalKhachHangs.toLocaleString() }}</span>
                        <p class="text-body">Số lượng khách hàng</p>
                    </template>
                </a-card>
            </div>
            <div class="col-4">
                <a-card>
                    <template #title>
                        <span class="text-title">{{ totalChuyenXe.toLocaleString() }}</span>
                        <p class="text-body">Số chuyến xe</p>
                    </template>
                </a-card>
            </div>
            <div class="col-4">
                <a-card>
                    <template #title>
                        <span class="text-title">{{ totalDoanhThu.toLocaleString() }} VND</span>
                        <p class="text-body">Tổng doanh thu hàng tháng</p>
                    </template>
                </a-card>
            </div>
        </div>
    </div>
</template>

<script>
import ChuyenXeService from "@/services/ChuyenXeService";
import KhachHangService from "@/services/KhachHangService";
import ThanhToanService from "@/services/ThanhToanService";
import { Card as ACard } from 'ant-design-vue';

export default {
    components: {
        ACard
    },
    data() {
        return {
            totalKhachHangs: 0,
            totalChuyenXe: 0,
            totalDoanhThu: 0
        };
    },
    async mounted() {
        try {
            const token = localStorage.getItem('accessToken');
            if (token) {
                // Fetch total number of customers
                const khachHangs = await KhachHangService.getAllKhachHangs(token);
                this.totalKhachHangs = khachHangs.length;

                // Fetch total number of bus trips (replace with appropriate service and method)
                const chuyenXes = await ChuyenXeService.getAllChuyenXes(token);
                this.totalChuyenXe = chuyenXes.length;

                // Fetch total monthly revenue (replace with appropriate service and method)
                const doanhThu = await ThanhToanService.getAllThanhToans(token);
                this.totalDoanhThu = doanhThu.reduce((total, thanhToan) => total + thanhToan.amount, 0);
            } else {
                console.error("No access token found");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
};
</script>

<style scoped>
h2 {
    text-align: center;
}

.text-body {
    color: rgb(134, 134, 134);
}

.text-title {
    font-size: 1.5em;
    font-weight: bold;
}

.p-card:hover {
    border-color: #008bf8;
    box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
}
</style>
