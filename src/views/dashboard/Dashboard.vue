<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand spirit" to="/">Spirit</router-link>
      <button
        class="navbar-toggler"
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
      <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/products">後台產品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/orders">訂單列表</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/coupons">優惠券</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/article">貼文</router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link active" to="/">前台首頁</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="signout()">登出</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="mt-5 container">
    <router-view v-if="checkSuccess" />
  </div>
</template>

<script>
import { apiUserCheck } from '@/methods/api';
import emitter from '@/methods/eventBus';

export default {
  provide() {
    return {
      emitter,
    };
  },
  inject: ['swalert'],
  data() {
    return {
      isLoading: false,
      checkSuccess: false,
    };
  },
  created() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      this.isLoading = true;
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      if (token) {
        this.$http.defaults.headers.common.Authorization = token;
        apiUserCheck({ api_token: this.token })
          .then((res) => {
            if (res.data.success) {
              this.checkSuccess = true;
              this.isLoading = false;
              this.swalert('success', '登入成功', 'top-end');
            } else {
              this.$router.push('/login');
            }
          })
          .catch((error) => {
            this.swalert('error', `${error}`);
          });
      } else {
        this.$router.push('/login');
      }
    },
    signout() {
      document.cookie = 'hexToken=;expires=;';
      this.$router.push('/login');
    },
  },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
.spirit {
  font-family: 'Pacifico', cursive;
  font-size: 1.4rem;
}
</style>
