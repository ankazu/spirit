<template>
  <!-- banner -->
  <div
    class="position-relative inn_banner"
    style="height: 250px; background-size: cover; background-position: center center;
    background-repeat: no-repeat; background-image: url(https://storage.googleapis.com/vue-course-api.appspot.com/johnming/1625982677472.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=m9QW9KxsRFls3h31tArN2y632onqSZIp93dQeiU7DRN%2FFW9kXj7AAv2KH6k89jumLOM5FM7TClvtfIdDr7ZYFI%2FG%2FndI9LQybaDuXtn6v1jsJi5xKznxq3awi1T0gki8p%2F1wPzrMpOZ%2FYHrVCIsK5pQZswHfvjkfYNvZsImOsKSx%2FjU3KFicuOGi6FE8x3H0t6WUXjBrW56W15V8Hm%2BQhMANmuSX0FTPaeBp%2B7oSDO3dwg9BryrYOh7fXXUc05hls4%2BieJ21guqDkSSfoKxVY8j5sXLwvyU1zx7dML63dfqdPjXfk3FgeV2ehcdd1yrRxWfYeepyjBYX5Bef8vmIEA%3D%3D)"
  >
    <div>
      <h1 class="position-absolute start-50 top-50 translate-middle fw-bold text-white">
        {{ pathData.purpose }}
      </h1>
    </div>
  </div>
  <div class="container mb-5">
    <Path :path-data="pathData"></Path>
    <section class="mt-lg-5">
      <div class="about">
        <div class="about_box" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
          <div class="about_txt">
            <div class="about_h2 text-center">Coffee Lover</div>
            <div class="about_text">
              <p>
                源⾃於對精品咖啡的熱愛，SPIRIT 品牌誕⽣於2021年。 創辦⼈ John
                相信，咖啡應不只是單純提神工具，更應是在日常生活中的放鬆與休息。
              </p>
              <p>
                我們深信每顆咖啡豆都蘊藏獨特的香氣。透過職人細心烘焙，無論是輕度烘焙還是深度烘焙，沖煮後皆能創造出純粹簡單的美好。
              </p>
            </div>
          </div>
          <div class="about_img">
            <img
              src="https://storage.googleapis.com/vue-course-api.appspot.com/johnming/1625978982019.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=XSybiUnRqxGzBZRM9kgokcW1Ce%2BT9qa1AYzIORz2%2B75vXyd9Q3z%2B68o%2Fa4QyrHR4H3zrdNov3dLKlHXJSuvXv5oZvtOLJCPrRsJ8YoDoKcIx%2BkG4iJD6gK5Mrg5gc%2FE8vLkxMUU%2FK3s%2FIa2v9y%2B1HGM5Y1%2Bl%2BTTE0f%2BZ4f4Bgl%2BbB%2BHNlFLR8ERLc2twK9xIYqToFJaTHN7EXqAn3FU2f6uFD5Muyjn%2FKNsJHgZ2RMgfiY1ndVzu62KPj1bcKme2BbGT6RRF1ylJtWsiBFmGfYdNDKDSQeWp1de%2FVwP7SGt6p84XwpMtqhbIh6zFwa2va%2Fl%2BtSh5w52VffpAdA9Mug%3D%3D"
              alt="Coffee Lover"
            />
          </div>
        </div>
        <div class="about_box" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="800">
          <div class="about_img">
            <img
              src="https://storage.googleapis.com/vue-course-api.appspot.com/johnming/1625981996199.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Iqkd2xDzbhlj%2FD0q572zBXndYbEtWTd3eCPthSq3iaLxlWM6kG2vydc%2FSDD6dtWFSw3T%2Bc4kbbCVfoZ3YovOzI3gNwe6f38O3oW623PSI4N5Sn4Qt7ASFOdWVNciK8thjLsLdh5ELIZMIdf1rAxaaz%2BbHtzfWrKOOd4X1BJUETRc65xwKdiitIJinrf9Mclo2OSUy%2BzkheVEj4tL2Mvbk2SYbxidhaGaDG%2BiJv6qCrc03fs01zzLSAUZjlRIKt%2FEubMv%2BKlnRLrvPiwLyoRShh%2BRsQ58KgC7uMLCE78h6qa74iwrhd%2BX73iB7z2pgpZgy4P%2FBShvjLYA165jO0LexA%3D%3D"
              alt="讓我們開始喝咖啡時光吧！"
            />
          </div>
          <div class="about_txt about_txt_2">
            <div class="about_h2 text-center">每天都可以喝的味道</div>
            <div class="about_text ">
              <p>
                SPIRIT
                希望喜愛咖啡的您能用合宜的價格，每天都能喝上精心烹製的咖啡，讓平凡的日常有一個美好的咖啡時光。
              </p>
              <p>
                準備好享受樂趣吧，讓我們開始喝咖啡時光吧！
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Path from '@/components/Path.vue';

export default {
  data() {
    return {
      pathData: {
        previous: [{ title: '首頁', url: '/' }],
        purpose: '關於我們',
      },
    };
  },
  components: {
    Path,
  },
};
</script>

<style lang="scss" scoped>
.about {
  display: flex;
  flex-wrap: wrap;
  &_box {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    &:last-child {
      margin: -30px 0 50px;
      @media only screen and (max-width: 1024px) {
        margin: 0 0 50px;
      }
    }
  }
  &_txt {
    padding: 40px 60px 30px;
    width: 46%;
    @media only screen and (max-width: 1024px) {
      width: 100%;
      order: 1;
      padding: 40px 60px 0px;
    }
    @media only screen and (max-width: 600px) {
      padding: 20px 0px 0px;
    }
  }
  &_txt_2 {
    padding: 100px 60px 30px;
    @media only screen and (max-width: 1024px) {
      padding: 60px 60px 0px;
    }
    @media only screen and (max-width: 600px) {
      padding: 50px 0px 0px;
    }
  }
  &_img {
    width: 54%;
    @media only screen and (max-width: 1024px) {
      width: 100%;
      order: 2;
    }
  }
  &_h2 {
    font-size: 36px;
    margin-bottom: 30px;
    @media only screen and (max-width: 1024px) {
      font-size: 28px;
      margin-bottom: 20px;
    }
  }
  &_text {
    line-height: 1.8;
    & p {
      margin-bottom: 25px;
    }
  }
}
</style>
