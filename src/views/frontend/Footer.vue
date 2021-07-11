<template>
  <footer>
    <div class="container text-md-start pt-3 pb-3">
      <div class="row">
        <div class="col-12 col-md-3 ">
          <router-link to="/" class="spirit">
            Spirit Coffee
          </router-link>
        </div>
        <div class="col-12 col-md-4 mt-4">
          <div>
            苗栗縣咖啡鄉咖啡村168號
          </div>
          <div class="mb-md-4">
            037-991234
          </div>
          <div>
            營業時間：08：00-20:00
          </div>
          <div>
            營業日：每週一 ~ 每週日
          </div>
        </div>
        <div class="col-12 col-md-2 mt-3">
          <div class="nav">
            <router-link class="nav_link" to="/products">產品列表</router-link>
            <router-link class="nav_link" to="/about">關於我們</router-link>
            <router-link class="nav_link" to="/coffee">關於咖啡</router-link>
            <router-link class="nav_link" to="/admin">後台登入</router-link>
          </div>
        </div>
        <div class="col-12 col-md-3 mt-4">
          <a href="#">
            <span class="material-icons">
              facebook
            </span>
          </a>
        </div>
      </div>
    </div>
    <div></div>
  </footer>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
footer {
  min-height: 150px;
  background-color: #f5eadb;
  & a {
    color: #000;
    text-decoration: none;
    &:hover {
      opacity: 0.6;
    }
  }
}
.material-icons {
  font-size: 35px;
}
.spirit {
  font-family: 'Pacifico', cursive;
  font-size: 36px;
  color: #000;
}
.nav {
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
  &_link {
    color: #000;
    transition: all 0.3s;
    padding: 5px 0px;
  }
}
</style>
