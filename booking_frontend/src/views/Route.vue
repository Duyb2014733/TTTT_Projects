<template>
    <div class="container">
        <div class="header">
            <h1>Quản lý tuyến đường</h1>
            <a-button type="primary" @click="showAddModal">
                <i class="fa-solid fa-plus"></i>
                <span class="ms-2">Thêm tuyến đường</span>
            </a-button>
        </div>

        <a-table :columns="columns" :data-source="routes" rowKey="_id">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                    <a-button @click="showEditModal(record)">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </a-button>
                    <a-button type="primary" danger @click="deleteRecord(record._id)" style="margin-left: 10px;">
                        <i class="fa-solid fa-trash"></i>
                    </a-button>
                </template>
                <template v-else-if="column.key === 'stops'">
                    <ul>
                        <li v-for="(stop, index) in record.stops" :key="index">
                            <strong>Vị trí:</strong> {{ stop.location }} -
                            <strong>Thời gian đến:</strong> {{ formatDate(stop.arrival_time) }}
                        </li>
                    </ul>
                </template>
                <template v-else>
                    {{ record[column.dataIndex] }}
                </template>
            </template>
        </a-table>

        <!-- Add Route Modal -->
        <a-modal title="Thêm tuyến đường" v-model:open="isAddModalVisible" @cancel="handleAddCancel" @ok="addRoute">
            <a-form ref="addFormRef" :model="newRoute" layout="vertical" name="add_form">
                <a-form-item name="stops" label="Trạm dừng">
                    <div v-for="(stop, index) in newRoute.stops" :key="index">
                        <a-input v-model:value="stop.location" placeholder="Vị trí trạm dừng" />
                        <a-date-picker v-model:value="stop.arrival_time" show-time placeholder="Thời gian đến" />
                        <a-button type="danger" @click="removeStop(index)">Xóa</a-button>
                    </div>
                    <a-button type="primary" @click="addStop">Thêm trạm dừng</a-button>
                </a-form-item>
            </a-form>
        </a-modal>

        <!-- Edit Route Modal -->
        <a-modal title="Chỉnh sửa tuyến đường" v-model:open="isEditModalVisible" @cancel="handleEditCancel"
            @ok="editRoute">
            <a-form ref="editFormRef" :model="currentRoute" layout="vertical" name="edit_form">
                <a-form-item name="stops" label="Trạm dừng">
                    <div v-for="(stop, index) in currentRoute.stops" :key="index">
                        <a-input v-model:value="stop.location" placeholder="Vị trí trạm dừng" />
                        <a-date-picker v-model="stop.arrival_time" show-time placeholder="Thời gian đến" />
                        <a-button type="danger" @click="removeEditStop(index)">Xóa</a-button>
                    </div>
                    <a-button type="primary" @click="addEditStop">Thêm trạm dừng</a-button>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script>
import RouteService from "@/services/RouteService";
import { notification } from 'ant-design-vue';
import { format } from 'date-fns';

export default {
    data() {
        return {
            columns: [
                { title: 'Trạm dừng', key: 'stops' },
                { title: 'Hành động', key: 'action' },
            ],
            routes: [],
            isAddModalVisible: false,
            isEditModalVisible: false,
            newRoute: { stops: [{ location: '', arrival_time: null }] },
            currentRoute: null,
        };
    },
    methods: {
        async fetchRoutes() {
            try {
                this.routes = await RouteService.getAllRoutes();
            } catch (error) {
                console.error('Error fetching routes:', error);
            }
        },
        showAddModal() {
            this.isAddModalVisible = true;
        },
        async addRoute() {
            try {
                await this.$refs.addFormRef.validate();
                await RouteService.createRoute(this.newRoute);
                await this.fetchRoutes();
                this.isAddModalVisible = false;
                this.resetNewRoute();
                this.showNotification('success', 'Route added successfully');
            } catch (error) {
                console.error('Error adding route:', error);
            }
        },
        handleAddCancel() {
            this.isAddModalVisible = false;
            this.resetNewRoute();
        },
        resetNewRoute() {
            this.newRoute = { stops: [{ location: '', arrival_time: null }] };
        },
        showEditModal(route) {
            this.currentRoute = { ...route };
            this.isEditModalVisible = true;
        },
        async editRoute() {
            try {
                await this.$refs.editFormRef.validate();
                await RouteService.updateRoute(this.currentRoute._id, this.currentRoute);
                await this.fetchRoutes();
                this.isEditModalVisible = false;
                this.showNotification('success', 'Route updated successfully');
            } catch (error) {
                console.error('Error updating route:', error);
            }
        },
        handleEditCancel() {
            this.isEditModalVisible = false;
        },
        async deleteRecord(routeId) {
            if (confirm('Bạn có chắc muốn xóa tuyến đường này không?')) {
                try {
                    await RouteService.deleteRoute(routeId);
                    await this.fetchRoutes();
                    this.showNotification('success', 'Route deleted successfully');
                } catch (error) {
                    console.error('Error deleting route:', error);
                }
            }
        },
        showNotification(type, message) {
            notification[type]({
                message: 'Thông báo',
                description: message,
            });
        },
        addStop() {
            this.newRoute.stops.push({ location: '', arrival_time: null });
        },
        removeStop(index) {
            this.newRoute.stops.splice(index, 1);
        },
        addEditStop() {
            this.currentRoute.stops.push({ location: '', arrival_time: null });
        },
        removeEditStop(index) {
            this.currentRoute.stops.splice(index, 1);
        },
        formatDate(date) {
            return format(new Date(date), 'dd/MM/yyyy HH:mm');
        },
    },
    mounted() {
        this.fetchRoutes();
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
