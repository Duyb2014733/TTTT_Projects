<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <form class="form" @submit.prevent="register">
                    <p class="form-title">Create your account</p>
                    <div class="input-container form-group">
                        <input v-model="registerData.name" type="text" placeholder="Enter name" class="form-control"
                            required minlength="6" maxlength="20">
                    </div>
                    <div class="input-container form-group">
                        <input v-model="registerData.email" type="email" placeholder="Enter email" class="form-control"
                            required minlength="10" maxlength="50">
                    </div>
                    <div class="input-container form-group">
                        <input v-model="registerData.phone" type="text" placeholder="Enter phone" class="form-control"
                            required>
                    </div>
                    <div class="input-container form-group">
                        <input v-model="registerData.address" type="text" placeholder="Enter address"
                            class="form-control" required>
                    </div>
                    <div class="input-container form-group">
                        <input v-model="registerData.password" type="password" placeholder="Enter password"
                            class="form-control" required minlength="6">
                    </div>
                    <button type="submit" class="submit">
                        Sign up
                    </button>

                    <p class="signin-link">
                        Already have an account?
                        <router-link :to="{ name: 'Login' }">Sign in</router-link>
                    </p>
                </form>
                <Notification v-if="errorMessage" :message="errorMessage" />
                <Notification v-if="successMessage" :message="successMessage" />
            </div>
        </div>
    </div>
</template>

<script>
import Notification from "@/components/Notification.vue";
import UserService from "@/services/UserService";

export default {
    components: {
        Notification
    },
    data() {
        return {
            registerData: {
                name: '',
                email: '',
                phone: '',
                address: '',
                password: ''
            },
            errorMessage: '',
            successMessage: ''
        };
    },
    methods: {
        async register() {
            try {
                await UserService.registerUser(this.registerData);
                this.successMessage = 'Account created successfully!';
                setTimeout(() => {
                    this.successMessage = '';
                }, 2000);
            } catch (error) {
                this.errorMessage = error.message;
                setTimeout(() => {
                    this.errorMessage = '';
                }, 2000);
            }
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
    width: 300px;
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
</style>
