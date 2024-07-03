<template>
    <div class="layout-wrapper">
        <div class="layout-sidebar">
            <div class="logo-container">
                <router-link to="/admin" class="logo-link">
                    <span class="logo-text">ADMIN</span>
                </router-link>
            </div>
            <ul class="layout-menu">
                <li v-for="item in menuItems" :key="item.key" :class="{ active: isActive(item.to) }">
                    <router-link :to="item.to" class="layout-menu-link">
                        <i :class="item.icon"></i>
                        <span class="ms-2">{{ item.label }}</span>
                    </router-link>
                </li>
            </ul>
            <ul class="layout-menu menu-footer">
                <template v-if="isLoggedIn">
                    <!-- <li :class="{ active: isActive('/profile') }">
                        <router-link to="/profile" class="layout-menu-link">
                            <i class="fa-solid fa-user"></i>
                            <span class="ms-2">Profile</span>
                        </router-link>
                    </li> -->
                    <li>
                        <router-link to="/logout" class="layout-menu-link">
                            <i class="fa-solid fa-sign-out-alt"></i>
                            <span class="ms-2">Đăng xuất</span>
                        </router-link>
                    </li>
                </template>
                <template v-else>
                    <li v-for="item in loggedInMenuItems" :key="item.key" :class="{ active: isActive(item.to) }">
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
            menuItems: [
                {
                    label: 'Trang chủ',
                    icon: 'fa-solid fa-house',
                    to: '/admin',
                    key: '1'
                },
                {
                    label: 'Quản lý Khách Hàng',
                    icon: 'fa-regular fa-user',
                    to: '/khachhang',
                    key: '2'
                },
                {
                    label: 'Quản lý tuyến đường',
                    icon: 'fa-solid fa-route',
                    to: '/tuyenduong',
                    key: '3'
                },
                {
                    label: 'Quản lý Nhà Xe',
                    icon: 'fa-solid fa-bus',
                    to: '/nhaxe',
                    key: '4'
                },
                {
                    label: 'Quản lý Vé',
                    icon: 'fa-solid fa-ticket',
                    to: '/ve',
                    key: '5'
                },
                {
                    label: 'Quản lý chuyến xe',
                    icon: 'fa-solid fa-van-shuttle',
                    to: '/chuyenxe',
                    key: '6'
                },
                {
                    label: 'Quản lý xe',
                    icon: 'fa-solid fa-car',
                    to: '/xe',
                    key: '7'
                },
                {
                    label: 'Quản lý vị trí ghế',
                    icon: 'fa-solid fa-chair',
                    to: '/vitrighe',
                    key: '7'
                },
                {
                    label: 'Quản lý thanh toán',
                    icon: 'fa-solid fa-credit-card',
                    to: '/thanhtoan',
                    key: '9'
                }
            ],
            loggedInMenuItems: [
                {
                    label: 'Đăng nhập',
                    icon: 'fa-solid fa-right-to-bracket',
                    to: '/login',
                    key: '10'
                },
                {
                    label: 'Đăng ký',
                    icon: 'fa-solid fa-user-plus',
                    to: '/register',
                    key: '11'
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
/* Global styles */
body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Layout styles */
.layout-wrapper {
    display: flex;
    /* Use flex column to make sidebar fixed */
    flex-direction: column;
    height: 100vh;
    background-color: #f0f2f5;
}

.layout-sidebar {
    width: 250px;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    background-color: #001529;
    color: #fff;
    padding: 20px 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
}

.layout-main {
    flex: 1;
    margin-left: 250px;
    /* Add margin to the main content to adjust for fixed sidebar */
    display: flex;
    flex-direction: column;
    background-color: #f0f2f5;
}

.layout-content {
    flex: 1;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    /* Allow scrolling if content overflows */
}

.layout-footer {
    padding: 10px;
    background-color: #001529;
    color: #fff;
    text-align: center;
    border-top: 1px solid #f0f0f0;
}

/* Logo styles */
.logo {
    font-size: 1rem;
    font-weight: 400;
    margin: 10px 0;
}

/* Menu styles */
.layout-menu {
    list-style: none;
    padding: 0;
    margin: 0;
}

.layout-menu li {
    margin-bottom: 10px;
}

.layout-menu .layout-menu-link {
    display: flex;
    align-items: center;
    color: #fff;
    text-decoration: none;
    padding: 12px 20px;
    border-radius: 4px;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.layout-menu .layout-menu-link:hover {
    background-color: #1890ff;
}

.layout-menu .active .layout-menu-link {
    background-color: #096dd9;
}

.ms-2 {
    margin-left: 10px;
}

/* logo */

.logo-container {
    padding: 20px 0;
    text-align: center;
    background: linear-gradient(135deg);
    border-radius: 0 0 10px 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
}

.logo-link {
    text-decoration: none;
    display: inline-block;
}

.logo-text {
    font-size: 1.8rem;
    font-weight: 700;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
}

.logo-link:hover .logo-text {
    color: #ffd700;
    transform: scale(1.05);
}
</style>
