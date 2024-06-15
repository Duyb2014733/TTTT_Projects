<template>
    <div class="container-fluid">
        <div class="search-form">
            <h1>Chào mừng bạn đến với Booking-tickets</h1>
            <div class="form-center">
                <a-form layout="inline" class="form-inline">
                    <a-form-item>
                        <i class="fa-solid fa-location-dot"></i>
                        <a-select v-model="departureLocation" placeholder="Chọn điểm đi" class="form-item">
                            <a-select-option v-for="TuyenDuong in TuyenDuongs" :key="TuyenDuong._id"
                                :value="TuyenDuong.departure_city">
                                {{ TuyenDuong.departure_city }}
                            </a-select-option>
                        </a-select>
                    </a-form-item>

                    <a-form-item>
                        <i class="fa-solid fa-location-dot"></i>
                        <a-select v-model="destination" placeholder="Chọn điểm đến" class="form-item">
                            <a-select-option v-for="TuyenDuong in TuyenDuongs" :key="TuyenDuong._id"
                                :value="TuyenDuong.arrival_city">
                                {{ TuyenDuong.arrival_city }}
                            </a-select-option>
                        </a-select>
                    </a-form-item>

                    <a-form-item>
                        <i class="fa-solid fa-calendar-days"></i>
                        <a-date-picker v-model="departureDate" placeholder="Ngày đi" class="form-item" />
                    </a-form-item>
                    <a-form-item>
                        <button type="button" @click="searchRoutes" class="form-item">

                            <router-link to="/bolocve" slot="title"><span>Tìm kiếm</span></router-link>
                        </button>
                    </a-form-item>
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
            TuyenDuongs: [],
        };
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
            console.log('Tìm kiếm với điểm đi:', this.departureLocation);
            console.log('Tìm kiếm với điểm đến:', this.destination);
            console.log('Tìm kiếm với ngày đi:', this.departureDate);
            // Implement search logic here
        },
    },
    mounted() {
        this.fetchTuyenDuongs();
    },
};
</script>

<style scoped>
.search-form {
    background-image: url("../assets/img/rice-terraces-2389023_1280.jpg");
    background-color: rgba(255, 255, 255, 0.8);
    padding: 40px 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 500px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
}

h1 {
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px 20px;
    border-radius: 5px;
    margin-bottom: 30px;
    font-size: 24px;
    font-weight: bold;
}

.form-center {
    background: rgba(255, 255, 255, 0.9);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: row;
    /* Align items horizontally */
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 1000px;
    /* Adjusted width for better alignment */
}

.form-inline {
    display: flex;
    justify-content: center;
    width: 100%;
}

.form-item {
    margin: 10px;
    width: 250px;
}

@media (max-width: 768px) {
    .search-form {
        height: auto;
        padding: 20px 10px;
    }

    .form-center {
        flex-direction: column;
        /* Stack items vertically on small screens */
        padding: 10px;
    }

    h1 {
        font-size: 20px;
    }

    .form-item {
        width: 100%;
    }
}

button {
    outline: none;
    cursor: pointer;
    border: none;
    padding: 0.9rem 2rem;
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    position: relative;
    display: inline-block;
    letter-spacing: 0.05rem;
    font-weight: 700;
    font-size: 17px;
    border-radius: 500px;
    overflow: hidden;
    background: #df9c0b;
    color: ghostwhite;
}

button span {
    position: relative;
    z-index: 10;
    transition: color 0.4s;
}

button:hover span {
    color: black;
}

button::before,
button::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
}

button::before {
    content: "";
    background: #000;
    width: 120%;
    left: -10%;
    transform: skew(30deg);
    transition: transform 0.4s cubic-bezier(0.3, 1, 0.8, 1);
}

button:hover::before {
    transform: translate3d(100%, 0, 0);
}
</style>
