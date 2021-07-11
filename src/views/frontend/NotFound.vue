<template>
  <div class="container">
    <section class="section_empty">
      <div class="empty_cart mt-4">
        <img
          src="https://storage.googleapis.com/vue-course-api.appspot.com/johnming/1625982813518.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=UdEdP1TSQtLXmXM0WJufbVe%2FTpN3qYJfO4zLwIC91XlsaRVKHAxw0KfYE1Z9Xi6cFdOD%2FCxU4YJvSg3PmXDo5J4GapYbhJY%2BkvZq6N3dJ85hY208ZgK5N%2Bs9W78YVDQNDWT2BeW%2BfyEFh%2BpudIh4vkppsq5MZBE5voyijg3D%2FyGhBgqglnECWX13IPdHjdjEIUu4emBOVVS1YQSU4pEvPtZSYKo9qRM%2FZLEeBwQRFZ31p50yqiAjU%2Fjz8T3TVXjEfCrTIgrjKqXbQVAyEsIeOy4fVm9WmZQPupPjRUm8D0sncBt%2FXsoQnOog5MawD0wXuerVAp2aTyvEcRAJdxMalg%3D%3D"
          alt=""
        />
        <div>
          <div class="mt-5 mb-5">404找不到頁面</div>
          <router-link class="btn btn-primary btn-lg mt-5" to="/">返回首頁</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.empty_cart {
  font-size: 28px;
  width: 100%;
}
.empty_cart img {
  border-radius: 20px;
}
</style>
