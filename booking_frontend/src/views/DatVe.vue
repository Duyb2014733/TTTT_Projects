<template>
  <a-card class="dat-ve-container">
    <a-typography-title>Đặt vé</a-typography-title>
    <a-spin :spinning="loading">
      <a-alert v-if="error" type="error" :message="error" show-icon />
      <template v-else-if="ChuyenXes">
        <div class="trip-info">
          <div class="time-info">
            <span class="departure-time">{{ formatTime(ChuyenXes.departure_time) }}</span>
            <span class="arrow">→</span>
            <span class="arrival-time">{{ formatTime(ChuyenXes.arrival_time) }}</span>
          </div>
          <div class="price-info">
            {{ ChuyenXes.price.toLocaleString() }}đ • Ghế ngồi • Có 30 chỗ
          </div>
          <div class="station-info">
            <div>
              <environment-outlined />
              {{ ChuyenXes.tuyenduong_id.departure_city }}
            </div>
            <div>
              <environment-outlined />
              {{ ChuyenXes.tuyenduong_id.arrival_city }}
            </div>
          </div>
          <div class="trip-details">
            <div>Ngày dự kiến khởi hành: {{ formatDate(ChuyenXes.departure_time) }}</div>
            <div>Thời gian di chuyển trung bình: {{ ChuyenXes.tuyenduong_id.duration }}</div>
            <div>Ngày dự kiến đến: {{ formatDate(ChuyenXes.arrival_time) }}</div>
          </div>
        </div>

        <a-divider>Chọn ghế:</a-divider>

        <div class="seat-selection">
          <div class="seat-map">
            <div class="floor">
              <div class="floor-title">Vị Trí Ghế</div>
              <div class="seats">
                <div v-for="column in seatColumns" :key="column" class="seat-column">
                  <a-button v-for="seat in column" :key="seat._id" :class="getSeatClass(seat)"
                    @click="toggleSeat(seat._id)" :disabled="seat.vitrighe_status === 'booked'">
                    {{ seat.vitrighe_name }}
                  </a-button>
                </div>
              </div>
            </div>
          </div>
          <div class="seat-legend">
            <div><span class="seat-status available"></span> Trống</div>
            <div><span class="seat-status selecting"></span> Đang chọn</div>
            <div><span class="seat-status booked"></span> Đã chọn</div>
          </div>
        </div>

        <div class="trip-summary">
          <div>Thông tin chung:</div>
          <div>{{ ChuyenXes.tuyenduong_id.departure_city }} - {{ ChuyenXes.tuyenduong_id.arrival_city }}</div>
          <div>Quãng đường: {{ ChuyenXes.tuyenduong_id.distance }}km</div>
          <div>Thời gian di chuyển trung bình: {{ ChuyenXes.tuyenduong_id.duration }}</div>
          <div>Biển số phương tiện di chuyển: {{ ChuyenXes.xe_id.bus_number }}</div>
          <div>Giá vé: {{ ChuyenXes.price.toLocaleString() }} đ</div>
          <div>Tổng số vé: {{ selectedSeats.length }}</div>
          <div>Tổng tiền: {{ (ChuyenXes.price * selectedSeats.length).toLocaleString() }} đ</div>
        </div>

        <a-button type="primary" @click="handleBookTicket" :disabled="selectedSeats.length === 0" block>
          ĐẶT VÉ
        </a-button>
      </template>
    </a-spin>
    <a-modal title="Thêm thanh toán" :open="isAddModalVisible" @cancel="handleAddCancel" @ok="addThanhToan">
      <a-form :model="newThanhToan" layout="vertical">
        <a-form-item name="customer_id" label="ID Khách hàng">
          <a-input v-model:value="newThanhToan.customer_id" readonly />
        </a-form-item>
        <a-form-item name="ve_id" label="ID Vé">
          <a-input v-model:value="newThanhToan.ve_id" readonly />
        </a-form-item>
        <a-form-item name="amount" label="Số tiền">
          <a-input v-model:value="newThanhToan.amount" readonly />
        </a-form-item>
        <a-form-item name="payment_date" label="Ngày thanh toán">
          <a-date-picker v-model="newThanhToan.payment_date" style="width: 100%" />
        </a-form-item>
        <a-form-item name="payment_method" label="Phương thức thanh toán">
          <a-select v-model:value="newThanhToan.payment_method">
            <a-select-option value="cash">Tiền mặt</a-select-option>
            <a-select-option value="card">Thẻ tín dụng</a-select-option>
            <a-select-option value="transfer">Chuyển khoản</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-card>
