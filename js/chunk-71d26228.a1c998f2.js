(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-71d26228"],{"35a9":function(e,t,c){"use strict";c("40ff")},"40ff":function(e,t,c){},"6d09":function(e,t,c){"use strict";c.r(t);var o=c("7a23"),a={class:"d-flex justify-content-end"},r={class:"table mt-4"},l=Object(o["createVNode"])("thead",null,[Object(o["createVNode"])("tr",null,[Object(o["createVNode"])("th",{width:"120"}," 分類 "),Object(o["createVNode"])("th",null,"產品名稱"),Object(o["createVNode"])("th",{width:"120"}," 原價 "),Object(o["createVNode"])("th",{width:"120"}," 售價 "),Object(o["createVNode"])("th",{width:"100"}," 是否啟用 "),Object(o["createVNode"])("th",{width:"120"}," 編輯 ")])],-1),n={key:0,class:"text-success"},d={key:1},i={class:"btn-group"},s={class:"d-flex justify-content-center"};function u(e,t,c,u,p,b){var m=Object(o["resolveComponent"])("Loading"),j=Object(o["resolveComponent"])("Pagination"),O=Object(o["resolveComponent"])("ProductModal"),f=Object(o["resolveComponent"])("DeleteModal");return Object(o["openBlock"])(),Object(o["createBlock"])(o["Fragment"],null,[Object(o["createVNode"])(m,{active:p.isLoading},null,8,["active"]),Object(o["createVNode"])("div",null,[Object(o["createVNode"])("div",a,[Object(o["createVNode"])("button",{type:"button",class:"btn btn-primary",onClick:t[1]||(t[1]=function(e){return b.openModal("creat")})},"新增產品")]),Object(o["createVNode"])("table",r,[l,Object(o["createVNode"])("tbody",null,[(Object(o["openBlock"])(!0),Object(o["createBlock"])(o["Fragment"],null,Object(o["renderList"])(p.products,(function(e){return Object(o["openBlock"])(),Object(o["createBlock"])("tr",{key:e.id},[Object(o["createVNode"])("td",null,Object(o["toDisplayString"])(e.category),1),Object(o["createVNode"])("td",null,Object(o["toDisplayString"])(e.title),1),Object(o["createVNode"])("td",null,Object(o["toDisplayString"])(e.origin_price),1),Object(o["createVNode"])("td",null,Object(o["toDisplayString"])(e.price),1),Object(o["createVNode"])("td",null,[e.is_enabled?(Object(o["openBlock"])(),Object(o["createBlock"])("span",n,"啟用")):(Object(o["openBlock"])(),Object(o["createBlock"])("span",d,"未啟用"))]),Object(o["createVNode"])("td",null,[Object(o["createVNode"])("div",i,[Object(o["createVNode"])("button",{type:"button",class:"btn btn-outline-primary btn-sm",onClick:function(t){return b.openModal("edit",e)}}," 編輯 ",8,["onClick"]),Object(o["createVNode"])("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:function(t){return b.openModal("delete",e)}}," 刪除 ",8,["onClick"])])])])})),128))])]),Object(o["createVNode"])("div",s,[Object(o["createVNode"])(j,{page:p.pagination,onGetPage:b.getProducts},null,8,["page","onGetPage"])]),Object(o["createVNode"])(O,{ref:"ProductModal",product:p.tempProduct,"is-new":p.isNew,onUpdateProduct:b.updata},null,8,["product","is-new","onUpdateProduct"]),Object(o["createVNode"])(f,{ref:"DeleteModal",item:p.tempProduct,onUpdata:b.deleteProduct},null,8,["item","onUpdata"])])],64)}var p=c("5530"),b=c("ab65"),m=c("8ae4"),j=c("212e"),O=(c("a434"),{id:"productModal",ref:"modal",class:"modal fade",tabindex:"-1","aria-labelledby":"productModalLabel","aria-hidden":"true"}),f={class:"modal-dialog modal-xl"},g={class:"modal-content border-0"},V={class:"modal-header bg-dark text-white"},N={id:"productModalLabel",class:"modal-title"},h={key:0},v={key:1},P=Object(o["createVNode"])("button",{type:"button",class:"btn-close btn-close-white","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),k={class:"modal-body"},y={class:"row"},w={class:"col-sm-4"},x={class:"mb-3"},M=Object(o["createVNode"])("label",{for:"image",class:"form-label"},"輸入主要圖片網址",-1),U={class:"mb-3"},B={for:"customFile",class:"form-label"},D=Object(o["createTextVNode"])("或 上傳圖片 "),C={key:0,class:"fas fa-spinner fa-spin"},T={key:0,class:"mt-5"},_={class:"form-group"},$={for:"customFile",class:"form-label"},F=Object(o["createTextVNode"])("上傳圖片 "),I={key:0,class:"fas fa-spinner fa-spin"},S={key:0},L={class:"col-sm-8"},A={class:"form-group"},J=Object(o["createVNode"])("label",{for:"title"},[Object(o["createTextVNode"])("標題"),Object(o["createVNode"])("span",{class:"text-danger"}," *")],-1),G={class:"row"},z={class:"form-group col-md-6"},E=Object(o["createVNode"])("label",{for:"category"},[Object(o["createTextVNode"])("分類"),Object(o["createVNode"])("span",{class:"text-danger"}," *")],-1),q={class:"form-group col-md-6"},H=Object(o["createVNode"])("label",{for:"unit"},[Object(o["createTextVNode"])("單位"),Object(o["createVNode"])("span",{class:"text-danger"}," *")],-1),K={class:"form-group col-md-6"},Q=Object(o["createVNode"])("label",{for:"baking"},"烘焙",-1),R={class:"form-group col-md-6"},W=Object(o["createVNode"])("label",{for:"Bitterness"},"苦度",-1),X={class:"form-group col-md-6"},Y=Object(o["createVNode"])("label",{for:"acidity"},"酸度",-1),Z={class:"form-group col-md-6"},ee=Object(o["createVNode"])("label",{for:"flavor"},"風味1",-1),te={class:"form-group col-md-6"},ce=Object(o["createVNode"])("label",{for:"flavor2"},"風味2",-1),oe={class:"form-group col-md-6"},ae=Object(o["createVNode"])("label",{for:"origin"},"國家產地",-1),re={class:"form-group col-md-6"},le=Object(o["createVNode"])("label",{for:"approach"},"處理方法",-1),ne={class:"form-group col-md-6"},de=Object(o["createVNode"])("label",{for:"variety"},"品種",-1),ie={class:"row"},se={class:"form-group col-md-6"},ue=Object(o["createVNode"])("label",{for:"origin_price"},[Object(o["createTextVNode"])("原價"),Object(o["createVNode"])("span",{class:"text-danger"}," *")],-1),pe={class:"form-group col-md-6"},be=Object(o["createVNode"])("label",{for:"price"},[Object(o["createTextVNode"])("售價"),Object(o["createVNode"])("span",{class:"text-danger"}," *")],-1),me=Object(o["createVNode"])("hr",null,null,-1),je={class:"form-group"},Oe=Object(o["createVNode"])("label",{for:"description"},"產品描述",-1),fe={class:"form-group"},ge=Object(o["createVNode"])("label",{for:"content"},"說明內容",-1),Ve={class:"form-group"},Ne={class:"form-check"},he=Object(o["createVNode"])("label",{class:"form-check-label",for:"is_enabled"},"是否啟用",-1),ve={class:"modal-footer"},Pe=Object(o["createVNode"])("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"}," 取消 ",-1);function ke(e,t,c,a,r,l){return Object(o["openBlock"])(),Object(o["createBlock"])("div",O,[Object(o["createVNode"])("div",f,[Object(o["createVNode"])("div",g,[Object(o["createVNode"])("div",V,[Object(o["createVNode"])("h5",N,[c.isNew?(Object(o["openBlock"])(),Object(o["createBlock"])("span",h,"新增產品")):(Object(o["openBlock"])(),Object(o["createBlock"])("span",v,"編輯產品"))]),P]),Object(o["createVNode"])("div",k,[Object(o["createVNode"])("div",y,[Object(o["createVNode"])("div",w,[Object(o["createVNode"])("div",x,[M,Object(o["withDirectives"])(Object(o["createVNode"])("input",{type:"text",class:"form-control",id:"image","onUpdate:modelValue":t[1]||(t[1]=function(e){return r.tempProduct.imageUrl=e}),placeholder:"請輸入圖片連結"},null,512),[[o["vModelText"],r.tempProduct.imageUrl]])]),Object(o["createVNode"])("div",U,[Object(o["createVNode"])("label",B,[D,r.status.fileUploading?(Object(o["openBlock"])(),Object(o["createBlock"])("i",C)):Object(o["createCommentVNode"])("",!0)]),Object(o["createVNode"])("input",{type:"file",id:"customFile",class:"form-control",ref:"fileInput",onChange:t[2]||(t[2]=function(e){return l.uploadFile("image","fileInput")})},null,544)]),Object(o["createVNode"])("img",{class:"img-fluid",src:r.tempProduct.imageUrl},null,8,["src"]),Array.isArray(r.tempProduct.imagesUrl)?(Object(o["openBlock"])(),Object(o["createBlock"])("div",T,[(Object(o["openBlock"])(!0),Object(o["createBlock"])(o["Fragment"],null,Object(o["renderList"])(r.tempProduct.imagesUrl,(function(e,t){return Object(o["openBlock"])(),Object(o["createBlock"])("div",{class:"mb-1",key:t},[Object(o["createVNode"])("div",_,[Object(o["createVNode"])("label",$,[F,r.status.fileUploading?(Object(o["openBlock"])(),Object(o["createBlock"])("i",I)):Object(o["createCommentVNode"])("",!0)]),Object(o["createVNode"])("input",{type:"file",id:"customFile",class:"form-control",ref:t+"fileInputs",name:t+"-upload",onChange:function(e){return l.uploadFile("images","".concat(t+"fileInputs"),t)}},null,40,["name","onChange"])]),Object(o["createVNode"])("img",{class:"img-fluid",src:e,alt:r.tempProduct.title},null,8,["src","alt"]),Object(o["createVNode"])("button",{type:"button",class:"btn btn-outline-danger",onClick:function(e){return r.tempProduct.imagesUrl.splice(t,1)}}," 移除 ",8,["onClick"])])})),128)),!r.tempProduct.imagesUrl.length||r.tempProduct.imagesUrl[r.tempProduct.imagesUrl.length-1]?(Object(o["openBlock"])(),Object(o["createBlock"])("div",S,[Object(o["createVNode"])("button",{class:"btn btn-outline-primary btn-sm d-block w-100",type:"button",onClick:t[3]||(t[3]=function(e){return r.tempProduct.imagesUrl.push("")})}," 新增圖片 ")])):Object(o["createCommentVNode"])("",!0)])):Object(o["createCommentVNode"])("",!0)]),Object(o["createVNode"])("div",L,[Object(o["createVNode"])("div",A,[J,Object(o["withDirectives"])(Object(o["createVNode"])("input",{id:"title",type:"text",class:"form-control",placeholder:"請輸入標題","onUpdate:modelValue":t[4]||(t[4]=function(e){return r.tempProduct.title=e})},null,512),[[o["vModelText"],r.tempProduct.title]])]),Object(o["createVNode"])("div",G,[Object(o["createVNode"])("div",z,[E,Object(o["withDirectives"])(Object(o["createVNode"])("input",{id:"category",type:"text",class:"form-control",placeholder:"請輸入分類","onUpdate:modelValue":t[5]||(t[5]=function(e){return r.tempProduct.category=e})},null,512),[[o["vModelText"],r.tempProduct.category]])]),Object(o["createVNode"])("div",q,[H,Object(o["withDirectives"])(Object(o["createVNode"])("input",{id:"unit",type:"text",class:"form-control",placeholder:"請輸入單位","onUpdate:modelValue":t[6]||(t[6]=function(e){return r.tempProduct.unit=e})},null,512),[[o["vModelText"],r.tempProduct.unit]])]),Object(o["createVNode"])("div",K,[Q,Object(o["withDirectives"])(Object(o["createVNode"])("input",{id:"baking",type:"text",class:"form-control",placeholder:"請輸入烘焙度","onUpdate:modelValue":t[7]||(t[7]=function(e){return r.tempProduct.baking=e})},null,512),[[o["vModelText"],r.tempProduct.baking]])]),Object(o["createVNode"])("div",R,[W,Object(o["withDirectives"])(Object(o["createVNode"])("input",{id:"Bitterness",type:"number",class:"form-control",placeholder:"請輸入酸度","onUpdate:modelValue":t[8]||(t[8]=function(e){return r.tempProduct.Bitterness=e})},null,512),[[o["vModelText"],r.tempProduct.Bitterness]])]),Object(o["createVNode"])("div",X,[Y,Object(o["withDirectives"])(Object(o["createVNode"])("input",{id:"acidity",type:"number",class:"form-control",placeholder:"請輸入酸度","onUpdate:modelValue":t[9]||(t[9]=function(e){return r.tempProduct.acidity=e})},null,512),[[o["vModelText"],r.tempProduct.acidity]])]),Object(o["createVNode"])("div",Z,[ee,Object(o["withDirectives"])(Object(o["createVNode"])("input",{id:"flavor",type:"text",class:"form-control",placeholder:"請輸入風味","onUpdate:modelValue":t[10]||(t[10]=function(e){return r.tempProduct.flavor=e})},null,512),[[o["vModelText"],r.tempProduct.flavor]])]),Object(o["createVNode"])("div",te,[ce,Object(o["withDirectives"])(Object(o["createVNode"])("input",{id:"flavor2",type:"text",class:"form-control",placeholder:"請輸入風味","onUpdate:modelValue":t[11]||(t[11]=function(e){return r.tempProduct.flavor_sec=e})},null,512),[[o["vModelText"],r.tempProduct.flavor_sec]])]),Object(o["createVNode"])("div",oe,[ae,Object(o["withDirectives"])(Object(o["createVNode"])("input",{id:"origin",type:"text",class:"form-control",placeholder:"請輸入產地","onUpdate:modelValue":t[12]||(t[12]=function(e){return r.tempProduct.origin=e})},null,512),[[o["vModelText"],r.tempProduct.origin]])]),Object(o["createVNode"])("div",re,[le,Object(o["withDirectives"])(Object(o["createVNode"])("input",{id:"approach",type:"text",class:"form-control",placeholder:"請輸入處理方法","onUpdate:modelValue":t[13]||(t[13]=function(e){return r.tempProduct.approach=e})},null,512),[[o["vModelText"],r.tempProduct.approach]])]),Object(o["createVNode"])("div",ne,[de,Object(o["withDirectives"])(Object(o["createVNode"])("input",{id:"variety",type:"text",class:"form-control",placeholder:"請輸入品種","onUpdate:modelValue":t[14]||(t[14]=function(e){return r.tempProduct.variety=e})},null,512),[[o["vModelText"],r.tempProduct.variety]])])]),Object(o["createVNode"])("div",ie,[Object(o["createVNode"])("div",se,[ue,Object(o["withDirectives"])(Object(o["createVNode"])("input",{id:"origin_price",type:"number",min:"0",class:"form-control",placeholder:"請輸入原價","onUpdate:modelValue":t[15]||(t[15]=function(e){return r.tempProduct.origin_price=e})},null,512),[[o["vModelText"],r.tempProduct.origin_price,void 0,{number:!0}]])]),Object(o["createVNode"])("div",pe,[be,Object(o["withDirectives"])(Object(o["createVNode"])("input",{id:"price",type:"number",min:"0",class:"form-control",placeholder:"請輸入售價","onUpdate:modelValue":t[16]||(t[16]=function(e){return r.tempProduct.price=e})},null,512),[[o["vModelText"],r.tempProduct.price,void 0,{number:!0}]])])]),me,Object(o["createVNode"])("div",je,[Oe,Object(o["withDirectives"])(Object(o["createVNode"])("textarea",{id:"description",type:"text",class:"form-control",placeholder:"請輸入產品描述","onUpdate:modelValue":t[17]||(t[17]=function(e){return r.tempProduct.decription=e})},"\n                ",512),[[o["vModelText"],r.tempProduct.decription]])]),Object(o["createVNode"])("div",fe,[ge,Object(o["withDirectives"])(Object(o["createVNode"])("textarea",{id:"content",type:"text",class:"form-control",placeholder:"請輸入說明內容","onUpdate:modelValue":t[18]||(t[18]=function(e){return r.tempProduct.content=e})},"\n                ",512),[[o["vModelText"],r.tempProduct.content]])]),Object(o["createVNode"])("div",Ve,[Object(o["createVNode"])("div",Ne,[Object(o["withDirectives"])(Object(o["createVNode"])("input",{id:"is_enabled",class:"form-check-input",type:"checkbox","true-value":1,"false-value":0,"onUpdate:modelValue":t[19]||(t[19]=function(e){return r.tempProduct.is_enabled=e})},null,512),[[o["vModelCheckbox"],r.tempProduct.is_enabled]]),he])])])])]),Object(o["createVNode"])("div",ve,[Pe,Object(o["createVNode"])("button",{type:"button",class:"btn btn-primary",onClick:t[20]||(t[20]=function(t){return e.$emit("update-product",r.tempProduct)})}," 確認 ")])])])],512)}var ye=c("e0ae"),we={props:["product","isNew"],data:function(){return{modal:"",tempProduct:{},status:{}}},emits:["update-product"],mixins:[ye["a"]],inject:["swalert"],watch:{product:function(){this.tempProduct=this.product,this.tempProduct.imagesUrl||(this.tempProduct.imagesUrl=[]),this.tempProduct.imageUrl||(this.tempProduct.imageUrl="")}},methods:{uploadFile:function(e,t,c){var o=this,a=this.$refs[t].files[0],r=new FormData;r.append("file-to-upload",a),this.status.fileUploading=!0,Object(b["A"])(r).then((function(a){o.status.fileUploading=!1,a.data.success?("image"===e&&(o.tempProduct.imageUrl=a.data.imageUrl,o.$refs.fileInput.value=""),"images"===e&&(o.tempProduct.imagesUrl[c]=a.data.imageUrl,o.$refs[t].value=""),o.swalert("success","新增圖片成功","top-end")):(o.$refs.fileInput.value="",o.swalert("error","新增圖片失敗。 ".concat(a.data.message),"top-end"))})).catch((function(e){o.swalert("error","新增圖片時發生錯誤。 ".concat(e.message))}))}}};we.render=ke;var xe=we,Me={components:{Pagination:m["a"],ProductModal:xe,DeleteModal:j["a"]},data:function(){return{products:[],pagination:{},tempProduct:{imagesUrl:[]},isNew:!1,loadingStatus:{loadingItem:""},isLoading:!1,status:{fileUploading:!1}}},inject:["emitter","swalert"],methods:{getProducts:function(e){var t=this;this.isLoading=!0,Object(b["s"])(e).then((function(e){e.data.success?(t.products=e.data.products,t.pagination=e.data.pagination,t.isLoading=!1):t.$router.push("/login")})).catch((function(){t.swalert("error","取得商品列表出現錯誤")}))},openModal:function(e,t){"creat"===e&&(this.tempProduct={imagesUrl:[]},this.isNew=!0,this.$refs.ProductModal.openModal()),"edit"===e&&(this.tempProduct=JSON.parse(JSON.stringify(t)),this.isNew=!1,this.$refs.ProductModal.openModal()),"delete"===e&&(this.tempProduct=Object(p["a"])({},t),this.isNew=!1,this.$refs.DeleteModal.openModal())},updata:function(e){var t=this,c="",o="";this.isNew?o="post":(c=e.id,o="put"),Object(b["z"])(o,{data:e},c).then((function(e){e.data.success?(t.$refs.ProductModal.hideModal(),t.getProducts(),t.swalert("success","更新產品成功","top-end")):t.swalert("error","更新產品失敗。 ".concat(e.data.message),"top-end")})).catch((function(e){t.swalert("error","更新產品時出現錯誤。 ".concat(e.message))}))},deleteProduct:function(e){var t=this;Object(b["i"])(e.id).then((function(e){e.data.success?(t.$refs.DeleteModal.hideModal(),t.getProducts(),t.swalert("success","刪除產品成功","top-end")):t.swalert("erroe","刪除產品失敗。 ".concat(e.data.message),"top-end")})).catch((function(e){t.swalert("error","刪除產品時出現錯誤。 ".concat(e.message))}))}},created:function(){this.getProducts()}};Me.render=u;t["default"]=Me},"8ae4":function(e,t,c){"use strict";var o=c("7a23"),a=Object(o["withScopeId"])("data-v-332e3702");Object(o["pushScopeId"])("data-v-332e3702");var r={"aria-label":"Page navigation example"},l={class:"pagination mb-4"},n=Object(o["createVNode"])("span",{class:"material-icons"}," chevron_left ",-1),d=Object(o["createVNode"])("span",{class:"material-icons"}," chevron_right ",-1);Object(o["popScopeId"])();var i=a((function(e,t,c,a,i,s){return Object(o["openBlock"])(),Object(o["createBlock"])("nav",r,[Object(o["createVNode"])("ul",l,[Object(o["createVNode"])("li",{class:["page-item",{disabled:!c.page.has_pre}]},[Object(o["createVNode"])("a",{class:"page-link",href:"#","aria-label":"Previous",onClick:t[1]||(t[1]=Object(o["withModifiers"])((function(t){return e.$emit("get-page",c.page.current_page-1)}),["prevent"]))},[n])],2),(Object(o["openBlock"])(!0),Object(o["createBlock"])(o["Fragment"],null,Object(o["renderList"])(c.page.total_pages,(function(t){return Object(o["openBlock"])(),Object(o["createBlock"])("li",{class:[{active:t===c.page.current_page},"page-item"],key:t},[Object(o["createVNode"])("a",{class:"page-link",href:"#",onClick:Object(o["withModifiers"])((function(c){return e.$emit("get-page",t)}),["prevent"])},Object(o["toDisplayString"])(t),9,["onClick"])],2)})),128)),Object(o["createVNode"])("li",{class:["page-item",{disabled:!c.page.has_next}]},[Object(o["createVNode"])("a",{class:"page-link",href:"#","aria-label":"Next",onClick:t[2]||(t[2]=Object(o["withModifiers"])((function(t){return e.$emit("get-page",c.page.current_page+1)}),["prevent"]))},[d])],2)])])})),s={props:["page"],emits:["get-page"]};c("35a9");s.render=i,s.__scopeId="data-v-332e3702";t["a"]=s},a434:function(e,t,c){"use strict";var o=c("23e7"),a=c("23cb"),r=c("a691"),l=c("50c4"),n=c("7b0b"),d=c("65f0"),i=c("8418"),s=c("1dde"),u=s("splice"),p=Math.max,b=Math.min,m=9007199254740991,j="Maximum allowed length exceeded";o({target:"Array",proto:!0,forced:!u},{splice:function(e,t){var c,o,s,u,O,f,g=n(this),V=l(g.length),N=a(e,V),h=arguments.length;if(0===h?c=o=0:1===h?(c=0,o=V-N):(c=h-2,o=b(p(r(t),0),V-N)),V+c-o>m)throw TypeError(j);for(s=d(g,o),u=0;u<o;u++)O=N+u,O in g&&i(s,u,g[O]);if(s.length=o,c<o){for(u=N;u<V-o;u++)O=u+o,f=u+c,O in g?g[f]=g[O]:delete g[f];for(u=V;u>V-o+c;u--)delete g[u-1]}else if(c>o)for(u=V-o;u>N;u--)O=u+o-1,f=u+c-1,O in g?g[f]=g[O]:delete g[f];for(u=0;u<c;u++)g[u+N]=arguments[u+2];return g.length=V-o+c,s}})}}]);
//# sourceMappingURL=chunk-71d26228.a1c998f2.js.map