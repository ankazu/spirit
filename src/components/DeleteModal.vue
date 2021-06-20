<template>
  <div
    id="delProductModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <div>
              刪除
              <span v-if="item.title">{{ item.title }}</span>
              <span v-else>訂單</span>
            </div>
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          是否刪除
          <span class="product_title">
            <span v-if="item.title">{{ item.title }}</span>
            <span v-else>訂單</span>
          </span>
          <strong class="text-danger"></strong> (刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="$emit('updata', item)">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  props: ['item'],
  data() {
    return {
      modal: '',
    };
  },
  mixins: [modalMixin],
};
</script>
<style lang="scss" scoped>
.product_title {
  color: #f00;
}
</style>
