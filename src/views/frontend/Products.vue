<template>
  <Loading :active="isLoading" />
  <!-- banner -->
  <div
    class="position-relative inn_banner"
    style="background-image: url(https://storage.googleapis.com/vue-course-api.appspot.com/johnming/1626702470408.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=ZuqNZWkgZBvbuQu3515xnP5l%2Bh5x1jGih70wSKtxcdMTQgNWxM0WF5AdK11nyRG3Qe02U8a4Ijyphjm6xIKzs17C5O6pXl7zt0yGU8pPyIC%2Fouy7kCDPE9bOmNx8NnD64mY4zdcBq7g7aR54DvMcaLMdPXKdzgPiy1NPjhantn6uEVmk%2Frf%2FQTDiWwjkGK8rU19hO6qLK44Li8MD%2FaPS0dnZMOOSN9C%2BBHBzCrn6G4xlfEQnpzBGLh3%2Fcj9%2BIjwpMrPcj%2FELpzOZpGLOmvcIcFaM5yzbrFcS4zM4WHNj42BqI1n2f72s5zJ%2FfkOFSXld697HdYuhORB0eop%2F0C9npg%3D%3D)"
  >
    <div>
      <h2 class="position-absolute start-50 top-50 translate-middle fw-bold text-white">
        {{ pathData.purpose }}
      </h2>
    </div>
  </div>
  <!-- content -->
  <div class="container">
    <Path :path-data="pathData" />
    <div class="row mt-4">
      <div class="col-12 col-lg-3 col-xl-2 nav_left" ref="navLeft">
        <p class="bg-primary nav_tar">
          產品種類
          <span class="material-icons">
            expand_more
          </span>
        </p>
        <ul :class="{ open: sideUl }">
          <li @click="getProducts()" :class="{ active: productValue === '' }">
            全部產品
          </li>
          <li
            v-for="item in category"
            :key="item.id"
            @click="filterCategory(item)"
            :class="{ active: item === productValue }"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="col-12 col-lg-9 col-xl-10 ms-md-auto ps-md-4">
        <ul class="row p-0">
          <li
            class="col-6 col-sm-4 col-xl-3 mb-5 text-start list-none"
            v-for="item in pageProducts"
            :key="item.id"
          >
            <div class="product">
              <div class="product_img">
                <div class="stretched-link" @click="getProduct(item.id)">
                  <img :src="item.imageUrl" :alt="item.title" />
                </div>
              </div>
              <div class="product_baking" v-if="item.baking">{{ item.baking }}</div>
              <div class="product_baking_1" v-else></div>
              <div class="product_title">{{ item.title }}</div>
              <div class="product_dec">
                {{ item.decription }}
              </div>
              <div class="product_price">
                <div class="product_price_1" v-if="item.price === item.origin_price">
                  {{ $filters.currency(item.origin_price) }} 元 / {{ item.unit }}
                </div>
                <del class="product_price_2" v-if="item.price !== item.origin_price">
                  原價 {{ $filters.currency(item.origin_price) }} 元
                </del>
                <div class="product_price_2" v-if="item.price !== item.origin_price">
                  特價 {{ $filters.currency(item.price) }} 元 / {{ item.unit }}
                </div>
              </div>
              <div class="d-flex mt-2">
                <button
                  :disabled="loadingStatus.loadingItem === item.id"
                  @click="addToCart(item.id)"
                  type="button"
                  class="btn btn-secondary w-100"
                >
                  <i
                    class="spinner-border spinner-border-sm"
                    v-if="loadingStatus.loadingItem === item.id"
                  ></i>
                  加入購物車
                </button>
              </div>
            </div>
          </li>
        </ul>
        <div class="page" v-if="pageShow">
          <Pagination :page="pages" @get-page="getCurrentPage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import emitter from '@/methods/eventBus';
import Path from '@/components/Path.vue';