</template>

<script>
import ChuyenXeService from '@/services/ChuyenXeService';
import ThanhToanService from '@/services/ThanhToanService';
import VeService from '@/services/VeService';
import ViTriGheService from '@/services/ViTriGheService';
import { EnvironmentOutlined } from '@ant-design/icons-vue';
import { notification } from 'ant-design-vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DatVe',
  components: {
    EnvironmentOutlined,
  },
  data() {
    return {
      ChuyenXes: null,
      loading: true,
      error: null,
      selectedSeats: [],
      viTriGhe: [],
      isAddModalVisible: false,
      newThanhToan: {
        customer_id: '',
        amount: 0,
        ve_id: '',
        payment_date: null,
        payment_method: '',
      },
    };
  },
  computed: {
    sortedSeats() {
      return this.viTriGhe.slice().sort((a, b) => a.vitrighe_name.localeCompare(b.vitrighe_name));
    },
    seatColumns() {
      const columns = [];
      for (let i = 0; i < this.sortedSeats.length; i += 10) {
        columns.push(this.sortedSeats.slice(i, i + 10));
      }
      return columns;
    },
    lowerDeckSeats() {
      return this.sortedSeats.filter(seat => seat.floor === 1);
    },
    upperDeckSeats() {
      return this.sortedSeats.filter(seat => seat.floor === 2);
    },
  },
  created() {
    this.fetchTripInfo();
  },
  methods: {
    async fetchTripInfo() {
      const tripId = this.$route.params.id;
      this.loading = true;
      this.error = null;

      try {
        this.ChuyenXes = await ChuyenXeService.getChuyenXeById(tripId);
        this.viTriGhe = await ViTriGheService.getViTriGheByXeId(this.ChuyenXes.xe_id._id);
      } catch (err) {
        this.error = 'Không thể tải thông tin chuyến đi. Vui lòng thử lại.';
        this.showNotification('error', this.error);
      } finally {
        this.loading = false;
      }
    },
    toggleSeat(seatId) {
      const index = this.selectedSeats.indexOf(seatId);
      if (index === -1) {
        this.selectedSeats.push(seatId);
      } else {
        this.selectedSeats.splice(index, 1);
      }
    },
    getSeatClass(seat) {
      if (seat.vitrighe_status === "booked") return 'seat-booked';
      if (this.selectedSeats.includes(seat._id)) return 'seat-selecting';
      return 'seat-available';
    },
    handleBookTicket() {
      if (this.selectedSeats.length === 0) {
        this.showNotification('error', 'Vui lòng chọn ít nhất một ghế');
        return;
      }

      const idKhachHang = localStorage.getItem('idKhachHang');
      if (!idKhachHang) {
        this.redirectToLogin();
      } else {
        this.openPaymentModal();
      }
    },

    redirectToLogin() {
      if (confirm('Bạn có đăng nhập trước khi đặt vé ?')) {
        this.$router.push('/login');
      }
    },

    async openPaymentModal() {
      this.isAddModalVisible = true;
      this.newThanhToan.customer_id = localStorage.getItem('idKhachHang');

      try {
        const veIds = await Promise.all(
          this.selectedSeats.map(seatId => VeService.getVeIdByViTriGheId(seatId))
        );
        this.newThanhToan.ve_id = veIds.join(', ');
      } catch (error) {
        console.error('Error fetching ve_id:', error);
        this.showNotification('error', 'Không thể lấy thông tin vé. Vui lòng thử lại.');
        this.isAddModalVisible = false;
        return;
      }

      this.newThanhToan.amount = this.ChuyenXes.price * this.selectedSeats.length;
      this.newThanhToan.payment_date = new Date();
    },
    handleAddCancel() {
      this.isAddModalVisible = false;
      this.resetNewThanhToan();
    },

    resetNewThanhToan() {
      this.newThanhToan = {
        customer_id: '',
        amount: 0,
        ve_id: '',
        payment_date: null,
        payment_method: '',
      };
    },

    async addThanhToan() {
      try {
        const token = await localStorage.getItem('accessToken');
        const paymentData = {
          ...this.newThanhToan,
          ve_id: this.newThanhToan.ve_id.split(', ')
        };
        await ThanhToanService.createThanhToan(paymentData, token);

        await this.updateSeatsStatus();

        this.showNotification('success', 'Thanh toán thành công!');
        this.isAddModalVisible = false;
        this.resetNewThanhToan();
        await this.bookTicket();
      } catch (error) {
        console.error('Lỗi khi thêm thanh toán:', error);
        this.showNotification('error', 'Đã xảy ra lỗi khi thêm thanh toán. Vui lòng thử lại sau.');
      }
    },

    async updateSeatsStatus() {
      try {
        const token = await localStorage.getItem('accessToken');
        await ViTriGheService.updateSeatsStatus(this.selectedSeats, "booked", token);
      } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái ghế:', error);
        throw error; // Xử lý lỗi hoặc thông báo cho người dùng
      }
    },

    async bookTicket() {
      try {
        this.showNotification('success', `Đã đặt ${this.selectedSeats.length} ghế thành công!`);
      } catch (error) {
        console.error('Lỗi khi đặt vé:', error);
        this.showNotification('error', 'Đã xảy ra lỗi khi đặt vé. Vui lòng thử lại sau.');
      }
    },
    showNotification(type, message) {
      notification[type]({
        message: 'Thông báo',
        description: message,
      });
    },
    formatTime(dateString) {
      return new Date(dateString).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('vi-VN');
    },
  }
});
</script>

