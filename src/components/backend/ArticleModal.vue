<template>
  <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span v-if="isNew">新增貼文</span>
            <span v-else>編輯貼文</span>
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="title" class="form-label">
                  標題<span class="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="tempArticle.title"
                  placeholder="請輸入標題"
                />
              </div>
              <div class="mb-3">
                <label for="image" class="form-label">輸入圖片網址</label>
                <input
                  type="text"
                  class="form-control"
                  id="image"
                  v-model="tempArticle.imageUrl"
                  placeholder="請輸入圖片連結"
                />
              </div>
              <div class="mb-3">
                <label for="customFile" class="form-label">
                  或 上傳圖片
                  <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                </label>
                <input
                  type="file"
                  id="customFile"
                  class="form-control"
                  ref="fileInput"
                  @change="uploadFile('fileInput')"
                />
              </div>
              <img class="img-fluid" :src="tempArticle.imageUrl" />
              <div class="mb-3">
                <label for="author" class="form-label">
                  作者<span class="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="author"
                  v-model="tempArticle.author"
                  placeholder="請輸入標題"
                />
              </div>
              <div class="mb-3">
                <label for="create_at">
                  文章建立日期
                  <span class="text-danger"> *</span>
                </label>
                <input type="date" class="form-control" id="create_at" v-model="create_at" />
              </div>
            </div>
            <div class="col-sm-8">
              <label for="tag" class="form-label">標籤</label>
              <div class="row gx-1 mb-3">
                <div class="col-md-2 mb-1" v-for="(label, key) in tempArticle.tag" :key="key">
                  <div class="input-group input-group-sm">
                    <input
                      type="text"
                      class="form-control form-control"
                      id="tag"
                      v-model="tempArticle.tag[key]"
                      placeholder="請輸入標籤"
                    />
                    <button
                      type="button"
                      class="btn btn-outline-danger"
                      @click="tempArticle.tag.splice(key, 1)"
                    >
                      <span class="material-icons close_icon">
                        close
                      </span>
                    </button>
                  </div>
                </div>
                <div
                  class="col-md-2 mb-1"
                  v-if="tempArticle.tag[tempArticle.tag.length - 1] || !tempArticle.tag.length"
                >
                  <button
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    type="button"
                    @click="tempArticle.tag.push('')"
                  >
                    新增標籤
                  </button>
                </div>
              </div>
              <div class="mb-3">
                <label for="index_title" class="form-label">首頁標題</label>
                <input
                  type="text"
                  class="form-control"
                  id="index_title"
                  v-model="tempArticle.idx_title"
                  placeholder="請輸入首頁標題"
                />
              </div>
              <div class="mb-3">
                <label for="index_description" class="form-label">首頁描述</label>
                <textarea
                  type="text"
                  class="form-control"
                  id="index_description"
                  v-model="tempArticle.idx_description"
                  placeholder="請輸入首頁描述"
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">文章描述</label>
                <textarea
                  type="text"
                  class="form-control"
                  id="description"
                  v-model="tempArticle.description"
                  placeholder="請輸入文章描述"
                ></textarea>
              </div>
              <div class="mb-3">
                <ckeditor :editor="editor" :config="editorConfig" v-model="tempArticle.content" />
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="tempArticle.isPublic"
                    id="isPublic"
                  />
                  <label class="form-check-label" for="isPublic">
                    是否公開
                  </label>
                </div>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="tempArticle.isShowIndex"
                    id="isShowIndex"
                  />
                  <label class="form-check-label" for="isShowIndex">
                    是否在首頁顯示
                    <span class="text-danger fs-6">(首頁最多只會顯示3篇文章)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('update-article', tempArticle)"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiUploadFile } from '@/methods/api';
import modalMixin from '@/mixins/modalMixin';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  props: ['article', 'isNew'],
  data() {
    return {
      status: {},
      modal: '',
      tempArticle: {
        tag: [''],
      },
      create_at: 0,
      // 參考：https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/vuejs-v3.html#editor
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ['heading', 'bold', 'italic', '|', 'link'],
      },
    };
  },
  mixins: [modalMixin],
  emits: ['update-article'],
  watch: {
    article() {
      this.tempArticle = {
        ...this.article,
        tag: this.article.tag || [],
        isPublic: this.article.isPublic || false,
      };
      [this.create_at] = new Date(this.tempArticle.create_at * 1000).toISOString().split('T');
    },
    create_at() {
      this.tempArticle.create_at = Math.floor(new Date(this.create_at) / 1000);
    },
  },
  inject: ['swalert'],
  methods: {
    uploadFile(refipt) {
      const uploadedFile = this.$refs[refipt].files[0];
      const formData = new FormData(); // js建構函式
      formData.append('file-to-upload', uploadedFile);
      this.status.fileUploading = true;
      apiUploadFile(formData)
        .then((res) => {
          this.status.fileUploading = false;
          if (res.data.success) {
            this.tempArticle.imageUrl = res.data.imageUrl;
            this.$refs.fileInput.value = '';
            this.swalert('success', '圖片新增成功', 'top-end');
          } else {
            this.$refs.fileInput.value = '';
            this.swalert('error', `圖片新增失敗。 ${res.data.message}`, 'top-end');
          }
        })
        .catch((err) => {
          this.swalert('error', `圖片上傳時發生錯誤。 ${err.message}`);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.ck-editor__editable_inline {
  min-height: 300px;
}
.close_icon {
  font-size: 16px;
  display: flex;
  align-items: center;
}
</style>
