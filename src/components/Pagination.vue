<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: !page.has_pre }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="$emit('get-page', page.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
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
          <span aria-hidden="true">&raquo;</span>
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

<style scoped lang="scss"></style>
