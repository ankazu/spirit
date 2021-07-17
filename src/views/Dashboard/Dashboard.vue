<template>
  <Loading :active="isLoading"></Loading>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand spirit" to="/">Spirit</router-link>
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
    <router-view v-if="checkSuccess"></router-view>
  </div>
  <ToastMessages></ToastMessages>
</template>

<script>
import emitter from '@/methods/eventBus';
import ToastMessages from '@/components/ToastMessages.vue';

export default {
  provide() {
    return {
      emitter,
    };
  },
  components: {
    ToastMessages,
  },
  inject: ['pushMessage'],
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
        this.$http.defaults.headers.common.Authorization = `${token}`;
        const api = `${process.env.VUE_APP_API}/api/user/check`;
        this.$http
          .post(api, { api_token: this.token })
          .then((res) => {
            if (res.data.success) {
              this.checkSuccess = true;
              this.isLoading = false;
              this.pushMessage(res, '登入');
            } else {
              this.$router.push('/login');
            }
          })
          .catch((res) => {
            console.log(res.data.message);
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
