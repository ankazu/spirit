<template>
  <footer>
    <div class="container text-md-start py-4 footer">
      <div class="row">
        <div class="col-12">
          <div class="footer_dec">
            <router-link to="/" class="footer_logo">
              Spirit
            </router-link>
          </div>
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
        <div class="col-12">
          <div class="footer_nav">
            <router-link class="footer_nav_link" to="/products">產品列表</router-link>
            <router-link class="footer_nav_link" to="/about">關於我們</router-link>
            <router-link class="footer_nav_link" to="/coffee">關於咖啡</router-link>
            <router-link class="footer_nav_link" to="/admin">後台登入</router-link>
          </div>
        </div>
        <div class="col-12">
          <div class="footer_social">
            <a href="#">
              <img src="../../../public/images/facebook.png" alt="facebook" />
            </a>
            <a href="https://github.com/ankazu/spirit" target="_blank">
              <img src="../../../public/images/github.png" alt="github" />
            </a>
          </div>
        </div>
        <div class="col-12 footer_copyright">
          <div class="text-end ">© 2021 Spirit All Rights Reserved.</div>
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
    transition: all 0.3s;
    &:hover {
      opacity: 0.6;
    }
  }
}
.material-icons {
  font-size: 35px;
}
.footer {
  &_dec {
    position: relative;
    &::before {
      position: absolute;
      content: '';
      top: 50%;
      left: 0;
      right: 0;
      transform: translateY(-50%);
      height: 1px;
      background-color: #fff;
      z-index: 1;
    }
  }
  &_logo {
    display: block;
    background: url(../../../public/images/logo.png) no-repeat center #debc8c;
    text-indent: 101%;
    overflow: hidden;
    white-space: nowrap;
    width: 130px;
    height: 40px;
    transition: all 0.3s;
    margin: 0 auto;
    position: relative;
    z-index: 2;
    // padding: 0 15px;
    &:hover {
      opacity: 0.6;
    }
  }
  &_social {
    display: flex;
    justify-content: center;
    margin: 15px 0 5px;
    & a {
      margin-right: 20px;
      &:last-of-type {
        margin-right: 0;
      }
      & img {
        border-radius: 20px;
        width: 28px;
      }
    }
  }
  &_copyright {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    color: #555;
  }
  &_nav {
    display: flex;
    justify-content: center;
    margin-top: 18px;
    @media only screen and (max-width: 768px) {
    }
    &_link {
      line-height: 1.5;
      color: #000;
      transition: all 0.3s;
      margin-right: 30px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
