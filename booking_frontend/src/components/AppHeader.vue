<template>
    <a-layout class="layout">
        <a-layout-header>
            <div class="logo"></div>
            <a-menu :selectedKeys="selectedKeys" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
                <a-menu-item key="1">
                    <router-link to="/" slot="title">Trang chủ</router-link>
                </a-menu-item>
                <a-menu-item key="2">Hóa đơn</a-menu-item>
                <a-menu-item key="3">Liên hệ</a-menu-item>
                <a-menu-item key="right" style="margin-left: auto; border: none">
                    <a-menu-item key="4">
                        <router-link to="/login" slot="title">Đăng nhập</router-link>
                    </a-menu-item>
                    <a-menu-item key="5">
                        <router-link to="/register" slot="title">Đăng ký</router-link>
                    </a-menu-item>
                </a-menu-item>
            </a-menu>
        </a-layout-header>
        <a-layout-content style="padding: 0 50px">
            <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
                <router-view />
            </div>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
            Ant Design ©2018 Created by Ant UED
        </a-layout-footer>
    </a-layout>
</template>

<script>
import { Breadcrumb, Layout, Menu } from 'ant-design-vue';

export default {
    components: {
        'a-layout': Layout,
        'a-layout-header': Layout.Header,
        'a-layout-content': Layout.Content,
        'a-layout-footer': Layout.Footer,
        'a-menu': Menu,
        'a-menu-item': Menu.Item,
        'a-breadcrumb': Breadcrumb,
        'a-breadcrumb-item': Breadcrumb.Item,
    },
    data() {
        return {
            selectedKeys: ['1'],
        };
    },
};
</script>

<style scoped>
.site-layout-content {
    min-height: 280px;
    padding: 24px;
    background: #fff;
}

#components-layout-demo-top .logo {
    float: left;
    width: 120px;
    height: 31px;
    margin: 16px 24px 16px 0;
    background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top .logo {
    float: right;
    margin: 16px 0 16px 24px;
}

[data-theme='dark'] .site-layout-content {
    background: #333;
}
</style>