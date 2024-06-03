<template>
    <div v-if="visible" class="notification">
        <p>{{ message }}</p>
    </div>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            visible: true
        };
    },
    mounted() {
        setTimeout(() => {
            this.visible = false;
        }, 2000); // Thông báo sẽ tự ẩn sau 2 giây
    }
};
</script>

<style scoped>
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #f8d7da;
    color: #721c24;
    padding: 1rem;
    border: 1px solid #f5c6cb;
    border-radius: 0.25rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    z-index: 1000;
}
</style>
