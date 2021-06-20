<template>
  不懂怎麼處理資料
</template>

<script>
export default {
  data() {
    return {
      orders: {},
    };
  },
  created() {
    this.getOrder();
  },
  methods: {
    getOrder() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders`;
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          console.log(res.data);
          this.orders = res.data.orders;
        } else {
          console.log(res.data.message);
        }
      });
    },
  },
};
</script>
