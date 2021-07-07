<template>
  <loading :active="isLoading"></loading>
  <div class="container">
    {{ article }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      article: {},
    };
  },
  mounted() {
    const { id } = this.$route.params;
    this.getArticle(id);
  },
  methods: {
    getArticle(id) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/article/${id}`;
      this.$http
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.article = res.data.article;
            this.isLoading = false;
          }
        })
        .catch((res) => {
          console.log(res.data.message);
        });
    },
  },
};
</script>
