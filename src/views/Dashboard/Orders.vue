<template>
  <Loading :active="isLoading"></Loading>
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
          <!-- 為什麼下面span要加v-if做判斷 -->
          <td><span v-text="item.user.email" v-if="item.user"></span></td>
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
  <OrderModal ref="orderModal" :order="tempOrder" @update-paid="updatePaid"></OrderModal>
  <DeleteModal ref="DeleteModal" :item="tempOrder" @updata="deleteOrder"></DeleteModal>
  <div class="d-flex justify-content-center">
    <Pagination :page="pagination"></Pagination>
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
  inject: ['pushMessage'],
  methods: {
    getOrders(page = 1) {
      this.currentPage = page;
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?${page}`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.orders = res.data.orders;
          this.pagination = res.data.pagination;
          console.log(this.orders);
          this.isLoading = false;
        } else {
          this.pushMessage(res, `${res.data.message}`);
        }
      });
    },
    updatePaid(item) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`;
      const paid = {
        is_paid: item.is_paid,
      };
      this.$http.put(api, { data: paid }).then((res) => {
        if (res.data.success) {
          this.isLoading = false;
          this.$refs.orderModal.hideModal();
          this.getOrders(this.currentPage);
          this.pushMessage(res, `${res.data.message}`);
        } else {
          this.pushMessage(res, `${res.data.message}`);
        }
      });
    },
    openModal(item) {
      this.tempOrder = { ...item };
      this.$refs.orderModal.openModal();
    },
    openDelOrderModal(item) {
      this.tempOrder = { ...item };
      this.$refs.DeleteModal.openModal();
    },
    deleteOrder(item) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`;
      this.$http.delete(api).then((res) => {
        if (res.data.success) {
          this.$refs.DeleteModal.hideModal();
          this.getOrders(this.currentPage);
          this.pushMessage(res, `${res.data.message}`);
        } else {
          this.pushMessage(res, `${res.data.message}`);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
