<template>
  <Loading :active="isLoading.load" />

  <div class="banner">
    <img
      src="https://storage.googleapis.com/vue-course-api.appspot.com/johnming/1625982418674.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=G0ewUGhrOUDv9VKpC7bK6H8SO%2BgcpuOAw3%2BX%2FflY0n%2BbwImv61TOxchSLqdYQkABZQ%2FOeDG%2BVoD5rdS3rafU0rEM%2FVyxQgNaih4IZTihNJ%2BVGaX%2Bmgua3p1VahDPfPBgViBI85j0N9qKkh9YHxfQDCg93GPVGQChy1bE4%2FNdLyMPG9Hd4e3fQb8g5fQtyo%2Fa6j2%2FxUlIWLrxOi%2BEeXrdLvRkM5Zzn%2BqbSo9HOCqfCoXD%2B9RNpPHS%2FuGYeiYziXpAxheNA5PXPaePriCjbIQADzFm%2FtsKguihRQotI8FX%2FVU2gYN3X1vhWLLWBSdViP0WldLetcm3teaMigDnrGS5Yw%3D%3D"
      alt="享受喝咖啡帶來的樂趣吧"
    />
    <div class="banner_txtbox">
      <h2>準備好享受樂趣吧，<br />讓我們開始喝咖啡時光吧！</h2>
    </div>
  </div>

  <section class="section container">
    <div class="section_title_spirit">
      <p data-aos="fade-down" data-aos-duration="1000" data-aos-delay="800">
        Spirit Coffee
      </p>
      <h2 data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="100">
        <span>喝杯咖啡，</span>讓您平常的一天好過一點。
      </h2>
    </div>
    <div class="features" data-aos="fade-right" data-aos-duration="1000" data-aos-delay="200">
      <div class="features_img">
        <img
          src="https://storage.googleapis.com/vue-course-api.appspot.com/johnming/1627135416844.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=i9i59VVaXs78p1zbiDINYv2xuOMmehv9i9dWzLTt5nsOdpJUHBeTjf8kgbDK1OiiWJltDif5iGM8GpEUJhSaS4De8i%2Ba2SCu0%2By1HFynRiR4XPpdcICxhcI4B7zC2gotr8enLTfjVi3bqW7hldS3P54Yosz4knx7OyyMyNQtluzxr8zc5ekzwu%2B0sQgK5KMtHFY2TEEOJEtCNaxLDJKQ5LoikF105E9JdCdY%2FrWLUch6%2FtVaMI2nAtS%2BB%2BdV7h%2BfY7o1ZKiGOacTATEjj5mMMLTofGigTLNI9DJMfRQrriNQRanXFojAmwE%2B5HAphHsCGANyPQBOIOq1qluAgBmgAw%3D%3D"
          alt="每天都可以喝的味道，選用優質的生豆，用小火慢慢煮，以促進美味成分的化學變化。"
        />
      </div>
      <div class="features_txt">
        <div class="features_icon"></div>
        <h3>每天都可以喝的味道</h3>
        <div>
          <p>
            選用優質的生豆，用小火慢慢煮，以促進美味成分的化學變化。
          </p>
          <p>
            每天都可以喝的咖啡不需要第一口就很香。它並不華麗，如果您注意到它，將永遠不會厭倦它。這就是味道。
          </p>
        </div>
      </div>
    </div>
    <div class="features" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
      <div class="features_img">
        <img
          src="https://storage.googleapis.com/vue-course-api.appspot.com/johnming/1627135436438.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Rcr896AUOI02s8%2FKYM1VPcvPCv23sDSw%2FkAGECSg0PV31smNiso4CBmqFIrC7wzzM8amufgpZXHQqJ6oosJY4yAp5RbD6qsmrp9mp%2FxsEwMzqOSQRUrUMLRs8Bw7Jv9LJ%2FFNL51UdviUS6bfy1qBDFwN%2FNCGNFW7ES4HJ9NGhFLzIvWD%2Blgz%2FjgnjIehx3Cy92nn5GtuctaSewGPq%2FgOP2iGQTz2LzIZwe5QBHUVBHkZ0ujWTKqBWntWvu442mBbgEeDRw7td6Y6NsvhJUEeg3YzoJMhq78X%2FAhZLe4XjBZiJAicKuJ8oVcZnmJ2CaCalWrIgg%2FIRfk8tKNjZ84aIg%3D%3D"
          alt="每天喝得起的價格，生咖啡豆的市場價格由供求關係決定。稀缺豆價值高、品質好的生豆價格也會相應上漲。"
        />
      </div>
      <div class="features_txt">
        <div class="features_icon"></div>
        <h3>每天喝得起的價格</h3>
        <div>
          <p>
            生咖啡豆的市場價格由供求關係決定。稀缺豆價值高、品質好的生豆價格也會相應上漲。
          </p>
          <p>
            採購標準是質量好、產量穩定的生豆。我們實現了既滿足顧客可以飲用的價格又滿足保持商店營業的利潤的平衡。
          </p>
        </div>
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

  <section class="section_2" data-aos="fade-up" data-aos-duration="1300" data-aos-delay="200">
    <div class="section_title container">
      <h2>
        精選商品
      </h2>
    </div>
    <div class="container pe-sm-0 ps-sm-0">
      <ProductAlike />
    </div>
  </section>

  <section class="section_2" data-aos="fade-up" data-aos-duration="1300" data-aos-delay="200">
    <div class="container">
      <div class="section_title">
        <h2>
          精選好文
        </h2>
      </div>
      <div class="blog">
        <div class="blog_item" v-for="item in tempArticle" :key="item.id">
          <div class="blog_pic">
            <a href="#" @click.prevent="getArticle(item.id)">
              <img :src="item.imageUrl" :alt="item.idx_title" />
            </a>
          </div>
          <div class="blog_txt">
            <h3 class="blog_txt_title">{{ item.idx_title }}</h3>
            <p class="blog_txt_des">
              {{ item.idx_description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="subscription" data-aos="fade-up" data-aos-duration="1300" data-aos-delay="200">
    <div class="container">
      <div class="row">
        <div class="subscription_box col-md-5">
          <p class="subscription_title">
            訂閱我們
          </p>
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
              />
              <input
                class="btn btn-primary text-white"
                value="送出"
                type="submit"
                :disabled="Object.keys(errors).length !== 0 || email === ''"
                :class="{ 'not-allowed': Object.keys(errors).length !== 0 || email === '' }"
              />
            </div>
          </Form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {
  inject, ref, onMounted, computed, reactive,
} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { apiGetAllArticles } from '@/methods/api';
import ProductAlike from '@/components/frontend/ProductAlike.vue';

export default {
  components: {
    ProductAlike,
  },
  setup() {
    const swalert = inject('swalert');

    const store = useStore();
    const isLoading = reactive({
      load: computed(() => store.state.isLoading),
    });
    // 精選好文
    const articles = ref([]);
    const tempArticle = ref([]);
    const getArticles = () => {
      store.commit('checkLoading', true);
      apiGetAllArticles()
        .then((res) => {
          if (res.data.success) {
            store.commit('checkLoading', false);
            articles.value = res.data.articles;
            const data = articles.value.filter((article) => article.isShowIndex === true);
            tempArticle.value = data.slice(0, 3);
          }
        })
        .catch((err) => {
          swalert('error', `發生錯誤，請重新整理此頁面。 ${err.message}`);
        });
    };

    const router = useRouter();
    const getArticle = (id) => {
      router.push(`/coffee/${id}`);
    };

    // 頁尾email
    const email = ref('');
    const subForm = ref(null);
    const subscription = () => {
      store.commit('checkLoading', false);
      email.value = '';
      subForm.value.resetForm();
      swalert('success', '訂閱成功');
    };

    onMounted(() => {
      getArticles();
    });

    return {
      email,
      swalert,
      tempArticle,
      subForm,
      isLoading,
      getArticle,
      subscription,
    };
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
  padding: 90px 20px 140px;
  @media only screen and (max-width: 600px) {
    padding: 40px 12px 100px;
  }
  &_2 {
    padding: 0px 0px 120px;
    @media only screen and (max-width: 600px) {
      padding: 20px 0px 60px;
    }
  }
  &_title {
    margin: 0 auto 40px;
    text-align: center;
    @media only screen and (max-width: 600px) {
      margin: 0 auto 30px;
    }
    &_spirit {
      max-width: 620px;
      margin: 0 auto;
      margin: 0 auto 40px;
      & p {
        font-size: 18px;
        text-align: left;
        padding-left: 5px;
        margin-bottom: 5px;
        font-weight: 600;
        font-family: 'Pacifico', cursive;
      }
    }

    & h2 {
      font-size: 2.25rem;
      font-weight: 600;
      & span {
        @media only screen and (max-width: 768px) {
          display: block;
          text-align: left;
        }
      }
      @media only screen and (max-width: 576px) {
        font-size: 26px;
      }
    }
  }
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
    position: relative;
    @media only screen and (max-width: 1024px) {
      width: 100%;
      text-align: center;
    }
    & img {
      border-radius: 2px;
      transition: all 0.3s;
    }
  }
  &_txt {
    width: 50%;
    padding: 5% 6%;
    @media only screen and (max-width: 1200px) {
      width: 50%;
      padding: 3%;
    }
    @media only screen and (max-width: 1024px) {
      width: 100%;
      padding: 3%;
      max-width: 640px;
      margin: 0 auto;
    }
    & h3 {
      margin-bottom: 15px;
      font-weight: 600;
      width: 100%;
    }
    & div p {
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
    background-color: #debc8c;
    content: '';
    margin-bottom: 20px;
    border-radius: 50%;
    transition: all 2s ease 0s;
    @media only screen and (max-width: 1024px) {
      width: 40px;
      height: 40px;
    }
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
    width: 30%;
    margin: 0 5% 0 0;
    &:last-child {
      margin: 0;
    }
    @media only screen and (max-width: 600px) {
      width: 100%;
      margin: 0 0 50px 0;
      &:last-child {
        margin: 0 0 20px 0;
      }
    }
  }
  &_pic {
    position: relative;
    z-index: 1;
    margin-bottom: 40px;
    @media only screen and (max-width: 600px) {
      margin-bottom: 15px;
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
      background-color: #debc8c;
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
    &_title {
      font-size: 2.25rem;
      font-weight: 600;
      margin-bottom: 15px;
      @media only screen and (max-width: 992px) {
        font-size: 24px;
      }
      @media only screen and (max-width: 600px) {
        font-size: 22px;
        margin-bottom: 10px;
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

// animation
</style>
