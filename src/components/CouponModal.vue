<template>
  <div
    class="modal fade"
    id="couponModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            <span v-if="isNew">新增優惠卷</span>
            <span v-else>編輯優惠卷</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="title">標題</label>
            <input
              type="text"
              class="form-control"
              id="title"
              v-model="tempCoupon.title"
              placeholder="請輸入標題"
            />
          </div>
          <div class="mb-3">
            <label for="coupon_code">優惠碼</label>
            <input
              type="text"
              class="form-control"
              id="coupon_code"
              v-model="tempCoupon.code"
              placeholder="請輸入優惠碼"
            />
          </div>
          <div class="mb-3">
            <label for="due_date">到期日</label>
            <input type="date" class="form-control" id="due_date" v-model="showDate" />
            <!-- <input type="date" class="form-control" id="due_date" v-model="due_date" /> -->
          </div>
          <div class="mb-3">
            <label for="price">折扣百分比</label>
            <input
              type="number"
              class="form-control"
              id="price"
              min="0"
              v-model.number="tempCoupon.percent"
              placeholder="請輸入折扣百分比"
            />
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                :true-value="1"
                :false-value="0"
                v-model="tempCoupon.is_enabled"
                id="is_enabled"
              />
              <label class="form-check-label" for="is_enabled">
                是否啟用
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="$emit('update-coupon', tempCoupon)">
            更新優惠券
          </button>
        </div>
      </div>
    </div>
  </div>
  {{ due_date }}
  {{ showDate }}
</template>
<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  props: ['isNew', 'coupon'],
  data() {
    return {
      tempCoupon: {},
      due_date: '',
      showDate: '',
    };
  },
  emits: ['update-coupon'],
  watch: {
    coupon() {
      this.tempCoupon = this.coupon;
      this.tempCoupon.showDate = this.coupon.due_date;
      const dateAndTime = new Date(this.tempCoupon.showDate * 1000).toISOString().split('T');
      // const expiryDate = new Date(this.tempCoupon.showDate * 1000).toISOString().split('T');
      [this.due_date] = dateAndTime;
      [this.showDate] = dateAndTime;
      // 解構賦值，從陣列中取出值，預設會取第一個["YYYY-MM-DD", "HH:mm:ss.sssZ"]
      // [this.due_date] = dateAndTime;
    },
    due_date() {
      // this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000 + 86400);
      this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000);
    },
    showDate() {
      this.tempCoupon.showDate = Math.floor(new Date(this.showDate) / 1000);
    },
  },
  mixins: [modalMixin],
};
</script>
