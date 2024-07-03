<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <Form @submit="submitForm" :validation-schema="schema" v-slot="{ errors }">
                    <p class="form-title">Đăng nhập tài khoản</p>
                    <div class="input-container form-group">
                        <Field name="email" type="email" v-model="loginData.email" placeholder="Enter email"
                            class="form-control" :class="{ 'is-invalid': errors.email }" />
                        <ErrorMessage name="email" class="invalid-feedback" />
                    </div>
                    <div class="input-container form-group">
                        <Field name="password" type="password" v-model="loginData.password" placeholder="Enter password"
                            class="form-control" :class="{ 'is-invalid': errors.password }" />
                        <ErrorMessage name="password" class="invalid-feedback" />
                    </div>
                    <button type="submit" class="submit" :disabled="isLoading">
                        <span v-if="isLoading" class="loading-spinner"></span>
                        <span v-if="isLoading">Đang xử lý...</span>
                        <span v-else>Đăng nhập</span>
                    </button>
                    <p class="signup-link">
                        Bạn chưa có tài khoản? <router-link :to="{ name: 'Register' }">Đăng ký</router-link>
                    </p>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
import KhachHangService from "@/services/KhachHangService";
import { notification } from 'ant-design-vue';
import { ErrorMessage, Field, Form } from 'vee-validate';
import * as yup from 'yup';

export default {
    components: {
        Form,
        Field,
        ErrorMessage
    },
    data() {
        const schema = yup.object().shape({
            email: yup.string().required('Email là bắt buộc').email('Email không hợp lệ'),
            password: yup.string().required('Mật khẩu là bắt buộc').min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
        });
        return {
            loginData: {
                email: '',
                password: ''
            },
            isLoading: false,
            schema,
        };
    },
    methods: {
        async submitForm() {
            this.isLoading = true;
            try {
                const khachHang = await KhachHangService.loginKhachHang(this.loginData);
                localStorage.setItem('accessToken', khachHang.accessToken);
                localStorage.setItem('isAdmin', khachHang.admin);
                localStorage.setItem('idKhachHang', khachHang._id);
                this.showNotification('success', 'Đăng nhập thành công!');

                if (khachHang.admin === true) {
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                    this.$router.push({ name: 'Admin' });
                } else {
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                    this.$router.push({ name: 'TrangChu' });
                }

            } catch (error) {
                this.showNotification('error', 'Đăng nhập thất bại!');
            } finally {
                this.isLoading = false;
            }
        },
        showNotification(type, message) {
            notification[type]({
                message: 'Thông báo',
                description: message,
            });
        }
    },
}
</script>

<style scoped>
/* Hiệu ứng fade-in khi component được mount */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.form {
    background-color: #fff;
    display: block;
    padding: 1rem;
    max-width: 350px;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    margin: auto;
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
    cursor: pointer;
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}


.submit:disabled {
    background-color: #9CA3AF;
    cursor: not-allowed;
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

.loading-spinner {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 3px solid rgba(255, 255, 255, .3);
    border-radius: 50%;
    border-top-color: #fff;
    animation: spin 1s ease-in-out infinite;
    -webkit-animation: spin 1s ease-in-out infinite;
    margin-right: 10px;
    vertical-align: middle;
}

@keyframes spin {
    to {
        -webkit-transform: rotate(360deg);
    }
}

@-webkit-keyframes spin {
    to {
        -webkit-transform: rotate(360deg);
    }
}

.invalid-feedback {
    color: #dc3545;
    font-size: 0.875em;
    margin-top: 0.25rem;
}

.is-invalid {
    border-color: #dc3545;
}

.is-invalid:focus {
    border-color: #dc3545;
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}
</style>
