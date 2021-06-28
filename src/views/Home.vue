<template>
  <div class="home">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand spirit" href="/">Spirit</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link active" to="/">首頁</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/products">產品列表</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link cart" to="/cart"
                ><span class="material-icons">shopping_cart</span>
                <div class="cart_num">1</div>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/admin">後台登入</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <main>
      <router-view />
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '@/views/Footer.vue';

export default {
  data() {
    return {};
  },
  components: {
    Footer,
  },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
.spirit {
  font-family: 'Pacifico', cursive;
  font-size: 1.4rem;
}
main {
  min-height: calc(100vh - 100px);
}
.cart {
  position: relative;
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
</style>
