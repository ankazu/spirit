<template>
  <footer>
    <div class="container text-md-start py-4 footer">
      <div class="mb-3">
        <div class="row">
          <div class="col-12 col-md-6">
            <router-link to="/" class="footer_logo">
              Spirit
            </router-link>
          </div>
          <!-- <div class="col-12 col-md-4 footer_info">
          <div>
            苗栗縣咖啡鄉咖啡村168號
          </div>
          <div>
            <a href="tel:037-991234">037-991234</a>
          </div>
          <div>
            <a href="mailto:service@serve.com">service@serve.com</a>
          </div>
          <div>
            營業時間：08：00-20:00
          </div>
          <div>
            營業日：每週一 ~ 每週日
          </div>
        </div> -->
          <div class="col-12 col-md-6">
            <div class="nav">
              <router-link class="nav_link" to="/products">產品列表</router-link>
              <router-link class="nav_link" to="/about">關於我們</router-link>
              <router-link class="nav_link" to="/coffee">關於咖啡</router-link>
              <router-link class="nav_link" to="/admin">後台登入</router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-6">
          <div class="footer_social">
            <a href="#">
              <span class="material-icons">
                facebook
              </span>
            </a>
            <a href="#">
              <img src="../../../public/images/github.png" alt="github" />
            </a>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="text-end">© 2021 Spirit All Rights Reserved.</div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
footer {
  min-height: 150px;
  background-color: #debc8c;
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
.footer {
  &_logo {
    display: block;
    background: url(../../../public/images/logo.png) no-repeat;
    text-indent: 101%;
    overflow: hidden;
    white-space: nowrap;
    width: 76px;
    height: 40px;
    transition: all 0.3s;
    &:hover {
      opacity: 0.6;
    }
  }
  &_social {
    display: flex;
  }
}

.nav {
  display: flex;
  justify-content: space-evenly;
  @media only screen and (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
  &_link {
    line-height: 1.5;
    color: #000;
    transition: all 0.3s;
  }
}
</style>
