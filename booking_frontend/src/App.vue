<script>
import AppHeaderAdmin from "@/components/AppHeader.admin.vue";
import AppHeader from "@/components/AppHeader.vue";
export default {
  components: {
    AppHeaderAdmin,
    AppHeader,
  },
};
</script>
<template>
  <div id="app">
    <!-- <AppHeaderAdmin /> -->
    <AppHeader />
  </div>
</template>
<style>
.page {
  max-width: 400px;
  margin: auto;
}
</style>