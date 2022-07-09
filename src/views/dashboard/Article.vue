<template>
  <Loading :active="isLoading" />
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
    />
    <DeleteModal :item="tempArticle" ref="delModal" @updata="delArticle" />
  </div>
</template>

<script>
import {
  apiGetArticles, apiGetArticle, apiDeleteArticle, apiUpdateArticle,
} from '@/methods/api';
import ArticleModal from '@/components/backend/ArticleModal.vue';
import DeleteModal from '@/components/backend/DeleteModal.vue';

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
  inject: ['swalert'],
  components: {
    ArticleModal,
    DeleteModal,
  },
  methods: {
    getArticles(page) {
      this.currentPage = page;
      this.isLoading = true;
      apiGetArticles(page)
        .then((res) => {
          this.isLoading = false;
          if (res.data.success) {
            this.articles = res.data.articles;
            this.pagination = res.data.pagination;
          }
        })
        .catch((err) => {
          this.isLoading = false;
          this.swalert('error', `取得貼文列表時發生錯誤。 ${err.message}`);
        });
    },
    getArticle(id) {
      this.isLoading = true;
      apiGetArticle(id)
        .then((res) => {
          this.isLoading = false;
          if (res.data.success) {
            this.openModal(false, res.data.article);
            this.isNew = false;
          }
        })
        .catch((err) => {
          this.isLoading = false;
          this.swalert('error', `取得貼文時發生錯誤。 ${err.message}`);
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
      let id = '';
      let httpMethod = 'post';
      let status = '新增貼文';
      if (!this.isNew) {
        id = this.tempArticle.id;
        httpMethod = 'put';
        status = '更新貼文';
      }
      const articleComponent = this.$refs.articleModal;
      apiUpdateArticle(httpMethod, { data: this.tempArticle }, id)
        .then((res) => {
          if (res.data.success) {
            articleComponent.hideModal();
            this.isLoading = false;
            this.swalert('success', `${status} ${res.data.success}`, 'top-end');
            this.getArticles(this.currentPage);
          } else {
            this.isLoading = false;
            this.swalert('error', `${status} ${res.data.message}`, 'top-end');
          }
        })
        .catch((err) => {
          this.swalert('error', `編輯貼文時發生錯誤。 ${err.message}`);
        });
    },
    openDelArticleModal(item) {
      this.tempArticle = { ...item };
      this.$refs.delModal.openModal();
    },
    delArticle() {
      this.isLoading = true;
      apiDeleteArticle(this.tempArticle.id)
        .then((res) => {
          if (res.data.success) {
            const delComponent = this.$refs.delModal;
            delComponent.hideModal();
            this.isLoading = false;
            this.swalert('success', '刪除貼文成功', 'top-end');
            this.getArticles(this.currentPage);
          } else {
            this.isLoading = false;
            this.swalert('error', `刪除貼文失敗 ${res.data.message}`, 'top-end');
          }
        })
        .catch((err) => {
          this.swalert('error', `刪除貼文時發生錯誤。 ${err.message}`);
        });
    },
  },
  created() {
    this.getArticles();
  },
};
</script>
