<template>
  <Loading :active="isLoading" />
  <table class="table mt-4">
    <thead>
      <tr>
        <th>購買時間</th>
        <th>Email</th>
        <th>購買款項</th>
        <th>應付金額</th>
        <th>是否付款</th>
        <th>編輯</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(item, key) in orders" :key="key">
        <tr>
          <td>{{ $filters.date(item.create_at) }}</td>
          <td><span v-text="item.user.email"></span></td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td>{{ $filters.currency(item.total) }}</td>
          <td>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                :id="`paid${item.id}`"
                v-model="item.is_paid"
                @change="updatePaid(item)"
              />
              <label class="form-check-label" :for="`paid${item.id}`">
                <span v-if="item.is_paid">已付款</span>
                <span v-else>未付款</span>
              </label>
            </div>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" type="button" @click="openModal(item)">
                檢視
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                type="button"
                @click="openDelOrderModal(item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
  <OrderModal ref="orderModal" :order="tempOrder" @update-paid="updatePaid" />
  <DeleteModal ref="DeleteModal" :item="tempOrder" @updata="deleteOrder" />
  <div class="d-flex justify-content-center">
    <Pagination :page="pagination" />
  </div>
</template>
<script>
import OrderModal from '@/components/OrderModal.vue';
import Pagination from '@/components/Pagination.vue';
import DeleteModal from '@/components/DeleteModal.vue';

export default {
  data() {
    return {
      orders: {},
      isLoading: false,
      tempOrder: {},
      pagination: {},
      currentPage: 1,
    };
  },
  components: {
    OrderModal,
    Pagination,
    DeleteModal,
  },
  created() {
    this.getOrders();
  },
  inject: ['swalert'],
  methods: {
    getOrders(page = 1) {
      this.currentPage = page;
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?${page}`;
      this.$http
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.orders = res.data.orders;
            this.pagination = res.data.pagination;
            this.isLoading = false;
          } else {
            this.swalert('error', `取得訂單失敗。 ${res.data.message}`, 'top-end');
          }
        })
        .catch((err) => {
          this.swalert('error', `取得訂單時發生錯誤。 ${err.message}`);
        });
    },
    updatePaid(item) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`;
      let paidDate = 0;
      if (item.is_paid) {
        paidDate = Date.parse(new Date()) / 1000;
      } else {
        paidDate = null;
      }
      const paid = {
        is_paid: item.is_paid,
        paid_date: paidDate,
      };

      this.$http
        .put(api, { data: paid })
        .then((res) => {
          if (res.data.success) {
            this.isLoading = false;
            this.$refs.orderModal.hideModal();
            this.getOrders(this.currentPage);
            this.swalert('success', '已更新付款時間', 'top-end');
          } else {
            this.swalert('error', `更新付款時間失敗。 ${res.data.message}`, 'top-end');
          }
        })
        .catch((err) => {
          this.swalert('error', `更新付款時間發生錯誤。 ${err.message}`);
        });
    },
    openModal(item) {
      this.tempOrder = JSON.parse(JSON.stringify(item));
      this.$refs.orderModal.openModal();
    },
    openDelOrderModal(item) {
      this.tempOrder = { ...item };
      this.$refs.DeleteModal.openModal();
    },
    deleteOrder(item) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`;
      this.$http
        .delete(api)
        .then((res) => {
          if (res.data.success) {
            this.$refs.DeleteModal.hideModal();
            this.getOrders(this.currentPage);
            this.swalert('success', '刪除訂單成功', 'top-end');
          } else {
            this.swalert('error', `刪除訂單失敗。 ${res.data.message}`, 'top-end');
          }
        })
        .catch((err) => {
          this.swalert('error', `刪除訂單時發生錯誤。 ${err.message}`);
        });
    },
  },
};
</script>
