<template>
  <!-- 麵包屑 -->
  <div>
    <nav style="--bs-breadcrumb-divider: '/'" aria-label="breadcrumb">
      <ol class="breadcrumb m-0">
        <template v-for="(item, key) in pathData.previous" :key="`Path_${key}`">
          <li class="breadcrumb-item">
            <router-link :to="item.url" class="link-secondary text-decoration-none">
              {{ item.title }}
            </router-link>
          </li>
        </template>

        <li class="breadcrumb-item active" aria-current="page">
          {{ pathData.purpose }}
        </li>
      </ol>
    </nav>
  </div>
</template>

<script>
export default {
  props: ['pathData'],
};
</script>

<style lang="scss" scoped>
nav {
  padding: 15px 0;
}
</style>
