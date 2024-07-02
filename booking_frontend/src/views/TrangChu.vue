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
                departure_date: ''  // Changed from departureDate for consistency
            }
        }
    },
    methods: {
        handleSearch(data) {
            // Validate incoming data
            if (!data.departure_city || !data.arrival_city || !data.departure_date) {
                console.error('Invalid search data', data);
                return;
            }

            this.searchParams = { ...data };

            // Use try-catch for error handling during navigation
            try {
                this.$router.push({
                    name: 'SearchChuyeXe',
                    query: { ...this.searchParams }
                });
            } catch (error) {
                console.error('Navigation error:', error);
                // Handle navigation error (e.g., show an error message to the user)
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