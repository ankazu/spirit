<template>
  <div>
    <Loading :active="isLoading"></Loading>
    <div class="text-end mt-4">
      <button class="btn btn-primary" type="button" @click="openCouponModal(true)">
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in coupons" :key="key">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}</td>
          <td>{{ $filters.date(item.due_date) }}</td>
          <td>
            <span class="text-success" v-if="item.is_enabled === 1">啟用</span>
            <span class="text-muted" v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" type="button">編輯</button>
              <button
                class="btn btn-outline-danger btn-sm"
                type="button"
                @click="openDelModal(item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <DeleteModal ref="DeleteModal" :item="tempCoupon" @updata="deleteCoupon"></DeleteModal>
  </div>
</template>

<script>
import DeleteModal from '@/components/DeleteModal.vue';

export default {
  data() {
    return {
      isLoading: false,
      coupons: {},
      tempCoupon: {},
    };
  },
  components: {
    DeleteModal,
  },
  inject: ['pushMessage'],
  methods: {
    getCoupons(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons?${page}`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.coupons = res.data.coupons;
          this.isLoading = false;
        }
      });
    },
    deleteCoupon(item) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons/${item.id}`;
      this.$http.delete(api).then((res) => {
        if (res.data.success) {
          this.$refs.DeleteModal.hideModal();
          this.pushMessage(res, res.data.success);
        } else {
          this.pushMessage(res, res.data.success);
        }
      });
    },
    openDelModal(item) {
      this.tempCoupon = { ...item };
      this.$refs.DeleteModal.openModal();
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
