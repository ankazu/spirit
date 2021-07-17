<template>
  <div
    id="productModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span v-if="isNew">新增產品</span>
            <span v-else>編輯產品</span>
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
                <label for="image" class="form-label">輸入主要圖片網址</label>
                <input
                  type="text"
                  class="form-control"
                  id="image"
                  v-model="tempProduct.imageUrl"
                  placeholder="請輸入圖片連結"
                />
              </div>
              <div class="mb-3">
                <label for="customFile" class="form-label"
                  >或 上傳圖片
                  <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                </label>
                <input
                  type="file"
                  id="customFile"
                  class="form-control"
                  ref="fileInput"
                  @change="uploadFile('image', 'fileInput')"
                />
              </div>
              <img class="img-fluid" :src="tempProduct.imageUrl" />

              <div class="mt-5" v-if="Array.isArray(tempProduct.imagesUrl)">
                <div class="mb-1" v-for="(img, index) in tempProduct.imagesUrl" :key="index">
                  <div class="form-group">
                    <label for="customFile" class="form-label"
                      >上傳圖片
                      <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                    </label>
                    <input
                      type="file"
                      id="customFile"
                      class="form-control"
                      :ref="index + 'fileInputs'"
                      :name="index + '-upload'"
                      @change="uploadFile('images', `${index + 'fileInputs'}`, index)"
                    />
                  </div>
                  <img class="img-fluid" :src="img" alt="" />
                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    @click="tempProduct.imagesUrl.splice(index, 1)"
                  >
                    移除
                  </button>
                </div>
                <div
                  v-if="
                    !tempProduct.imagesUrl.length ||
                      tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]
                  "
                >
                  <button
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="tempProduct.imagesUrl.push('')"
                  >
                    新增圖片
                  </button>
                </div>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="form-group">
                <label for="title">標題<span class="text-danger"> *</span></label>
                <input
                  id="title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入標題"
                  v-model="tempProduct.title"
                />
              </div>
              <div class="row">
                <div class="form-group col-md-6">
                  <label for="category">分類<span class="text-danger"> *</span></label>
                  <input
                    id="category"
                    type="text"
                    class="form-control"
                    placeholder="請輸入分類"
                    v-model="tempProduct.category"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="unit">單位<span class="text-danger"> *</span></label>
                  <input
                    id="unit"
                    type="text"
                    class="form-control"
                    placeholder="請輸入單位"
                    v-model="tempProduct.unit"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="baking">烘焙</label>
                  <input
                    id="baking"
                    type="text"
                    class="form-control"
                    placeholder="請輸入烘焙度"
                    v-model="tempProduct.baking"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="Bitterness">苦度</label>
                  <input
                    id="Bitterness"
                    type="number"
                    class="form-control"
                    placeholder="請輸入酸度"
                    v-model="tempProduct.Bitterness"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="acidity">酸度</label>
                  <input
                    id="acidity"
                    type="number"
                    class="form-control"
                    placeholder="請輸入酸度"
                    v-model="tempProduct.acidity"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="flavor">風味1</label>
                  <input
                    id="flavor"
                    type="text"
                    class="form-control"
                    placeholder="請輸入風味"
                    v-model="tempProduct.flavor"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="flavor2">風味2</label>
                  <input
                    id="flavor2"
                    type="text"
                    class="form-control"
                    placeholder="請輸入風味"
                    v-model="tempProduct.flavor_sec"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="origin">國家產地</label>
                  <input
                    id="origin"
                    type="text"
                    class="form-control"
                    placeholder="請輸入產地"
                    v-model="tempProduct.origin"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="approach">處理方法</label>
                  <input
                    id="approach"
                    type="text"
                    class="form-control"
                    placeholder="請輸入處理方法"
                    v-model="tempProduct.approach"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="variety">品種</label>
                  <input
                    id="variety"
                    type="text"
                    class="form-control"
                    placeholder="請輸入品種"
                    v-model="tempProduct.variety"
                  />
                </div>
              </div>
              <div class="row">
                <div class="form-group col-md-6">
                  <label for="origin_price">原價<span class="text-danger"> *</span></label>
                  <input
                    id="origin_price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入原價"
                    v-model.number="tempProduct.origin_price"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="price">售價<span class="text-danger"> *</span></label>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入售價"
                    v-model.number="tempProduct.price"
                  />
                </div>
              </div>
              <hr />
              <div class="form-group">
                <label for="description">產品描述</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入產品描述"
                  v-model="tempProduct.decription"
                >
                </textarea>
              </div>
              <div class="form-group">
                <label for="content">說明內容</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入說明內容"
                  v-model="tempProduct.content"
                >
                </textarea>
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input
                    id="is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                    v-model="tempProduct.is_enabled"
                  />
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="$emit('updata', tempProduct)">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  props: ['product', 'isNew'],
  data() {
    return {
      modal: '',
      tempProduct: {},
      status: {},
    };
  },
  emits: ['updata'],
  mixins: [modalMixin],
  inject: ['emitter', 'pushMessage'],
  watch: {
    product() {
      this.tempProduct = this.product;
      if (!this.tempProduct.imagesUrl) {
        this.tempProduct.imagesUrl = [];
      }
      if (!this.tempProduct.imageUrl) {
        this.tempProduct.imageUrl = '';
      }
    },
  },
  methods: {
    uploadFile(txt, refipt, i) {
      const uploadedFile = this.$refs[refipt].files[0];
      const formData = new FormData(); // js建構函式
      formData.append('file-to-upload', uploadedFile);
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.status.fileUploading = true;
      this.$http
        .post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((res) => {
          this.status.fileUploading = false;
          if (res.data.success) {
            if (txt === 'image') {
              this.tempProduct.imageUrl = res.data.imageUrl;
              this.$refs.fileInput.value = '';
            }
            if (txt === 'images') {
              this.tempProduct.imagesUrl[i] = res.data.imageUrl;
              this.$refs[refipt].value = '';
            }
            this.pushMessage(res, '圖片新增');
          } else {
            this.$refs.fileInput.value = '';
            this.pushMessage(res, '圖片新增');
          }
        })
        .catch((res) => {
          console.log(res.data.message);
        });
    },
  },
};
</script>
