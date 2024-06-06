<template>
    <div class="container">
        <div class="header">
            <h1>Quản lý vé</h1>
            <a-button type="primary" @click="showAddModal">
                <i class="fa-solid fa-plus"></i>
                <span class="ms-2">Thêm Vé</span>
            </a-button>
        </div>

        <a-table :columns="columns" :data-source="tickets" rowKey="_id">
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

        <!-- Add Ticket Modal -->
        <a-modal title="Thêm Vé" v-model:open="isAddModalVisible" @cancel="handleAddCancel" @ok="addTicket">
            <a-form ref="addFormRef" :model="newTicket" layout="vertical" name="add_form">
                <a-form-item name="ticket_number" label="Số Vé"
                    :rules="[{ required: true, message: 'Vui lòng nhập số vé!' }]">
                    <a-input v-model:value="newTicket.ticket_number" placeholder="Số Vé" />
                </a-form-item>
                <a-form-item name="price" label="Giá" :rules="[{ required: true, message: 'Vui lòng nhập giá vé!' }]">
                    <a-input v-model:value="newTicket.price" placeholder="Giá" />
                </a-form-item>
                <a-form-item name="departure_datetime" label="Ngày Giờ Khởi Hành"
                    :rules="[{ required: true, message: 'Vui lòng nhập ngày giờ khởi hành!' }]">
                    <a-date-picker v-model:value="newTicket.departure_datetime" show-time placeholder="Chọn ngày giờ" />
                </a-form-item>
            </a-form>
        </a-modal>

        <!-- Edit Ticket Modal -->
        <a-modal title="Chỉnh Sửa Vé" v-model:open="isEditModalVisible" @cancel="handleEditCancel" @ok="editTicket">
            <a-form ref="editFormRef" :model="currentTicket" layout="vertical" name="edit_form">
                <a-form-item name="ticket_number" label="Số Vé"
                    :rules="[{ required: true, message: 'Vui lòng nhập số vé!' }]">
                    <a-input v-model:value="currentTicket.ticket_number" placeholder="Số Vé" />
                </a-form-item>
                <a-form-item name="price" label="Giá" :rules="[{ required: true, message: 'Vui lòng nhập giá vé!' }]">
                    <a-input v-model:value="currentTicket.price" placeholder="Giá" />
                </a-form-item>
                <a-form-item name="departure_datetime" label="Ngày Giờ Khởi Hành"
                    :rules="[{ required: true, message: 'Vui lòng nhập ngày giờ khởi hành!' }]">
                    <a-date-picker v-model="currentTicket.departure_datetime" show-time placeholder="Chọn ngày giờ" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script>
import TicketService from "@/services/TicketService";
import { notification } from 'ant-design-vue';
import { format, parseISO } from 'date-fns';

export default {
    data() {
        return {
            columns: [
                { title: 'Số Vé', dataIndex: 'ticket_number', key: 'ticket_number' },
                { title: 'Giá', dataIndex: 'price', key: 'price' },
                { title: 'Ngày Giờ Khởi Hành', dataIndex: 'departure_datetime', key: 'departure_datetime' },
                { title: 'Hành Động', key: 'action' },
            ],
            tickets: [],
            isAddModalVisible: false,
            isEditModalVisible: false,
            newTicket: { ticket_number: '', price: '', departure_datetime: null },
            currentTicket: { ticket_number: '', price: '', departure_datetime: null },
        };
    },
    methods: {
        async fetchTickets() {
            try {
                this.tickets = await TicketService.getAllTickets();
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        },
        showAddModal() {
            this.isAddModalVisible = true;
        },
        async addTicket() {
            try {
                await this.$refs.addFormRef.validate();
                await TicketService.createTicket(this.newTicket);
                await this.fetchTickets();
                this.isAddModalVisible = false;
                this.resetNewTicket();
                this.showNotification('success', 'Ticket added successfully');
            } catch (error) {
                console.error('Error adding ticket:', error);
            }
        },



        handleAddCancel() {
            this.isAddModalVisible = false;
            this.resetNewTicket();
        },
        resetNewTicket() {
            this.newTicket = { ticket_number: '', price: '', departure_datetime: null };
        },
        showEditModal(ticket) {
            this.currentTicket = { ...ticket, departure_datetime: parseISO(ticket.departure_datetime) };
            this.isEditModalVisible = true;
        },
        async editTicket() {
            try {
                await this.$refs.editFormRef.validate();
                this.currentTicket.departure_datetime = format(this.currentTicket.departure_datetime, "yyyy-MM-dd'T'HH:mm:ssxxx");
                await TicketService.updateTicket(this.currentTicket._id, this.currentTicket);
                await this.fetchTickets();
                this.isEditModalVisible = false;
                this.showNotification('success', 'Ticket updated successfully');
            } catch (error) {
                console.error('Error updating ticket:', error);
            }
        },
        handleEditCancel() {
            this.isEditModalVisible = false;
        },
        async deleteRecord(ticketId) {
            if (confirm('Bạn có chắc muốn xóa vé này không?')) {
                try {
                    await TicketService.deleteTicket(ticketId);
                    await this.fetchTickets();
                    this.showNotification('success', 'Ticket deleted successfully');
                } catch (error) {
                    console.error('Error deleting ticket:', error);
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
        this.fetchTickets();
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
