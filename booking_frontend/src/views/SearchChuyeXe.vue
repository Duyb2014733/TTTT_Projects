<template>
    <a-layout class="container">
        <!-- Search Form Section -->
        <div class="search-container">
            <div class="search-form">
                <div class="form-center">
                    <a-form layout="inline" class="search-form-flex">
                        <div class="form-item">
                            <a-form-item class="mb-0">
                                <div class="field-label">Nơi xuất phát</div>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-location-dot"></i></span>
                                    <a-select v-model:value="departureLocation" placeholder="Sài Gòn"
                                        class="form-control">
                                        <a-select-option v-for="city in uniqueDepartureCities" :key="city"
                                            :value="city">
                                            {{ city }}
                                        </a-select-option>
                                    </a-select>
                                </div>
                            </a-form-item>
                        </div>

                        <div class="form-item">
                            <a-form-item class="mb-0">
                                <div class="field-label">Nơi đến</div>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-location-dot"></i></span>
                                    <a-select v-model:value="destination" placeholder="Nha Trang - Khánh H"
                                        class="form-control">
                                        <a-select-option v-for="city in uniqueArrivalCities" :key="city" :value="city">
                                            {{ city }}
                                        </a-select-option>
                                    </a-select>
                                </div>
                            </a-form-item>
                        </div>

                        <div class="form-item">
                            <a-form-item class="mb-0">
                                <div class="field-label">Ngày đi</div>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-calendar-days"></i></span>
                                    <a-date-picker v-model:value="departureDate" placeholder="T4, 26/06/2024"
                                        class="form-control" />
                                </div>
                            </a-form-item>
                        </div>

                        <div class="form-item">
                            <a-form-item class="mb-0">
                                <div class="field-label">&nbsp;</div>
                                <a-button type="primary" @click="searchRoutes" class="search-button">
                                    Tìm kiếm
                                </a-button>
                            </a-form-item>
                        </div>
                    </a-form>
                </div>
            </div>
        </div>

        <!-- Filters and Trip Results Section -->
        <a-layout has-sider>
            <a-layout-sider width="300" class="filter-sidebar">
                <h2 class="filter-title">Bộ Lọc</h2>
                <a-form @submit.prevent="applyFilters">
                    <a-form-item label="Giờ Đi">
                        <a-time-picker v-model:value="filters.departureTime" style="width: 100%;" />
                    </a-form-item>
                    <a-form-item label="Giá Tiền">
                        <a-slider range v-model:value="filters.priceRange" :min="0" :max="1000000" />
                    </a-form-item>
                    <a-form-item label="Nhà Xe">
                        <a-select v-model:value="filters.busOperator" style="width: 100%;" placeholder="Chọn nhà xe">
                            <a-select-option v-for="operator in busOperators" :key="operator" :value="operator">
                                {{ operator }}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item>
                        <a-button type="primary" html-type="submit">
                            Áp Dụng
                        </a-button>
                    </a-form-item>
                </a-form>
            </a-layout-sider>

            <a-layout-content class="content">
                <h1 class="title">Kết Quả Tìm Kiếm Chuyến Đi</h1>
                <a-spin :spinning="loading">
                    <a-alert v-if="error" type="error" :message="error" show-icon />
                    <a-empty v-else-if="filteredTrips.length === 0"
                        description="Không tìm thấy chuyến đi nào phù hợp với tiêu chí tìm kiếm." />
                    <div v-else>
                        <a-card v-for="trip in filteredTrips" :key="trip.chuyenXe._id" class="trip-card"
                            :bodyStyle="{ padding: '12px', display: 'flex' }">
                            <a-row type="flex" style="width: 100%">
                                <a-col :xs="24" :sm="8" :md="6" class="card-image">
                                    <img :src="trip.chuyenXe.image" :alt="trip.chuyenXe.chuyenXe_name" />
                                </a-col>
                                <a-col :xs="24" :sm="16" :md="18" class="card-content">
                                    <h2>{{ trip.chuyenXe.chuyenXe_name }}</h2>
                                    <a-row :gutter="[16, 8]">
                                        <a-col :span="12">
                                            <p><a-icon type="car" /> Xe: {{ trip.chuyenXe.xe_id.bus_number }}</p>
                                            <p><a-icon type="info-circle" /> Loại: {{ trip.chuyenXe.xe_id.bus_type }}
                                            </p>
                                            <p><a-icon type="user" /> Ghế trống: {{ trip.soChoTrong }}</p>
                                        </a-col>
                                        <a-col :span="12">
                                            <p><a-icon type="calendar" /> Khởi hành: {{
                                                formatDate(trip.chuyenXe.departure_time) }}</p>
                                            <p><a-icon type="clock-circle" /> Đến nơi: {{
                                                formatDate(trip.chuyenXe.arrival_time) }}</p>
                                            <p><a-icon type="dollar" /> Giá: {{ trip.chuyenXe.price }} VND</p>
                                        </a-col>
                                    </a-row>
                                    <a-button type="primary" @click="bookTrip(trip)" class="book-button">
                                        Chọn chuyến
                                    </a-button>
                                </a-col>
                            </a-row>
                        </a-card>
                    </div>
                </a-spin>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
