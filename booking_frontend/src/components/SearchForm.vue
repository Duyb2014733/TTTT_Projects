<template>
    <div class="search-container">
        <div class="search-form">
            <div class="form-center">
                <a-form layout="inline" class="search-form-flex">
                    <div class="form-item">
                        <a-form-item class="mb-0">
                            <div class="field-label">Nơi xuất phát</div>
                            <div class="input-group">
                                <span class="input-group-text"><i class="fas fa-location-dot"></i></span>
                                <a-select v-model:value="departureLocation" placeholder="Sài Gòn" class="form-control">
                                    <a-select-option v-for="city in uniqueDepartureCities" :key="city" :value="city">
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
</template>

<script>
import TuyenDuongService from '@/services/TuyenDuongService';

export default {
    data() {
        return {
            departureLocation: '',
            destination: '',
            departureDate: null,
            TuyenDuongs: []
        };
    },
    computed: {
        uniqueDepartureCities() {
            return [...new Set(this.TuyenDuongs.map(td => td.departure_city))];
        },
        uniqueArrivalCities() {
            return [...new Set(this.TuyenDuongs.map(td => td.arrival_city))];
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
        searchRoutes() {
            if (!this.departureLocation || !this.destination || !this.departureDate) {
                this.$message.error('Vui lòng chọn đầy đủ thông tin tìm kiếm');
                return;
            }

            const formattedDate = this.departureDate.format('YYYY-MM-DD');

            this.$emit('search', {
                departure_city: this.departureLocation,
                arrival_city: this.destination,
                departureDate: formattedDate
            });
        }
    },
    mounted() {
        this.fetchTuyenDuongs();
    }
};
</script>

<style scoped>
.search-container {
    background-image: url("../assets/img/rice-terraces-2389023_1280.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    padding: 60px 20px;
    min-height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.search-form {
    background-color: rgba(255, 255, 255, 0.9);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 1000px;
}

.search-form-flex {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.form-item {
    flex: 1 1 200px;
    min-width: 0;
}

.field-label {
    font-size: 16px;
    color: #666;
    margin-bottom: 4px;
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
    padding: 0 10px;
    display: flex;
    align-items: center;
}

.form-control {
    border: none;
    flex: 1;
}

.search-button {
    width: 100%;
    height: 40px;
    font-size: 16px;
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

@media (max-width: 768px) {
    .search-form {
        padding: 15px;
    }

    .search-form-flex {
        flex-direction: column;
    }

    .form-item {
        width: 100%;
    }
}
</style>