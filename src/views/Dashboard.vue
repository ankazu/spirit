<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="/">Spirit</a>
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
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link active" to="/" @click.prevent="signout"
                >前台首頁</router-link
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" @click.prevent="signout">登出</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="mt-5 container">
      <ToastMessages></ToastMessages>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import emitter from '@/methods/eventBus';
import ToastMessages from '@/components/ToastMessages.vue';
import pushMessage from '@/methods/pushMessageState';

export default {
  provide() {
    return {
      emitter,
      pushMessage,
    };
  },
  components: {
    ToastMessages,
  },
  data() {
    return {
      checkSuccess: false,
    };
  },
  created() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      if (token) {
        this.$http.defaults.headers.common.Authorization = `${token}`;
        const api = `${process.env.VUE_APP_API}/api/user/check`;
        this.$http.post(api, { api_token: this.token }).then((res) => {
          if (res.data.success) {
            this.checkSuccess = true;
            // this.emitter.emit('push-message', {
            //   style: 'success',
            //   title: '圖片上傳結果',
            //   content: res.data.message,
            // });
            this.pushMessage(res, '登入');
          } else {
            this.$router.push('/login');
          }
        });
      } else {
        this.$router.push('/login');
      }
    },
    signout() {
      document.cookie = 'hexToKen=;expires=;';
      this.$router.push('/login');
    },
  },
};
</script>