import ChuyenXeService from '@/services/ChuyenXeService';
import TuyenDuongService from '@/services/TuyenDuongService';
import { notification } from 'ant-design-vue';

export default {
    data() {
        return {
            departureLocation: '',
            destination: '',
            departureDate: null,
            TuyenDuongs: [],
            trips: [],
            loading: false,
            error: null,
            filters: {
                departureTime: null,
                priceRange: [0, 1000000],
                busOperator: null
            }
        };
    },
    computed: {
        busOperators() {
            return [...new Set(this.trips.map(trip => trip.chuyenXe.xe_id.nhaXe))];
        },
        uniqueDepartureCities() {
            return [...new Set(this.TuyenDuongs.map(td => td.departure_city))];
        },
        uniqueArrivalCities() {
            return [...new Set(this.TuyenDuongs.map(td => td.arrival_city))];
        },
        filteredTrips() {
            return this.trips.filter(trip => {
                const matchesDepartureTime = !this.filters.departureTime ||
                    new Date(trip.chuyenXe.departure_time).getHours() === this.filters.departureTime.getHours();
                const matchesPrice = trip.chuyenXe.price >= this.filters.priceRange[0] &&
                    trip.chuyenXe.price <= this.filters.priceRange[1];
                const matchesBusOperator = !this.filters.busOperator ||
                    trip.chuyenXe.xe_id.nhaXe === this.filters.busOperator;

                return matchesDepartureTime && matchesPrice && matchesBusOperator;
            });
        }
    },
    created() {
        this.fetchTuyenDuongs();
        this.fetchTrips();
    },
    methods: {
        showNotification(type, message) {
            notification[type]({
                message: 'Thông báo',
                description: message,
            });
        },
        async fetchTuyenDuongs() {
            try {
                this.TuyenDuongs = await TuyenDuongService.getAllTuyenDuongs();
            } catch (error) {
                console.error('Lỗi tìm nạp tuyến đường:', error);
                this.showNotification('error', 'Không thể tải danh sách tuyến đường. Vui lòng thử lại sau.');
            }
        },
        async fetchTrips() {
            const departureCity = this.$route.query.departure_city;
            const arrivalCity = this.$route.query.arrival_city;
            const departureDate = this.$route.query.departure_date;

            if (departureCity && arrivalCity && departureDate) {
                this.loading = true;
                this.error = null;

                try {
                    const result = await ChuyenXeService.searchChuyenXe(departureCity, arrivalCity, departureDate);
                    this.trips = result.data;
                    if (this.trips.length === 0) {
                        this.showNotification('info', 'Không tìm thấy chuyến đi nào phù hợp với tiêu chí tìm kiếm.');
                    }
                } catch (err) {
                    this.error = err.message || 'Có lỗi xảy ra khi tìm kiếm chuyến đi';
                    this.showNotification('error', this.error);
                } finally {
                    this.loading = false;
                }
            }
        },
        async searchRoutes() {
            if (!this.departureLocation || !this.destination || !this.departureDate) {
                this.showNotification('error', 'Vui lòng chọn đầy đủ thông tin tìm kiếm');
                return;
            }

            this.loading = true;
            this.error = null;
            const formattedDate = this.departureDate.format('YYYY-MM-DD');

            try {
                const result = await ChuyenXeService.searchChuyenXe(
                    this.departureLocation,
                    this.destination,
                    formattedDate
                );
                this.trips = result.data;
                if (this.trips.length === 0) {
                    this.showNotification('info', 'Không tìm thấy chuyến đi nào phù hợp với tiêu chí tìm kiếm.');
                }
            } catch (err) {
                this.error = 'Có lỗi xảy ra khi tìm kiếm chuyến đi';
                this.showNotification('error', this.error);
            } finally {
                this.loading = false;
            }
        },
        formatDate(dateString) {
            return new Date(dateString).toLocaleString();
        },
        bookTrip(trip) {
            this.showNotification('success', `Đã xác nhận đặt vé: ${trip.chuyenXe.chuyenXe_name}`);
            console.log('Đặt chuyến đi:', trip);
        },
        applyFilters() {
            this.showNotification('success', 'Đã áp dụng bộ lọc');
        }
    }
};
</script>

