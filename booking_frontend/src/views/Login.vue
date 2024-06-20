<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <form class="form" @submit.prevent="submitForm">
                    <p class="form-title">Đăng nhập tài khoản</p>
                    <div class="input-container form-group">
                        <input v-model="loginData.email" type="email" placeholder="Enter email" class="form-control"
                            required>
                    </div>
                    <div class="input-container form-group">
                        <input v-model="loginData.password" type="password" placeholder="Enter password"
                            class="form-control" required>
                    </div>
                    <button type="submit" class="submit">Đăng nhập</button>
                    <p class="signup-link">
                        Bạn chưa có tài khoản? <router-link :to="{ name: 'Register' }">Đăng ký</router-link>
                    </p>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import KhachHangService from "@/services/KhachHangService";
import { notification } from 'ant-design-vue';

export default {
    data() {
        return {
            loginData: {
                email: '',
                password: ''
            }
        };
    },
    methods: {
        async submitForm() {
            try {
                const khachHang = await KhachHangService.loginKhachHang(this.loginData);
                localStorage.setItem('accessToken', khachHang.accessToken);
                localStorage.setItem('isAdmin', khachHang.admin);
                this.showNotification('success', 'Đăng nhập thành công!');

                if (khachHang.admin === true) {
                    setTimeout(() => {
                        this.$router.push({ name: 'admin' });
                        // window.location.reload();
                    }, 2000);

                } else {
                    setTimeout(() => {
                        this.$router.push({ name: 'TrangChu' });
                        // window.location.reload();
                    }, 2000);
                }
            } catch (error) {
                this.showNotification('error', error.message || 'Đăng nhập thất bại!');
            }
        },
        showNotification(type, message) {
            notification[type]({
                message: 'Thông báo',
                description: message,
            });
        }
    }
}
</script>

<style scoped>
.form {
    background-color: #fff;
    display: block;
    padding: 1rem;
    max-width: 350px;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    margin: auto;
    /* Center the form horizontally */
}

.form-title {
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 600;
    text-align: center;
    color: #000;
}

.input-container {
    position: relative;
}

.input-container input,
.form button {
    outline: none;
    border: 1px solid #e5e7eb;
    margin: 8px 0;
}

.input-container input {
    background-color: #fff;
    padding: 1rem;
    padding-right: 3rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    width: 100%;
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.submit {
    display: block;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    background-color: #4F46E5;
    color: #ffffff;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    width: 100%;
    border-radius: 0.5rem;
    text-transform: uppercase;
}

.signup-link {
    color: #6B7280;
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-align: center;
}

.signup-link a {
    text-decoration: underline;
}
</style>
