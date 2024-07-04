<template>
    <div class="container-fluid">
        <SearchForm @search="handleSearch" />
        <router-view :searchParams="searchParams" />
    </div>
</template>

<script>
import SearchForm from '@/components/SearchForm.vue';

export default {
    name: 'App',
    components: {
        SearchForm,
    },
    data() {
        return {
            searchParams: {
                departure_city: '',
                arrival_city: '',
                departure_date: ''
            }
        }
    },
    methods: {
        handleSearch(data) {
            if (!data.departure_city || !data.arrival_city || !data.departure_date) {
                console.error('Invalid search data', data);
                return;
            }

            this.searchParams = { ...data };

            try {
                this.$router.push({
                    name: 'SearchChuyeXe',
                    query: { ...this.searchParams }
                });
            } catch (error) {
                console.error('Navigation error:', error);
            }
        }
    }
}
</script>

<style scoped>
.container-fluid {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}
</style>