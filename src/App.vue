<template>
  <router-view />
</template>
<script>
import swalert from '@/methods/swal';

export default {
  provide() {
    return { swalert };
  },
};
</script>
<style lang="scss">
@import './assets/all';

#app {
  font-family: 微軟正黑體, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;
}
</style>
