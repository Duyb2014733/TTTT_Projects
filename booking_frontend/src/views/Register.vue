<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <form class="form" @submit.prevent="register">
                    <p class="form-title">Create your account</p>
                    <div class="input-container form-group">
                        <input v-model="name" type="text" placeholder="Enter name" class="form-control" required
                            minlength="6" maxlength="20">
                    </div>
                    <div class="input-container form-group">
                        <input v-model="email" type="email" placeholder="Enter email" class="form-control" required
                            minlength="10" maxlength="50">
                    </div>
                    <div class="input-container form-group">
                        <input v-model="phone" type="text" placeholder="Enter phone" class="form-control" required>
                    </div>
                    <div class="input-container form-group">
                        <input v-model="address" type="text" placeholder="Enter address" class="form-control" required>
                    </div>
                    <div class="input-container form-group">
                        <input v-model="password" type="password" placeholder="Enter password" class="form-control"
                            required minlength="6">
                    </div>
                    <button type="submit" class="submit">
                        Sign up
                    </button>

                    <p class="signin-link">
                        Already have an account?
                        <router-link :to="{ name: 'Login' }">Sign in</router-link>
                    </p>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';

export default {
    name: 'Register',
    setup() {
        const name = ref('');
        const email = ref('');
        const phone = ref('');
        const address = ref('');
        const password = ref('');

        const register = () => {
            // Registration logic here
            console.log({
                name: name.value,
                email: email.value,
                phone: phone.value,
                address: address.value,
                password: password.value
            });
        };

        return {
            name,
            email,
            phone,
            address,
            password,
            register
        };
    }
};
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
