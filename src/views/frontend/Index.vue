<template>
  <loading :active="isLoading"></loading>
  <div class="banner">
    <img
      src="https://storage.googleapis.com/vue-course-api.appspot.com/johnming/1625982418674.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=G0ewUGhrOUDv9VKpC7bK6H8SO%2BgcpuOAw3%2BX%2FflY0n%2BbwImv61TOxchSLqdYQkABZQ%2FOeDG%2BVoD5rdS3rafU0rEM%2FVyxQgNaih4IZTihNJ%2BVGaX%2Bmgua3p1VahDPfPBgViBI85j0N9qKkh9YHxfQDCg93GPVGQChy1bE4%2FNdLyMPG9Hd4e3fQb8g5fQtyo%2Fa6j2%2FxUlIWLrxOi%2BEeXrdLvRkM5Zzn%2BqbSo9HOCqfCoXD%2B9RNpPHS%2FuGYeiYziXpAxheNA5PXPaePriCjbIQADzFm%2FtsKguihRQotI8FX%2FVU2gYN3X1vhWLLWBSdViP0WldLetcm3teaMigDnrGS5Yw%3D%3D"
      alt=""
    />
    <div class="banner_txtbox">
      <h2>準備好享受樂趣吧，<br />讓我們開始喝咖啡時光吧！</h2>
    </div>
  </div>
  <section class="section container">
    <div class="section_title">
      <p data-aos="fade-down" data-aos-duration="1000" data-aos-delay="800">
        Spirit Coffee
      </p>
      <h2 data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="100">
        <span>喝杯咖啡，</span>讓您平常的一天好過一點。
      </h2>
    </div>
    <div class="features" data-aos="fade-right" data-aos-duration="1000" data-aos-delay="300">
      <div class="features_img ">
        <img
          src="https://storage.googleapis.com/vue-course-api.appspot.com/johnming/1625983351370.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=B7B3zbJkpGvIVjeUM9A0iffNZ0Dspof%2BItulmn15038znmp7xE%2Bd8O6MEnUwzBNz7ICmY5hdgledBZkl8V9yTCHoZZETyzB6q%2Fme%2BIIJO2tVgFV2eA0%2B6kXWqqqkUQnuO%2BLXt6FJDPjlR8pjPiEHQKJpfqEhcu7PhG84xhDJ1xnTBnlh%2B62BRzpl2LCbj99xzgztXZSB3AWEqoTQptHfDZAmDrerfCOd2I6%2BJzrceRX8KIFsn33KYdiRKkNT48QJNVly8XUB7Zd2dptFZDBjovXynZENwDdH7RCQ0PS85L1mcdAu6a0BYC7%2FKlvmbs0MUko2jNmkNZqkMz1%2BOqjchw%3D%3D"
          alt=""
        />
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
    <div class="features" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
      <div class="features_img ">
        <img
          src="https://storage.googleapis.com/vue-course-api.appspot.com/johnming/1625983282674.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=RttNZVojk6vVarqvZXuCGQjN%2B2kC7AfvpWGQhnNc04CBqRjhMyqONuMWYrdH3MgIfFfoAeRnawOp5a1RAD1QceBGRkYPqVFsHrPfxAR6wClbLet%2BnkxZn%2B0lpCpYdR3xp8HzD3rbh75yFk4ayHUMJtlq3K2d54sMX23IDM753C8s%2Fnx%2BJkcWI270OJsyETTViigMnTAnjHIEMTnl2IFS11g4DmIcXlXYT585dgKKCd5hF9iqltQZSl%2B%2FRQrD%2FSLunUNFhZGGHXre3XD5uQuGq5fUT%2B%2B4Zifm%2BrDqrByBTaF8qLCyDD%2Fxgdd5c%2BrSY42OBW0K6mS2YgZ5JIdpD%2FXYYw%3D%3D"
          alt=""
        />
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
          <router-link to="/products" class="mybtn_link" href="">
            <span>
              選購商品
            </span>
          </router-link>
        </div>
      </div>
    </div>
  </section>
  <section class="section_2">
    <div class="container blog" data-aos="fade-up" data-aos-duration="1300" data-aos-delay="200">
      <div class="blog_item" v-for="item in tempArticle" :key="item.id">
        <div class="blog_pic ">
          <a href="#" @click.prevent="getArticle(item.id)">
            <img :src="item.imageUrl" alt="" />
          </a>
        </div>
        <div class="blog_txt">
          <div class="blog_txt_title">{{ item.idx_title }}</div>
          <div class="blog_txt_des">
            {{ item.idx_description }}
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="section ">
    <div class="section_title">
      <h2>
        精選商品
      </h2>
    </div>
    <div class="container pe-0 ps-0">
      <ProductAlike></ProductAlike>
    </div>
  </section>
  <section class="subscription">
    <div class="container">
      <div class="row">
        <div class="subscription_box  col-md-5">
          <div class="subscription_title">
            訂閱我們
          </div>
          <Form action="" v-slot="{ errors }" ref="subForm" @submit="subscription">
            <div class="input-group">
              <Field
                id="subEmail"
                name="聯絡信箱"
                type="email"
                class="form-control"
                placeholder="請輸入電子信箱"
                rules="email"
                v-model="email"
              ></Field>
              <input
                class="btn btn-primary text-white"
                value="送出"
                type="submit"
                :disabled="Object.keys(errors).length !== 0 || email === ''"
              />
            </div>
          </Form>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import ProductAlike from '@/components/ProductAlike.vue';
