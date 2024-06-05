<template>
    <div class="container">
        <h2>Chào Mừng Quản Trị Viên</h2>
        <hr>
        <div class="row">
            <div class="col-4">
                <Card>
                    <template #content>
                        <div class="card-details">
                            <p class="text-title">{{ totalUsers }}</p>
                            <p class="text-body">Số lượng khách hàng</p>
                        </div>
                    </template>
                </Card>
            </div>
            <div class="col-4">
                <Card>
                    <template #content>
                        <div class="card-details">
                            <p class="text-title">Card title</p>
                            <p class="text-body">Số chuyến xe</p>
                        </div>
                    </template>
                </Card>
            </div>
            <div class="col-4">
                <Card>
                    <template #content>
                        <div class="card-details">
                            <p class="text-title">Card title</p>
                            <p class="text-body">Tổng doanh thu hàng tháng</p>
                        </div>
                    </template>
                </Card>
            </div>
        </div>
    </div>
</template>

<script>
import UserService from "@/services/UserService";
import Card from 'primevue/card';

export default {
    components: {
        Card
    },
    data() {
        return {
            totalUsers: 0
        };
    },
    async mounted() {
        try {
            const users = await UserService.getAllUsers();
            this.totalUsers = users.length;
        } catch (error) {
            console.error("Error fetching total users:", error);
        }
    }
}
</script>

<style scoped>
h2 {
    text-align: center;
}

.card-details {
    color: black;
    height: 100%;
    gap: .5em;
    display: grid;
    place-content: center;
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