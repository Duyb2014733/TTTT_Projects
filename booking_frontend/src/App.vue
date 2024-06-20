<template>
  <div id="app">
    <template v-if="isAdmin">
      <AppHeaderAdmin />
    </template>
    <template v-else>
      <AppHeader />
    </template>
  </div>
</template>

<script>
import AppHeaderAdmin from '@/components/AppHeader.admin.vue';
import AppHeader from '@/components/AppHeader.vue';

export default {
  components: {
    AppHeader,
    AppHeaderAdmin
  },
  data() {
    return {
      isAdmin: false
    };
  },
  async created() {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    this.isAdmin = isAdmin;
  },
};
</script>
