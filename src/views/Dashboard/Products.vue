<template>
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
          <td class="">{{ item.origin_price }}</td>
          <td class="">{{ item.price }}</td>
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
    <div class="page">
      <Pagination :page="pagination" @get-page="getProducts"></Pagination>
    </div>
    <EideProductModal
      ref="EideProductModal"
      :product="tempProduct"
      :is-new="isNew"
      @updata="updata"
    ></EideProductModal>
    <DeleteProductModal
      ref="DeleteProductModal"
      :temp-product="tempProduct"
      @updata="deleteProduct"
    ></DeleteProductModal>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination.vue';
import EideProductModal from '@/components/EideProductModal.vue';
import DeleteProductModal from '@/components/DeleteProductModal.vue';

export default {
  props: ['token'],
  components: {
    Pagination,
    EideProductModal,
    DeleteProductModal,
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
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        } else {
          console.log(res.data.message);
        }
      });
    },
    openModal(type, item) {
      if (type === 'creat') {
        this.tempProduct = {
          imagesUrl: [],
        };
        this.isNew = true;
        this.$refs.EideProductModal.openModal();
      }

      if (type === 'edit') {
        this.tempProduct = { ...item };
        this.isNew = false;
        this.$refs.EideProductModal.openModal();
      }
      if (type === 'delete') {
        this.tempProduct = { ...item };
        this.isNew = false;
        this.$refs.DeleteProductModal.openModal();
      }
    },
    updata(item) {
      let api = '';
      let path = '';
      if (this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
        path = 'post';
      } else {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        path = 'put';
      }
      this.$http[path](api, { data: item }).then((res) => {
        if (res.data.success) {
          this.$refs.EideProductModal.hideModal();
          this.getProducts();
        } else {
          console.log(res.data.message);
        }
      });
    },
    deleteProduct(item) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
      this.$http.delete(api).then((res) => {
        if (res.data.success) {
          console.log('刪除成功');
          this.$refs.DeleteProductModal.hideModal();
          this.getProducts();
        } else {
          console.log(res.data.message);
        }
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style scoped lang="scss">
.page {
  display: flex;
  justify-content: center;
}
</style>