<style scoped>
.dat-ve-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.trip-info {
  margin-bottom: 24px;
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.time-info {
  font-size: 24px;
  font-weight: bold;
  color: #1890ff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.arrow {
  margin: 0 16px;
  color: #52c41a;
}

.price-info {
  color: #52c41a;
  font-weight: bold;
  margin-top: 8px;
}

.station-info {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}

.station-info div {
  display: flex;
  align-items: center;
  color: #595959;
}

.station-info .anticon {
  margin-right: 8px;
  color: #1890ff;
}

.trip-details {
  margin-top: 16px;
  font-size: 14px;
  color: #8c8c8c;
}

.seat-selection {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.seat-map {
  flex-grow: 1;
  margin-right: 24px;
}

.seats {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.seat-column {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.seat-legend {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 120px;
  padding-left: 16px;
  border-left: 1px solid #f0f0f0;
}

.floor-title {
  font-weight: bold;
  margin-bottom: 16px;
  color: #262626;
}

.seat-status {
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-right: 8px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}

.available {
  background-color: #fff;
}

.selecting {
  background-color: #1890ff;
}

.booked {
  background-color: #ff4d4f;
}

.trip-summary {
  margin-top: 24px;
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.trip-summary div {
  margin-bottom: 8px;
  color: #595959;
}

.trip-summary div:first-child {
  font-weight: bold;
  color: #262626;
  margin-bottom: 12px;
}

.ant-btn-block {
  margin-top: 24px;
  height: 40px;
  font-size: 16px;
}

.seat-booked {
  background-color: #ff4d4f !important;
  color: white;
  border: none;
  border-radius: 4px;
}

.seat-selecting {
  background-color: #1890ff !important;
  color: white;
  border: none;
  border-radius: 4px;
}

.seat-available {
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}

.seat-available:hover {
  border-color: #1890ff;
  color: #1890ff;
}

.ant-divider {
  margin: 24px 0;
}

.ant-form-item-label>label {
  color: #262626;
}

.ant-modal-content {
  border-radius: 8px;
}

.ant-modal-header {
  border-radius: 8px 8px 0 0;
}

.ant-modal-footer {
  border-radius: 0 0 8px 8px;
}
</style>
