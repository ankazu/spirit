<template>
  <div class="login">
    <div class="login_container">
      <div class="row justify-content-center w-100 mea-0">
        <h2 class="h3 mb-3 font-weight-normal text-center">
          請先登入
        </h2>
        <div class="col-10 col-sm-7">
          <form id="form" class="form-signin" @submit.prevent="login">
            <div class="form-floating mb-3">
              <input
                type="email"
                class="form-control"
                id="username"
                placeholder="name@example.com"
                required
                autofocus
                v-model="user.username"
              />
              <label for="username">Email address</label>
            </div>
            <div class="form-floating">
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="Password"
                required
                v-model="user.password"
              />
              <label for="password">Password</label>
            </div>
            <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
              登入
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['swalert'],
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      if (this.user.username === '' || this.user.password === '') {
        this.swalert('error', '請輸入帳號密碼', 'top');
        return;
      }
      const api = `${process.env.VUE_APP_API}/admin/signin`;
      this.$http
        .post(api, this.user)
        .then((res) => {
          if (res.data.success) {
            const { token, expired } = res.data;
            document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
            this.$router.push('/admin/products');
          } else {
            this.swalert('error', `帳號密碼有誤，${res.data.message}。`, 'top');
          }
        })
        .catch((err) => {
          this.swalert('error', `登入失敗。 ${err.message}`);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: #424242;
  & h2 {
    color: #fff;
    font-size: 32px;
  }
  &_container {
    max-width: 680px;
    padding: 0 15px;
    width: 100%;
  }
}
.form-signin {
  width: 100%;
}
.mea-0 {
  margin: 0;
}
</style>
