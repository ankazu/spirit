<template>
  <div class="home">
    <Navbar></Navbar>
    <main>
      <router-view />
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '@/views/Navbar.vue';
import Footer from '@/views/Footer.vue';

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
  min-height: calc(100vh - 100px);
}
</style>
