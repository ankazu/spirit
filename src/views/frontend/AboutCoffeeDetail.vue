<template>
  <Loading :active="isLoading"></Loading>
  <!-- banner -->
  <div
    class="position-relative inn_banner"
    style="height: 250px; background-size: cover; background-position: center center;
    background-repeat: no-repeat; background-image: url(https://storage.googleapis.com/vue-course-api.appspot.com/johnming/1625982527238.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=iJ7P%2BlLl2w%2BcZPjOYPPg93JpByC5ZkfbukwEytU%2BCfm3SlBhwXxEe0Ah7CCkEJ%2Fj4JnTxekAEVLlNfeZF8IqzTxv%2BFXFPL7%2BfK74OZbccJGFaH1Tr%2FK5IAsj3MSj7Y30k12dAOU8dWLwL7UJMNoxCW8Wzq9e9XBv6%2BBAEVIwCR4AbILwaSO9JyxciBur7mHsyAejC2xXNNPtqSBeKQ214OftwcQ5xLQKWHUhZCTb0aWUZ0cbJ%2FwsjFhGDlDsOlnWK%2FXolDT%2FJ1C6EyaMuHHRbnt2DmTgBghENM9Wqz5uCAXOU8ZdSiXil55zMmhy%2F45vSIL59IQCn4eWvNxLjQmseQ%3D%3D)"
  >
    <div>
      <h1 class="position-absolute start-50 top-50 translate-middle fw-bold text-white">
        {{ article.title }}
      </h1>
    </div>
  </div>
  <!-- content -->
  <div class="container">
    <Path :path-data="pathData"></Path>
    <div class="row">
      <div class="col-lg-8 me-auto ms-auto">
        <div class="art ">
          <div class="art_tag"><span v-html="article.tag"></span></div>
          <div class="art_img">
            <div>
              <img :src="article.imageUrl" :alt="article.title" />
            </div>
          </div>
          <div class="art_des">
            <h2>{{ article.description }}</h2>
          </div>
          <div class="art_txt" v-html="article.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Path from '@/components/Path.vue';

export default {
  inject: ['swalert'],
  data() {
    return {
      isLoading: false,
      article: {},
      pathData: {
        previous: [
          { title: '首頁', url: '/' },
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
          } else {
            this.isLoading = false;
            this.swalert('error', `發生錯誤，請重新整理此頁面。 ${res.data.message}`);
          }
        })
        .catch((err) => {
          this.swalert('error', `發生錯誤，請重新整理此頁面。 ${err.message}`);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.art {
  margin: 0 auto;
  max-width: 700px;
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
    position: relative;
    padding-bottom: 67%;
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
