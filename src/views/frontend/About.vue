<template>
  <loading :active="isLoading"></loading>
  <!-- banner -->
  <div
    class="position-relative inn_banner"
    style="height: 250px; background-size: cover; background-position: center center;
    background-repeat: no-repeat; background-image: url(../images/inner_banner_3.jpg)"
  >
    <div>
      <h1 class="position-absolute start-50 top-50 translate-middle fw-bold text-white">
        {{ pathData.purpose }}
      </h1>
    </div>
  </div>
  <div class="container">
    <Path :path-data="pathData"></Path>
  </div>
</template>

<script>
import Path from '@/components/Path.vue';

export default {
  data() {
    return {
      pathData: {
        previous: [{ title: '首頁', url: '/home' }],
        purpose: '關於我們',
      },
    };
  },
  components: {
    Path,
  },
};
</script>
