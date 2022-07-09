<template>
  <Loading :active="isLoading" />
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
      <Pagination :page="pagination" @get-page="getProducts" />
    </div>
    <ProductModal
      ref="ProductModal"
      :product="tempProduct"
      :is-new="isNew"
      @update-product="updata"
    />
    <DeleteModal ref="DeleteModal" :item="tempProduct" @updata="deleteProduct" />
  </div>
</template>

<script>
import { apiGetProducts, apiUpdateProducts, apiDeleteProducts } from '@/methods/api';
import Pagination from '@/components/frontend/Pagination.vue';
import DeleteModal from '@/components/backend/DeleteModal.vue';
import ProductModal from '@/components/backend/ProductModal.vue';

export default {
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
  inject: ['emitter', 'swalert'],
  methods: {
    getProducts(page) {
      this.isLoading = true;
      apiGetProducts(page)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products;
            this.pagination = res.data.pagination;
            this.isLoading = false;
          } else {
            this.$router.push('/login');
          }
        })
        .catch(() => {
          this.swalert('error', '取得商品列表出現錯誤');
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
    updata(item) {
      let id = '';
      let path = '';
      if (this.isNew) {
        path = 'post';
      } else {
        id = item.id;
        path = 'put';
      }
      apiUpdateProducts(path, { data: item }, id)
        .then((res) => {
          if (res.data.success) {
            this.$refs.ProductModal.hideModal();
            this.getProducts();
            this.swalert('success', '更新產品成功', 'top-end');
          } else {
            this.swalert('error', `更新產品失敗。 ${res.data.message}`, 'top-end');
          }
        })
        .catch((err) => {
          this.swalert('error', `更新產品時出現錯誤。 ${err.message}`);
        });
    },
    deleteProduct(item) {
      apiDeleteProducts(item.id)
        .then((res) => {
          if (res.data.success) {
            this.$refs.DeleteModal.hideModal();
            this.getProducts();
            this.swalert('success', '刪除產品成功', 'top-end');
          } else {
            this.swalert('erroe', `刪除產品失敗。 ${res.data.message}`, 'top-end');
          }
        })
        .catch((err) => {
          this.swalert('error', `刪除產品時出現錯誤。 ${err.message}`);
        });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
