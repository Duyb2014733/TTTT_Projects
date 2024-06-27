<template>
    <div class="booking-container">
        <a-row :gutter="[16, 16]">
            <!-- <a-col :span="24" :md="6">
                
            </a-col> -->
            <a-col :span="24" :md="24">
                <div v-if="hasSearched && filteredTrips.length > 0" class="search-results">
                    <h2>Kết quả tìm kiếm</h2>
                    <a-row :gutter="[16, 16]">
                        <a-col :span="24" :md="12" :lg="8" v-for="trip in filteredTrips" :key="trip.id">
                            <a-card class="trip-card" :title="trip.routeName">
                                <template slot="extra">
                                    <a-tag color="blue">{{ trip.price }} VND</a-tag>
                                </template>
                                <a-descriptions :column="1">
                                    <a-descriptions-item label="Điểm đi">
                                        {{ trip.departure_city }}
                                    </a-descriptions-item>
                                    <a-descriptions-item label="Điểm đến">
                                        {{ trip.arrival_city }}
                                    </a-descriptions-item>
                                    <a-descriptions-item label="Ngày đi">
                                        {{ trip.departureDate }}
                                    </a-descriptions-item>
                                    <a-descriptions-item label="Giờ khởi hành">
                                        {{ trip.departureTime }}
                                    </a-descriptions-item>
                                </a-descriptions>
                                <a-button type="primary" block @click="selectTrip(trip)">Chọn chuyến</a-button>
                            </a-card>
                        </a-col>
                    </a-row>
                </div>
                <a-empty v-else description="Không tìm thấy chuyến xe phù hợp" />
            </a-col>
        </a-row>
    </div>
</template>

<script>
import TuyenDuongService from '@/services/TuyenDuongService';
import { Button, Card, Col, Descriptions, Empty, Row, Tag } from 'ant-design-vue';

export default {
    name: 'BoLocVe',
    components: {
        ARow: Row,
        ACol: Col,
        ACard: Card,
        ADescriptions: Descriptions,
        ADescriptionsItem: Descriptions.Item,
        ATag: Tag,
        AButton: Button,
        AEmpty: Empty
    },
    props: {
        searchData: {
            type: Object,
            default: () => ({
                departure_city: '',
                arrival_city: '',
                departureDate: ''
            })
        }
    },
    data() {
        return {
            TuyenDuongs: [],
            hasSearched: false,
            allTrips: []
        };
    },
    computed: {
        filteredTrips() {
            if (!this.hasSearched) return [];
            return this.allTrips.filter(trip =>
                trip.departure_city === this.searchData.departure_city &&
                trip.arrival_city === this.searchData.arrival_city &&
                trip.departureDate === this.searchData.departureDate
            );
        }
    },
    methods: {
        async fetchTuyenDuongs() {
            try {
                this.TuyenDuongs = await TuyenDuongService.getAllTuyenDuongs();
            } catch (error) {
                console.error('Lỗi tìm nạp tuyến đường:', error);
            }
        },
        async fetchAllTrips() {
            try {
                // Assume you have a service to fetch all trips
                this.allTrips = await TuyenDuongService.getAllTrips();
            } catch (error) {
                console.error('Lỗi tìm nạp chuyến xe:', error);
            }
        },
        selectTrip(trip) {
            console.log('Chuyến xe được chọn:', trip);
            // Implement logic to handle trip selection
        }
    },
    watch: {
        searchData: {
            immediate: true,
            handler(newVal) {
                if (newVal.departure_city && newVal.arrival_city && newVal.departureDate) {
                    this.hasSearched = true;
                } else {
                    this.hasSearched = false;
                }
            }
        }
    },
    mounted() {
        this.fetchTuyenDuongs();
        this.fetchAllTrips();
    }
};
</script>

<style scoped>
.booking-container {
    padding: 20px;
}

.search-results {
    margin-top: 20px;
}

.trip-card {
    margin-bottom: 16px;
}

.ant-card-head-title {
    font-size: 18px;
    font-weight: bold;
}

.ant-descriptions-item-label {
    font-weight: bold;
}
</style>
