<template>
    <div class="layout-wrapper">
        <div class="layout-sidebar">
            <div class="logo ms-2">ADMIN PANEL</div>
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
                    <li :class="{ active: isActive('/profile') }">
                        <router-link to="/profile" class="layout-menu-link">
                            <i class="fa-solid fa-user"></i>
                            <span class="ms-2">Profile</span>
                        </router-link>
                    </li>
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
                    label: 'Quản lý Khách Hàng',
                    icon: 'fa-regular fa-user',
                    to: '/khachhang',
                    key: '1'
                },
                {
                    label: 'Quản lý tuyến đường',
                    icon: 'fa-solid fa-route',
                    to: '/tuyenduong',
                    key: '2'
                },
                {
                    label: 'Quản lý Nhà Xe',
                    icon: 'fa-solid fa-bus',
                    to: '/nhaxe',
                    key: '3'
                },
                {
                    label: 'Quản lý Vé',
                    icon: 'fa-solid fa-ticket',
                    to: '/ve',
                    key: '4'
                },
                {
                    label: 'Quản lý chuyến xe',
                    icon: 'fa-solid fa-van-shuttle',
                    to: '/chuyenxe',
                    key: '5'
                },
                {
                    label: 'Quản lý thanh toán',
                    icon: 'fa-solid fa-credit-card',
                    to: '/thanhtoan',
                    key: '6'
                }
            ],
            loggedInMenuItems: [
                {
                    label: 'Đăng nhập',
                    icon: 'fa-solid fa-right-to-bracket',
                    to: '/login',
                    key: '7'
                },
                {
                    label: 'Đăng ký',
                    icon: 'fa-solid fa-user-plus',
                    to: '/register',
                    key: '8'
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
    flex-direction: row;
    /* Keep this to align sidebar and main content horizontally */
    height: 100vh;
    background-color: #f0f2f5;
}

.layout-sidebar {
    width: 250px;
    /* Fixed width for the sidebar */
    background-color: #001529;
    color: #fff;
    padding: 20px 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
}

.layout-main {
    flex: 1;
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
    font-size: 1.5rem;
    font-weight: 500;
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
</style>
