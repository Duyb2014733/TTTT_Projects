<template>
    <div class="search-ticket">
        <h2>Kết quả tìm kiếm</h2>
        <a-spin :spinning="loading">
            <a-alert v-if="error" type="error" :message="error" show-icon style="margin-bottom: 16px;" />
            <a-empty v-if="!loading && trips.length === 0" description="Không tìm thấy chuyến xe phù hợp." />
            <a-row :gutter="[16, 16]" v-else>
                <a-col :xs="24" :sm="12" :md="8" v-for="trip in trips" :key="trip.trip._id">
                    <a-card hoverable>
                        <template #cover>
                            <img alt="Bus" src="https://via.placeholder.com/300x200?text=Bus+Image"
                                style="object-fit: cover; height: 200px;" />
                        </template>
                        <a-card-meta
                            :title="`${trip.trip.route_id.departure_city} - ${trip.trip.route_id.arrival_city}`">
                            <template #description>
                                <p>Ngày khởi hành: {{ formatDate(trip.trip.departure_time) }}</p>
                                <p>Giờ khởi hành: {{ formatTime(trip.trip.departure_time) }}</p>
                                <p>Số ghế trống: {{ trip.availableSeats }}</p>
                                <p>Giá vé: {{ formatPrice(trip.price) }} VND</p>
                            </template>
                        </a-card-meta>
                        <a-button @click="selectTrip(trip)" :disabled="trip.availableSeats === 0" type="primary" block
                            style="margin-top: 16px;">
                            {{ trip.availableSeats > 0 ? 'Chọn chuyến này' : 'Hết vé' }}
                        </a-button>
                    </a-card>
                </a-col>
            </a-row>
        </a-spin>
    </div>
</template>

<script>
import VeService from '@/services/VeService';
import { Alert, Button, Card, Col, Empty, Row, Spin } from 'ant-design-vue';

export default {
    name: 'SearchTicket',
    components: {
        ACard: Card,
        ASpin: Spin,
        AEmpty: Empty,
        ARow: Row,
        ACol: Col,
        AButton: Button,
        AAlert: Alert,
        ACardMeta: Card.Meta,
    },
    data() {
        return {
            trips: [],
            loading: true,
            error: null
        };
    },
    methods: {
        async searchTrips() {
            this.loading = true;
            this.error = null;
            try {
                const { departure_city, arrival_city, departure_date } = this.$route.query;
                const response = await VeService.searchTickets(departure_city, arrival_city, departure_date);
                if (response.success) {
                    this.trips = response.data;
                } else {
                    this.error = response.message || 'Đã xảy ra lỗi khi tìm kiếm chuyến xe.';
                }
            } catch (err) {
                console.error('Error fetching trips:', err);
                this.error = err.message || 'Đã xảy ra lỗi khi tìm kiếm chuyến xe. Vui lòng thử lại sau.';
            } finally {
                this.loading = false;
            }
        },
        selectTrip(trip) {
            this.$router.push({
                name: 'BookTicket',
                params: { id: trip.trip._id },
                query: { availableSeats: trip.availableSeats, price: trip.price }
            });
        },
        formatDate(dateString) {
            return new Date(dateString).toLocaleDateString('vi-VN');
        },
        formatTime(dateString) {
            return new Date(dateString).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
        },
        formatPrice(price) {
            return new Intl.NumberFormat('vi-VN').format(price);
        }
    },
    created() {
        this.searchTrips();
    },
    watch: {
        '$route.query': {
            handler: 'searchTrips',
            deep: true
        }
    }
};
</script>

<style scoped>
.search-ticket {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}
</style>