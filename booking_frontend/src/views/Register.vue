<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <Form @submit="register" :validation-schema="schema" v-slot="{ errors }">
                    <p class="form-title">Tạo tài khoản của bạn</p>
                    <div class="input-container form-group">
                        <Field name="name" type="text" v-model="registerData.name" placeholder="Enter name"
                            class="form-control" :class="{ 'is-invalid': errors.name }" />
                        <ErrorMessage name="name" class="invalid-feedback" />
                    </div>
                    <div class="input-container form-group">
                        <Field name="email" type="email" v-model="registerData.email" placeholder="Enter email"
                            class="form-control" :class="{ 'is-invalid': errors.email }" />
                        <ErrorMessage name="email" class="invalid-feedback" />
                    </div>
                    <div class="input-container form-group">
                        <Field name="phone" type="text" v-model="registerData.phone" placeholder="Enter phone"
                            class="form-control" :class="{ 'is-invalid': errors.phone }" />
                        <ErrorMessage name="phone" class="invalid-feedback" />
                    </div>
                    <div class="input-container form-group">
                        <Field name="address" type="text" v-model="registerData.address" placeholder="Enter address"
                            class="form-control" :class="{ 'is-invalid': errors.address }" />
                        <ErrorMessage name="address" class="invalid-feedback" />
                    </div>
                    <div class="input-container form-group">
                        <Field name="password" type="password" v-model="registerData.password"
                            placeholder="Enter password" class="form-control"
                            :class="{ 'is-invalid': errors.password }" />
                        <ErrorMessage name="password" class="invalid-feedback" />
                    </div>
                    <button type="submit" class="submit" :disabled="isLoading">
                        <span v-if="isLoading" class="loading-spinner"></span>
                        <span v-if="isLoading">Đang xử lý...</span>
                        <span v-else>Đăng ký</span>
                    </button>
                    <p class="signin-link">
                        Bạn đã có tài khoản?
                        <router-link :to="{ name: 'Login' }">Đăng nhập</router-link>
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
            name: yup.string().required('Tên là bắt buộc').min(6, 'Tên phải có ít nhất 6 ký tự').max(20, 'Tên không được vượt quá 20 ký tự'),
            email: yup.string().required('Email là bắt buộc').email('Email không hợp lệ').min(10, 'Email phải có ít nhất 10 ký tự').max(50, 'Email không được vượt quá 50 ký tự'),
            phone: yup.string().required('Số điện thoại là bắt buộc').matches(/^[0-9]+$/, 'Số điện thoại chỉ được chứa số'),
            address: yup.string().required('Địa chỉ là bắt buộc'),
            password: yup.string().required('Mật khẩu là bắt buộc').min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
        });
        return {
            registerData: {
                name: '',
                email: '',
                phone: '',
                address: '',
                password: ''
            },
            isLoading: false,
            schema,
        };
    },
    methods: {
        async register() {
            this.isLoading = true;
            try {
                await KhachHangService.registerKhachHang(this.registerData);
                this.showNotification('success', 'Đăng ký thông tin khách hàng thành công!');
                setTimeout(() => {
                    this.$router.push({ name: 'Login' });
                }, 2000);
            } catch (error) {
                this.showNotification('error', 'Lỗi khi đăng ký thông tin khách hàng!');
            } finally {
                this.isLoading = false;
            }
        },
        showNotification(type, message) {
            notification[type]({
                message: 'Thông báo',
                description: message,
            });
        },
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
    /* Adjusted to full width */
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

.signin-link {
    color: #6B7280;
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-align: center;
}

.signin-link a {
    text-decoration: underline;
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
</style>
