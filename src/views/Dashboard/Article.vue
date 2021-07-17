<template>
  <Loading :active="isLoading"></Loading>
  <div>
    <div class="text-end mt-4">
      <button class="btn btn-primary" type="button" @click="openModal(true)">
        建立新的貼文
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th style="width: 80px">首頁顯示</th>
          <th style="width: 200px">標題</th>
          <th style="width: 200px">作者</th>
          <th>描述</th>
          <th style="width: 100px">建立時間</th>
          <th style="width: 100px">是否公開</th>
          <th style="width: 120px">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article.id">
          <td>
            <span class="material-icons fs-6" v-if="article.isShowIndex">
              done
            </span>
            <span class="material-icons fs-6" v-else>
              clear
            </span>
          </td>
          <td>{{ article.title }}</td>
          <td>{{ article.author }}</td>
          <td>{{ article.description }}</td>
          <td>{{ $filters.date(article.create_at) }}</td>
          <td>
            <span v-if="article.isPublic">已上架</span>
            <span v-else>未上架</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                type="button"
                @click="getArticle(article.id)"
              >
                編輯
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                type="button"
                @click="openDelArticleModal(article)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <ArticleModal
      ref="articleModal"
      :article="tempArticle"
      :is-new="isNew"
      @update-article="updateArticle"
    ></ArticleModal>
    <DeleteModal :item="tempArticle" ref="delModal" @updata="delArticle" />
  </div>
</template>

<script>
import ArticleModal from '@/components/ArticleModal.vue';
import DeleteModal from '@/components/DeleteModal.vue';

export default {
  data() {
    return {
      articles: [],
      isLoading: false,
      isNew: false,
      tempArticle: {},
      currentPage: 1,
    };
  },
  inject: ['pushMessage'],
  components: {
    ArticleModal,
    DeleteModal,
  },
  methods: {
    getArticles(page = 1) {
      this.currentPage = page;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/articles?page=${page}`;
      this.isLoading = true;
      this.$http
        .get(api)
        .then((res) => {
          this.isLoading = false;
          if (res.data.success) {
            this.articles = res.data.articles;
            this.pagination = res.data.pagination;
          }
        })
        .catch((error) => {
          // axios 的錯誤狀態，可參考：https://github.com/axios/axios#handling-errors
          console.log('error', error.res, error.request, error.message);
          this.isLoading = false;
          this.pushMessage(res, `${res.data.message}`);
        });
    },
    getArticle(id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${id}`;
      this.isLoading = true;
      this.$http
        .get(api)
        .then((res) => {
          this.isLoading = false;
          if (res.data.success) {
            this.openModal(false, res.data.article);
            this.isNew = false;
          }
        })
        .catch((error) => {
          // axios 的錯誤狀態，可參考：https://github.com/axios/axios#handling-errors
          console.log('error', error.res, error.request, error.message);
          this.isLoading = false;
          this.pushMessage(res, `${res.data.message}`);
        });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempArticle = {
          isPublic: false,
          create_at: new Date().getTime() / 1000,
          tag: [],
        };
        this.isNew = true;
      } else {
        this.tempArticle = { ...item };
        this.isNew = false;
      }
      this.$refs.articleModal.openModal();
    },
    updateArticle(item) {
      this.isLoading = true;
      this.tempArticle = item;
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article`;
      let httpMethod = 'post';
      let status = '新增貼文';
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${this.tempArticle.id}`;
        httpMethod = 'put';
        status = '更新貼文';
      }
      const articleComponent = this.$refs.articleModal;
      this.$http[httpMethod](api, { data: this.tempArticle })
        .then((res) => {
          if (res.data.success) {
            articleComponent.hideModal();
            this.isLoading = false;
            this.pushMessage(res, status);
            this.getArticles(this.currentPage);
          } else {
            this.isLoading = false;
            this.pushMessage(res, status);
          }
        })
        .catch((res) => {
          this.pushMessage(res, `${res.data.message}`);
        });
    },
    openDelArticleModal(item) {
      this.tempArticle = { ...item };
      this.$refs.delModal.openModal();
    },
    delArticle() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${this.tempArticle.id}`;
      this.isLoading = true;
      this.$http
        .delete(url)
        .then((res) => {
          if (res.data.success) {
            this.pushMessage(res, '刪除貼文');
            const delComponent = this.$refs.delModal;
            delComponent.hideModal();
            this.isLoading = false;
            this.getArticles(this.currentPage);
          } else {
            this.isLoading = false;
            this.pushMessage(res, '刪除貼文');
          }
        })
        .catch((res) => {
          this.isLoading = false;
          this.pushMessage(res, `${res.data.message}`);
        });
    },
  },
  created() {
    this.getArticles();
  },
};
</script>
