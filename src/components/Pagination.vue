<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination mb-4">
      <li class="page-item" :class="{ disabled: !page.has_pre }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="$emit('get-page', page.current_page - 1)"
        >
          <span class="material-icons">
            chevron_left
          </span>
        </a>
      </li>
      <li
        :class="{ active: item === page.current_page }"
        v-for="item in page.total_pages"
        :key="item"
        class="page-item"
      >
        <a class="page-link" href="#" @click.prevent="$emit('get-page', item)">{{ item }}</a>
      </li>
      <li class="page-item" :class="{ disabled: !page.has_next }">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="$emit('get-page', page.current_page + 1)"
        >
          <span class="material-icons">
            chevron_right
          </span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['page'],
};
</script>

<style lang="scss" scoped>
.page {
  &-item {
    height: 36px;
    width: 40px;
    margin-right: 8px;
    display: flex;
    justify-content: center;
    &:last-of-type {
      margin-right: 0;
    }
    &:first-of-type a,
    &:last-of-type a {
      padding: 6px;
    }
  }
  &-link {
    border: 0;
    border-radius: 50% !important;
    padding: 6px 12px;
    &:focus {
      box-shadow: unset;
    }
  }
}
</style>
