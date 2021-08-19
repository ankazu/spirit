<template>
  <footer class="bg-primary">
    <div class="container text-md-start py-4 footer">
      <div class="footer_dec">
        <router-link to="/" class="footer_logo">
          Spirit
        </router-link>
      </div>
      <ul class="footer_nav">
        <li>
          <router-link class="footer_nav_link" to="/products">產品列表</router-link>
        </li>
        <li>
          <router-link class="footer_nav_link" to="/about">關於我們</router-link>
        </li>
        <li>
          <router-link class="footer_nav_link" to="/coffee">關於咖啡</router-link>
        </li>
        <li>
          <router-link class="footer_nav_link" to="/admin">後台登入</router-link>
        </li>
      </ul>
      <div class="footer_social">
        <a href="javascript:void(0);">
          <img src="../../public/images/facebook.svg" alt="facebook" />
        </a>
        <a href="https://github.com/ankazu/spirit" target="_blank">
          <img src="../../public/images/github.svg" alt="github" />
        </a>
      </div>
      <div class="footer_copyright">
        <p>© 2021 Spirit All Rights Reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
footer {
  min-height: 150px;
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
      background-color: #dbd0be;
      z-index: 1;
    }
    &::after {
      position: absolute;
      content: '';
      width: 130px;
      height: 40px;
      background-color: #b18a53;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      z-index: 1;
    }
  }
  &_logo {
    display: block;
    background: url(../../public/images/logo.png) no-repeat center #b18a53;
    text-indent: 101%;
    overflow: hidden;
    white-space: nowrap;
    width: 130px;
    height: 40px;
    transition: all 0.3s;
    margin: 0 auto;
    position: relative;
    z-index: 2;

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
    color: #ddd;
  }
  &_nav {
    display: flex;
    justify-content: center;
    margin-top: 18px;
    padding-left: 0;
    list-style: none;
    & li {
      margin-right: 30px;
      @media only screen and (max-width: 600px) {
        margin-right: 20px;
      }
      &:last-child {
        margin-right: 0;
      }
    }
    &_link {
      line-height: 1.5;
      color: #fff;
      transition: all 0.3s;
      @media only screen and (max-width: 600px) {
        font-size: 15px;
      }
    }
  }
}
</style>
