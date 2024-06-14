<template>
    <a-space class="site-input-group-wrapper" direction="vertical" size="middle">
        <a-input-group compact>
            <a-select v-model="diem_bat_dau" show-search placeholder="Điểm bắt đầu" style="width: 25%"
                :options="options" :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur"
                @change="handleChange"></a-select>
            <a-select v-model="diem_ket_thuc" show-search placeholder="Điểm kết thúc" style="width: 25%"
                :options="options" :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur"
                @change="handleChange"></a-select>
            <a-date-picker v-model="thoi_gian_khoi_hanh" style="width: 25%" />
            <a-tooltip title="copy git url" style="width: 25%">
                <a-button>
                    <template #icon>
                        <CopyOutlined />
                    </template>
                </a-button>
            </a-tooltip>
        </a-input-group>
    </a-space>
</template>

<script>
import { CopyOutlined } from '@ant-design/icons-vue';
export default {
    components: {
        CopyOutlined
    },
    data() {
        return {
            diem_bat_dau: '',
            diem_ket_thuc: '',
            thoi_gian_khoi_hanh: '',
            options: [] // Thêm mảng options ở đây
        };
    },
    methods: {
        search() {
            // Truyền các giá trị đã chọn để thực hiện tìm kiếm
            this.$emit('search', {
                diem_bat_dau: this.diem_bat_dau,
                diem_ket_thuc: this.diem_ket_thuc,
                thoi_gian_khoi_hanh: this.thoi_gian_khoi_hanh
            });
        },
        handleChange(value) {
            console.log(`selected ${value}`);
        },
        handleBlur() {
            console.log('blur');
        },
        handleFocus() {
            console.log('focus');
        },
        filterOption(input, option) {
            return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        }
    }
};
</script>

<style scoped>
.site-input-group-wrapper .site-input-split {
    background-color: #fff;
}

.site-input-group-wrapper .site-input-right {
    border-left-width: 0;
}

.site-input-group-wrapper .site-input-right:hover,
.site-input-group-wrapper .site-input-right:focus {
    border-left-width: 1px;
}

.site -input-group-wrapper .ant-input-rtl.site-input-right {
    border-right-width: 0;
}

.site-input-group-wrapper .ant-input-rtl.site-input-right:hover,
.site-input-group-wrapper .ant-input-rtl.site-input-right:focus {
    border-right-width: 1px;
}

[data-theme='dark'] .site-input-group-wrapper .site-input-split {
    background-color: transparent;
}
</style>