<template>
  <div class="home">
    <Navbar />
    <main id="main">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    Footer,
    Navbar,
  },
};
</script>

<style lang="scss" scoped>
main {
  padding-top: 64px;
  min-height: calc(100vh - 100px);
}
</style>
