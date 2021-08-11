<template>
  <Loading :active="isLoading" />
  <!-- banner -->
  <div
    class="position-relative inn_banner"
    style="height: 250px; background-size: cover; background-position: center center;
    background-repeat: no-repeat; background-image: url(https://storage.googleapis.com/vue-course-api.appspot.com/johnming/1625982527238.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=iJ7P%2BlLl2w%2BcZPjOYPPg93JpByC5ZkfbukwEytU%2BCfm3SlBhwXxEe0Ah7CCkEJ%2Fj4JnTxekAEVLlNfeZF8IqzTxv%2BFXFPL7%2BfK74OZbccJGFaH1Tr%2FK5IAsj3MSj7Y30k12dAOU8dWLwL7UJMNoxCW8Wzq9e9XBv6%2BBAEVIwCR4AbILwaSO9JyxciBur7mHsyAejC2xXNNPtqSBeKQ214OftwcQ5xLQKWHUhZCTb0aWUZ0cbJ%2FwsjFhGDlDsOlnWK%2FXolDT%2FJ1C6EyaMuHHRbnt2DmTgBghENM9Wqz5uCAXOU8ZdSiXil55zMmhy%2F45vSIL59IQCn4eWvNxLjQmseQ%3D%3D)"
  >
    <div>
      <h2 class="position-absolute start-50 top-50 translate-middle fw-bold text-white">
        {{ pathData.purpose }}
      </h2>
    </div>
  </div>
  <!-- content -->
  <div class="container">
    <Path :path-data="pathData" />
    <div class="row justify-content-center">
      <div class="mt-4 d-flex flex-wrap col-12 col-lg-8">
        <div class="art" v-for="item in articles" :key="item.id" @click="getArticle(item.id)">
          <div class="art_img">
            <div>
              <img :src="item.imageUrl" :alt="item.title" />
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
  </div>
</template>

<script>
import Path from '@/components/Path.vue';

export default {
  inject: ['swalert'],
  data() {
    return {
      isLoading: false,
      articles: [],
      pathData: {
        previous: [{ title: '首頁', url: '/' }],
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
          } else {
            this.isLoading = false;
            this.swalert('error', `發生錯誤，請重新整理此頁面。 ${res.data.message}`);
          }
        })
        .catch((err) => {
          this.swalert('error', `發生錯誤，請重新整理此頁面。 ${err.message}`);
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
  width: 100%;
  margin: 0 0% 50px;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #eee;
  cursor: pointer;
  transition: all 0.3s;
  overflow: hidden;
  &:hover {
    background-color: #f5eadb;
    & .art_img img {
      transform: scale(1.1);
    }
  }
  &_img {
    width: 200px;
    transition: all 0.3s;
    overflow: hidden;
    & img {
      transition: all 0.3s;
    }
    @media only screen and (max-width: 600px) {
      width: 120px;
    }
  }
  &_txt {
    width: calc(100% - 200px);
    padding: 10px 30px;
    text-align: left;
    display: flex;
    flex-wrap: wrap;
    @media only screen and (max-width: 600px) {
      width: calc(100% - 120px);
      padding: 5px 20px;
    }

    &_title {
      font-size: 20px;
      font-weight: 600;
      margin: 6px 0;
    }
    &_description {
      font-size: 1rem;
      max-height: 80px;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      display: -webkit-box;
      margin-bottom: 10px;
      @media only screen and (max-width: 600px) {
        max-height: 50px;
        -webkit-line-clamp: 2;
      }
    }
    &_author {
      text-align: right;
      color: #888;
      width: 100%;
      margin-top: auto;
    }
  }
}
</style>
