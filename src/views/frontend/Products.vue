<template>
  <loading :active="isLoading"></loading>
  <div class="container">
    <Path :path-data="pathData"></Path>
    <div class="row mt-4">
      <div class="col-12 col-md-3 col-lg-2 nav_left" ref="navLeft">
        <div class="bg-primary nav_tar">
          產品種類
          <span class="material-icons">
            expand_more
          </span>
        </div>
        <ul :class="{ open: sideUl }">
          <li @click="getProducts()" :class="{ active: productValue === '' }">全部產品</li>
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
      <div class="col-12 col-md-9 col-lg-10 ms-md-auto">
        <div class="row">
          <div
            class="col-6 col-sm-4 col-xl-3 mb-5 text-start"
            v-for="item in pageProducts"
            :key="item.id"
          >
            <div class="product">
              <div class="product_img">
                <div @click="getProduct(item.id)">
                  <img :src="item.imageUrl" alt="" />
                </div>
              </div>
              <div class="product_baking">{{ item.baking }}</div>
              <div @click="getProduct(item.id)" class="product_title">{{ item.title }}</div>
              <div class="product_dec">
                {{ item.decription }}
              </div>
              <div class="product_price">
                <div class="product_price_1" v-if="item.price === item.origin_price">
                  {{ $filters.currency(item.origin_price) }} 元 / {{ item.unit }}
                </div>
                <del class="product_price_2" v-if="item.price !== item.origin_price"
                  >原價 {{ $filters.currency(item.origin_price) }} 元</del
                >
                <div class="product_price_2" v-if="item.price !== item.origin_price">
                  特價 {{ $filters.currency(item.price) }} 元 / {{ item.unit }}
                </div>
              </div>
              <div class="d-flex mt-2">
                <button
                  :disabled="loadingStatus.loadingItem === item.id"
                  @click="addToCart(item.id)"
                  type="button"
                  class="btn btn-primary w-100"
                >
                  <i
                    class="spinner-border spinner-border-sm"
                    v-if="loadingStatus.loadingItem === item.id"
                  ></i>
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="page" v-if="products.length <= 10 && pageShow">
          <Pagination :page="pages" @get-page="getCurrentPage"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import swalert from '@/methods/swal';
import emitter from '@/methods/eventBus';
import Path from '@/components/Path.vue';

export default {
  components: {
    Path,
    Pagination,
  },
  data() {
    return {
      loadingStatus: { loadingItem: '' },
      isLoading: false,
      products: [],
      filterProduct: [],
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
  computed: {},
  mounted() {
    this.getProducts();
    if (window.innerWidth < 769) {
      const sideBtn = this.$refs.navLeft;
      sideBtn.addEventListener('click', () => {
        if (this.sideUl) {
          this.sideUl = false;
        } else {
          this.sideUl = true;
        }
      });
    }
  },
  methods: {
    getProducts() {
      this.isLoading = true;
      this.pageShow = true;
      this.productValue = '';
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.products = res.data.products;
          console.log(this.products);
          // 種類
          const categories = new Set();
          this.products.forEach((item) => {
            categories.add(item.category);
          });
          this.category = Array.from(categories);
          this.getProductsList(this.products);
          this.isLoading = false;
        } else {
          console.log(res.data.message);
        }
      });
    },
    getProduct(id) {
      this.$router.push(`/product/${id}`);
    },
    filterCategory(e) {
      this.isLoading = true;
      this.pageShow = false;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.pageProducts = res.data.products.filter((product) => {
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
        } else {
          console.log(res.data.message);
        }
      });
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
            emitter.emit('updata-cart');
            swalert('success', '已加入購物車');
            this.isLoading = false;
            this.sideUl = false;
          } else {
            console.log(res.data.message);
          }
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
      productslist.forEach((item, index) => {
        const num = index + 1;
        if (num >= minData && num <= maxData) {
          this.pageProducts.push(item);
        }
      });
      console.log(this.pageProducts);
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
.page {
  display: flex;
  justify-content: center;
}
.active {
  background: #f5eadb;
}
.nav_left {
  position: relative;
}
.nav_tar span {
  display: none;
}
.nav_tar {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.nav_left ul {
  padding: 0;
  margin: 0;
  & li {
    &:hover {
      background: #f5eadb;
    }
  }
}

.nav_left ul li,
.nav_left div {
  list-style: none;
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
.product {
  transition: all 0.3s ease;
  background-color: #f9f2e8;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  &:hover {
    box-shadow: 0 2px 7px rgba(0, 0, 0, 0.4);
    background-color: #f5eadb;
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
  }

  &_price_1 {
    font-size: 1rem;
    margin-bottom: 8px;
    margin-top: 34px;
  }
  &_price_2 {
    font-size: 1rem;
    margin-bottom: 8px;
    display: inline-block;
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
  }
}
del.product_price_2 {
  font-size: 12px;
  display: block;
  margin-bottom: 0;
}

@media only screen and (max-width: 768px) {
  .nav_tar span {
    display: block;
    position: absolute;
    right: 20px;
  }
  .nav_left {
    margin-bottom: 30px;
  }
  .nav_left ul {
    max-height: 0;
    overflow: hidden;
  }
  .nav_left ul.open {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 12px;
    max-height: 1000px;
    background-color: #fff;
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
  }
}
</style>
