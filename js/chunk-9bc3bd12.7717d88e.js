(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9bc3bd12"],{"0fd0":function(e,t,c){"use strict";c.r(t);var o=c("7a23"),a=Object(o["withScopeId"])("data-v-b34962bc");Object(o["pushScopeId"])("data-v-b34962bc");var r={class:"position-relative inn_banner",style:{"background-image":"url(https://storage.googleapis.com/vue-course-api.appspot.com/johnming/1626702470408.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=ZuqNZWkgZBvbuQu3515xnP5l%2Bh5x1jGih70wSKtxcdMTQgNWxM0WF5AdK11nyRG3Qe02U8a4Ijyphjm6xIKzs17C5O6pXl7zt0yGU8pPyIC%2Fouy7kCDPE9bOmNx8NnD64mY4zdcBq7g7aR54DvMcaLMdPXKdzgPiy1NPjhantn6uEVmk%2Frf%2FQTDiWwjkGK8rU19hO6qLK44Li8MD%2FaPS0dnZMOOSN9C%2BBHBzCrn6G4xlfEQnpzBGLh3%2Fcj9%2BIjwpMrPcj%2FELpzOZpGLOmvcIcFaM5yzbrFcS4zM4WHNj42BqI1n2f72s5zJ%2FfkOFSXld697HdYuhORB0eop%2F0C9npg%3D%3D)"}},i={class:"position-absolute start-50 top-50 translate-middle fw-bold text-white"},n={class:"container"},d={class:"row justify-content-center mt-4"},s={class:"col-12 col-lg-10"},l={class:"row"},p={class:"col-12 col-lg-6"},b={class:"col-12 flex-nowrap py-1 overflow-auto"},u={class:"row flex-nowrap m-0"},j={class:"col-2 pe-1",href:"javascript:void(0);"},O={class:"col-12 col-lg-6"},m={class:"text-start description ps-lg-5"},g={class:"description_title"},k={class:"description_detail"},v={class:"description_detail_origin"},y=Object(o["createVNode"])("span",null,"【 產地 】",-1),N={key:0,class:"description_detail_variety"},V=Object(o["createVNode"])("span",null,"【 品種 】",-1),h={key:1,class:"description_baking"},_=Object(o["createVNode"])("span",null,"【 烘焙度 】",-1),P={key:2,class:"description_detail_approach"},B=Object(o["createVNode"])("span",null,"【 處理法 】",-1),f={key:3,class:"description_detail_acidity"},w=Object(o["createVNode"])("span",null,"【 酸度 】",-1),C={class:"cube"},S={key:4,class:"description_detail_Bitterness"},D=Object(o["createVNode"])("span",null,"【 苦度 】",-1),x={class:"cube"},I={key:5,class:"description_detail_flavor"},L=Object(o["createVNode"])("span",null,"【 風味 】",-1),F={class:"mt-5"},q={key:0,class:"product_price_1"},M={key:1,class:"product_price_2"},z={key:2,class:"product_price_2"},T={class:"d-flex align-items-center mt-2"},G={class:"d-flex me-3"},Q=Object(o["createVNode"])("span",{class:"material-icons"}," remove ",-1),U=Object(o["createVNode"])("span",{class:"material-icons"}," add ",-1),K={key:0,class:"spinner-border spinner-border-sm"},E=Object(o["createTextVNode"])(" 加入購物車 "),W={class:"section border-bottom border-primary"},Z={class:"row"},A={class:"detail col-12 col-lg-10 m-auto"},$=Object(o["createVNode"])("h3",{class:"detail_title"},"風味特性",-1),H={class:"detail_txt"},J=Object(o["createVNode"])("h3",{class:"detail_title"},"產品敘述",-1),R={class:"detail_txt"},X={class:"section"},Y={class:"related"},ee=Object(o["createVNode"])("h2",{class:"text-center"},"相關產品",-1);Object(o["popScopeId"])();var te=a((function(e,t,c,a,te,ce){var oe=Object(o["resolveComponent"])("Loading"),ae=Object(o["resolveComponent"])("Path"),re=Object(o["resolveComponent"])("ProductAlike");return Object(o["openBlock"])(),Object(o["createBlock"])(o["Fragment"],null,[Object(o["createVNode"])(oe,{active:te.isLoading},null,8,["active"]),Object(o["createVNode"])("div",r,[Object(o["createVNode"])("div",null,[Object(o["createVNode"])("h2",i,Object(o["toDisplayString"])(te.pathData.purpose),1)])]),Object(o["createVNode"])("div",n,[Object(o["createVNode"])(ae,{"path-data":te.pathData},null,8,["path-data"]),Object(o["createVNode"])("div",d,[Object(o["createVNode"])("div",s,[Object(o["createVNode"])("div",l,[Object(o["createVNode"])("div",p,[Object(o["createVNode"])("img",{class:"rounded-2 w-100",src:te.productImg,alt:te.tempProduct.title},null,8,["src","alt"]),Object(o["createVNode"])("div",b,[Object(o["createVNode"])("div",u,[Object(o["createVNode"])("a",j,[Object(o["createVNode"])("img",{class:"w-100 rounded",src:te.tempProduct.imageUrl,alt:te.tempProduct.title,onClick:t[1]||(t[1]=function(e){return ce.changeImg(te.tempProduct.imageUrl)})},null,8,["src","alt"])]),(Object(o["openBlock"])(!0),Object(o["createBlock"])(o["Fragment"],null,Object(o["renderList"])(te.tempProduct.imagesUrl,(function(e,t){return Object(o["openBlock"])(),Object(o["createBlock"])("a",{href:"javascript:void(0);",class:"col-2 pe-1",key:"img_".concat(t)},[Object(o["createVNode"])("img",{class:"w-100 p-0 rounded",src:e,alt:te.tempProduct.title,onClick:function(t){return ce.changeImg(e)}},null,8,["src","alt","onClick"])])})),128))])])]),Object(o["createVNode"])("div",O,[Object(o["createVNode"])("div",m,[Object(o["createVNode"])("h2",g,Object(o["toDisplayString"])(te.tempProduct.title),1),Object(o["createVNode"])("div",k,[Object(o["createVNode"])("div",v,[y,Object(o["createTextVNode"])(Object(o["toDisplayString"])(te.tempProduct.origin),1)]),te.tempProduct.variety?(Object(o["openBlock"])(),Object(o["createBlock"])("div",N,[V,Object(o["createTextVNode"])(Object(o["toDisplayString"])(te.tempProduct.variety),1)])):Object(o["createCommentVNode"])("",!0),te.tempProduct.baking?(Object(o["openBlock"])(),Object(o["createBlock"])("div",h,[_,Object(o["createTextVNode"])(Object(o["toDisplayString"])(te.tempProduct.baking),1)])):Object(o["createCommentVNode"])("",!0),te.tempProduct.approach?(Object(o["openBlock"])(),Object(o["createBlock"])("div",P,[B,Object(o["createTextVNode"])(Object(o["toDisplayString"])(te.tempProduct.approach),1)])):Object(o["createCommentVNode"])("",!0),te.tempProduct.acidity?(Object(o["openBlock"])(),Object(o["createBlock"])("div",f,[w,Object(o["createVNode"])("div",C,[(Object(o["openBlock"])(!0),Object(o["createBlock"])(o["Fragment"],null,Object(o["renderList"])(te.acidity_one,(function(e){return Object(o["openBlock"])(),Object(o["createBlock"])("div",{class:"cube_black",key:e})})),128)),(Object(o["openBlock"])(!0),Object(o["createBlock"])(o["Fragment"],null,Object(o["renderList"])(te.acidity_sec,(function(e){return Object(o["openBlock"])(),Object(o["createBlock"])("div",{class:"cube_white",key:e})})),128))])])):Object(o["createCommentVNode"])("",!0),te.tempProduct.Bitterness?(Object(o["openBlock"])(),Object(o["createBlock"])("div",S,[D,Object(o["createVNode"])("div",x,[(Object(o["openBlock"])(!0),Object(o["createBlock"])(o["Fragment"],null,Object(o["renderList"])(te.bitterness_one,(function(e){return Object(o["openBlock"])(),Object(o["createBlock"])("div",{class:"cube_black",key:e})})),128)),(Object(o["openBlock"])(!0),Object(o["createBlock"])(o["Fragment"],null,Object(o["renderList"])(te.bitterness_sec,(function(e){return Object(o["openBlock"])(),Object(o["createBlock"])("div",{class:"cube_white",key:e})})),128))])])):Object(o["createCommentVNode"])("",!0),te.tempProduct.flavor&&te.tempProduct.flavor_sec?(Object(o["openBlock"])(),Object(o["createBlock"])("div",I,[L,Object(o["createTextVNode"])(" "+Object(o["toDisplayString"])(te.tempProduct.flavor)+"，"+Object(o["toDisplayString"])(te.tempProduct.flavor_sec),1)])):Object(o["createCommentVNode"])("",!0)]),Object(o["createVNode"])("div",F,[te.tempProduct.price===te.tempProduct.origin_price?(Object(o["openBlock"])(),Object(o["createBlock"])("div",q,Object(o["toDisplayString"])(e.$filters.currency(te.tempProduct.origin_price))+" 元 / "+Object(o["toDisplayString"])(te.tempProduct.unit),1)):Object(o["createCommentVNode"])("",!0),te.tempProduct.price!==te.tempProduct.origin_price?(Object(o["openBlock"])(),Object(o["createBlock"])("del",M," 原價 "+Object(o["toDisplayString"])(e.$filters.currency(te.tempProduct.origin_price))+" 元 ",1)):Object(o["createCommentVNode"])("",!0),te.tempProduct.price!==te.tempProduct.origin_price?(Object(o["openBlock"])(),Object(o["createBlock"])("div",z," 特價 "+Object(o["toDisplayString"])(e.$filters.currency(te.tempProduct.price))+" 元 / "+Object(o["toDisplayString"])(te.tempProduct.unit),1)):Object(o["createCommentVNode"])("",!0)]),Object(o["createVNode"])("div",T,[Object(o["createVNode"])("div",G,[Object(o["createVNode"])("button",{type:"button",class:["cart_remove cart_btn",{"not-allowed":1===te.qty}],disabled:1===te.qty,onClick:t[2]||(t[2]=function(e){return ce.changeQty("reduce")})},[Q],10,["disabled"]),Object(o["withDirectives"])(Object(o["createVNode"])("input",{class:"cart_product_input",type:"text",disabled:"disabled","onUpdate:modelValue":t[3]||(t[3]=function(e){return te.qty=e})},null,512),[[o["vModelText"],te.qty]]),Object(o["createVNode"])("button",{type:"button",class:"cart_add cart_btn",onClick:t[4]||(t[4]=Object(o["withModifiers"])((function(e){return ce.changeQty("add")}),["prevent"]))},[U])]),Object(o["createVNode"])("button",{disabled:te.loadingStatus.loadingItem===te.tempProduct.id,onClick:t[5]||(t[5]=function(e){return ce.addToCart(te.tempProduct.id,te.qty)}),type:"button",class:"btn btn-secondary"},[te.loadingStatus.loadingItem===te.tempProduct.id?(Object(o["openBlock"])(),Object(o["createBlock"])("i",K)):Object(o["createCommentVNode"])("",!0),E],8,["disabled"])])])])])])]),Object(o["createVNode"])("section",W,[Object(o["createVNode"])("div",Z,[Object(o["createVNode"])("div",A,[$,Object(o["createVNode"])("p",H,Object(o["toDisplayString"])(te.tempProduct.decription),1),J,Object(o["createVNode"])("p",R,Object(o["toDisplayString"])(te.tempProduct.content),1)])])]),Object(o["createVNode"])("section",X,[Object(o["createVNode"])("div",Y,[ee,Object(o["createVNode"])(re,{onGoPage:ce.getProduct},null,8,["onGoPage"])])])])],64)})),ce=c("ab65"),oe=c("37ca"),ae=c("8c80"),re={inject:["swalert"],data:function(){return{loadingStatus:{loadingItem:""},isLoading:!1,tempProduct:{},productImg:"",qty:1,acidity_one:0,acidity_sec:0,bitterness_one:0,bitterness_sec:0,pathData:{previous:[{title:"首頁",url:"/"},{title:"產品列表",url:"/products"}],purpose:""}}},components:{ProductAlike:ae["a"]},created:function(){var e=this.$route.params.id;this.getProduct(e)},methods:{getProduct:function(e){var t=this;this.isLoading=!0,Object(ce["r"])(e).then((function(e){e.data.success?(t.tempProduct=e.data.product,t.productImg=t.tempProduct.imageUrl,t.pathData.purpose=t.tempProduct.title,t.cubeCount(),t.isLoading=!1):(t.isLoading=!1,t.swalert("error","取得產品發生錯誤。 ".concat(e.data.message)))})).catch((function(e){t.swalert("error","取得產品時發生錯誤，請重新整理此頁面。 ".concat(e.message))}))},changeImg:function(e){this.productImg=e},addToCart:function(e,t){var c=this;this.isLoading=!0,this.loadingStatus.loadingItem=e;var o={product_id:e,qty:t};Object(ce["a"])({data:o}).then((function(e){e.data.success?(c.loadingStatus.loadingItem="",oe["a"].emit("updata-cart"),c.isLoading=!1,c.qty=1,c.swalert("success","已加入購物車")):(c.isLoading=!1,c.swalert("error","加入失敗。 ".concat(e.data.message)))})).catch((function(e){c.swalert("error","加入購物車時發生錯誤，請重新整理此頁面。 ".concat(e.message))}))},changeQty:function(e){"add"===e&&(this.qty+=1),"reduce"===e&&(this.qty-=1)},cubeCount:function(){var e=parseInt(this.tempProduct.acidity,10),t=parseInt(this.tempProduct.Bitterness,10);this.acidity_one=e,this.acidity_sec=Math.abs(e-5),this.bitterness_one=t,this.bitterness_sec=Math.abs(t-5)}}};c("1584");re.render=te,re.__scopeId="data-v-b34962bc";t["default"]=re},1584:function(e,t,c){"use strict";c("66a5")},"66a5":function(e,t,c){}}]);
//# sourceMappingURL=chunk-9bc3bd12.7717d88e.js.map