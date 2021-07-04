<template>
  <div class="home">
    <Navbar></Navbar>
    <main id="main">
      <router-view />
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '@/views/frontend/Navbar.vue';
import Footer from '@/views/frontend/Footer.vue';

export default {
  data() {
    return {};
  },
  components: {
    Footer,
    Navbar,
  },
};
</script>

<style lang="scss" scoped>
main {
  padding-top: 59px;
  min-height: calc(100vh - 100px);
}
</style>
