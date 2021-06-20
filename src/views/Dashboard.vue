<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link active" to="/">前台首頁</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/admin/products">後台產品列表</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/admin/order">訂單列表</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" @click.prevent="signout">登出</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="mt-5 container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkSuccess: false,
    };
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      if (token) {
        this.$http.defaults.headers.common.Authorization = `${token}`;
        const api = `${process.env.VUE_APP_API}api/user/check`;
        this.$http.post(api, { api_token: this.token }).then((response) => {
          if (response.data.success) {
            this.checkSuccess = true;
          } else {
            this.$router.push('/login');
          }
        });
      } else {
        this.$router.push('/login');
      }
    },
    signout() {
      document.cookie = 'hexToKen=;expires=;'; // 這是什麼意思
      this.$router.push('/login');
    },
  },
};
</script>
