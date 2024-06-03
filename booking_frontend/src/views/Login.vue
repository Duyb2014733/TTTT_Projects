<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <form class="form" @submit.prevent="submitForm">
                    <p class="form-title">Sign in to your account</p>
                    <div class="input-container form-group">
                        <input v-model="loginData.email" type="email" placeholder="Enter email" class="form-control"
                            required>
                    </div>
                    <div class="input-container form-group">
                        <input v-model="loginData.password" type="password" placeholder="Enter password"
                            class="form-control" required>
                    </div>
                    <button type="submit" class="submit">
                        Sign in
                    </button>

                    <p class="signup-link">
                        No account?
                        <router-link :to="{ name: 'Register' }">Sign up</router-link>
                    </p>
                </form>
                <Notification v-if="errorMessage" :message="errorMessage" type="error" />
                <Notification v-if="successMessage" :message="successMessage" type="success" />
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
            loginData: {
                email: '',
                password: ''
            },
            errorMessage: '',
            successMessage: ''
        };
    },
    methods: {
        async submitForm() {
            try {
                const user = await this.loginUser(this.loginData);
                // localStorage.setItem('role', user.vai_tro);
                this.successMessage = 'Login successful!';
                setTimeout(() => {
                    this.successMessage = '';
                    this.$router.push({ name: 'admin' });
                }, 2000);
            } catch (error) {
                this.errorMessage = error.message;
                setTimeout(() => {
                    this.errorMessage = '';
                }, 2000);
            }
        },
        async loginUser(loginData) {
            const users = await UserService.getAllUsers();
            const loggedInUser = users.find(user => user.email === loginData.email && user.password === loginData.password);
            if (!loggedInUser) {
                throw new Error("Email or password is incorrect.");
            }
            return loggedInUser;
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