import swalert from '@/methods/swal';

export default {
  data() {
    return {
      isLoading: false,
      articles: [],
      tempArticle: [],
      email: '',
    };
  },
  components: {
    ProductAlike,
  },
  mounted() {
    this.getArticles();
  },
  methods: {
    getArticles() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/articles`;
      this.$http
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.isLoading = false;
            this.articles = res.data.articles;
            const data = this.articles.filter((article) => article.isShowIndex === true);
            this.tempArticle = data.slice(0, 2);
            console.log(this.tempArticle);
          }
        })
        .catch((res) => {
          console.log(res.data.message);
        });
    },
    getArticle(id) {
      this.$router.push(`/coffee/${id}`);
    },
    subscription() {
      this.email = '';
      this.$refs.subForm.resetForm();
      swalert('success', '訂閱成功');
    },
  },
};
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
.spirit {
  font-family: 'Pacifico', cursive;
}
.banner {
  position: relative;
  &_txtbox {
    position: absolute;
    left: 10%;
    top: 50%;
    transform: translateY(-50%);
    color: #fff;
    & h2 {
      text-align: left;
      line-height: 1.7;
      font-size: 48px;
      @media only screen and(max-width:992px) {
        font-size: 36px;
        text-shadow: 1px 1px 5px rgb(0, 0, 0);
      }
      @media only screen and(max-width:600px) {
        font-size: 24px;
        left: 2.5%;
      }
    }
    @media only screen and(max-width:600px) {
      left: 2.5%;
    }
  }
}

.section {
  padding: 120px 20px 190px;
  @media only screen and (max-width: 600px) {
    padding: 60px 20px 140px;
  }
}
.section_2 {
  padding: 0px 0px 100px;
  @media only screen and (max-width: 600px) {
    padding: 0px 0px 0px;
  }
}
.section_bg {
  background: #f5eadb;
}
.section_title {
  max-width: 620px;
  margin: 0 auto 70px;
}
.section_title h2 {
  font-size: 2.25rem;
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
  &:hover img {
    transform: scale(0.9, 0.9);
    transition: all 0.5s ease 0s;
  }
  &:hover &_img::after {
    bottom: 0px;
    right: 0px;
    width: 100%;
    height: 100%;
    transition: all 0.5s ease 0s;
  }
  &_img {
    width: 50%;
    line-height: 0;
    position: relative;
    &::after {
      content: '';
      background-color: #f5eadb;
      width: 0%;
      height: 0%;
      position: absolute;
      bottom: 50%;
      right: 50%;
      z-index: -1;
      transition: all 0.5s ease 0s;
      border-radius: 2px;
    }

    & img {
      border-radius: 2px;
      transition: all 0.3s;
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
    transition: all 2s ease 0s;
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
// blog
.blog {
  display: flex;
  flex-wrap: wrap;
  &_item {
    width: 43.516%;
    margin: 0 12.968% 0 0;
    &:last-child {
      margin: 0;
    }
    @media only screen and (max-width: 600px) {
      width: 100%;
      margin: 0 0 50px 0;
      &:last-child {
        margin: 0 0 50px 0;
      }
    }
  }
  &_pic {
    position: relative;
    z-index: 1;
    margin-bottom: 40px;
    @media only screen and (max-width: 600px) {
      margin-bottom: 30px;
    }
    & img {
      border-radius: 2px;
      transition: all 0.3s;
    }
    &:hover img {
      transform: scale(0.9, 0.9);
      transition: all 0.5s ease 0s;
    }
    &:after {
      content: '';
      background-color: #f5eadb;
      width: 0%;
      height: 0%;
      position: absolute;
      bottom: 50%;
      right: 50%;
      z-index: -1;
      transition: all 0.5s ease 0s;
      border-radius: 2px;
    }
    &:hover:after {
      bottom: 0px;
      right: 0px;
      width: 100%;
      height: 100%;
      transition: all 0.5s ease 0s;
    }
  }
  &_txt {
    text-align: left;
    &_title {
      font-size: 2.25rem;
      font-weight: 600;
      margin-bottom: 15px;
      @media only screen and (max-width: 992px) {
        font-size: 24px;
      }
    }
  }
}
.subscription {
  padding: 20px 0;
  background-image: url(https://storage.googleapis.com/vue-course-api.appspot.com/johnming/1626007460395.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=epRS9OUer7siAXQuY3kgSa%2B%2BtmxG4Vgo%2Fwrw8U3kpvfjdGPFlt6SNwB%2BrqcHLD2tm4frzY4lT%2FH6UDITRw%2F3SVbt2s1nuGlqt2tCn8UU%2BUzVdEycWZOivvjiqKakBo4UKVqnvv%2BJUydW48Imhy9otwt0LZ%2B1z3iyw4VFGn0sWF85c6e4hxSXQ802ZWNWtmWmwahemFFlaLTevaFKkYDIiPrMBhG%2FdKsmXG8EqpGQ9JOqkGWWu%2FTFmIHYRVO8IXUA%2Fw8HPE0pLWhKP96hk%2BAhk2OpW%2Fom1OrmcGJFhUAELHLqTzBXTJbVwxjfpUHmde3nlu3UYmOqziV8OocXuQRB5w%3D%3D);
  background-size: cover;
  height: 230px;
  background-repeat: no-repeat;
  background-position-x: 50%;
  &_box {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 50px;
  }
  &_title {
    color: #fff;
    font-size: 36px;
    width: 100%;
    text-align: left;
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
</style>
