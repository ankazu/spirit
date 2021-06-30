<template>
  <div>
    <div class="banner">
      <img src="../assets/images/banner01.jpg" alt="" />
      <div class="banner_txtbox">
        <div></div>
      </div>
    </div>
    <section class="section container">
      <div class="section_title">
        <p>lorem</p>
        <h2>
          喝杯咖啡，讓您平常的一天好過一點。
        </h2>
      </div>
      <div class="features">
        <div class="features_img">
          <img src="../assets/images/features-1.jpg" alt="" />
        </div>
        <div class="features_txt">
          <div class="features_icon"></div>
          <h3>每天都可以喝的味道</h3>
          <p>
            選用優質的生豆，用小火慢慢煮，以促進美味成分的化學變化。<br />
            每天都可以喝的咖啡不需要第一口就很香。它並不華麗，如果您注意到它，將永遠不會厭倦它。這就是味道。
          </p>
        </div>
      </div>
      <div class="features">
        <div class="features_img">
          <img src="../assets/images/features-2.jpg" alt="" />
        </div>
        <div class="features_txt">
          <div class="features_icon"></div>
          <h3>每天喝得起的價格</h3>
          <p>
            生咖啡豆的市場價格由供求關係決定。稀缺豆價值高、品質好的生豆價格也會相應上漲。<br />
            採購標準是質量好、產量穩定的生豆。我們實現了既滿足顧客可以飲用的價格又滿足保持商店營業的利潤的平衡。
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
.spirit {
  font-family: 'Pacifico', cursive;
}

.section {
  padding: 120px 20px;
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
}
.features {
  display: flex;
}
.features:nth-of-type(3) {
  flex-direction: row-reverse;
}
.features_img {
  width: 50%;
  line-height: 0;
  border-radius: 20px;
  overflow: hidden;
}
.features_txt {
  width: 50%;
  padding: 0 6%;
  text-align: left;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}
.features_txt h3 {
  margin-bottom: 25px;
  font-weight: 600;
  width: 100%;
}
.features_icon::before {
  display: flex;
  justify-self: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background-color: #fff2bc;
  content: '';
  margin-bottom: 20px;
  border-radius: 50%;
}
</style>
