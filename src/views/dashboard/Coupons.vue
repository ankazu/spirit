<template>
  <Loading :active="isLoading"></Loading>
  <div>
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
          <td>{{ $filters.date(item.showDate) }}</td>
          <td>
            <span class="text-success" v-if="item.is_enabled === 1">啟用</span>
            <span class="text-muted" v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                type="button"
                @click="openCouponModal(false, item)"
              >
                編輯
              </button>
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
    <div class="d-flex justify-content-center">
      <Pagination :page="pagination" @get-page="getCoupons"></Pagination>
    </div>
    <DeleteModal ref="deleteModal" :item="tempCoupon" @updata="deleteCoupon"></DeleteModal>
    <CouponModal
      ref="couponModal"
      :is-new="isNew"
      :coupon="tempCoupon"
      @update-coupon="updataCoupon"
    ></CouponModal>
  </div>
</template>

<script>
import DeleteModal from '@/components/DeleteModal.vue';
import CouponModal from '@/components/CouponModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      isLoading: false,
      coupons: {
        showDate: 0,
      },
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: '',
        showDate: 0,
      },
      isNew: false,
      pagination: {},
    };
  },
  components: {
    DeleteModal,
    CouponModal,
    Pagination,
  },
  inject: ['swalert'],
  methods: {
    getCoupons(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`;
      this.$http
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.coupons = res.data.coupons;
            this.pagination = res.data.pagination;
            this.isLoading = false;
          }
        })
        .catch((err) => {
          this.swalert('error', `取得優惠券時發生錯誤。 ${err.message}`);
        });
    },
    updataCoupon(item) {
      this.isLoading = true;
      if (this.isNew) {
        const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon`;
        this.$http
          .post(api, { data: item })
          .then((res) => {
            if (res.data.success) {
              this.isLoading = false;
              this.getCoupons();
              this.swalert('success', '新增優惠券成功', 'top-end');
              this.$refs.couponModal.hideModal();
            } else {
              this.isLoading = false;
              this.swalert('error', `新增優惠券失敗。 ${res.data.message}`, 'top-end');
            }
          })
          .catch((err) => {
            this.swalert('error', `新增優惠券時發生錯誤。 ${err.message}`);
          });
      } else {
        const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`;
        this.$http
          .put(api, { data: item })
          .then((res) => {
            if (res.data.success) {
              this.isLoading = false;
              this.getCoupons();
              this.swalert('success', '更新優惠券成功', 'top-end');
              this.$refs.couponModal.hideModal();
            } else {
              this.isLoading = false;
              this.swalert('error', `新增優惠券失敗。 ${res.data.message}`, 'top-end');
            }
          })
          .catch((err) => {
            this.swalert('error', `更新優惠券時發生錯誤。 ${err.message}`);
          });
      }
    },
    deleteCoupon(item) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`;
      this.$http
        .delete(api)
        .then((res) => {
          if (res.data.success) {
            this.$refs.deleteModal.hideModal();
            this.isLoading = false;
            this.getCoupons();
            this.swalert('success', '刪除優惠券成功', 'top-end');
          } else {
            this.swalert('error', `刪除優惠券失敗。 ${res.data.message}`, 'top-end');
          }
        })
        .catch((err) => {
          this.swalert('success', `刪除優惠券時發生錯誤。 ${err.message}`);
        });
    },
    openCouponModal(isNew, item) {
      this.isNew = isNew;
      if (this.isNew) {
        this.tempCoupon = {
          due_date: Math.floor(Date.now() / 1000),
          is_enabled: 0,
          showDate: Math.floor(Date.now() / 1000),
        };
      } else {
        this.tempCoupon = {
          ...item,
          showDate: item.showDate,
        };
      }
      this.$refs.couponModal.openModal();
    },
    openDelModal(item) {
      this.tempCoupon = { ...item };
      this.$refs.deleteModal.openModal();
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
