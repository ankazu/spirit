<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-primary fixed-top align-items-center"
    :class="classList.navbarTop"
  >
    <div class="container" :class="classList.navbarInner">
      <h1 class="d-flex align-items-center mb-1 mt-1">
        <router-link class="navbar-brand logo" to="/">Spirit</router-link>
      </h1>
      <div class=" order-lg-2 justify-content-around icon-link-wrap ms-auto">
        <div class="dropdown cart">
          <a
            class="btn d-flex"
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span class="material-icons cart_icon">shopping_cart</span>
            <div class="cart_num" v-if="cart?.carts?.length !== 0">
              {{ cart?.carts?.length }}
            </div>
          </a>
          <div class="dropdown-menu pe-2 ps-2" aria-labelledby="dropdownMenuLink">
            <table class="w-100">
              <tbody>
                <tr class="border-bottom border-primary">
                  <th>品名</th>
                  <th class="text-center">數量</th>
                  <th class="text-center">單價</th>
                </tr>
                <tr v-for="item in cart.carts" :key="item.id">
                  <td>
                    <div>
                      {{ item.product.title }}
                    </div>
                  </td>
                  <td class="text-center">
                    {{ item.qty }}
                  </td>
                  <td class="text-center">
                    {{ $filters.currency(item.product.price) }}
                  </td>
                </tr>
                <tr class="bg-white text-end">
                  <td colspan="3">
                    <span class="text-center w-100 d-block" v-if="cart?.carts?.length === 0">
                      趕快放入喜歡的商品吧!
                    </span>
                    <span class="d-flex jusity-content-end align-items-center" v-else>
                      總計:
                      <span class="price_dlr material-icons"> attach_money </span>
                      {{ $filters.currency(cart.total) }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <router-link
              class="btn btn-secondary w-100"
              to="/products"
              v-if="cart?.carts?.length === 0"
            >
              購物去
            </router-link>
            <router-link class="btn btn-secondary w-100" to="/cart" v-else>
              查看購物車
            </router-link>
          </div>
        </div>
      </div>
      <button
        class="navbar-toggler navbtn"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="material-icons menu_icon">
          menu
        </span>
      </button>
      <div
        class="collapse navbar-collapse order-lg-1 justify-content-end text-start"
        id="navbarNav"
      >
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav_link" to="/">首頁</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav_link" to="/products">產品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav_link" to="/about">關於我們</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav_link" to="/coffee">關於咖啡</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import emitter from '@/methods/eventBus';

export default {
  inject: ['swalert'],
  data() {
    return {
      cart: {
        carts: [],
      },
      classList: { navbarTop: '', navbarInner: '' },
    };
  },
  watch: {
    // 轉址時nav選單隱藏
    $route() {
      document.querySelector('#navbarNav').classList.remove('show');
    },
  },
  methods: {
    getCart() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.cart = res.data.data;
            this.isLoading = false;
          } else {
            this.isLoading = false;
            this.swalert('error', `取得購物清單時發生錯誤。 ${res.data.message}`);
          }
        })
        .catch((err) => {
          this.swalert('error', `取得購物車時發生錯誤，請重新整理此頁面。 ${err.message}`);
        });
    },
  },
  mounted() {
    this.getCart();
    emitter.on('updata-cart', () => {
      this.getCart();
    });
    window.addEventListener('scroll', () => {
      const windowY = window.scrollY;
      const main = document.querySelector('#main');
      if (!main) return;
      if (windowY > main.offsetTop) {
        this.classList = { navbarTop: 'shadow-sm', navbarInner: '' };
      } else {
        this.classList = { navbarTop: '', navbarInner: '' };
      }
    });
  },
  unmounted() {
    emitter.off('updata-cart', () => {
      this.getCart();
    });
  },
};
</script>

<style lang="scss" scoped>
.logo {
  display: block;
  background: url(../../../public/images/logo.png) no-repeat;
  text-indent: 101%;
  overflow: hidden;
  white-space: nowrap;
  width: 76px;
  height: 40px;
  transition: all 0.3s;
  &:hover {
    opacity: 0.6;
  }
}
.menu_icon {
  color: #ebe1d4;
  font-size: 30px;
  vertical-align: bottom;
}
.navbtn {
  border: 0;
  &:focus {
    box-shadow: unset;
  }
  & span {
    width: 26px;
  }
}
.nav-item {
  margin-right: 5px;
  @media only screen and (max-width: 992px) {
    margin: 0;
  }
}
.nav_link {
  padding: 0.5rem 1rem;
  display: block;
  text-decoration: none;
  color: #fff;
  position: relative;
  transition: all 0.3s;
  @media only screen and (max-width: 992px) {
    padding-left: 0;
    border-bottom: 1px solid #ebe1d4;
  }
  &:hover {
    color: #6d3215;
  }
  &:before {
    position: absolute;
    content: '';
    width: 0;
    height: 0px;
    background-color: #dbd0be;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.3s;
    @media only screen and (max-width: 992px) {
      display: none;
    }
  }
  &:hover:before {
    width: 100%;
    height: 100%;
    z-index: -1;
    transform: translate(-50%, -50%) rotate(-3deg);
  }

  &.router-link-exact-active:before {
    width: 100%;
    height: 100%;
    z-index: -1;
    transform: translate(-50%, -50%) rotate(-3deg);
  }
}
.router-link-exact-active {
  color: #6d3215;
}

.price_dlr {
  font-size: 18px;
  vertical-align: inherit;
}

.cart {
  position: relative;
  &_total_price {
    margin: 0.5rem 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  &_icon {
    font-size: 22px;
    color: #ebe1d4;
    transition: all 0.3s;
    &:hover {
      color: #fff;
    }
  }
  &_num {
    position: absolute;
    top: 0;
    right: 6px;
    background: #aaa;
    color: #fff;
    border-radius: 50%;
    font-size: 14px;
    line-height: 18px;
    width: 18px;
  }
  & .dropdown-menu {
    left: auto;
    min-width: 300px;
    right: 0;
    @media only screen and (max-width: 992px) {
      right: -50px;
    }
    & table {
      & tr {
        border-bottom: 1px solid #dee2e6;
        &:nth-of-type(even) {
          background-color: #f4f4f4;
        }
      }
      & th {
        padding: 0.5rem;
      }
      & td {
        padding: 0.5rem;
        & div {
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          display: -webkit-box;
          max-height: 40px;
          max-width: 155px;
        }
      }
    }
  }
}
</style>
