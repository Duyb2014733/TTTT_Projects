<template>
    <div class="bo-loc-ve">
        <div class="search-bar">
            <p>Điểm đi: {{ searchData.departure_city }}</p>
            <p>Điểm đến: {{ searchData.arrival_city }}</p>
            <p>Ngày đi: {{ searchData.departureDate }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BoLocVe',
    props: {
        searchData: {
            type: Object,
            default: () => ({
                departure_city: '',
                arrival_city: '',
                departureDate: ''
            })
        }
    }
}
</script>

<style scoped>
.search-bar {
    background-color: #f0f0f0;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 5px;
}
</style>