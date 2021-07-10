<template>
  <div class="container blog">
    <div class="blog_item fade-in-right wow" v-for="item in tempArticle" :key="item.id">
      <div class="blog_pic ">
        <a href="#" @click.prevent="getArticle(item.id)">
          <img :src="item.imageUrl" alt="" />
        </a>
      </div>
      <div class="blog_txt">
        <div class="blog_txt_title">{{ item.idx_title }}</div>
        <div class="blog_txt_des">
          {{ item.idx_description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: [],
      tempArticle: [],
    };
  },
  mounted() {
    this.getArticles();
  },
  methods: {
    getArticles() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/articles`;
      this.$http
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.articles = res.data.articles;
            const data = this.articles.filter((article) => article.isShowIndex === true);
            this.tempArticle = data.slice(-2);
            console.log(this.tempArticle);
          }
        })
        .catch((res) => {
          console.log(res.data.message);
        });
    },
    getArticle(id) {
      this.$router.push(`/coffee/${id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
// blog
.blog {
  display: flex;
  flex-wrap: wrap;
  &_item {
    width: 43.516%;
    margin: 0 12.968% 0 0;
    &:last-child {
      margin: 0;
    }
    @media only screen and (max-width: 600px) {
      width: 100%;
      margin: 0 0 50px 0;
      &:last-child {
        margin: 0 0 50px 0;
      }
    }
  }
  &_pic {
    position: relative;
    z-index: 1;
    margin-bottom: 40px;
    @media only screen and (max-width: 600px) {
      margin-bottom: 30px;
    }
    & img {
      border-radius: 2px;
      transition: all 0.3s;
    }
    &:hover img {
      transform: scale(0.9, 0.9);
      transition: all 0.5s ease 0s;
    }
    &:after {
      content: '';
      background-color: #f5eadb;
      width: 0%;
      height: 0%;
      position: absolute;
      bottom: 50%;
      right: 50%;
      z-index: -1;
      transition: all 0.5s ease 0s;
      border-radius: 2px;
    }
    &:hover:after {
      bottom: 0px;
      right: 0px;
      width: 100%;
      height: 100%;
      transition: all 0.5s ease 0s;
    }
  }
  &_txt {
    text-align: left;
    &_title {
      font-size: 2.25rem;
      font-weight: 600;
      margin-bottom: 15px;
      @media only screen and (max-width: 992px) {
        font-size: 24px;
      }
    }
  }
}
</style>
