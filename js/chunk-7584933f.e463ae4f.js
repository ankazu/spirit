(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7584933f"],{"1a58":function(e,t,c){"use strict";c("9003")},9003:function(e,t,c){},b0c0:function(e,t,c){var a=c("83ab"),r=c("9bf2").f,o=Function.prototype,n=o.toString,l=/^\s*function ([^ (]*)/,s="name";a&&!(s in o)&&r(o,s,{configurable:!0,get:function(){try{return n.call(this).match(l)[1]}catch(e){return""}}})},b272:function(e,t,c){"use strict";c.r(t);c("b0c0");var a=c("7a23"),r=Object(a["withScopeId"])("data-v-b512fe2e");Object(a["pushScopeId"])("data-v-b512fe2e");var o={class:"position-relative inn_banner",style:{height:"250px","background-size":"cover","background-position":"center center","background-repeat":"no-repeat","background-image":"url(https://storage.googleapis.com/vue-course-api.appspot.com/johnming/1626702787982.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=CrNQrW8cLRifH7Tcj0el7SaRzWl2AGL0xqWxFf9LkwIt4mKUh9lxR1am9qeksJ0KhJJO%2BnLyk5cN1tDVEJb8c2bl6KFQIAJjZEEZlgubyY%2FY0BewH0FRdYnH90q%2FKkovmhb9SdHF%2B73lymDFCMsimSKW57%2BqxPOPqCha0W8CYvYEWkE17%2BNdKJlNAwnk84jyBW098QOXftCAOY3YjRF8DsvEzlOcBHPgrKsqBzEQi1M6dX0GO68oBChWl8w5%2F7A6VQVipaL3m7l9mOBjlraa%2BIArzwkv6KUDSkgdey1VChhnFxMDe%2BKllroKgpqTGL8dseTvxiHe%2B%2BVo8UQCXedUbg%3D%3D)"}},n={class:"position-absolute start-50 top-50 translate-middle fw-bold text-white"},l={class:"container"},s=Object(a["createStaticVNode"])('<div class="process" data-v-b512fe2e><div class="process_step current" data-num="01" data-v-b512fe2e> 確認商品 </div><div class="process_step current" data-num="02" data-v-b512fe2e> 填寫資料 </div><div class="process_step current" data-num="03" data-v-b512fe2e> 訂購完成 </div></div><div class="mt-4 text-center" data-v-b512fe2e><span class="material-icons shop_cart_icon" data-v-b512fe2e> local_shipping </span></div>',2),d={class:"text-center"},i=Object(a["createVNode"])("h2",{class:"my-4"},"感謝您的訂購！",-1),b=Object(a["createVNode"])("p",null,"您訂購的商品將在近期安排出貨，請留意簡訊通知或配送人員的電話。",-1),u=Object(a["createVNode"])("div",{class:"mt-4"},[Object(a["createVNode"])("h4",null,"訂購人資訊")],-1),p={class:"checkout_table"},O=Object(a["createVNode"])("th",null,"姓名",-1),j=Object(a["createVNode"])("th",null,"Email",-1),h=Object(a["createVNode"])("th",null,"電話",-1),V=Object(a["createVNode"])("th",null,"地址",-1),g=Object(a["createVNode"])("th",null,"購買產品",-1),m={class:"list-unstyled ps-0 mb-0"},N=Object(a["createVNode"])("th",null,"付款金額",-1),v=Object(a["createVNode"])("th",null,"取貨方式",-1),f=Object(a["createVNode"])("th",null,"付款方式",-1),y=Object(a["createVNode"])("th",null,"付款狀態",-1),k={key:0,class:"text-danger"},B={key:1,class:"text-success"},w={key:0},D=Object(a["createVNode"])("th",null,null,-1),S=Object(a["createTextVNode"])("繼續購物");Object(a["popScopeId"])();var x=r((function(e,t,c,x,_,F){var L=Object(a["resolveComponent"])("Path"),C=Object(a["resolveComponent"])("router-link");return Object(a["openBlock"])(),Object(a["createBlock"])(a["Fragment"],null,[Object(a["createVNode"])("div",o,[Object(a["createVNode"])("div",null,[Object(a["createVNode"])("h2",n,Object(a["toDisplayString"])(_.pathData.purpose),1)])]),Object(a["createVNode"])("div",l,[Object(a["createVNode"])(L,{"path-data":_.pathData},null,8,["path-data"]),s,Object(a["createVNode"])("div",d,[i,b,u,Object(a["createVNode"])("table",p,[Object(a["createVNode"])("tbody",null,[Object(a["createVNode"])("tr",null,[O,Object(a["createVNode"])("td",null,Object(a["toDisplayString"])(_.order.user.name),1)]),Object(a["createVNode"])("tr",null,[j,Object(a["createVNode"])("td",null,Object(a["toDisplayString"])(_.order.user.email),1)]),Object(a["createVNode"])("tr",null,[h,Object(a["createVNode"])("td",null,Object(a["toDisplayString"])(_.order.user.tel),1)]),Object(a["createVNode"])("tr",null,[V,Object(a["createVNode"])("td",null,Object(a["toDisplayString"])(_.order.user.address),1)]),Object(a["createVNode"])("tr",null,[g,Object(a["createVNode"])("td",null,[Object(a["createVNode"])("ul",m,[(Object(a["openBlock"])(!0),Object(a["createBlock"])(a["Fragment"],null,Object(a["renderList"])(_.order.products,(function(e){return Object(a["openBlock"])(),Object(a["createBlock"])("li",{key:e.id},Object(a["toDisplayString"])(e.product.title)+" * "+Object(a["toDisplayString"])(e.qty),1)})),128))])])]),Object(a["createVNode"])("tr",null,[N,Object(a["createVNode"])("td",null,Object(a["toDisplayString"])(e.$filters.currency(_.order.total))+" 元",1)]),Object(a["createVNode"])("tr",null,[v,Object(a["createVNode"])("td",null,Object(a["toDisplayString"])(_.order.user.delivery),1)]),Object(a["createVNode"])("tr",null,[f,Object(a["createVNode"])("td",null,Object(a["toDisplayString"])(_.order.user.payment),1)]),Object(a["createVNode"])("tr",null,[y,Object(a["createVNode"])("td",null,[_.order.is_paid?(Object(a["openBlock"])(),Object(a["createBlock"])("span",B,"已付款")):(Object(a["openBlock"])(),Object(a["createBlock"])("span",k,"未付款"))])]),"貨到付款"!==_.order.user.payment?(Object(a["openBlock"])(),Object(a["createBlock"])("tr",w,[D,Object(a["createVNode"])("td",null,[Object(a["createVNode"])("button",{type:"button",class:["btn btn-outline-primary btn-sm",{"not-allowed":_.order.is_paid}],onClick:t[1]||(t[1]=function(e){return F.goToPay(_.order.id)}),disabled:_.order.is_paid}," 點擊付款 ",10,["disabled"])])])):Object(a["createCommentVNode"])("",!0)])]),Object(a["createVNode"])(C,{to:"/products",class:"btn btn-primary mt-4 mb-5"},{default:r((function(){return[S]})),_:1})])])],64)})),_=c("ab65"),F=c("37ca"),L={data:function(){return{isLoading:!1,pathData:{previous:[{title:"首頁",url:"/"}],purpose:"訂購完成"},order:{user:{name:"",address:"",emali:"",tel:""}}}},inject:["swalert"],mounted:function(){F["a"].emit("updata-cart");var e=this.$route.params.id;this.getOrder(e)},methods:{getOrder:function(e){var t=this;this.isLoading=!0,Object(_["p"])(e).then((function(e){e.data.success?(t.order=e.data.order,t.isLoading=!1):(t.isLoading=!1,t.swalert("error","取得訂單發生錯誤。 ".concat(e.data.message)))})).catch((function(e){t.swalert("error","取得訂單時發生錯誤，請重新整理此頁面。 ".concat(e.message))}))},goToPay:function(e){var t=this;this.isLoading=!0,Object(_["t"])(e).then((function(c){c.data.success?(t.isLoading=!1,t.swalert("success","付款成功"),t.getOrder(e)):t.swalert("error","付款失敗。 ".concat(c.data.message))})).catch((function(e){t.swalert("error","發生錯誤請重新整理。 ".concat(e.message))}))}}};c("1a58");L.render=x,L.__scopeId="data-v-b512fe2e";t["default"]=L}}]);
//# sourceMappingURL=chunk-7584933f.e463ae4f.js.map