<template>
    <a-layout style="min-height: 100vh">
        <a-layout-sider :collapsed-width="0">
            <div class="logo" style="color: #fff; text-align: center; font-size: large;">ADMIN PANEL</div>
            <a-menu v-model="selectedKeys" theme="dark" mode="inline">
                <a-menu-item key="1">
                    <router-link to="/nhaxes/list" class="nav-link">
                        <DesktopOutlined />
                        <span class="menu-text">Nhà Xe</span>
                    </router-link>
                </a-menu-item>
                <a-menu-item key="2">
                    <router-link to="/chuyenxes/list" class="nav-link">
                        <UserOutlined />
                        <span class="menu-text">Chuyến Xe</span>
                    </router-link>
                </a-menu-item>
                <a-menu-item key="3">
                    <router-link to="/datchos/list" class="nav-link">
                        <TeamOutlined />
                        <span class="menu-text">Đặt Chổ</span>
                    </router-link>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0" />
            <a-layout-content style="margin: 0 16px">
                <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
                    <router-view />
                </div>
            </a-layout-content>
            <a-layout-footer style="text-align: center">
                Ant Design ©2018 Created by Ant UED
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>

<script>
import { DesktopOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';

export default {
    components: {
        DesktopOutlined,
        UserOutlined,
        TeamOutlined
    },
    setup() {
        const selectedKeys = ref(['1']);
        return { selectedKeys };
    }
};
</script>

<style scoped>
#components-layout-demo-side .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
    background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
    background: #141414;
}

.nav-link {
    text-decoration: none;
    /* Loại bỏ gạch chân */
}

.menu-text {
    margin-left: 10px;
    /* Khoảng cách giữa biểu tượng và văn bản */
}
</style>
