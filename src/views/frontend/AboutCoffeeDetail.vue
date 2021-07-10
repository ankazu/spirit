<template>
  <loading :active="isLoading"></loading>
  <div class="container mt-4">
    <Path :path-data="pathData"></Path>
    <div class="row">
      <div class="col-lg-8 me-auto ms-auto">
        <div class="blog ">
          <div class="blog_title">
            <h1>{{ article.title }}</h1>
          </div>
          <div class="blog_tag"><span v-html="article.tag"></span></div>
          <div class="blog_img">
            <img :src="article.imageUrl" alt="" />
          </div>
          <div class="blog_des">
            <h2>{{ article.description }}</h2>
          </div>
          <div class="blog_txt" v-html="article.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Path from '@/components/Path.vue';

export default {
  data() {
    return {
      isLoading: false,
      article: {},
      pathData: {
        previous: [
          { title: '首頁', url: '/home' },
          { title: '關於咖啡', url: '/coffee' },
        ],
        purpose: '',
      },
    };
  },
  components: {
    Path,
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
            this.pathData.purpose = this.article.title;
            this.isLoading = false;
            console.log(this.article);
          }
        })
        .catch((res) => {
          console.log(res.data.message);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.blog {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  margin: 0 auto;
  max-width: 700px;
  &_title {
    width: 100%;
    & h1 {
      font-weight: 600;
    }
  }
  &_tag {
    width: 100%;
    text-align: right;
    margin: 10px 0;
    & span {
      padding: 4px 12px;
      background: #f5eadb;
      display: inline-block;
      border-radius: 40px;
    }
  }
  &_img {
    margin: 0 auto;
  }
  &_des {
    text-align: left;
    margin: 30px 0 20px;
    & h2 {
      font-size: 24px;
      line-height: 1.5;
      font-weight: 600;
    }
  }
  &_txt {
    text-align: left;
    line-height: 1.5;
    margin-bottom: 50px;
  }
}
</style>
