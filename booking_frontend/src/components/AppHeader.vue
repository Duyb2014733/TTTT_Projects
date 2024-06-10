<template>
    <div class="layout-wrapper">
        <div class="layout-sidebar">
            <div class="logo" style="color: #fff; text-align: center; font-size: large;">ADMIN PANEL</div>
            <ul class="layout-menu">
                <li v-for="item in menuItems" :key="item.key" :class="{ active: isActive(item.to) }">
                    <router-link :to="item.to" class="layout-menu-link">
                        <i :class="item.icon"></i>
                        <span class="ms-2"> {{ item.label }}</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="layout-main">
            <div class="layout-content">
                <router-view />
            </div>
            <div class="layout-footer" style="text-align: center">
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
                    label: 'Quản lý Xe',
                    icon: 'fa-solid fa-car',
                    to: '/vehicle',
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
                    label: 'Đăng nhập',
                    icon: 'fa-solid fa-right-to-bracket',
                    to: '/login',
                    key: '5'
                },
                {
                    label: 'Đăng ký',
                    icon: 'fa-solid fa-user-plus',
                    to: '/register',
                    key: '6'
                }
            ]
        };
    },
    methods: {
        isActive(path) {
            return this.$route.path === path;
        }
    }
};
</script>

<style scoped>
.layout-wrapper {
    display: flex;
    height: 100vh;
}

.layout-sidebar {
    flex: 0 0 250px;
    background-color: #333;
    color: #fff;
    padding: 20px;
}

.layout-main {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.layout-content {
    flex: 1;
    padding: 20px;
    background-color: #f5f5f5;
}

.layout-footer {
    padding: 10px;
    background-color: #fff;
    text-align: center;
}

.layout-menu {
    list-style: none;
    padding: 0;
    margin-top: 20px;
}

.layout-menu li {
    margin-bottom: 10px;
}

.layout-menu .layout-menu-link {
    display: flex;
    align-items: center;
    color: #fff;
    text-decoration: none;
    padding: 10px;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

.layout-menu .layout-menu-link:hover {
    background-color: #444;
}

.layout-menu .layout-menu-link .pi {
    margin-right: 10px;
}

.layout-menu .active .layout-menu-link {
    background-color: #555;
}

.ms-2 {
    margin-left: 0.5rem;
}
</style>
