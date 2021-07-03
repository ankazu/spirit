<template>
  <router-view />
</template>
<script>
import pushMessage from '@/methods/pushMessageState';

export default {
  provide() {
    return { pushMessage };
  },
};
</script>
<style lang="scss">
@import './assets/all';

#app {
  font-family: 微軟正黑體, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
