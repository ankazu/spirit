<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary">
    <div class="container">
      <a class="navbar-brand spirit" href="/">Spirit</a>
      <div class="d-flex">
        <router-link class="nav-link cart_mb me-3" to="/cart"
          ><span class="material-icons">shopping_cart</span>
          <div class="cart_num">{{ cart?.carts?.length }}</div>
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
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
            <router-link class="nav_link" to="/about-coffee">關於咖啡</router-link>
          </li>
          <li>
            <div class="nav-item position-relative">
              <router-link class="nav-link cart" to="/cart"
                ><span class="material-icons">shopping_cart</span>
                <div class="cart_num">{{ cart?.carts?.length }}</div>
              </router-link>
              <div class="megamenu-content megamenu-cart">
                <div class="cart-body">
                  <ul id="shopping-cart-items">
                    <li v-for="item in cart.carts" :key="item.id">{{ item.product.title }}</li>
                  </ul>
                </div>
                <div class="cart-footer">
                  <div class="total-price">Total: <span>$0</span></div>
                  <a class="btn btn-primary w-100" href="/cart">結帳</a>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import emitter from '@/methods/eventBus';

export default {
  data() {
    return {
      cart: {
        carts: [],
      },
    };
  },
  methods: {
    getCart() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          this.cart = res.data.data;
          this.isLoading = false;
        } else {
          console.log(res.data.message);
        }
      });
    },
  },
  mounted() {
    this.getCart();
    emitter.on('updata-cart', () => {
      this.getCart();
    });
  },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
.spirit {
  font-family: 'Pacifico', cursive;
  font-size: 1.4rem;
}
.nav-item {
  position: relative;
}
.nav-item::after {
  position: absolute;
  content: '';
  width: 1px;
  height: 13px;
  background-color: #777;
  right: 0;
  top: 46%;
  transform: translateY(-50%);
}
.nav-item:last-child:after {
  display: none;
}
.nav_link {
  padding: 0.5rem 1rem;
  display: block;
  text-decoration: none;
  color: #666;
  position: relative;
  transition: all 0.3s;
}
.router-link-exact-active {
  color: #000;
}
.nav_link:hover {
  color: #000;
}
.nav_link:before {
  position: absolute;
  content: '';
  width: 0;
  height: 1px;
  background-color: #000;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.3s;
}
.nav_link:hover:before {
  width: 70%;
}
@media only screen and (max-width: 992px) {
  .nav_link:before,
  .nav-item::after {
    display: none;
  }
}
.cart {
  position: relative;
}
.cart .material-icons {
  font-size: 22px;
}
.cart_mb {
  display: none;
}
.cart_num {
  position: absolute;
  top: 0;
  right: 0;
  background: #aaa;
  color: #fff;
  border-radius: 50%;
  font-size: 14px;
  line-height: 18px;
  width: 18px;
}
.cart_mb .cart_num {
  right: 8px;
}
@media only screen and (max-width: 992px) {
  .cart {
    display: none;
  }
  .cart_mb {
    position: relative;
    color: #333;
    display: flex;
    align-items: center;
  }
}
.megamenu-content {
  position: absolute;
  top: 100%;
  width: 100%;
  background: #fff;
  text-align: left;
  border: 1px solid #efefef;
  display: none;
  left: -85px;
}

.megamenu-cart {
  box-shadow: 0 0 20px 0 rgba(62, 28, 131, 0.1);
  margin-top: -1px;
  width: 14rem;
}
.cart-header {
  border-bottom: solid 1px #efefef;
  padding: 15px 20px;
}
.cart-header .feather {
  width: 16px;
  height: 16px;
}
.cart-header .badge {
  font-size: 10px;
  line-height: 6px;
  display: inline-block;
  background: #c19e56;
  color: #fff;
  border-radius: 4px;
  padding: 5px;
  position: relative;
  top: -6px;
  margin-left: 3px;
}

.cart-body {
  width: 100%;
  max-height: 250px;
}
.cart-body ul {
  padding: 0;
  margin: 0;
  list-style: none;
  display: block;
  font-size: 0.85rem;
}
.cart-body ul li {
  position: relative;
  display: block;
  float: none;
  width: 100%;
  padding: 10px 20px;
  border-top: solid 1px #efefef;
  min-height: 80px;
  padding-left: 90px;
}
.cart-body ul li:first-child {
  border: 0;
}
.cart-body ul li img {
  width: 50px;
  top: 10px;
  left: 20px;
  position: absolute;
}
.cart-body ul li .title {
  text-transform: none;
  font-size: 0.75rem;
  font-weight: 400;
  margin: 5px 0;
}
.cart-body ul li .price {
  color: #c19e56;
}
.cart-body ul li .qty {
  float: right;
}
.cart-body ul li .link {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.cart-body ul li .link:hover {
  background: rgba(255, 255, 255, 0.3);
}
.cart-footer {
  border-top: solid 1px #efefef;
  padding: 15px 20px;
}
.cart-footer a:hover {
  opacity: 0.8;
}
</style>
