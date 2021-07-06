<template>
  <div>
    <div class="banner">
      <img src="../../assets/images/banner01.jpg" alt="" />
      <div class="banner_txtbox">
        <div></div>
      </div>
    </div>
    <section class="section container">
      <div class="section_title">
        <p>Spirit Coffee</p>
        <h2 class="tracking-in-expand"><span>喝杯咖啡，</span>讓您平常的一天好過一點。</h2>
      </div>
      <div class="features">
        <div class="features_img">
          <img src="../../assets/images/features-1.jpg" alt="" />
        </div>
        <div class="features_txt">
          <div class="features_icon"></div>
          <h3>每天都可以喝的味道</h3>
          <p>
            <span>
              選用優質的生豆，用小火慢慢煮，以促進美味成分的化學變化。
            </span>
            <span>
              每天都可以喝的咖啡不需要第一口就很香。它並不華麗，如果您注意到它，將永遠不會厭倦它。這就是味道。
            </span>
          </p>
        </div>
      </div>
      <div class="features">
        <div class="features_img">
          <img src="../../assets/images/features-2.jpg" alt="" />
        </div>
        <div class="features_txt">
          <div class="features_icon"></div>
          <h3>每天喝得起的價格</h3>
          <p>
            <span>
              生咖啡豆的市場價格由供求關係決定。稀缺豆價值高、品質好的生豆價格也會相應上漲。
            </span>
            <span>
              採購標準是質量好、產量穩定的生豆。我們實現了既滿足顧客可以飲用的價格又滿足保持商店營業的利潤的平衡。
            </span>
          </p>
          <div class="mybtn">
            <a class="mybtn_link" href="">
              <span>
                查看商品
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="section_2 section_bg">
      <div class="container">
        <div class="row">
          <div class="col-6 col-sm-3">
            <div class="d-flex justify-content-center align-items-center rounded-3 four_step">
              <div>
                使用公平貿易咖啡豆
              </div>
            </div>
          </div>
          <div class="col-6 col-sm-3">
            <div class="d-flex justify-content-center align-items-center rounded-3 four_step">
              <div>
                當日訂購、當日烘焙
              </div>
            </div>
          </div>
          <div class="col-6 col-sm-3">
            <div class="d-flex justify-content-center align-items-center rounded-3 four_step">
              <div>
                24小時新鮮出貨
              </div>
            </div>
          </div>
          <div class="col-6 col-sm-3">
            <div class="d-flex justify-content-center align-items-center rounded-3 four_step">
              <div>
                滿1500享免運
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="section_title">
        <h2>
          精選商品
        </h2>
      </div>
      <div class="container">
        <ProductAlike></ProductAlike>
      </div>
    </section>
  </div>
</template>
<script>
import ProductAlike from '@/components/ProductAlike.vue';

export default {
  components: {
    ProductAlike,
  },
};
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
.spirit {
  font-family: 'Pacifico', cursive;
}

.section {
  padding: 120px 20px 190px;
}
.section_2 {
  padding: 100px 0px;
}
.section_bg {
  background: #f5eadb;
}
.section_title {
  max-width: 550px;
  margin: 0 auto 70px;
}
.section_title h2 {
  font-size: 32px;
  font-weight: 600;
}
.section_title p {
  font-size: 18px;
  text-align: left;
  padding-left: 5px;
  margin-bottom: 5px;
  font-weight: 600;
  font-family: 'Pacifico', cursive;
}
.features {
  display: flex;
  flex-wrap: wrap;
  &:nth-of-type(3) {
    flex-direction: row-reverse;
  }
  &_img {
    width: 50%;
    line-height: 0;
    & img {
      border-radius: 20px;
    }
  }
  &_txt {
    width: 50%;
    padding: 5% 6%;
    text-align: left;
    & h3 {
      margin-bottom: 15px;
      font-weight: 600;
      width: 100%;
    }
    & p span {
      display: block;
      margin-top: 10px;
    }
  }
  &_icon::before {
    display: flex;
    justify-self: center;
    align-items: center;
    width: 60px;
    height: 60px;
    background-color: #f5eadb;
    content: '';
    margin-bottom: 20px;
    border-radius: 50%;
  }
}
// 按鈕
.mybtn {
  display: flex;
  justify-content: center;
  margin-top: 25px;
  &_link:link,
  &_link:visited {
    text-decoration: none;
    display: block;
    position: relative;
    z-index: 1;
    width: 114px;
    transition: all 0.6;
  }
  &_link span {
    color: #fff;
    display: block;
    padding: 8px 25px;
    background-color: #debc8c;
    text-align: center;
    position: absolute;
    transition: all 0.3s;
    left: 0;
    top: 0;
    width: 100%;
  }
  &_link:hover span {
    top: 6px;
    width: 112%;
    left: -6%;
    color: #000;
  }
  &_link::after {
    position: absolute;
    content: '';
    width: 112%;
    z-index: -1;
    border: 1px solid #debc8c;
    height: 42px;
    left: -6%;
    top: 5px;
  }
}
// section_2
.four_step {
  & div {
    width: 150px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    font-size: 22px;
    padding: 20px;
    border-radius: 20px;
  }
}
@media only screen and (max-width: 1200px) {
  .features {
    &_txt {
      width: 50%;
      padding: 3%;
      text-align: left;
    }
  }
}
@media only screen and (max-width: 1024px) {
  .features {
    &_img {
      width: 100%;
    }
    &_txt {
      width: 100%;
      padding: 3%;
      text-align: left;
      max-width: 640px;
      margin: 0 auto;
    }
    &_icon::before {
      width: 40px;
      height: 40px;
    }
  }
}
@media only screen and (max-width: 768px) {
  .section_title h2 {
    text-align: left;
    & span {
      display: block;
      text-align: left;
    }
  }
}
@media only screen and (max-width: 576px) {
  .section_title h2 {
    font-size: 26px;
  }
}
// animation
.tracking-in-expand {
  -webkit-animation: tracking-in-expand 0.7s cubic-bezier(0.215, 0.61, 0.355, 1) both;
  animation: tracking-in-expand 0.7s cubic-bezier(0.215, 0.61, 0.355, 1) both;
}
@-webkit-keyframes tracking-in-expand {
  0% {
    letter-spacing: -0.5em;
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}
@keyframes tracking-in-expand {
  0% {
    letter-spacing: -0.5em;
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}
</style>
