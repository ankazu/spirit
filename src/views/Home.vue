<template>
  <div class="home">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="/">Spirit</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link active" to="/">首頁</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/products">產品列表</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/cart">購物車</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/login">後台登入</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="mt-5 container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {};
</script>
