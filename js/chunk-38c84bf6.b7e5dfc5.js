(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-38c84bf6"],{"11ab":function(t,e){const i={bold:"mc_bold",italic:"mc_italic",underlined:"mc_underlined",strikethrough:"mc_strikethrough",obfuscated:"mc_obfuscated"},s={"§0":"black","§1":"dark_blue","§2":"dark_green","§3":"dark_aqua","§4":"dark_red","§5":"dark_purple","§6":"gold","§7":"gray","§8":"dark_gray","§9":"blue","§a":"green","§b":"aqua","§c":"red","§d":"light_purple","§e":"yellow","§f":"white"},n={"§k":"obfuscated","§l":"bold","§m":"strikethrough","§n":"underline","§o":"italic"};function a(t){let e=Array.isArray(t)?t:[t],s="";return e.forEach(e=>{let n="",o="",r="";for(var c of Object.keys(e))if("text"!=c)if(i.hasOwnProperty(c))n+=" "+i[c];else if("color"!=c){if("extra"==c)for(var l of e.extra)r+=a(l)}else t[c].startsWith("#")?o+="color: "+e[c]:n+=" mc_"+e[c];else r+=e.text;s+=`<span class="${n.trim()}" style="${o.trim()}">${r}</span>`}),s}function o(t,e){const i=new Promise((e,i)=>{t=JSON.parse(JSON.stringify(t).split("\\n").join("<br>"));let s=a(t);s='<div class="mc">'+s+"</div>",e(s)});return e&&"function"===typeof e&&i.then(e.bind(null,null),e),i}function r(t,e){const i=new Promise((e,i)=>{let a={text:"",extra:[]},o=a,r=t.split("");for(let t=0;t<r.length;t++)if("§"!=r[t])o.text+=r[t];else if("r"==r[t+1]){let e={text:"",extra:[]};a.extra.push(e),o=e,t++}else{let e="§"+r[t+1],i={text:"",extra:[]};s.hasOwnProperty(e)&&(i.color=s[e]),n.hasOwnProperty(e)&&(i[n[e]]=!0),o.extra.push(i),o=i,t++}e(a)});return e&&"function"===typeof e&&i.then(e.bind(null,null),e),i}function c(t,e){const i=new Promise((e,i)=>"object"===typeof t?o(t).then(e).catch(i):"string"===typeof t?r(t).then(o).then(e).catch(i):void 0);return e&&"function"===typeof e&&i.then(e.bind(null,null),e),i}e.jsonToHtml=o,e.parseJsonToHTML=a,e.textToJson=r,e.toHtml=c},"2bcb":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{overview:""}},[i("div",{staticClass:"top-bar"},[i("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var s=e.on,n=e.attrs;return[i("v-btn",t._g(t._b({staticClass:"auto-update-btn",class:t.autoUpdate?"active":"",attrs:{color:"blue",outlined:"",icon:t.isSM()},on:{click:function(e){t.autoUpdate=!t.autoUpdate}}},"v-btn",n,!1),s),[t._v(t._s(t.isSM()?"":"实时更新 · "+(t.autoUpdate?"ON":"OFF"))+" "),t.isSM()?i("v-icon",[t._v("mdi-update")]):t._e()],1)]}}])},[t._v(" 实时更新状态信息 ")])],1),i("v-row",{staticClass:"content"},[i("v-col",{attrs:{cols:"12"}},[i("div",{staticClass:"status-card"},[i("h2",[t._v("当前服务器 IP")]),i("h1",{staticClass:"primary-text ip"},[t._v(" "+t._s(t.server.ip||"--")+" "),!t.isSM()&&/\d+\.\d+\.\d+\.\d+/.test(t.server.ip)?i("smart-button",{staticClass:"copy-button",attrs:{onclick:[t.copyIP,t.server.ip],iconInactive:"mdi-clipboard-multiple-outline",iconActive:"mdi-check",textInactive:"点击复制",textActive:"复制成功",colorInactive:"",colorActive:"white",backgroundInactive:"",backgroundActive:"#4caf50",borderColorInactive:"",borderColorActive:"#4caf50"}}):t._e()],1),i("hr"),i("meta-bar",{staticStyle:{"margin-top":"8px","margin-bottom":"16px"}},[i("meta-item",{attrs:{icon:"mdi-minecraft"},scopedSlots:t._u([{key:"name",fn:function(){return[t._v("版本")]},proxy:!0},{key:"text",fn:function(){return[t._v("1.18.2")]},proxy:!0}])}),i("meta-item",{attrs:{icon:"mdi-package"},scopedSlots:t._u([{key:"name",fn:function(){return[t._v("周目")]},proxy:!0},{key:"text",fn:function(){return[t._v("ST5")]},proxy:!0}])}),i("meta-item",{attrs:{icon:"mdi-calendar"},scopedSlots:t._u([{key:"name",fn:function(){return[t._v("开始时间")]},proxy:!0},{key:"text",fn:function(){return[t._v("2022.07.30")]},proxy:!0}])})],1),i("h3",[t._v("状态")]),i("div",{staticClass:"running-status"},[i("div",{staticClass:"status"},[t.mainLoading?i("v-progress-circular",{staticStyle:{"margin-right":"16px"},attrs:{width:"3.5",size:35,indeterminate:""}}):t._e(),t.mainLoading?t._e():i("v-icon",{attrs:{color:t.mainIconColor}},[t._v(t._s(t.mainIcon))]),t._v(" "+t._s(t.mainStatus)+" ")],1),i("meta-bar",{staticClass:"status-meta"},[i("div",{staticClass:"status-item"},[i("v-icon",{attrs:{small:""}},[t._v("mdi-server")]),i("span",{staticClass:"name"},[t._v("实例")]),"ok"===t.instance.status?i("span",{staticClass:"text green--text"},[i("v-icon",{attrs:{color:"green"}},[t._v("mdi-check")])],1):t._e(),"ng"===t.instance.status?i("span",{staticClass:"text red--text"},[i("v-icon",{attrs:{color:"red"}},[t._v("mdi-close")]),t._v(" "+t._s(t.server.statusText)+" ")],1):t._e(),"ok"!==t.instance.status&&"ng"!==t.instance.status?i("span",[i("v-progress-circular",{staticClass:"loading",attrs:{size:13,color:"gray",width:"1.5",indeterminate:""}})],1):t._e()],1),i("div",{staticClass:"status-item"},[i("v-icon",{attrs:{small:""}},[t._v("mdi-minecraft")]),i("span",{staticClass:"name"},[t._v("服务器")]),"ok"===t.server.status?i("span",{staticClass:"text green--text"},[i("v-icon",{attrs:{color:"green"}},[t._v("mdi-check")])],1):t._e(),"ng"===t.server.status?i("span",{staticClass:"text red--text"},[i("v-icon",{attrs:{color:"red"}},[t._v("mdi-close")]),t._v(" "+t._s(t.server.statusText)+" ")],1):t._e(),"ok"!==t.server.status&&"ng"!==t.server.status?i("span",[i("v-progress-circular",{staticClass:"loading",attrs:{size:13,color:"gray",width:"1.5",indeterminate:""}})],1):t._e()],1)])],1),t.server.onlinePlayers.length>0?i("h3",[t._v(" 在线玩家 · "+t._s(t.server.onlinePlayers.length)+"/50 ")]):t._e(),t.server.onlinePlayers.length>0?i("div",{staticClass:"player-details"},t._l(t.server.onlinePlayers,(function(e,s){return i("div",{key:s,staticClass:"player",on:{click:function(i){return t.$open("https://namemc.com/profile/"+e.id)}}},[i("img",{attrs:{src:"https://crafatar.com/renders/head/"+e.id}}),i("h1",[t._v(t._s(e.name))])])})),0):t._e(),i("h3",[t._v("MOTD 信息")]),t.motdHtml?i("div",{domProps:{innerHTML:t._s(t.motdHtml)}}):i("div",{staticClass:"empty"},[t._v("开启服务器后显示")]),i("h3",[t._v("操作")]),i("div",{staticClass:"actions"},[i("v-menu",{scopedSlots:t._u([{key:"activator",fn:function(e){var s=e.on,n=e.attrs;return[i("v-btn",t._g(t._b({staticClass:"green",attrs:{elevation:"0",dark:""}},"v-btn",n,!1),s),[i("v-icon",{attrs:{left:""}},[t._v("mdi-plus")]),t._v("创建实例")],1)]}}])},[i("v-list",{attrs:{"max-width":"400px"}},[i("v-list-item",[i("v-list-item-icon",[i("v-icon",[t._v("mdi-help-circle-outline")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" 是否立即创建实例？ ")])],1)],1),i("v-list-item",{attrs:{color:"green",link:""},on:{click:function(e){return t.createInstance()}}},[i("v-list-item-icon",[i("v-icon",{attrs:{color:"green"}},[t._v("mdi-arrow-right")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v("继续")])],1)],1),i("v-list-item",{attrs:{link:""}},[i("v-list-item-icon",[i("v-icon",[t._v("mdi-close")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v("取消")])],1)],1)],1)],1),i("v-menu",{scopedSlots:t._u([{key:"activator",fn:function(e){var s=e.on,n=e.attrs;return[t.$isAdmin?i("v-btn",t._g(t._b({attrs:{dark:"",elevation:"0",color:"red",outlined:""}},"v-btn",n,!1),s),[i("v-icon",{attrs:{left:""}},[t._v("mdi-delete")]),t._v(" 删除实例")],1):t._e()]}}])},[i("v-list",{attrs:{"max-width":"400px"}},[i("v-list-item",[i("v-list-item-icon",[i("v-icon",{attrs:{color:"red"}},[t._v("mdi-message-alert")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" 删除实例可能导致"),i("strong",[t._v("数据丢失")]),t._v("，"),i("br"),t._v("且不会自动备份。 ")])],1)],1),i("v-list-item",{attrs:{color:"red",link:""},on:{click:function(e){return t.deleteInstance()}}},[i("v-list-item-icon",[i("v-icon",{attrs:{color:"red"}},[t._v("mdi-check")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v("继续")])],1)],1),i("v-list-item",{attrs:{link:""}},[i("v-list-item-icon",[i("v-icon",[t._v("mdi-close")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v("取消")])],1)],1)],1)],1),i("v-menu",{scopedSlots:t._u([{key:"activator",fn:function(e){var s=e.on,n=e.attrs;return[t.$isAdmin?i("v-btn",t._g(t._b({attrs:{color:"red",outlined:"",elevation:"0"}},"v-btn",n,!1),s),[i("v-icon",{attrs:{left:""}},[t._v("mdi-close-octagon-outline")]),t._v(" 停止实例")],1):t._e()]}}])},[i("v-list",{attrs:{"max-width":"400px"}},[i("v-list-item",[i("v-list-item-icon",[i("v-icon",{attrs:{color:"red"}},[t._v("mdi-message-alert")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" 停止实例可能造成"),i("strong",[t._v("存档损坏")]),t._v("，"),i("br"),t._v("且不会自动备份。 ")])],1)],1),i("v-list-item",{attrs:{color:"red",link:""},on:{click:function(e){return t.stopInstance()}}},[i("v-list-item-icon",[i("v-icon",{attrs:{color:"red"}},[t._v("mdi-check")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v("继续")])],1)],1),i("v-list-item",{attrs:{link:""}},[i("v-list-item-icon",[i("v-icon",[t._v("mdi-close")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v("取消")])],1)],1)],1)],1),t.$isAdmin?i("v-btn",{attrs:{color:"blue",outlined:"",dark:""},on:{click:function(e){return t.startInstance()}}},[i("v-icon",{attrs:{left:""}},[t._v("mdi-launch")]),t._v(" 启动实例 ")],1):t._e()],1)],1)])],1),i("v-dialog",{attrs:{"max-width":"700px"},model:{value:t.deployDialog,callback:function(e){t.deployDialog=e},expression:"deployDialog"}},[i("v-card",[i("v-card-title",[t._v("部署情况")]),i("v-card-text",[i("p",[t._v(" 你已经成功请求了实例的创建，你可以在这里查看其运行情况。整个过程大约需要 5 分钟左右，"),i("strong",[t._v("不建议")]),t._v("中途刷新或者离开网页。"),i("strong",[t._v("如果运行失败，请截图联系管理员。")]),i("br"),t._v(t._s(t.deployResult?"":"运行信息大约需要 15 秒左右的时间加载。若长时间未出现，请联系管理员。")+" ")]),i("div",{staticClass:"deploy-result",domProps:{innerHTML:t._s(t.deployResult||"运行信息加载中...")}})]),i("v-card-actions",[i("v-spacer"),i("v-btn",{staticClass:"primary",on:{click:function(e){t.deployDialog=!1}}},[t._v("关闭")])],1)],1)],1),i("v-snackbar",{model:{value:t.snackbar.open,callback:function(e){t.$set(t.snackbar,"open",e)},expression:"snackbar.open"}},[t._v(t._s(t.snackbar.text))])],1)},n=[],a=i("9ab4"),o=i("b903"),r=i("ddd3"),c=i("2b0e"),l=i("11ab"),u=i.n(l),d=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"meta-bar"},[t._t("default")],2)},h=[],v=c["a"].extend({}),p=v,f=(i("f67b"),i("2877")),m=Object(f["a"])(p,d,h,!1,null,"122e5532",null),g=m.exports,b=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"meta-item"},[t.icon?i("v-icon",{attrs:{small:""}},[t._v(t._s(t.icon))]):t._e(),i("span",{staticClass:"name"},[t._t("name")],2),i("span",{staticClass:"text"},[t._t("text")],2)],1)},y=[],x=c["a"].extend({props:["icon"]}),_=x,k=(i("9dbc"),i("6544")),C=i.n(k),w=i("132d"),T=Object(f["a"])(_,b,y,!1,null,"6643a9aa",null),I=T.exports;C()(T,{VIcon:w["a"]});var O=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("button",{staticClass:"smart-button",style:"background: "+t.background+"; color: "+t.color+"; border-color: "+t.borderColor+";",on:{click:function(e){t.active=!0,t.onclick[0](t.onclick[1])}}},[t.active?t._e():i("v-icon",{staticClass:"inactive"},[t._v(t._s(t.iconInactive))]),t.active?i("v-icon",{staticClass:"active"},[t._v(" "+t._s(t.iconActive))]):t._e(),t._v(" "+t._s(t.text)+" ")],1)},S=[],A=c["a"].extend({props:["iconInactive","iconActive","textInactive","textActive","backgroundInactive","backgroundActive","colorInactive","colorActive","borderColorInactive","borderColorActive","onclick"],data:function(){return{text:"",background:"",color:"",borderColor:"",active:!1}},methods:{inactivate:function(){this.text=this.textInactive,this.background=this.backgroundInactive,this.color=this.colorInactive,this.borderColor=this.borderColorInactive,this.active=!1},activate:function(){this.text=this.textActive,this.background=this.backgroundActive,this.color=this.colorActive,this.borderColor=this.colorActive,this.active=!0}},mounted:function(){this.inactivate()},watch:{active:function(t){var e=this;t?(this.activate(),setTimeout((function(){e.inactivate()}),650)):this.inactivate()}}}),j=A,$=(i("45c0"),Object(f["a"])(j,O,S,!1,null,"6f1e62af",null)),L=$.exports;C()($,{VIcon:w["a"]});var D=c["a"].extend({data:function(){return{instance:{id:"",status:"",statusText:"",info:{},infoRender:[]},server:{status:"",statusText:"",ip:"",onlinePlayers:[]},apiStatus:"",snackbar:{open:!1,text:""},deployStatus:"",deployResult:"",autoUpdate:!1,deployDialog:!1,motdHtml:"",mainStatus:"获取中...",mainLoading:!1,mainIcon:"mdi-help-circle-outline",mainIconColor:"gray"}},components:{MetaBar:g,MetaItem:I,SmartButton:L},computed:{statusAll:function(){return{deploy:this.deployStatus,server:this.server.status,instance:this.instance.status,players:this.server.onlinePlayers.length}}},watch:{statusAll:{deep:!0,handler:function(t){console.log(t),"ok"===t.deploy||""===t.deploy?(this.mainLoading=!1,"ng"===t.server&&"ng"===t.instance?(this.mainStatus="尚未开启",this.mainIcon="mdi-hexagon-outline",this.mainIconColor="gray"):("ok"===t.server&&"ok"===t.instance&&(0===t.players?(this.mainStatus="无人游玩",this.mainIcon="mdi-hexagon-outline",this.mainIconColor="amber"):(this.mainStatus="一切正常",this.mainIcon="mdi-check-all",this.mainIconColor="green")),"ng"!==t.server&&"stopped"!==t.server||"ok"!==t.instance||(this.mainStatus="空转",this.mainIcon="mdi-alert-outline",this.mainIconColor="amber"))):"loading"===t.deploy?(this.mainStatus="创建中...",this.mainLoading=!0):"ng"===t.deploy&&(this.mainStatus="部署请求超时",this.mainLoading=!1,this.mainIcon="mdi-alert-outline",this.mainIconColor="red")}},autoUpdate:function(t){this.$cookies.set("tl-overview-auto-update",t,-1)},deployStatus:function(t){r["a"].$emit("deploy-status-change",t)}},methods:{createInstance:function(){var t=this;this.snackbar.text="正在请求中，请稍等...",this.snackbar.open=!0,Object(o["i"])("/api/ecs/v1/action",{type:"new",token:Object(o["e"])()}).then((function(e){if("ok"!==e.data.status)return t.snackbar.text=Object(o["l"])(e.data.msg),void(t.snackbar.open=!0);t.snackbar.text="请求成功，现在开始部署。",t.snackbar.open=!0,t.deployStatus="loading",t.getDeployResult(),t.deployDialog=!0}))},getDeployResult:function(){return Object(a["a"])(this,void 0,void 0,(function(){var t,e,i,s=this;return Object(a["b"])(this,(function(n){switch(n.label){case 0:e=!1,i=0,n.label=1;case 1:return i>5?(this.deployStatus="ng",this.deployResult="请求超时，但请求可能仍然在处理。请前往 https://seatide.leviatan.cn/api/ecs/v1/describe/last-invoke 查看执行结果。",[3,3]):[4,this.sleep(3)];case 2:return n.sent(),Object(o["d"])("/api/ecs/v1/describe/last-invoke").then((function(n){t=n.data;try{if("No invocation history found."===t.msg)return void i++;if("Pending"===t.data.status)return;"Running"!==t.data.status?(i=0,s.deployStatus="Success"===t.data.status?"ok":"ng","ok"===s.deployStatus?(s.deployResult+="<br/>实例部署成功，Minecraft 服务器启动中。",s.snackbar.text="实例部署成功，开始启动服务器。",s.snackbar.open=!0,setTimeout((function(){s.refresh()}),3e3)):(s.deployResult+="<br/>部署失败，但实例已经存在，请手动排查或者立即删除以免不必要的损失。"+t.data.error,s.snackbar.text="实例部署失败，请查看执行信息。",s.snackbar.open=!1),e=!0):s.deployResult=t.data.output.split("\n").join("<br/>")}catch(a){console.warn("Exception in while loop: "+a)}})),e?[3,3]:[3,1];case 3:return[2]}}))}))},sleep:function(t){return Object(a["a"])(this,void 0,void 0,(function(){return Object(a["b"])(this,(function(e){return[2,new Promise((function(e){return setTimeout(e,1e3*t)}))]}))}))},isSM:o["g"],deleteInstance:function(){var t=this;Object(o["i"])("/api/ecs/v1/action",{type:"delete",token:Object(o["e"])()}).then((function(e){if("ok"!==e.data.status)return t.snackbar.text=Object(o["l"])(e.data.msg),void(t.snackbar.open=!0);t.snackbar.text="成功删除实例。",t.motdHtml="",t.instance.status="",t.server.status="",t.deployStatus="",t.snackbar.open=!0,t.refresh()}))},stopInstance:function(){var t=this;Object(o["i"])("/api/ecs/v1/action",{type:"stop",token:Object(o["e"])()}).then((function(e){if("ok"!==e.data.status)return t.snackbar.text=Object(o["l"])(e.data.msg),void(t.snackbar.open=!0);t.snackbar.text="成功停止实例。",t.motdHtml="",t.instance.status="stopped",t.instance.statusText="已停止",t.deployStatus="",t.snackbar.open=!0,t.refresh()}))},startInstance:function(){var t=this;Object(o["i"])("/api/ecs/v1/action",{type:"start",token:Object(o["e"])()}).then((function(e){var i;if("ok"!==e.data.status)return(null===(i=e.data.msg)||void 0===i?void 0:i.includes("is Running but"))?(t.snackbar.text="服务器正在运行中，无需启动。",void(t.snackbar.open=!0)):(t.snackbar.text=Object(o["l"])(e.data.msg),void(t.snackbar.open=!0));t.instance.status="ok",t.instance.statusText="正常",t.snackbar.text="成功开启实例。",t.snackbar.open=!0,t.refresh()}))},refresh:function(){var t=this;Object(o["d"])("/api/ecs/v1/describe/status").then((function(e){"ok"!==e.data.status?(t.instance.status="ng",t.instance.statusText=Object(o["l"])(e.data.msg,!0)):("Running"===e.data.data.status?(t.instance.status="ok",t.instance.statusText="正常"):(t.instance.status="stopped",t.instance.statusText="已停止"),t.instance.id=e.data.data.id)})),Object(o["d"])("/api/server/v1/get/server").then((function(e){if("ok"!==e.data.status)t.server.status="ng",t.server.statusText=Object(o["l"])(e.data.msg,!0);else{var i=e.data.data;if(!1===i.created)return t.server.status="ng",void(t.server.statusText="不存在");if(!1===i.online)return t.server.status="stopped",void(t.server.statusText="未开启");t.server.status="ok",t.server.statusText="正常",t.server.ip=i.ip,null!==i.onlinePlayersDetails&&(t.server.onlinePlayers=i.onlinePlayersDetails.sort((function(t,e){return t.name<e.name?-1:t.name>e.name?1:0})))}})),Object(o["d"])("/api").then((function(e){e.data.status&&"http-error"===e.data.status?t.apiStatus="正常":t.apiStatus="异常"})),this.getMotd()},autoRefresh:function(){return Object(a["a"])(this,void 0,void 0,(function(){return Object(a["b"])(this,(function(t){switch(t.label){case 0:return this.autoUpdate&&this.refresh(),[4,this.sleep(5)];case 1:return t.sent(),[3,0];case 2:return[2]}}))}))},getMotd:function(){var t=this;Object(o["d"])("/api/server/v1/get/server").then((function(e){null!==e.data.data&&u.a.toHtml(e.data.data.motd,(function(e,i){t.motdHtml=i}))}))},copyIP:function(t){navigator.clipboard.writeText(t).then((function(t){})).catch((function(t){console.warn("copy: something wrong happend: ",t)}))}},mounted:function(){var t=this;this.refresh(),this.autoRefresh(),this.autoUpdate="true"===this.$cookies.get("tl-overview-auto-update"),r["a"].$on("open-deploy-dialog",(function(){t.deployDialog=!0}))}}),M=D,H=(i("42a2"),i("8336")),P=i("b0af"),B=i("99d9"),W=(i("4b85"),i("d9f7")),R=i("80d2");const V=["sm","md","lg","xl"],E=(()=>V.reduce((t,e)=>(t[e]={type:[Boolean,String,Number],default:!1},t),{}))(),z=(()=>V.reduce((t,e)=>(t["offset"+Object(R["D"])(e)]={type:[String,Number],default:null},t),{}))(),N=(()=>V.reduce((t,e)=>(t["order"+Object(R["D"])(e)]={type:[String,Number],default:null},t),{}))(),F={col:Object.keys(E),offset:Object.keys(z),order:Object.keys(N)};function J(t,e,i){let s=t;if(null!=i&&!1!==i){if(e){const i=e.replace(t,"");s+="-"+i}return"col"!==t||""!==i&&!0!==i?(s+="-"+i,s.toLowerCase()):s.toLowerCase()}}const q=new Map;var U=c["a"].extend({name:"v-col",functional:!0,props:{cols:{type:[Boolean,String,Number],default:!1},...E,offset:{type:[String,Number],default:null},...z,order:{type:[String,Number],default:null},...N,alignSelf:{type:String,default:null,validator:t=>["auto","start","end","center","baseline","stretch"].includes(t)},tag:{type:String,default:"div"}},render(t,{props:e,data:i,children:s,parent:n}){let a="";for(const r in e)a+=String(e[r]);let o=q.get(a);if(!o){let t;for(t in o=[],F)F[t].forEach(i=>{const s=e[i],n=J(t,i,s);n&&o.push(n)});const i=o.some(t=>t.startsWith("col-"));o.push({col:!i||!e.cols,["col-"+e.cols]:e.cols,["offset-"+e.offset]:e.offset,["order-"+e.order]:e.order,["align-self-"+e.alignSelf]:e.alignSelf}),q.set(a,o)}return t(e.tag,Object(W["a"])(i,{class:o}),s)}}),Y=i("169a"),K=i("8860"),X=i("da13"),G=i("5d23"),Z=i("34c3"),Q=i("e449"),tt=i("490a");const et=["sm","md","lg","xl"],it=["start","end","center"];function st(t,e){return et.reduce((i,s)=>(i[t+Object(R["D"])(s)]=e(),i),{})}const nt=t=>[...it,"baseline","stretch"].includes(t),at=st("align",()=>({type:String,default:null,validator:nt})),ot=t=>[...it,"space-between","space-around"].includes(t),rt=st("justify",()=>({type:String,default:null,validator:ot})),ct=t=>[...it,"space-between","space-around","stretch"].includes(t),lt=st("alignContent",()=>({type:String,default:null,validator:ct})),ut={align:Object.keys(at),justify:Object.keys(rt),alignContent:Object.keys(lt)},dt={align:"align",justify:"justify",alignContent:"align-content"};function ht(t,e,i){let s=dt[t];if(null!=i){if(e){const i=e.replace(t,"");s+="-"+i}return s+="-"+i,s.toLowerCase()}}const vt=new Map;var pt=c["a"].extend({name:"v-row",functional:!0,props:{tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:nt},...at,justify:{type:String,default:null,validator:ot},...rt,alignContent:{type:String,default:null,validator:ct},...lt},render(t,{props:e,data:i,children:s}){let n="";for(const o in e)n+=String(e[o]);let a=vt.get(n);if(!a){let t;for(t in a=[],ut)ut[t].forEach(i=>{const s=e[i],n=ht(t,i,s);n&&a.push(n)});a.push({"no-gutters":e.noGutters,"row--dense":e.dense,["align-"+e.align]:e.align,["justify-"+e.justify]:e.justify,["align-content-"+e.alignContent]:e.alignContent}),vt.set(n,a)}return t(e.tag,Object(W["a"])(i,{staticClass:"row",class:a}),s)}}),ft=i("2db4"),mt=i("2fa4"),gt=i("3a2f"),bt=Object(f["a"])(M,s,n,!1,null,"e0b94128",null);e["default"]=bt.exports;C()(bt,{VBtn:H["a"],VCard:P["a"],VCardActions:B["a"],VCardText:B["b"],VCardTitle:B["c"],VCol:U,VDialog:Y["a"],VIcon:w["a"],VList:K["a"],VListItem:X["a"],VListItemContent:G["a"],VListItemIcon:Z["a"],VListItemTitle:G["c"],VMenu:Q["a"],VProgressCircular:tt["a"],VRow:pt,VSnackbar:ft["a"],VSpacer:mt["a"],VTooltip:gt["a"]})},"3a2f":function(t,e,i){"use strict";i("9734");var s=i("4ad4"),n=i("a9ad"),a=i("16b7"),o=i("b848"),r=i("f573"),c=i("f2e7"),l=i("80d2"),u=i("d9bd"),d=i("58df");e["a"]=Object(d["a"])(n["a"],a["a"],o["a"],r["a"],c["a"]).extend({name:"v-tooltip",props:{closeDelay:{type:[Number,String],default:0},disabled:Boolean,fixed:{type:Boolean,default:!0},openDelay:{type:[Number,String],default:0},openOnHover:{type:Boolean,default:!0},tag:{type:String,default:"span"},transition:String},data:()=>({calculatedMinWidth:0,closeDependents:!1}),computed:{calculatedLeft(){const{activator:t,content:e}=this.dimensions,i=!this.bottom&&!this.left&&!this.top&&!this.right,s=!1!==this.attach?t.offsetLeft:t.left;let n=0;return this.top||this.bottom||i?n=s+t.width/2-e.width/2:(this.left||this.right)&&(n=s+(this.right?t.width:-e.width)+(this.right?10:-10)),this.nudgeLeft&&(n-=parseInt(this.nudgeLeft)),this.nudgeRight&&(n+=parseInt(this.nudgeRight)),this.calcXOverflow(n,this.dimensions.content.width)+"px"},calculatedTop(){const{activator:t,content:e}=this.dimensions,i=!1!==this.attach?t.offsetTop:t.top;let s=0;return this.top||this.bottom?s=i+(this.bottom?t.height:-e.height)+(this.bottom?10:-10):(this.left||this.right)&&(s=i+t.height/2-e.height/2),this.nudgeTop&&(s-=parseInt(this.nudgeTop)),this.nudgeBottom&&(s+=parseInt(this.nudgeBottom)),this.calcYOverflow(s+this.pageYOffset)+"px"},classes(){return{"v-tooltip--top":this.top,"v-tooltip--right":this.right,"v-tooltip--bottom":this.bottom,"v-tooltip--left":this.left,"v-tooltip--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},computedTransition(){return this.transition?this.transition:this.isActive?"scale-transition":"fade-transition"},offsetY(){return this.top||this.bottom},offsetX(){return this.left||this.right},styles(){return{left:this.calculatedLeft,maxWidth:Object(l["g"])(this.maxWidth),minWidth:Object(l["g"])(this.minWidth),opacity:this.isActive?.9:0,top:this.calculatedTop,zIndex:this.zIndex||this.activeZIndex}}},beforeMount(){this.$nextTick(()=>{this.value&&this.callActivate()})},mounted(){"v-slot"===Object(l["s"])(this,"activator",!0)&&Object(u["b"])("v-tooltip's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'",this)},methods:{activate(){this.updateDimensions(),requestAnimationFrame(this.startTransition)},deactivate(){this.runDelay("close")},genActivatorListeners(){const t=s["a"].options.methods.genActivatorListeners.call(this);return t.focus=t=>{this.getActivator(t),this.runDelay("open")},t.blur=t=>{this.getActivator(t),this.runDelay("close")},t.keydown=t=>{t.keyCode===l["w"].esc&&(this.getActivator(t),this.runDelay("close"))},t},genActivatorAttributes(){return{"aria-haspopup":!0,"aria-expanded":String(this.isActive)}},genTransition(){const t=this.genContent();return this.computedTransition?this.$createElement("transition",{props:{name:this.computedTransition}},[t]):t},genContent(){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-tooltip__content",class:{[this.contentClass]:!0,menuable__content__active:this.isActive,"v-tooltip__content--fixed":this.activatorFixed},style:this.styles,attrs:this.getScopeIdAttrs(),directives:[{name:"show",value:this.isContentActive}],ref:"content"}),this.getContentSlot())}},render(t){return t(this.tag,{staticClass:"v-tooltip",class:this.classes},[this.showLazyContent(()=>[this.genTransition()]),this.genActivator()])}})},"42a2":function(t,e,i){"use strict";i("fe0a")},"45c0":function(t,e,i){"use strict";i("8928")},4686:function(t,e,i){},"4b85":function(t,e,i){},7208:function(t,e,i){},8928:function(t,e,i){},9734:function(t,e,i){},"9ab4":function(t,e,i){"use strict";i.d(e,"a",(function(){return s})),i.d(e,"b",(function(){return n}));function s(t,e,i,s){function n(t){return t instanceof i?t:new i((function(e){e(t)}))}return new(i||(i=Promise))((function(i,a){function o(t){try{c(s.next(t))}catch(e){a(e)}}function r(t){try{c(s["throw"](t))}catch(e){a(e)}}function c(t){t.done?i(t.value):n(t.value).then(o,r)}c((s=s.apply(t,e||[])).next())}))}function n(t,e){var i,s,n,a,o={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return a={next:r(0),throw:r(1),return:r(2)},"function"===typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function r(t){return function(e){return c([t,e])}}function c(a){if(i)throw new TypeError("Generator is already executing.");while(o)try{if(i=1,s&&(n=2&a[0]?s["return"]:a[0]?s["throw"]||((n=s["return"])&&n.call(s),0):s.next)&&!(n=n.call(s,a[1])).done)return n;switch(s=0,n&&(a=[2&a[0],n.value]),a[0]){case 0:case 1:n=a;break;case 4:return o.label++,{value:a[1],done:!1};case 5:o.label++,s=a[1],a=[0];continue;case 7:a=o.ops.pop(),o.trys.pop();continue;default:if(n=o.trys,!(n=n.length>0&&n[n.length-1])&&(6===a[0]||2===a[0])){o=0;continue}if(3===a[0]&&(!n||a[1]>n[0]&&a[1]<n[3])){o.label=a[1];break}if(6===a[0]&&o.label<n[1]){o.label=n[1],n=a;break}if(n&&o.label<n[2]){o.label=n[2],o.ops.push(a);break}n[2]&&o.ops.pop(),o.trys.pop();continue}a=e.call(t,o)}catch(r){a=[6,r],s=0}finally{i=n=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}}},"9dbc":function(t,e,i){"use strict";i("4686")},e449:function(t,e,i){"use strict";i("ee6f");var s=i("480e"),n=i("4ad4"),a=i("16b7"),o=i("b848"),r=i("f573"),c=i("e4d3"),l=i("a236"),u=i("f2e7"),d=i("7560"),h=i("a293"),v=i("dc22"),p=i("58df"),f=i("d9bd"),m=i("80d2");const g=Object(p["a"])(o["a"],a["a"],r["a"],c["a"],l["a"],u["a"],d["a"]);e["a"]=g.extend({name:"v-menu",directives:{ClickOutside:h["a"],Resize:v["a"]},provide(){return{isInMenu:!0,theme:this.theme}},props:{auto:Boolean,closeOnClick:{type:Boolean,default:!0},closeOnContentClick:{type:Boolean,default:!0},disabled:Boolean,disableKeys:Boolean,maxHeight:{type:[Number,String],default:"auto"},offsetX:Boolean,offsetY:Boolean,openOnClick:{type:Boolean,default:!0},openOnHover:Boolean,origin:{type:String,default:"top left"},transition:{type:[Boolean,String],default:"v-menu-transition"}},data(){return{calculatedTopAuto:0,defaultOffset:8,hasJustFocused:!1,listIndex:-1,resizeTimeout:0,selectedIndex:null,tiles:[]}},computed:{activeTile(){return this.tiles[this.listIndex]},calculatedLeft(){const t=Math.max(this.dimensions.content.width,parseFloat(this.calculatedMinWidth));return this.auto?Object(m["g"])(this.calcXOverflow(this.calcLeftAuto(),t))||"0":this.calcLeft(t)||"0"},calculatedMaxHeight(){const t=this.auto?"200px":Object(m["g"])(this.maxHeight);return t||"0"},calculatedMaxWidth(){return Object(m["g"])(this.maxWidth)||"0"},calculatedMinWidth(){if(this.minWidth)return Object(m["g"])(this.minWidth)||"0";const t=Math.min(this.dimensions.activator.width+Number(this.nudgeWidth)+(this.auto?16:0),Math.max(this.pageWidth-24,0)),e=isNaN(parseInt(this.calculatedMaxWidth))?t:parseInt(this.calculatedMaxWidth);return Object(m["g"])(Math.min(e,t))||"0"},calculatedTop(){const t=this.auto?Object(m["g"])(this.calcYOverflow(this.calculatedTopAuto)):this.calcTop();return t||"0"},hasClickableTiles(){return Boolean(this.tiles.find(t=>t.tabIndex>-1))},styles(){return{maxHeight:this.calculatedMaxHeight,minWidth:this.calculatedMinWidth,maxWidth:this.calculatedMaxWidth,top:this.calculatedTop,left:this.calculatedLeft,transformOrigin:this.origin,zIndex:this.zIndex||this.activeZIndex}}},watch:{isActive(t){t||(this.listIndex=-1)},isContentActive(t){this.hasJustFocused=t},listIndex(t,e){if(t in this.tiles){const e=this.tiles[t];e.classList.add("v-list-item--highlighted"),this.$refs.content.scrollTop=e.offsetTop-e.clientHeight}e in this.tiles&&this.tiles[e].classList.remove("v-list-item--highlighted")}},created(){this.$attrs.hasOwnProperty("full-width")&&Object(f["e"])("full-width",this)},mounted(){this.isActive&&this.callActivate()},methods:{activate(){this.updateDimensions(),requestAnimationFrame(()=>{this.startTransition().then(()=>{this.$refs.content&&(this.calculatedTopAuto=this.calcTopAuto(),this.auto&&(this.$refs.content.scrollTop=this.calcScrollPosition()))})})},calcScrollPosition(){const t=this.$refs.content,e=t.querySelector(".v-list-item--active"),i=t.scrollHeight-t.offsetHeight;return e?Math.min(i,Math.max(0,e.offsetTop-t.offsetHeight/2+e.offsetHeight/2)):t.scrollTop},calcLeftAuto(){return parseInt(this.dimensions.activator.left-2*this.defaultOffset)},calcTopAuto(){const t=this.$refs.content,e=t.querySelector(".v-list-item--active");if(e||(this.selectedIndex=null),this.offsetY||!e)return this.computedTop;this.selectedIndex=Array.from(this.tiles).indexOf(e);const i=e.offsetTop-this.calcScrollPosition(),s=t.querySelector(".v-list-item").offsetTop;return this.computedTop-i-s-1},changeListIndex(t){if(this.getTiles(),this.isActive&&this.hasClickableTiles)if(t.keyCode!==m["w"].tab){if(t.keyCode===m["w"].down)this.nextTile();else if(t.keyCode===m["w"].up)this.prevTile();else if(t.keyCode===m["w"].end)this.lastTile();else if(t.keyCode===m["w"].home)this.firstTile();else{if(t.keyCode!==m["w"].enter||-1===this.listIndex)return;this.tiles[this.listIndex].click()}t.preventDefault()}else this.isActive=!1},closeConditional(t){const e=t.target;return this.isActive&&!this._isDestroyed&&this.closeOnClick&&!this.$refs.content.contains(e)},genActivatorAttributes(){const t=n["a"].options.methods.genActivatorAttributes.call(this);return this.activeTile&&this.activeTile.id?{...t,"aria-activedescendant":this.activeTile.id}:t},genActivatorListeners(){const t=r["a"].options.methods.genActivatorListeners.call(this);return this.disableKeys||(t.keydown=this.onKeyDown),t},genTransition(){const t=this.genContent();return this.transition?this.$createElement("transition",{props:{name:this.transition}},[t]):t},genDirectives(){const t=[{name:"show",value:this.isContentActive}];return!this.openOnHover&&this.closeOnClick&&t.push({name:"click-outside",value:{handler:()=>{this.isActive=!1},closeConditional:this.closeConditional,include:()=>[this.$el,...this.getOpenDependentElements()]}}),t},genContent(){const t={attrs:{...this.getScopeIdAttrs(),role:"role"in this.$attrs?this.$attrs.role:"menu"},staticClass:"v-menu__content",class:{...this.rootThemeClasses,...this.roundedClasses,"v-menu__content--auto":this.auto,"v-menu__content--fixed":this.activatorFixed,menuable__content__active:this.isActive,[this.contentClass.trim()]:!0},style:this.styles,directives:this.genDirectives(),ref:"content",on:{click:t=>{const e=t.target;e.getAttribute("disabled")||this.closeOnContentClick&&(this.isActive=!1)},keydown:this.onKeyDown}};return this.$listeners.scroll&&(t.on=t.on||{},t.on.scroll=this.$listeners.scroll),!this.disabled&&this.openOnHover&&(t.on=t.on||{},t.on.mouseenter=this.mouseEnterHandler),this.openOnHover&&(t.on=t.on||{},t.on.mouseleave=this.mouseLeaveHandler),this.$createElement("div",t,this.getContentSlot())},getTiles(){this.$refs.content&&(this.tiles=Array.from(this.$refs.content.querySelectorAll(".v-list-item")))},mouseEnterHandler(){this.runDelay("open",()=>{this.hasJustFocused||(this.hasJustFocused=!0)})},mouseLeaveHandler(t){this.runDelay("close",()=>{this.$refs.content.contains(t.relatedTarget)||requestAnimationFrame(()=>{this.isActive=!1,this.callDeactivate()})})},nextTile(){const t=this.tiles[this.listIndex+1];if(!t){if(!this.tiles.length)return;return this.listIndex=-1,void this.nextTile()}this.listIndex++,-1===t.tabIndex&&this.nextTile()},prevTile(){const t=this.tiles[this.listIndex-1];if(!t){if(!this.tiles.length)return;return this.listIndex=this.tiles.length,void this.prevTile()}this.listIndex--,-1===t.tabIndex&&this.prevTile()},lastTile(){const t=this.tiles[this.tiles.length-1];t&&(this.listIndex=this.tiles.length-1,-1===t.tabIndex&&this.prevTile())},firstTile(){const t=this.tiles[0];t&&(this.listIndex=0,-1===t.tabIndex&&this.nextTile())},onKeyDown(t){if(t.keyCode===m["w"].esc){setTimeout(()=>{this.isActive=!1});const t=this.getActivator();this.$nextTick(()=>t&&t.focus())}else!this.isActive&&[m["w"].up,m["w"].down].includes(t.keyCode)&&(this.isActive=!0);this.$nextTick(()=>this.changeListIndex(t))},onResize(){this.isActive&&(this.$refs.content.offsetWidth,this.updateDimensions(),clearTimeout(this.resizeTimeout),this.resizeTimeout=window.setTimeout(this.updateDimensions,100))}},render(t){const e={staticClass:"v-menu",class:{"v-menu--attached":""===this.attach||!0===this.attach||"attach"===this.attach},directives:[{arg:"500",name:"resize",value:this.onResize}]};return t("div",e,[!this.activator&&this.genActivator(),this.showLazyContent(()=>[this.$createElement(s["a"],{props:{root:!0,light:this.light,dark:this.dark}},[this.genTransition()])])])}})},ee6f:function(t,e,i){},f67b:function(t,e,i){"use strict";i("7208")},fe0a:function(t,e,i){}}]);