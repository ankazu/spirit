<template>
  <Loading :active="isLoading"></Loading>
  <div>
    <div class="d-flex justify-content-end">
      <button type="button" class="btn btn-primary" @click="openModal('creat')">新增產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">
            分類
          </th>
          <th>產品名稱</th>
          <th width="120">
            原價
          </th>
          <th width="120">
            售價
          </th>
          <th width="100">
            是否啟用
          </th>
          <th width="120">
            編輯
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.origin_price }}</td>
          <td>{{ item.price }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="openModal('edit', item)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openModal('delete', item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="d-flex justify-content-center">
      <Pagination :page="pagination" @get-page="getProducts"></Pagination>
    </div>
    <ProductModal
      ref="ProductModal"
      :product="tempProduct"
      :is-new="isNew"
      @updata="updateProduct"
    ></ProductModal>
    <DeleteModal ref="DeleteModal" :item="tempProduct" @updata="deleteProduct"></DeleteModal>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination.vue';
import ProductModal from '@/components/ProductModal.vue';
import DeleteModal from '@/components/DeleteModal.vue';

export default {
  props: ['token'],
  components: {
    Pagination,
    ProductModal,
    DeleteModal,
  },
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {
        imagesUrl: [],
      },
      isNew: false,
      loadingStatus: {
        loadingItem: '',
      },
      isLoading: false,
      status: { fileUploading: false },
    };
  },
  inject: ['emitter', 'pushMessage'],
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.$http
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products;
            this.pagination = res.data.pagination;
            this.isLoading = false;
          } else {
            this.$router.push('/login');
          }
        })
        .catch((error) => {
          this.pushMessage(error, `${error.message}`);
        });
    },
    openModal(type, item) {
      if (type === 'creat') {
        this.tempProduct = {
          imagesUrl: [],
        };
        this.isNew = true;
        this.$refs.ProductModal.openModal();
      }

      if (type === 'edit') {
        this.tempProduct = JSON.parse(JSON.stringify(item));
        this.isNew = false;
        this.$refs.ProductModal.openModal();
      }
      if (type === 'delete') {
        this.tempProduct = { ...item };
        this.isNew = false;
        this.$refs.DeleteModal.openModal();
      }
    },
    updateProduct(item) {
      let api = '';
      let path = '';
      if (this.isNew) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`;
        path = 'post';
      } else {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        path = 'put';
      }
      this.$http[path](api, { data: item })
        .then((res) => {
          if (res.data.success) {
            this.$refs.ProductModal.hideModal();
            this.getProducts();
            this.pushMessage(res, `${res.data.message}`);
          } else {
            this.pushMessage(res, `${res.data.message}`);
          }
        })
        .catch((error) => {
          this.pushMessage(error, `${error.message}`);
        });
    },
    deleteProduct(item) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
      this.$http
        .delete(api)
        .then((res) => {
          if (res.data.success) {
            this.$refs.DeleteModal.hideModal();
            this.getProducts();
            this.pushMessage(res, `${res.data.message}`);
          } else {
            this.pushMessage(res, `${res.data.message}`);
          }
        })
        .catch((error) => {
          this.pushMessage(error, `${error.message}`);
        });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