export default {
  inject: ['swalert'],
  components: {
    Path,
    Pagination,
  },
  data() {
    return {
      loadingStatus: { loadingItem: '' },
      isLoading: false,
      products: [],
      pages: {
        dataLen: 0, // 全部資料長度
        total_pages: 1, // 根據產品總筆數算出的總頁數
        perpage: 12, // 預設每頁顯示幾筆資料
        current_page: 1, // 當前頁數
        has_pre: false,
        has_next: true,
      },
      pageProducts: [],
      category: [],
      pageShow: true,
      productValue: '',
      sideUl: false,
      pathData: {
        previous: [
          {
            title: '首頁',
            url: '/',
          },
        ],
        purpose: '產品列表',
      },
    };
  },
  mounted() {
    this.getProducts();
    const sideBtn = this.$refs.navLeft;
    sideBtn.addEventListener('click', () => {
      if (window.innerWidth < 993) {
        if (this.sideUl) {
          this.sideUl = false;
        } else {
          this.sideUl = true;
        }
      }
    });
  },
  methods: {
    getProducts() {
      this.isLoading = true;
      this.pageShow = true;
      this.productValue = '';
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products;
            // 種類
            const categories = new Set();
            this.products.forEach((item) => {
              categories.add(item.category);
            });
            this.category = Array.from(categories);
            this.getProductsList(this.products);
            this.isLoading = false;
          } else {
            this.isLoading = false;
            this.swalert('error', `取得產品列表時發生錯誤。 ${res.data.message}`);
          }
        })
        .catch((err) => {
          this.swalert('error', `取得產品發生錯誤，請重新整理此頁面。 ${err.message}`);
        });
    },
    getProduct(id) {
      this.$router.push(`/product/${id}`);
    },
    filterCategory(e) {
      this.isLoading = true;
      this.pageShow = false;
      this.pageProducts = this.products.filter((product) => {
        if (product.category === e) {
          this.productValue = e;
          return product;
        }
        if (e === undefined) {
          this.productValue = 1;
          return this.products;
        }
        return false;
      });
      this.getProductsList(this.pageProducts);
      this.isLoading = false;
    },
    addToCart(id, qty = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      const cart = { product_id: id, qty };
      this.$http
        .post(api, {
          data: cart,
        })
        .then((res) => {
          if (res.data.success) {
            this.isLoading = false;
            emitter.emit('updata-cart');
            this.sideUl = false;
            this.swalert('success', '已加入購物車');
          } else {
            this.sideUl = false;
            this.swalert('error', `加入失敗。 ${res.data.message}`);
          }
        })
        .catch((err) => {
          this.swalert('error', `加入購物車時發生錯誤，請重新整理此頁面。 ${err.message}`);
        });
    },
    getProductsList(productslist) {
      // 客製化 Pagination
      this.pages.dataLen = productslist.length; // 取得全部資料長度
      this.pages.total_pages = Math.ceil(this.pages.dataLen / this.pages.perpage);
      if (this.pages.current_page > this.pages.total_pages) {
        this.pages.current_page = this.pages.total_pages;
      }
      const minData = this.pages.current_page * this.pages.perpage - this.pages.perpage + 1;
      const maxData = this.pages.current_page * this.pages.perpage;
      this.pageProducts = [];
      productslist.forEach((item, index) => {
        const num = index + 1;
        if (num >= minData && num <= maxData) {
          this.pageProducts.push(item);
        }
      });
      if (this.pages.dataLen <= 12) {
        this.pageShow = false;
      } else {
        this.pageShow = true;
      }
    },
    getCurrentPage(getPage) {
      this.pages.current_page = getPage;
      if (getPage > 1) {
        this.pages.has_pre = true;
      } else if (getPage === this.pages.current_page) {
        this.pages.has_pre = false;
      }
      if (getPage < this.pages.total_pages) {
        this.pages.has_next = true;
      } else if (getPage === this.pages.total_pages) {
        this.pages.has_next = false;
      }
      this.getProducts();
    },
  },
};
</script>

<style scoped lang="scss">
li {
  list-style: none;
}
.inn_banner {
  height: 250px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  @media only screen and (max-width: 600px) {
    background-position: 63% center;
  }
}
.page {
  display: flex;
  justify-content: center;
}
.active {
  background: #f5eadb;
}
.nav {
  &_left {
    position: relative;
    @media only screen and (max-width: 992px) {
      margin-bottom: 30px;
    }
    & ul {
      padding: 0;
      margin: 0;
      text-align: center;
      @media only screen and (max-width: 992px) {
        max-height: 0;
        overflow: hidden;
        &.open {
          position: absolute;
          left: 0;
          right: 0;
          margin: 0 12px;
          max-height: 1000px;
          background-color: #fff;
          box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
          z-index: 9;
        }
      }
      & li {
        list-style: none;
        cursor: pointer;
        padding: 10px;
        border-bottom: 1px solid #ccc;
        &:hover {
          background: #f5eadb;
        }
      }
    }
    & div {
      list-style: none;
      cursor: pointer;
      padding: 10px;
      border-bottom: 1px solid #ccc;
      @media only screen and (max-width: 992px) {
        color: #fff;
      }
    }
  }

  &_tar {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 10px;
    margin: 0;
    border-bottom: 1px solid #ccc;
    @media only screen and (max-width: 992px) {
      border-bottom: 0;
      color: #fff;
      cursor: pointer;
    }
    & span {
      display: none;
      @media only screen and (max-width: 992px) {
        display: block;
        position: absolute;
        right: 20px;
      }
    }
  }
}
.product {
  transition: all 0.3s ease;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  position: relative;
  &:hover {
    box-shadow: 0 2px 7px rgba(0, 0, 0, 0.4);
    & img {
      transform: scale(1.1);
    }
  }

  &_img {
    max-width: 100%;
    height: auto;
    transition: all 0.3s;
    margin-bottom: 2px;
    border-radius: 2px;
    overflow: hidden;
    cursor: pointer;
    padding: 0;
    & img {
      transition: all 0.3s;
    }
  }

  &_title {
    font-size: 20px;
    margin-bottom: 8px;
    font-weight: 600;
    @media only screen and (max-width: 600px) {
      font-size: 18px;
    }
  }

  &_price_1 {
    font-size: 1rem;
    margin-bottom: 8px;
    margin-top: 34px;
  }
  &_price_2 {
    font-size: 1rem;
    margin-bottom: 8px;
  }
  &_dec {
    color: #666;
    margin-bottom: 8px;
    max-height: 48px;
    height: 48px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    display: -webkit-box;
  }
  &_baking {
    color: #777;
    font-size: 14px;
    &_1 {
      height: 21px;
    }
  }
  & .btn {
    z-index: 2;
  }
}
del.product_price_2 {
  font-size: 12px;
  display: block;
  margin: 16px 0 0;
}
</style>
