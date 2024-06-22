<template>
    <div class="layout-wrapper">
        <div class="layout-header">
            <div class="logo ms-2">
                <i class="fa-solid fa-book"></i>
                BOOKINGS
            </div>
            <ul class="layout-menu left-menu">
                <li v-for="item in leftMenuItems" :key="item.key" :class="{ active: isActive(item.to) }">
                    <router-link :to="item.to" class="layout-menu-link">
                        <i :class="item.icon"></i>
                        <span class="ms-2">{{ item.label }}</span>
                    </router-link>
                </li>
            </ul>
            <ul class="layout-menu right-menu">
                <template v-if="isLoggedIn">
                    <li :class="{ active: isActive('/profile') }">
                        <router-link to="/profile" class="layout-menu-link">
                            <i class="fa-solid fa-user"></i>
                            <span class="ms-2">Profile</span>
                        </router-link>
                    </li>
                    <li>
                        <a @click="logout" class="layout-menu-link" href="#">
                            <i class="fa-solid fa-sign-out-alt"></i>
                            <span class="ms-2">Đăng xuất</span>
                        </a>
                    </li>
                </template>
                <template v-else>
                    <li v-for="item in rightMenuItems" :key="item.key" :class="{ active: isActive(item.to) }">
                        <router-link :to="item.to" class="layout-menu-link">
                            <i :class="item.icon"></i>
                            <span class="ms-2">{{ item.label }}</span>
                        </router-link>
                    </li>
                </template>
            </ul>
        </div>
        <div class="layout-main">
            <div class="layout-content">
                <router-view />
            </div>
            <div class="layout-footer">
                Lê Đức Duy
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            leftMenuItems: [
                {
                    label: 'Trang chủ',
                    icon: 'fa-solid fa-house',
                    to: '/',
                    key: '1'
                },
                {
                    label: 'Hóa đơn',
                    icon: 'fa-solid fa-file-invoice',
                    to: '/tuyenduong',
                    key: '2'
                },
                {
                    label: 'Liên hệ',
                    icon: '',
                    to: '/nhaxe',
                    key: '3'
                }
            ],
            rightMenuItems: [
                {
                    label: 'Đăng nhập',
                    icon: 'fa-solid fa-right-to-bracket',
                    to: '/login',
                    key: '4'
                },
                {
                    label: 'Đăng ký',
                    icon: 'fa-solid fa-user-plus',
                    to: '/register',
                    key: '5'
                }
            ],
            isLoggedIn: false
        };
    },
    methods: {
        isActive(path) {
            return this.$route.path === path;
        },
        checkLoginStatus() {
            this.isLoggedIn = !!localStorage.getItem('accessToken');
        },
        logout() {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('idKhachHang');
            this.isLoggedIn = false;
            this.$router.push({ name: 'Login' });
        }
    },
    created() {
        this.checkLoginStatus();
    },
    watch: {
        $route(to, from) {
            this.checkLoginStatus();
        }
    }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.layout-wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #f0f2f5;
}

.layout-header {
    display: flex;
    align-items: center;
    background-color: #001529;
    color: #fff;
    padding: 0 20px;
    justify-content: space-between;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.logo {
    font-size: 1.5rem;
    font-weight: 500;
    padding: 20px 0;
    margin: 5px;
}

.layout-menu {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
}

.left-menu {
    margin-right: auto;
}

.right-menu {
    margin-left: auto;
}

.layout-menu li {
    margin: 0;
}

.layout-menu .layout-menu-link {
    display: flex;
    align-items: center;
    color: #fff;
    text-decoration: none;
    padding: 15px 20px;
    transition: background-color 0.3s ease, color 0.3s ease;
    border-radius: 4px;
}

.layout-menu .layout-menu-link:hover {
    background-color: #1890ff;
    color: #fff;
}

.layout-menu .active .layout-menu-link {
    background-color: #096dd9;
    color: #fff;
}

.layout-main {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 20px;
    background-color: #f0f2f5;
}

.layout-content {
    flex: 1;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.layout-footer {
    padding: 10px;
    background-color: #001529;
    color: #fff;
    text-align: center;
    border-top: 1px solid #f0f0f0;
}

.ms-2 {
    margin-left: 0.5rem;
}
</style>
