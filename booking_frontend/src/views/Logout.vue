<template>
    <div class="logout-page">
        <div class="logout-message">
            <h1>Đang đăng xuất...</h1>
        </div>
    </div>
</template>

<script>
export default {
    created() {
        this.logout();
    },
    methods: {
        logout() {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('idKhachHang');

            this.$router.push('/login');
        }
    }
};
</script>

<style scoped>
.logout-page {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f0f2f5;
}

.logout-message {
    text-align: center;
}
</style>
