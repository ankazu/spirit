import { createApp } from 'vue';
// axios
import axios from 'axios';
import VueAxios from 'vue-axios';
// loading特效
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
// 後台編輯器
import CKEditor from '@ckeditor/ckeditor5-vue';
// 表單驗證
import {
  Form, Field, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import AllRules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
import VueSweetalert2 from 'vue-sweetalert2';
// tools
import 'sweetalert2/dist/sweetalert2.min.css';
// bootstrap
import 'bootstrap';
import './assets/all.scss';
import AOS from 'aos';
import 'aos/dist/aos.css';
// methods
import { date, currency } from './methods/filters';

import App from './App.vue';
import router from './router';

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
  classes: {
    invalid: 'is-invalid',
  },
});
// 設定預設語系
setLocale('zh_TW');
AOS.init({
  duration: 400,
  offset: 150,
});
const app = createApp(App);

app.config.globalProperties.$filters = {
  date,
  currency,
};
app.use(router);
app.use(VueAxios, axios);
app.use(VueSweetalert2);
app.use(CKEditor);
app.component('Loading', VueLoading);
app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);
app.mount('#app');
