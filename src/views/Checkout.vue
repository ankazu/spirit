<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-6 justify-content-center">
        <Form ref="form" class="form" v-slot="{ errors }" @submit="createOrder">
          <div class="mb-3">
            <label for="email" class="form-label">Email<span class="font_req"> *</span></label>
            <Field
              id="email"
              name="email"
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors['email'] }"
              placeholder="請輸入 Email"
              rules="email|required"
              v-model="form.user.email"
            ></Field>
            <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="name" class="form-label">收件人姓名<span class="font_req"> *</span></label>
            <Field
              id="name"
              name="姓名"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['姓名'] }"
              placeholder="請輸入姓名"
              rules="required"
              v-model="form.user.name"
            ></Field>
            <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="tel" class="form-label">收件人電話<span class="font_req"> *</span></label>
            <Field
              id="tel"
              name="電話"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['電話'] }"
              placeholder="請輸入電話"
              rules="required"
              v-model="form.user.tel"
            ></Field>
            <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="address" class="form-label"
              >收件人地址<span class="font_req"> *</span></label
            >
            <Field
              id="address"
              name="地址"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['地址'] }"
              placeholder="請輸入地址"
              rules="required"
              v-model="form.user.address"
            ></Field>
            <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="message" class="form-label">留言</label>
            <textarea
              name=""
              id="message"
              class="form-control"
              cols="30"
              rows="10"
              v-model="form.message"
            ></textarea>
          </div>
          <div class="text-end">
            <button type="submit" class="btn btn-danger">送出訂單</button>
          </div>
        </Form>
      </div>
      <div class="col-12 col-sm-4">
        訂單明細
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loadingStatus: { loadingItem: '' },
      isLoading: false,
      cart: {},
      form: {
        user: {
          email: '',
          name: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  created() {
    this.getCart();
  },
  methods: {
    getCart() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          this.cart = res.data.data;
          this.isLoading = false;
          console.log(this.cart);
        } else {
          console.log(res.data.message);
        }
      });
    },
    createOrder() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`;
      const order = this.form;
      this.$http.post(url, { data: order }).then((res) => {
        if (res.data.success) {
          this.$refs.form.resetForm();
          this.form.message = '';
          this.pushMessage(res, '表單送出');
          this.getCart();
        } else {
          this.pushMessage(res, '表單送出');
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  text-align: left;
  display: flex;
  flex-wrap: wrap;
}
.form > div {
  width: 48%;
}
.form > div:nth-of-type(even) {
  margin-left: 4%;
}
.form > div:nth-of-type(5) {
  width: 100%;
}
.font_req {
  color: #dc3545;
}
</style>
