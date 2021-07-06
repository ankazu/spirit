<template>
  <footer class="bg-secondary">
    <div class="container">
      <div class="spirit">
        Spirit coffee
      </div>
    </div>
    <div>
      <router-link to="/admin">後台登入</router-link>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
footer {
  min-height: 150px;
}
.spirit {
  font-family: 'Pacifico', cursive;
}
</style>
