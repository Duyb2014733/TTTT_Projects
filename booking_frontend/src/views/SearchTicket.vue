<template>
    <div class="container">
        <div class="search-ticket">
            <a-row :gutter="[24, 24]">
                <!-- Filter section -->
                <a-col :span="8">
                    <a-card title="Bộ lọc" class="filter-card">
                        <a-form layout="vertical">
                            <!-- Departure Time Range -->
                            <a-form-item label="Giờ khởi hành">
                                <a-time-picker v-model:value="filters.departureTimeRange" format="HH:mm" />
                            </a-form-item>

                            <!-- Price Range -->
                            <a-form-item label="Giá vé">
                                <a-slider v-model:value="filters.priceRange" range :max="maxPrice" />
                                <div>{{ formatPrice(filters.priceRange[0]) }} - {{ formatPrice(filters.priceRange[1]) }}
                                    VND
                                </div>
                            </a-form-item>

                            <!-- Bus Company -->
                            <a-form-item label="Nhà xe">
                                <a-select v-model:value="filters.busCompany" mode="multiple" placeholder="Chọn nhà xe">
                                    <a-select-option v-for="company in busCompanies" :key="company" :value="company">
                                        {{ company }}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>

                            <a-button type="primary" @click="applyFilters" block>Áp dụng bộ lọc</a-button>
                        </a-form>
                    </a-card>
                </a-col>

                <!-- Search results section -->
                <a-col :span="16">
                    <a-spin :spinning="loading">
                        <a-alert v-if="error" type="error" :message="error" show-icon class="mb-4" />
                        <a-empty v-if="!loading && filteredTrips.length === 0"
                            description="Không tìm thấy chuyến xe phù hợp." />
                        <div v-else class="trip-list">
                            <a-card v-for="trip in filteredTrips" :key="trip.trip._id" class="trip-card" hoverable>
                                <a-row type="flex" align="stretch">
                                    <a-col :span="8" class="trip-image-container">
                                        <img :alt="trip.trip.chuyenXe_name" :src="trip.trip.image" class="trip-image" />
                                    </a-col>
                                    <a-col :span="16" class="trip-details">
                                        <a-card-meta :title="trip.trip.chuyenXe_name" class="trip-title">
                                            <template #description>
                                                <div class="trip-info">
                                                    <p><strong>Ngày khởi hành:</strong> {{
                                                        formatDate(trip.trip.departure_time) }}</p>
                                                    <p><strong>Giờ khởi hành:</strong> {{
                                                        formatTime(trip.trip.departure_time) }}</p>
                                                    <p><strong>Số ghế trống:</strong> {{ trip.availableSeats }}</p>
                                                    <p><strong>Giá vé:</strong> <span class="trip-price">{{
                                                        formatPrice(trip.price) }} VND</span></p>
                                                    <p><strong>Nhà xe:</strong> {{ trip.trip.bus_id.company_name }}</p>
                                                </div>
                                            </template>
                                        </a-card-meta>
                                        <a-button @click="selectTrip(trip)" :disabled="trip.availableSeats === 0"
                                            type="primary" class="select-trip-btn">
                                            {{ trip.availableSeats > 0 ? 'Chọn chuyến này' : 'Hết vé' }}
                                        </a-button>
                                    </a-col>
                                </a-row>
                            </a-card>
                        </div>
                    </a-spin>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
import VeService from '@/services/VeService';
import { Alert, Button, Card, Col, Empty, Form, Row, Select, Slider, Spin, TimePicker } from 'ant-design-vue';

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
        AForm: Form,
        AFormItem: Form.Item,
        ATimePickerRangePicker: TimePicker.RangePicker,
        ASlider: Slider,
        ASelect: Select,
        ASelectOption: Select.Option,
    },
    data() {
        return {
            trips: [],
            filteredTrips: [],
            loading: true,
            error: null,
            filters: {
                departureTimeRange: null,
                priceRange: [0, 1000000], // Adjust default range as needed
                busCompany: [],
            },
            busCompanies: [],
            maxPrice: 1000000, // Adjust this value based on your maximum ticket price
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
                    this.filteredTrips = [...this.trips];
                    this.updateBusCompanies();
                    this.updateMaxPrice();
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
        updateBusCompanies() {
            this.busCompanies = [...new Set(this.trips.map(trip => trip.trip.busCompany))];
        },
        updateMaxPrice() {
            this.maxPrice = Math.max(...this.trips.map(trip => trip.price));
            this.filters.priceRange = [0, this.maxPrice];
        },
        applyFilters() {
            this.filteredTrips = this.trips.filter(trip => {
                const tripTime = new Date(trip.trip.departure_time);
                const tripHours = tripTime.getHours();
                const tripMinutes = tripTime.getMinutes();

                const timeInRange = !this.filters.departureTimeRange ||
                    (tripHours >= this.filters.departureTimeRange[0].getHours() &&
                        tripHours <= this.filters.departureTimeRange[1].getHours() &&
                        tripMinutes >= this.filters.departureTimeRange[0].getMinutes() &&
                        tripMinutes <= this.filters.departureTimeRange[1].getMinutes());

                const priceInRange = trip.price >= this.filters.priceRange[0] && trip.price <= this.filters.priceRange[1];

                const companyMatches = this.filters.busCompany.length === 0 || this.filters.busCompany.includes(trip.trip.busCompany);

                return timeInRange && priceInRange && companyMatches;
            });
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

.filter-card {
    position: sticky;
    top: 20px;
}

.trip-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.trip-card {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.trip-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.trip-image-container {
    height: 100%;
}

.trip-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.trip-details {
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.trip-title {
    margin-bottom: 12px;
}

.trip-info p {
    margin-bottom: 8px;
    font-size: 14px;
}

.trip-price {
    font-weight: bold;
    color: #f5222d;
}

.select-trip-btn {
    align-self: flex-end;
    margin-top: 16px;
}

.mb-4 {
    margin-bottom: 16px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .trip-card .ant-row {
        flex-direction: column;
    }

    .trip-image-container,
    .trip-details {
        width: 100%;
    }

    .trip-image {
        height: 200px;
    }
}
</style>