<style scoped>
.container {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
}

.search-container {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    padding: 40px 20px;
    min-height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.search-form {
    background-color: rgba(255, 255, 255, 0.9);
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 800px;
}

.search-form-flex {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
}

.form-item {
    flex: 1 1 180px;
    min-width: 0;
}

.field-label {
    font-size: 14px;
    color: #666;
    margin-bottom: 2px;
}

.input-group {
    display: flex;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    overflow: hidden;
}

.input-group-text {
    background-color: #fff;
    border: none;
    padding: 0 8px;
    display: flex;
    align-items: center;
}

.form-control {
    border: none;
    flex: 1;
}

.search-button {
    width: 100%;
    height: 35px;
    font-size: 14px;
    background-color: #ffc107;
    border-color: #ffc107;
}

.search-button:hover {
    background-color: #e0a800;
    border-color: #e0a800;
}

/* Styles for Ant Design components */
:deep(.ant-select-selector),
:deep(.ant-picker) {
    border: none !important;
    box-shadow: none !important;
}

.filter-sidebar {
    padding: 24px;
    background-color: #fff;
    border-right: 1px solid #f0f0f0;
}

.filter-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 16px;
    color: #001529;
    text-align: center;
}

.content {
    padding: 24px;
    background-color: #f0f2f5;
    flex: 1;
}

.title {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 24px;
    color: #001529;
    text-align: center;
}

.trip-card {
    margin-bottom: 16px;
    transition: all 0.3s;
}

.trip-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card-image {
    height: 200px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f2f5;
    border-radius: 4px;
}

.card-image img {
    width: auto;
    height: 100%;
    max-width: 100%;
    object-fit: cover;
}

.card-content {
    padding: 16px;
    display: flex;
    flex-direction: column;
}

.card-content h2 {
    font-size: 20px;
    margin-bottom: 16px;
    color: #001529;
}

.card-content p {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
}

.card-content .anticon {
    margin-right: 8px;
    color: #1890ff;
}

.book-button {
    margin-top: 16px;
    align-self: flex-end;
}

@media (max-width: 768px) {
    .container {
        flex-direction: column;
    }

    .filter-sidebar {
        width: 100%;
        border-right: none;
        border-bottom: 1px solid #f0f0f0;
    }

    .content {
        padding: 16px;
    }

    .title {
        font-size: 24px;
    }

    .card-image {
        height: 150px;
    }

    .card-content {
        padding: 12px;
    }

    .book-button {
        align-self: stretch;
    }
}
</style>
