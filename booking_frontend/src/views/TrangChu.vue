<template>
    <div class="container-fluid">
        <SearchForm @search="handleSearch" />
        <!-- <BoLocVe :searchData="searchData" /> -->
    </div>
</template>

<script>
// import BoLocVe from '@/components/BoLocVe.vue';
import SearchForm from '@/components/SearchForm.vue';

export default {
    name: 'App',
    components: {
        SearchForm,
        // BoLocVe
    },
    data() {
        return {
            searchData: {
                departure_city: '',
                arrival_city: '',
                departureDate: ''
            }
        }
    },
    methods: {
        handleSearch(data) {
            this.searchData = data;
            this.$router.push({
                name: 'SearchTicket',
                params: { searchData: data }
            });
        }
    }
}
</script>