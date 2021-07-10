<template>
  <loading :active="isLoading"></loading>
  <!-- banner -->
  <div
    class="position-relative inn_banner"
    style="height: 250px; background-size: cover; background-position: center center;
    background-repeat: no-repeat; background-image: url(../images/inner_banner_3.jpg)"
  >
    <div>
      <h1 class="position-absolute start-50 top-50 translate-middle fw-bold text-white">
        {{ pathData.purpose }}
      </h1>
    </div>
  </div>
  <!-- content -->
  <div class="container">
    <Path :path-data="pathData"></Path>
    <div class="mt-4 d-flex flex-wrap">
      <div class="art mb-4" v-for="item in articles" :key="item.id" @click="getArticle(item.id)">
        <div class="art_img">
          <div>
            <img :src="item.imageUrl" alt="" />
          </div>
        </div>
        <div class="art_txt">
          <div class="art_txt_title">
            {{ item.title }}
          </div>
          <div class="art_txt_description">
            {{ item.description }}
          </div>
          <div class="art_txt_author">
            {{ item.author }}
          </div>
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
      articles: [],
      pathData: {
        previous: [{ title: '首頁', url: '/home' }],
        purpose: '關於咖啡',
      },
    };
  },
  components: {
    Path,
  },
  mounted() {
    this.getArticles();
  },
  methods: {
    getArticles() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/articles`;
      this.$http
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.articles = res.data.articles;
            this.isLoading = false;
            console.log(this.articles);
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
.art {
  width: 46%;
  margin: 0 2%;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #eee;
  cursor: pointer;
  transition: all 0.3s;
  overflow: hidden;
  &:hover {
    background-color: #f5eadb;
    & .art_img {
      transform: scale(1.1);
    }
  }
  &_img {
    width: 200px;
    transition: all 0.3s;
    position: relative;
    padding-bottom: 26%;
    overflow: hidden;
    & div {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      line-height: 0;
      & img {
        height: 100%;
      }
    }
  }
  &_txt {
    width: calc(100% - 200px);
    padding: 0 30px;
    text-align: left;
    &_title {
      font-size: 20px;
      font-weight: 600;
      margin: 6px 0;
    }
    &_description {
      font-size: 1rem;
      max-height: 50px;
      height: 50px;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      display: -webkit-box;
      margin-bottom: 10px;
    }
    &_author {
      text-align: right;
      color: #888;
    }
  }
}
</style>
