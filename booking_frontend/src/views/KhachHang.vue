<template>
    <div class="container">
        <div class="header">
            <h1>Quản lý Nhà Xe</h1>
            <!-- <a-button type="primary" @click="showAddModal">
                <i class="fa-solid fa-plus"></i>
                <span class="ms-2">Thêm khách hàng</span>
            </a-button> -->
        </div>

        <a-table :columns="columns" :data-source="KhachHangs" rowKey="_id">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                    <a-button danger @click="showEditModal(record)">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </a-button>
                    <a-button type="primary" danger @click="deleteRecord(record._id)" style="margin-left: 10px;">
                        <i class="fa-solid fa-trash"></i>
                    </a-button>
                </template>
                <template v-else>
                    {{ record[column.dataIndex] }}
                </template>
            </template>
        </a-table>

        <!-- Add NhaXe Modal -->
        <!-- <a-modal title="Thêm Khách Hàng" v-model:open="isAddModalVisible" @cancel="handleAddCancel" @ok="addKhachHang">
            <a-form ref="addFormRef" :model="newKhachHang" layout="vertical" name="add_form">
                <a-form-item name="name" label="Tên Khách Hàng"
                    :rules="[{ required: true, message: 'Vui lòng nhập khách hàng!' }]">
                    <a-input v-model:value="newKhachHang.name" placeholder="Tên Khách Hàng" />
                </a-form-item>
                <a-form-item name="email" label="Email" :rules="[{ required: true, message: 'Vui lòng nhập email!' }]">
                    <a-input v-model:value="newKhachHang.email" placeholder="Email" />
                </a-form-item>
                <a-form-item name="phone" label="Số điện thoại"
                    :rules="[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]">
                    <a-input v-model:value="newKhachHang.phone" placeholder="Số điện thoại" />
                </a-form-item>
                <a-form-item name="address" label="Địa chỉ"
                    :rules="[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]">
                    <a-input v-model:value="newKhachHang.address" placeholder="Địa chỉ" />
                </a-form-item>
            </a-form>
        </a-modal> -->

        <!-- Edit Bus Station Modal -->
        <a-modal title="Chỉnh Sửa Trạm" v-model:open="isEditModalVisible" @cancel="handleEditCancel"
            @ok="editKhachHang">
            <a-form ref="editFormRef" :model="currentKhachHang" layout="vertical" name="edit_form">
                <a-form-item name="name" label="Tên Khách Hàng"
                    :rules="[{ required: true, message: 'Vui lòng nhập khách hàng!' }]">
                    <a-input v-model:value="currentKhachHang.name" placeholder="Tên Khách Hàng" />
                </a-form-item>
                <a-form-item name="email" label="Email" :rules="[{ required: true, message: 'Vui lòng nhập email!' }]">
                    <a-input v-model:value="currentKhachHang.email" placeholder="Email" />
                </a-form-item>
                <a-form-item name="phone" label="Số điện thoại"
                    :rules="[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]">
                    <a-input v-model:value="currentKhachHang.phone" placeholder="Số điện thoại" />
                </a-form-item>
                <a-form-item name="address" label="Địa chỉ"
                    :rules="[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]">
                    <a-input v-model:value="currentKhachHang.address" placeholder="Địa chỉ" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<script>
import KhachHangService from "@/services/KhachHangService";
import { notification } from 'ant-design-vue';

export default {
    data() {
        return {
            columns: [
                { title: 'Tên Khách Hàng', dataIndex: 'name', key: 'name' },
                { title: 'Email', dataIndex: 'email', key: 'email' },
                { title: 'Số Điện Thoại', dataIndex: 'phone', key: 'phone' },
                { title: 'Địa chỉ', dataIndex: 'address', key: 'address' },
                { title: 'Hành Động', key: 'action' },
            ],
            KhachHangs: [],
            isAddModalVisible: false,
            isEditModalVisible: false,
            newKhachHang: { name: '', email: '', phone: '', address: '', },
            currentKhachHang: null,
        };
    },
    methods: {
        async fetchKhachHangs() {
            try {
                this.KhachHangs = await KhachHangService.getAllKhachHangs();
            } catch (error) {
                console.error('Error fetching bus stations:', error);
            }
        },
        // showAddModal() {
        //     this.isAddModalVisible = true;
        // },
        // async addKhachHang() {
        //     try {
        //         await this.$refs.addFormRef.validate();
        //         await KhachHangService.createKhachHang(this.newKhachHang);
        //         await this.fetchKhachHangs();
        //         this.isAddModalVisible = false;
        //         this.resetNewKhachHang();
        //         this.showNotification('success', 'Bus station added successfully');
        //     } catch (error) {
        //         console.error('Error adding bus station:', error);
        //     }
        // },
        // handleAddCancel() {
        //     this.isAddModalVisible = false;
        //     this.resetNewKhachHang();
        // },
        resetNewKhachHang() {
            this.newKhachHang = { company_name: '', bus_number: '', bus_type: '' };
        },
        showEditModal(KhachHang) {
            this.currentKhachHang = { ...KhachHang };
            this.isEditModalVisible = true;
        },
        async editKhachHang() {
            try {
                await this.$refs.editFormRef.validate();
                await KhachHangService.updateKhachHang(this.currentKhachHang._id, this.currentKhachHang);
                await this.fetchKhachHangs();
                this.isEditModalVisible = false;
                this.showNotification('success', 'Cập nhật thông tin khách hàng thành công!');
            } catch (error) {
                console.error('Error updating bus station:', error);
            }
        },
        handleEditCancel() {
            this.isEditModalVisible = false;
        },
        async deleteRecord(KhachHangId) {
            if (confirm('Bạn có chắc muốn xóa trạm này không?')) {
                try {
                    await KhachHangService.deleteKhachHang(KhachHangId);
                    await this.fetchKhachHangs();
                    this.showNotification('success', 'Xóa thông tin khách hàng thành công!');
                } catch (error) {
                    console.error('Error deleting bus station:', error);
                }
            }
        },
        showNotification(type, message) {
            notification[type]({
                message: 'Thông báo',
                description: message,
            });
        },
    },
    mounted() {
        this.fetchKhachHangs();
    },
};
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

h1 {
    font-size: 24px;
    font-weight: bold;
}

.ms-2 {
    margin-left: 0.5rem;
}
</style>
