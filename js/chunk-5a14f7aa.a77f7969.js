(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5a14f7aa"],{"0c18":function(t,e,i){},"11ab":function(t,e){const i={bold:"mc_bold",italic:"mc_italic",underlined:"mc_underlined",strikethrough:"mc_strikethrough",obfuscated:"mc_obfuscated"},s={"§0":"black","§1":"dark_blue","§2":"dark_green","§3":"dark_aqua","§4":"dark_red","§5":"dark_purple","§6":"gold","§7":"gray","§8":"dark_gray","§9":"blue","§a":"green","§b":"aqua","§c":"red","§d":"light_purple","§e":"yellow","§f":"white"},n={"§k":"obfuscated","§l":"bold","§m":"strikethrough","§n":"underline","§o":"italic"};function a(t){let e=Array.isArray(t)?t:[t],s="";return e.forEach(e=>{let n="",o="",r="";for(var l of Object.keys(e))if("text"!=l)if(i.hasOwnProperty(l))n+=" "+i[l];else if("color"!=l){if("extra"==l)for(var c of e.extra)r+=a(c)}else t[l].startsWith("#")?o+="color: "+e[l]:n+=" mc_"+e[l];else r+=e.text;s+=`<span class="${n.trim()}" style="${o.trim()}">${r}</span>`}),s}function o(t,e){const i=new Promise((e,i)=>{t=JSON.parse(JSON.stringify(t).split("\\n").join("<br>"));let s=a(t);s='<div class="mc">'+s+"</div>",e(s)});return e&&"function"===typeof e&&i.then(e.bind(null,null),e),i}function r(t,e){const i=new Promise((e,i)=>{let a={text:"",extra:[]},o=a,r=t.split("");for(let t=0;t<r.length;t++)if("§"!=r[t])o.text+=r[t];else if("r"==r[t+1]){let e={text:"",extra:[]};a.extra.push(e),o=e,t++}else{let e="§"+r[t+1],i={text:"",extra:[]};s.hasOwnProperty(e)&&(i.color=s[e]),n.hasOwnProperty(e)&&(i[n[e]]=!0),o.extra.push(i),o=i,t++}e(a)});return e&&"function"===typeof e&&i.then(e.bind(null,null),e),i}function l(t,e){const i=new Promise((e,i)=>"object"===typeof t?o(t).then(e).catch(i):"string"===typeof t?r(t).then(o).then(e).catch(i):void 0);return e&&"function"===typeof e&&i.then(e.bind(null,null),e),i}e.jsonToHtml=o,e.parseJsonToHTML=a,e.textToJson=r,e.toHtml=l},"2bcb":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{overview:""}},[i("h1",{attrs:{title:""}},[t._v("概览")]),i("div",{staticClass:"top-bar"},[i("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var s=e.on,n=e.attrs;return[i("v-btn",t._g(t._b({staticClass:"auto-update-btn elevation-2",class:t.autoUpdate?"active":"",attrs:{color:"blue",outlined:"",icon:t.isSM()},on:{click:function(e){t.autoUpdate=!t.autoUpdate}}},"v-btn",n,!1),s),[t._v(t._s(t.isSM()?"":"实时更新 · "+(t.autoUpdate?"ON":"OFF"))+" "),t.isSM()?i("v-icon",[t._v("mdi-update")]):t._e()],1)]}}])},[t._v(" 实时更新状态信息 ")]),i("v-menu",{scopedSlots:t._u([{key:"activator",fn:function(e){var s=e.on,n=e.attrs;return[i("v-btn",t._g(t._b({staticClass:"green",attrs:{icon:t.isSM(),elevation:"2",dark:""}},"v-btn",n,!1),s),[i("v-icon",{attrs:{left:!t.isSM()}},[t._v("mdi-plus")]),t._v(t._s(t.isSM()?"":"创建实例"))],1)]}}])},[i("v-list",{attrs:{"max-width":"400px"}},[i("v-list-item",[i("v-list-item-icon",[i("v-icon",[t._v("mdi-help-circle-outline")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" 是否立即创建实例？ ")])],1)],1),i("v-list-item",{staticStyle:{color:"#4caf50"},attrs:{link:""},on:{click:function(e){return t.createInstance()}}},[i("v-list-item-icon",[i("v-icon",{staticStyle:{color:"#4caf50"}},[t._v("mdi-arrow-right")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v("继续")])],1)],1),i("v-list-item",{attrs:{link:""}},[i("v-list-item-icon",[i("v-icon",[t._v("mdi-close")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v("取消")])],1)],1)],1)],1),i("v-menu",{scopedSlots:t._u([{key:"activator",fn:function(e){var s=e.on,n=e.attrs;return[t.$isAdmin?i("v-btn",t._g(t._b({staticClass:"elevation-1 red",attrs:{dark:"",icon:""}},"v-btn",n,!1),s),[i("v-icon",[t._v("mdi-delete")])],1):t._e()]}}])},[i("v-list",{attrs:{"max-width":"400px"}},[i("v-list-item",[i("v-list-item-icon",[i("v-icon",{staticStyle:{color:"#f44336"}},[t._v("mdi-message-alert")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" 警告：强制删除实例"),i("strong",[t._v("不"),i("br"),t._v("会进行备份")]),t._v("。"),i("br"),t._v("请确保服务器保有每"),i("br"),t._v(" 10 分钟一次的计划备"),i("br"),t._v("份，以防后患。 ")])],1)],1),i("v-list-item",{staticStyle:{color:"#f44336"},attrs:{link:""},on:{click:function(e){return t.deleteInstance()}}},[i("v-list-item-icon",[i("v-icon",{staticStyle:{color:"#f44336"}},[t._v("mdi-check")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v("继续")])],1)],1),i("v-list-item",{attrs:{link:""}},[i("v-list-item-icon",[i("v-icon",[t._v("mdi-close")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v("取消")])],1)],1)],1)],1),i("v-menu",{scopedSlots:t._u([{key:"activator",fn:function(e){var s=e.on,n=e.attrs;return[t.$isAdmin?i("v-btn",t._g(t._b({staticClass:"red elevation-1",attrs:{icon:"",dark:""}},"v-btn",n,!1),s),[i("v-icon",[t._v("mdi-close-octagon-outline")])],1):t._e()]}}])},[i("v-list",{attrs:{"max-width":"400px"}},[i("v-list-item",[i("v-list-item-icon",[i("v-icon",{staticStyle:{color:"#f44336"}},[t._v("mdi-message-alert")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" 警告：停止实例并"),i("strong",[t._v("不"),i("br"),t._v("会正常关闭服务器")]),t._v("。"),i("br"),t._v("极有可能造成存档损"),i("br"),t._v("坏。请确保服务器保"),i("br"),t._v("有每 10 分钟一次的计"),i("br"),t._v("划备份，以防后患。 ")])],1)],1),i("v-list-item",{staticStyle:{color:"#f44336"},attrs:{link:""},on:{click:function(e){return t.stopInstance()}}},[i("v-list-item-icon",[i("v-icon",{staticStyle:{color:"#f44336"}},[t._v("mdi-check")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v("继续")])],1)],1),i("v-list-item",{attrs:{link:""}},[i("v-list-item-icon",[i("v-icon",[t._v("mdi-close")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v("取消")])],1)],1)],1)],1),t.$isAdmin?i("v-btn",{staticClass:"elevation-1 blue",attrs:{icon:"",dark:""},on:{click:function(e){return t.startInstance()}}},[i("v-icon",[t._v("mdi-launch")])],1):t._e()],1),i("v-row",[i("v-col",{attrs:{cols:"4"}},[i("v-card",{class:t.getColorByStatus(t.instance.status),attrs:{dark:""}},[i("v-card-title",[t._v("实例运行状态")]),i("v-card-subtitle",[t._v("实例是指运行服务器的主机")]),i("v-card-text",[""===t.instance.status?i("v-progress-circular",{attrs:{size:"20",width:"2",indeterminate:""}}):t._e(),i("p",{staticClass:"display-1"},[i("v-icon",[t._v(t._s(t.getIconByStatus(t.instance.status)))]),t._v(" "+t._s(t.instance.status)+" ")],1),"实例不存在"===t.instance.status?i("p",[t._v(" 当前实例不存在，请重新创建。 ")]):t._e(),"已停止"===t.instance.status?i("p",[t._v(" 当前实例已停止。也可能是正在进行部署，请稍等。 ")]):t._e(),"正常"===t.instance.status?i("p",[t._v(" 当前实例运行情况正常。"),i("br"),t._v("实例 ID: "+t._s(t.instance.id)),i("br"),t._v("IP: "+t._s(t.server.ip||"暂无")+" ")]):t._e()],1)],1)],1),i("v-col",{attrs:{cols:"4"}},[i("v-card",{class:t.getColorByStatus(t.server.status),attrs:{dark:""}},[i("v-card-title",[t._v("服务器运行状态")]),i("v-card-subtitle",[t._v("Minecraft 服务器运行状态")]),i("v-card-text",[""===t.server.status?i("v-progress-circular",{attrs:{size:"20",width:"2",indeterminate:""}}):t._e(),i("p",{staticClass:"display-1"},[i("v-icon",[t._v(t._s(t.getIconByStatus(t.server.status)))]),t._v(" "+t._s(t.server.status)+" ")],1),"不存在"===t.server.status?i("p",[t._v(" 在数据库中找不到服务器的 IP。 ")]):t._e(),"正常"===t.server.status?i("p",[t._v(" 当前 Minecraft 服务器运行情况正常。"),i("br"),t._v("IP: "+t._s(t.server.ip)+":25565 ")]):t._e(),"未开启"===t.server.status?i("p",[t._v(" 服务器未开启或者正在启动中。"),i("br"),t._v("如果你刚刚创建了一个新的实例，此过程可能需要三到五分钟。 ")]):t._e()],1)],1)],1),i("v-col",{attrs:{cols:"4"}},[i("v-card",{class:t.getColorByStatus(t.apiStatus),attrs:{dark:""}},[i("v-card-title",[t._v("API 运行状态")]),i("v-card-subtitle",[t._v("API 是操作和控制服务器的基础")]),i("v-card-text",[""===t.apiStatus?i("v-progress-circular",{attrs:{size:"20",width:"2",indeterminate:""}}):t._e(),i("p",{staticClass:"display-1"},[i("v-icon",[t._v(t._s(t.getIconByStatus(t.apiStatus)))]),t._v(" "+t._s(t.apiStatus)+" ")],1),"异常"===t.apiStatus?i("p",[t._v(" 异常情况下，一切控制均无法正常操作，请及时联系技术人员解决。 ")]):t._e(),"正常"===t.apiStatus?i("p",[t._v(" 当前 API 状态正常，可以正确地执行和处理操作。"),i("br"),t._v("API 地址："),i("a",{staticStyle:{color:"inherit"},attrs:{href:"https://seatide.leviatan.cn",target:"_blank"}},[t._v("https://seatide.leviatan.cn")]),i("br"),t._v("API 版本：v1"),i("br"),t._v("API 领域：ecs@v1, server@v1, user@v1 ")]):t._e()],1)],1)],1)],1),"正常"===t.instance.status&&"正常"===t.server.status?i("v-alert",{attrs:{text:"",type:"success"}},[t._v(" 太棒了！当前实例和服务器均运行正常。"),i("br"),t._v("你可以在 Minecraft 中输入 IP 地址 "),i("strong",[t._v(t._s(t.server.ip)+":25565")]),t._v(" 加入游戏。 ")]):t._e(),"实例不存在"===t.instance.status?i("v-alert",{attrs:{text:"",type:"warning"}},[t._v(" 当前实例不存在，因为服务器超过 1 个小时无人在线，或者账号内资金不足。你可以点击"),i("strong",[t._v("「实例操作」->「创建实例」")]),t._v("尝试重新开启服务器。 ")]):t._e(),"正常"===t.instance.status&&"服务器不存在"===t.server.status?i("v-alert",{attrs:{text:"",type:"error"}},[t._v(" 当前实例运行正常，但服务器 IP 未知，属于异常情况，请截图联系管理员。 ")]):t._e(),"正常"===t.instance.status&&"未开启"===t.server.status?i("v-alert",{attrs:{text:"",type:"error"}},[t._v(" 当前实例运行正常，但服务器处于未开启状态，可能是 "),i("ul",[i("li",[t._v("服务器正在启动中。此时等待三到五分钟即可。")]),i("li",[t._v("服务器已崩溃。"),i("strong",[t._v("此时请务必联系管理员。")])])])]):t._e(),i("h1",[t._v(" 服务器 MOTD"+t._s(0!==t.server.onlinePlayers.length?"（"+t.server.onlinePlayers.length+"/50 在线）":"")+" ")]),t.motdHtml?i("div",{domProps:{innerHTML:t._s(t.motdHtml)}}):i("div",{staticClass:"empty"},[t._v("服务器尚未开启")]),i("v-dialog",{attrs:{"max-width":"700px"},model:{value:t.deployDialog,callback:function(e){t.deployDialog=e},expression:"deployDialog"}},[i("v-card",[i("v-card-title",[t._v("部署情况")]),i("v-card-text",[i("p",[t._v(" 你已经成功请求了实例的创建，你可以在这里查看其运行情况。整个过程大约需要 5 分钟左右，"),i("strong",[t._v("不建议")]),t._v("中途刷新或者离开网页。"),i("strong",[t._v("如果运行失败，请截图联系管理员。")]),i("br"),t._v(t._s(t.deployResult?"":"运行信息大约需要 15 秒左右的时间加载。若长时间未出现，请联系管理员。")+" ")]),i("div",{staticClass:"deploy-result",domProps:{innerHTML:t._s(t.deployResult||"运行信息加载中...")}})]),i("v-card-actions",[i("v-spacer"),i("v-btn",{staticClass:"primary",on:{click:function(e){t.deployDialog=!1}}},[t._v("关闭")])],1)],1)],1),i("v-snackbar",{model:{value:t.snackbar.open,callback:function(e){t.$set(t.snackbar,"open",e)},expression:"snackbar.open"}},[t._v(t._s(t.snackbar.text))])],1)},n=[],a=i("9ab4"),o=i("b903"),r=i("2b0e"),l=i("11ab"),c=i.n(l),u=r["a"].extend({data:function(){return{instance:{id:"",status:"",info:{},infoRender:[]},server:{status:"",ip:"",onlinePlayers:[]},apiStatus:"",snackbar:{open:!1,text:""},deployStatus:"",deployResult:"",autoUpdate:!1,deployDialog:!1,motdHtml:""}},methods:{getColorByStatus:function(t){return"正常"===t?"color-normal":["服务器不存在","未开启"].includes(t)?"color-error":"color-warning"},getIconByStatus:function(t){var e={"实例不存在":"mdi-help-circle-outline","不存在":"mdi-help-circle-outline","正常":"mdi-check","服务器不存在":"mdi-alert-circle-outline","未开启":"mdi-power-plug-off-outline","异常":"mdi-close"};return e[t]},createInstance:function(){var t=this;this.snackbar.text="正在请求中，请稍等...",this.snackbar.open=!0,Object(o["i"])("/api/ecs/v1/action",{type:"new",token:Object(o["e"])()}).then((function(e){if("ok"!==e.data.status)return t.snackbar.text=Object(o["k"])(e.data.msg),void(t.snackbar.open=!0);t.snackbar.text="请求成功，可查看部署情况。",t.snackbar.open=!0,t.deployStatus="loading",t.getDeployResult(),t.deployDialog=!0}))},getDeployResult:function(){return Object(a["a"])(this,void 0,void 0,(function(){var t,e,i,s=this;return Object(a["b"])(this,(function(n){switch(n.label){case 0:e=!1,i=0,n.label=1;case 1:return i>5?(this.deployStatus="ng",this.deployResult="请求超时，但请求可能仍然在处理。请前往 https://seatide.leviatan.cn/api/ecs/v1/describe/last-invoke 查看执行结果。",[3,3]):[4,this.sleep(3)];case 2:return n.sent(),Object(o["d"])("/api/ecs/v1/describe/last-invoke").then((function(n){t=n.data;try{if("No invocation history found."===t.msg)return void i++;if("Pending"===t.data.status)return;"Running"!==t.data.status?(i=0,s.deployStatus="Success"===t.data.status?"ok":"ng","ok"===s.deployStatus?(s.deployResult+="<br/>实例部署成功，Minecraft 服务器启动中。",s.snackbar.text="实例部署成功。",s.snackbar.open=!0,setTimeout((function(){s.refresh()}),3e3)):(s.deployResult+="<br/>部署失败，但实例已经存在，请手动排查或者立即删除以免不必要的损失。"+t.data.error,s.snackbar.text="实例部署失败，请查看执行信息。",s.snackbar.open=!1),e=!0):s.deployResult=t.data.output.split("\n").join("<br/>")}catch(a){console.warn("Exception in while loop: "+a)}})),e?[3,3]:[3,1];case 3:return[2]}}))}))},sleep:function(t){return Object(a["a"])(this,void 0,void 0,(function(){return Object(a["b"])(this,(function(e){return[2,new Promise((function(e){return setTimeout(e,1e3*t)}))]}))}))},isSM:o["g"],deleteInstance:function(){var t=this;Object(o["i"])("/api/ecs/v1/action",{type:"delete",token:Object(o["e"])()}).then((function(e){if("ok"!==e.data.status)return t.snackbar.text=Object(o["k"])(e.data.msg),void(t.snackbar.open=!0);t.snackbar.text="成功删除实例。",t.motdHtml="",t.deployStatus="",t.snackbar.open=!0,t.refresh()}))},stopInstance:function(){var t=this;Object(o["i"])("/api/ecs/v1/action",{type:"stop",token:Object(o["e"])()}).then((function(e){if("ok"!==e.data.status)return t.snackbar.text=Object(o["k"])(e.data.msg),void(t.snackbar.open=!0);t.snackbar.text="成功停止实例。",t.motdHtml="",t.deployStatus="",t.snackbar.open=!0,t.refresh()}))},startInstance:function(){var t=this;Object(o["i"])("/api/ecs/v1/action",{type:"start",token:Object(o["e"])()}).then((function(e){var i;if("ok"!==e.data.status)return(null===(i=e.data.msg)||void 0===i?void 0:i.includes("is Running but"))?(t.snackbar.text="服务器正在运行中，无需启动。",void(t.snackbar.open=!0)):(t.snackbar.text=Object(o["k"])(e.data.msg),void(t.snackbar.open=!0));t.snackbar.text="成功开启实例。",t.snackbar.open=!0,t.refresh()}))},refresh:function(){var t=this;Object(o["d"])("/api/ecs/v1/describe/status").then((function(e){"ok"!==e.data.status?t.instance.status=Object(o["k"])(e.data.msg,!0):(t.instance.status="Running"===e.data.data.status?"正常":"已停止",t.instance.id=e.data.data.id)})),Object(o["d"])("/api/server/v1/get/server").then((function(e){if("ok"!==e.data.status)t.server.status=Object(o["k"])(e.data.msg,!0);else{var i=e.data.data;if(!1===i.created)return void(t.server.status="不存在");if(!1===i.online)return void(t.server.status="未开启");t.server.status="正常",t.server.ip=i.ip,null!==i.onlinePlayersDetails&&(t.server.onlinePlayers=i.onlinePlayersDetails)}})),Object(o["d"])("/api").then((function(e){e.data.status&&"http-error"===e.data.status?t.apiStatus="正常":t.apiStatus="异常"})),this.getMotd()},autoRefresh:function(){return Object(a["a"])(this,void 0,void 0,(function(){return Object(a["b"])(this,(function(t){switch(t.label){case 0:return this.autoUpdate&&this.refresh(),[4,this.sleep(5)];case 1:return t.sent(),[3,0];case 2:return[2]}}))}))},getMotd:function(){var t=this;Object(o["d"])("/api/server/v1/get/server").then((function(e){null!==e.data.data&&c.a.toHtml(e.data.data.motd,(function(e,i){t.motdHtml=i}))}))}},mounted:function(){var t=this;this.refresh(),this.autoRefresh(),this.autoUpdate="true"===this.$cookies.get("tl-overview-auto-update"),this.$bus.$on("open-deploy-dialog",(function(){t.deployDialog=!0}))},watch:{autoUpdate:function(t){this.$cookies.set("tl-overview-auto-update",t,-1)},deployStatus:function(t){this.$bus.$emit("deploy-status-change",t)}}}),d=u,h=(i("bd48"),i("2877")),v=i("6544"),p=i.n(v),f=(i("0c18"),i("10d2")),m=i("afdd"),g=i("9d26"),b=i("f2e7"),y=i("7560"),_=r["a"].extend({name:"transitionable",props:{mode:String,origin:String,transition:String}}),k=i("58df"),x=i("d9bd"),w=Object(k["a"])(f["a"],b["a"],_).extend({name:"v-alert",props:{border:{type:String,validator(t){return["top","right","bottom","left"].includes(t)}},closeLabel:{type:String,default:"$vuetify.close"},coloredBorder:Boolean,dense:Boolean,dismissible:Boolean,closeIcon:{type:String,default:"$cancel"},icon:{default:"",type:[Boolean,String],validator(t){return"string"===typeof t||!1===t}},outlined:Boolean,prominent:Boolean,text:Boolean,type:{type:String,validator(t){return["info","error","success","warning"].includes(t)}},value:{type:Boolean,default:!0}},computed:{__cachedBorder(){if(!this.border)return null;let t={staticClass:"v-alert__border",class:{["v-alert__border--"+this.border]:!0}};return this.coloredBorder&&(t=this.setBackgroundColor(this.computedColor,t),t.class["v-alert__border--has-color"]=!0),this.$createElement("div",t)},__cachedDismissible(){if(!this.dismissible)return null;const t=this.iconColor;return this.$createElement(m["a"],{staticClass:"v-alert__dismissible",props:{color:t,icon:!0,small:!0},attrs:{"aria-label":this.$vuetify.lang.t(this.closeLabel)},on:{click:()=>this.isActive=!1}},[this.$createElement(g["a"],{props:{color:t}},this.closeIcon)])},__cachedIcon(){return this.computedIcon?this.$createElement(g["a"],{staticClass:"v-alert__icon",props:{color:this.iconColor}},this.computedIcon):null},classes(){const t={...f["a"].options.computed.classes.call(this),"v-alert--border":Boolean(this.border),"v-alert--dense":this.dense,"v-alert--outlined":this.outlined,"v-alert--prominent":this.prominent,"v-alert--text":this.text};return this.border&&(t["v-alert--border-"+this.border]=!0),t},computedColor(){return this.color||this.type},computedIcon(){return!1!==this.icon&&("string"===typeof this.icon&&this.icon?this.icon:!!["error","info","success","warning"].includes(this.type)&&"$"+this.type)},hasColoredIcon(){return this.hasText||Boolean(this.border)&&this.coloredBorder},hasText(){return this.text||this.outlined},iconColor(){return this.hasColoredIcon?this.computedColor:void 0},isDark(){return!(!this.type||this.coloredBorder||this.outlined)||y["a"].options.computed.isDark.call(this)}},created(){this.$attrs.hasOwnProperty("outline")&&Object(x["a"])("outline","outlined",this)},methods:{genWrapper(){const t=[this.$slots.prepend||this.__cachedIcon,this.genContent(),this.__cachedBorder,this.$slots.append,this.$scopedSlots.close?this.$scopedSlots.close({toggle:this.toggle}):this.__cachedDismissible],e={staticClass:"v-alert__wrapper"};return this.$createElement("div",e,t)},genContent(){return this.$createElement("div",{staticClass:"v-alert__content"},this.$slots.default)},genAlert(){let t={staticClass:"v-alert",attrs:{role:"alert"},on:this.listeners$,class:this.classes,style:this.styles,directives:[{name:"show",value:this.isActive}]};if(!this.coloredBorder){const e=this.hasText?this.setTextColor:this.setBackgroundColor;t=e(this.computedColor,t)}return this.$createElement("div",t,[this.genWrapper()])},toggle(){this.isActive=!this.isActive}},render(t){const e=this.genAlert();return this.transition?t("transition",{props:{name:this.transition,origin:this.origin,mode:this.mode}},[e]):e}}),C=i("8336"),S=i("b0af"),T=i("99d9"),O=(i("4b85"),i("d9f7")),A=i("80d2");const I=["sm","md","lg","xl"],j=(()=>I.reduce((t,e)=>(t[e]={type:[Boolean,String,Number],default:!1},t),{}))(),$=(()=>I.reduce((t,e)=>(t["offset"+Object(A["D"])(e)]={type:[String,Number],default:null},t),{}))(),B=(()=>I.reduce((t,e)=>(t["order"+Object(A["D"])(e)]={type:[String,Number],default:null},t),{}))(),D={col:Object.keys(j),offset:Object.keys($),order:Object.keys(B)};function L(t,e,i){let s=t;if(null!=i&&!1!==i){if(e){const i=e.replace(t,"");s+="-"+i}return"col"!==t||""!==i&&!0!==i?(s+="-"+i,s.toLowerCase()):s.toLowerCase()}}const M=new Map;var P=r["a"].extend({name:"v-col",functional:!0,props:{cols:{type:[Boolean,String,Number],default:!1},...j,offset:{type:[String,Number],default:null},...$,order:{type:[String,Number],default:null},...B,alignSelf:{type:String,default:null,validator:t=>["auto","start","end","center","baseline","stretch"].includes(t)},tag:{type:String,default:"div"}},render(t,{props:e,data:i,children:s,parent:n}){let a="";for(const r in e)a+=String(e[r]);let o=M.get(a);if(!o){let t;for(t in o=[],D)D[t].forEach(i=>{const s=e[i],n=L(t,i,s);n&&o.push(n)});const i=o.some(t=>t.startsWith("col-"));o.push({col:!i||!e.cols,["col-"+e.cols]:e.cols,["offset-"+e.offset]:e.offset,["order-"+e.order]:e.order,["align-self-"+e.alignSelf]:e.alignSelf}),M.set(a,o)}return t(e.tag,Object(O["a"])(i,{class:o}),s)}}),H=i("169a"),W=i("132d"),E=i("8860"),R=i("da13"),V=i("5d23"),N=i("34c3"),z=i("e449"),F=i("490a");const J=["sm","md","lg","xl"],q=["start","end","center"];function U(t,e){return J.reduce((i,s)=>(i[t+Object(A["D"])(s)]=e(),i),{})}const Y=t=>[...q,"baseline","stretch"].includes(t),K=U("align",()=>({type:String,default:null,validator:Y})),X=t=>[...q,"space-between","space-around"].includes(t),G=U("justify",()=>({type:String,default:null,validator:X})),Z=t=>[...q,"space-between","space-around","stretch"].includes(t),Q=U("alignContent",()=>({type:String,default:null,validator:Z})),tt={align:Object.keys(K),justify:Object.keys(G),alignContent:Object.keys(Q)},et={align:"align",justify:"justify",alignContent:"align-content"};function it(t,e,i){let s=et[t];if(null!=i){if(e){const i=e.replace(t,"");s+="-"+i}return s+="-"+i,s.toLowerCase()}}const st=new Map;var nt=r["a"].extend({name:"v-row",functional:!0,props:{tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:Y},...K,justify:{type:String,default:null,validator:X},...G,alignContent:{type:String,default:null,validator:Z},...Q},render(t,{props:e,data:i,children:s}){let n="";for(const o in e)n+=String(e[o]);let a=st.get(n);if(!a){let t;for(t in a=[],tt)tt[t].forEach(i=>{const s=e[i],n=it(t,i,s);n&&a.push(n)});a.push({"no-gutters":e.noGutters,"row--dense":e.dense,["align-"+e.align]:e.align,["justify-"+e.justify]:e.justify,["align-content-"+e.alignContent]:e.alignContent}),st.set(n,a)}return t(e.tag,Object(O["a"])(i,{staticClass:"row",class:a}),s)}}),at=i("2db4"),ot=i("2fa4"),rt=i("3a2f"),lt=Object(h["a"])(d,s,n,!1,null,"5950e916",null);e["default"]=lt.exports;p()(lt,{VAlert:w,VBtn:C["a"],VCard:S["a"],VCardActions:T["a"],VCardSubtitle:T["b"],VCardText:T["c"],VCardTitle:T["d"],VCol:P,VDialog:H["a"],VIcon:W["a"],VList:E["a"],VListItem:R["a"],VListItemContent:V["a"],VListItemIcon:N["a"],VListItemTitle:V["c"],VMenu:z["a"],VProgressCircular:F["a"],VRow:nt,VSnackbar:at["a"],VSpacer:ot["a"],VTooltip:rt["a"]})},"2db4":function(t,e,i){"use strict";i("ca71");var s=i("8dd9"),n=i("a9ad"),a=i("7560"),o=i("f2e7"),r=i("fe6c"),l=i("58df"),c=i("80d2"),u=i("d9bd");e["a"]=Object(l["a"])(s["a"],n["a"],o["a"],Object(r["b"])(["absolute","bottom","left","right","top"])).extend({name:"v-snackbar",props:{app:Boolean,centered:Boolean,contentClass:{type:String,default:""},multiLine:Boolean,text:Boolean,timeout:{type:[Number,String],default:5e3},transition:{type:[Boolean,String],default:"v-snack-transition",validator:t=>"string"===typeof t||!1===t},vertical:Boolean},data:()=>({activeTimeout:-1}),computed:{classes(){return{"v-snack--absolute":this.absolute,"v-snack--active":this.isActive,"v-snack--bottom":this.bottom||!this.top,"v-snack--centered":this.centered,"v-snack--has-background":this.hasBackground,"v-snack--left":this.left,"v-snack--multi-line":this.multiLine&&!this.vertical,"v-snack--right":this.right,"v-snack--text":this.text,"v-snack--top":this.top,"v-snack--vertical":this.vertical}},hasBackground(){return!this.text&&!this.outlined},isDark(){return this.hasBackground?!this.light:a["a"].options.computed.isDark.call(this)},styles(){if(this.absolute)return{};const{bar:t,bottom:e,footer:i,insetFooter:s,left:n,right:a,top:o}=this.$vuetify.application;return{paddingBottom:Object(c["g"])(e+i+s),paddingLeft:this.app?Object(c["g"])(n):void 0,paddingRight:this.app?Object(c["g"])(a):void 0,paddingTop:Object(c["g"])(t+o)}}},watch:{isActive:"setTimeout",timeout:"setTimeout"},mounted(){this.isActive&&this.setTimeout()},created(){this.$attrs.hasOwnProperty("auto-height")&&Object(u["e"])("auto-height",this),0==this.timeout&&Object(u["d"])('timeout="0"',"-1",this)},methods:{genActions(){return this.$createElement("div",{staticClass:"v-snack__action "},[Object(c["r"])(this,"action",{attrs:{class:"v-snack__btn"}})])},genContent(){return this.$createElement("div",{staticClass:"v-snack__content",class:{[this.contentClass]:!0},attrs:{role:"status","aria-live":"polite"}},[Object(c["r"])(this)])},genWrapper(){const t=this.hasBackground?this.setBackgroundColor:this.setTextColor,e=t(this.color,{staticClass:"v-snack__wrapper",class:s["a"].options.computed.classes.call(this),style:s["a"].options.computed.styles.call(this),directives:[{name:"show",value:this.isActive}],on:{pointerenter:()=>window.clearTimeout(this.activeTimeout),pointerleave:this.setTimeout}});return this.$createElement("div",e,[this.genContent(),this.genActions()])},genTransition(){return this.$createElement("transition",{props:{name:this.transition}},[this.genWrapper()])},setTimeout(){window.clearTimeout(this.activeTimeout);const t=Number(this.timeout);this.isActive&&![0,-1].includes(t)&&(this.activeTimeout=window.setTimeout(()=>{this.isActive=!1},t))}},render(t){return t("div",{staticClass:"v-snack",class:this.classes,style:this.styles},[!1!==this.transition?this.genTransition():this.genWrapper()])}})},"3a2f":function(t,e,i){"use strict";i("9734");var s=i("4ad4"),n=i("a9ad"),a=i("16b7"),o=i("b848"),r=i("f573"),l=i("f2e7"),c=i("80d2"),u=i("d9bd"),d=i("58df");e["a"]=Object(d["a"])(n["a"],a["a"],o["a"],r["a"],l["a"]).extend({name:"v-tooltip",props:{closeDelay:{type:[Number,String],default:0},disabled:Boolean,fixed:{type:Boolean,default:!0},openDelay:{type:[Number,String],default:0},openOnHover:{type:Boolean,default:!0},tag:{type:String,default:"span"},transition:String},data:()=>({calculatedMinWidth:0,closeDependents:!1}),computed:{calculatedLeft(){const{activator:t,content:e}=this.dimensions,i=!this.bottom&&!this.left&&!this.top&&!this.right,s=!1!==this.attach?t.offsetLeft:t.left;let n=0;return this.top||this.bottom||i?n=s+t.width/2-e.width/2:(this.left||this.right)&&(n=s+(this.right?t.width:-e.width)+(this.right?10:-10)),this.nudgeLeft&&(n-=parseInt(this.nudgeLeft)),this.nudgeRight&&(n+=parseInt(this.nudgeRight)),this.calcXOverflow(n,this.dimensions.content.width)+"px"},calculatedTop(){const{activator:t,content:e}=this.dimensions,i=!1!==this.attach?t.offsetTop:t.top;let s=0;return this.top||this.bottom?s=i+(this.bottom?t.height:-e.height)+(this.bottom?10:-10):(this.left||this.right)&&(s=i+t.height/2-e.height/2),this.nudgeTop&&(s-=parseInt(this.nudgeTop)),this.nudgeBottom&&(s+=parseInt(this.nudgeBottom)),this.calcYOverflow(s+this.pageYOffset)+"px"},classes(){return{"v-tooltip--top":this.top,"v-tooltip--right":this.right,"v-tooltip--bottom":this.bottom,"v-tooltip--left":this.left,"v-tooltip--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},computedTransition(){return this.transition?this.transition:this.isActive?"scale-transition":"fade-transition"},offsetY(){return this.top||this.bottom},offsetX(){return this.left||this.right},styles(){return{left:this.calculatedLeft,maxWidth:Object(c["g"])(this.maxWidth),minWidth:Object(c["g"])(this.minWidth),opacity:this.isActive?.9:0,top:this.calculatedTop,zIndex:this.zIndex||this.activeZIndex}}},beforeMount(){this.$nextTick(()=>{this.value&&this.callActivate()})},mounted(){"v-slot"===Object(c["s"])(this,"activator",!0)&&Object(u["b"])("v-tooltip's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'",this)},methods:{activate(){this.updateDimensions(),requestAnimationFrame(this.startTransition)},deactivate(){this.runDelay("close")},genActivatorListeners(){const t=s["a"].options.methods.genActivatorListeners.call(this);return t.focus=t=>{this.getActivator(t),this.runDelay("open")},t.blur=t=>{this.getActivator(t),this.runDelay("close")},t.keydown=t=>{t.keyCode===c["w"].esc&&(this.getActivator(t),this.runDelay("close"))},t},genActivatorAttributes(){return{"aria-haspopup":!0,"aria-expanded":String(this.isActive)}},genTransition(){const t=this.genContent();return this.computedTransition?this.$createElement("transition",{props:{name:this.computedTransition}},[t]):t},genContent(){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-tooltip__content",class:{[this.contentClass]:!0,menuable__content__active:this.isActive,"v-tooltip__content--fixed":this.activatorFixed},style:this.styles,attrs:this.getScopeIdAttrs(),directives:[{name:"show",value:this.isContentActive}],ref:"content"}),this.getContentSlot())}},render(t){return t(this.tag,{staticClass:"v-tooltip",class:this.classes},[this.showLazyContent(()=>[this.genTransition()]),this.genActivator()])}})},"4b85":function(t,e,i){},9687:function(t,e,i){},9734:function(t,e,i){},"9ab4":function(t,e,i){"use strict";i.d(e,"a",(function(){return s})),i.d(e,"b",(function(){return n}));function s(t,e,i,s){function n(t){return t instanceof i?t:new i((function(e){e(t)}))}return new(i||(i=Promise))((function(i,a){function o(t){try{l(s.next(t))}catch(e){a(e)}}function r(t){try{l(s["throw"](t))}catch(e){a(e)}}function l(t){t.done?i(t.value):n(t.value).then(o,r)}l((s=s.apply(t,e||[])).next())}))}function n(t,e){var i,s,n,a,o={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return a={next:r(0),throw:r(1),return:r(2)},"function"===typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function r(t){return function(e){return l([t,e])}}function l(a){if(i)throw new TypeError("Generator is already executing.");while(o)try{if(i=1,s&&(n=2&a[0]?s["return"]:a[0]?s["throw"]||((n=s["return"])&&n.call(s),0):s.next)&&!(n=n.call(s,a[1])).done)return n;switch(s=0,n&&(a=[2&a[0],n.value]),a[0]){case 0:case 1:n=a;break;case 4:return o.label++,{value:a[1],done:!1};case 5:o.label++,s=a[1],a=[0];continue;case 7:a=o.ops.pop(),o.trys.pop();continue;default:if(n=o.trys,!(n=n.length>0&&n[n.length-1])&&(6===a[0]||2===a[0])){o=0;continue}if(3===a[0]&&(!n||a[1]>n[0]&&a[1]<n[3])){o.label=a[1];break}if(6===a[0]&&o.label<n[1]){o.label=n[1],n=a;break}if(n&&o.label<n[2]){o.label=n[2],o.ops.push(a);break}n[2]&&o.ops.pop(),o.trys.pop();continue}a=e.call(t,o)}catch(r){a=[6,r],s=0}finally{i=n=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}}},afdd:function(t,e,i){"use strict";var s=i("8336");e["a"]=s["a"]},bd48:function(t,e,i){"use strict";i("9687")},ca71:function(t,e,i){},e449:function(t,e,i){"use strict";i("ee6f");var s=i("480e"),n=i("4ad4"),a=i("16b7"),o=i("b848"),r=i("f573"),l=i("e4d3"),c=i("a236"),u=i("f2e7"),d=i("7560"),h=i("a293"),v=i("dc22"),p=i("58df"),f=i("d9bd"),m=i("80d2");const g=Object(p["a"])(o["a"],a["a"],r["a"],l["a"],c["a"],u["a"],d["a"]);e["a"]=g.extend({name:"v-menu",directives:{ClickOutside:h["a"],Resize:v["a"]},provide(){return{isInMenu:!0,theme:this.theme}},props:{auto:Boolean,closeOnClick:{type:Boolean,default:!0},closeOnContentClick:{type:Boolean,default:!0},disabled:Boolean,disableKeys:Boolean,maxHeight:{type:[Number,String],default:"auto"},offsetX:Boolean,offsetY:Boolean,openOnClick:{type:Boolean,default:!0},openOnHover:Boolean,origin:{type:String,default:"top left"},transition:{type:[Boolean,String],default:"v-menu-transition"}},data(){return{calculatedTopAuto:0,defaultOffset:8,hasJustFocused:!1,listIndex:-1,resizeTimeout:0,selectedIndex:null,tiles:[]}},computed:{activeTile(){return this.tiles[this.listIndex]},calculatedLeft(){const t=Math.max(this.dimensions.content.width,parseFloat(this.calculatedMinWidth));return this.auto?Object(m["g"])(this.calcXOverflow(this.calcLeftAuto(),t))||"0":this.calcLeft(t)||"0"},calculatedMaxHeight(){const t=this.auto?"200px":Object(m["g"])(this.maxHeight);return t||"0"},calculatedMaxWidth(){return Object(m["g"])(this.maxWidth)||"0"},calculatedMinWidth(){if(this.minWidth)return Object(m["g"])(this.minWidth)||"0";const t=Math.min(this.dimensions.activator.width+Number(this.nudgeWidth)+(this.auto?16:0),Math.max(this.pageWidth-24,0)),e=isNaN(parseInt(this.calculatedMaxWidth))?t:parseInt(this.calculatedMaxWidth);return Object(m["g"])(Math.min(e,t))||"0"},calculatedTop(){const t=this.auto?Object(m["g"])(this.calcYOverflow(this.calculatedTopAuto)):this.calcTop();return t||"0"},hasClickableTiles(){return Boolean(this.tiles.find(t=>t.tabIndex>-1))},styles(){return{maxHeight:this.calculatedMaxHeight,minWidth:this.calculatedMinWidth,maxWidth:this.calculatedMaxWidth,top:this.calculatedTop,left:this.calculatedLeft,transformOrigin:this.origin,zIndex:this.zIndex||this.activeZIndex}}},watch:{isActive(t){t||(this.listIndex=-1)},isContentActive(t){this.hasJustFocused=t},listIndex(t,e){if(t in this.tiles){const e=this.tiles[t];e.classList.add("v-list-item--highlighted"),this.$refs.content.scrollTop=e.offsetTop-e.clientHeight}e in this.tiles&&this.tiles[e].classList.remove("v-list-item--highlighted")}},created(){this.$attrs.hasOwnProperty("full-width")&&Object(f["e"])("full-width",this)},mounted(){this.isActive&&this.callActivate()},methods:{activate(){this.updateDimensions(),requestAnimationFrame(()=>{this.startTransition().then(()=>{this.$refs.content&&(this.calculatedTopAuto=this.calcTopAuto(),this.auto&&(this.$refs.content.scrollTop=this.calcScrollPosition()))})})},calcScrollPosition(){const t=this.$refs.content,e=t.querySelector(".v-list-item--active"),i=t.scrollHeight-t.offsetHeight;return e?Math.min(i,Math.max(0,e.offsetTop-t.offsetHeight/2+e.offsetHeight/2)):t.scrollTop},calcLeftAuto(){return parseInt(this.dimensions.activator.left-2*this.defaultOffset)},calcTopAuto(){const t=this.$refs.content,e=t.querySelector(".v-list-item--active");if(e||(this.selectedIndex=null),this.offsetY||!e)return this.computedTop;this.selectedIndex=Array.from(this.tiles).indexOf(e);const i=e.offsetTop-this.calcScrollPosition(),s=t.querySelector(".v-list-item").offsetTop;return this.computedTop-i-s-1},changeListIndex(t){if(this.getTiles(),this.isActive&&this.hasClickableTiles)if(t.keyCode!==m["w"].tab){if(t.keyCode===m["w"].down)this.nextTile();else if(t.keyCode===m["w"].up)this.prevTile();else if(t.keyCode===m["w"].end)this.lastTile();else if(t.keyCode===m["w"].home)this.firstTile();else{if(t.keyCode!==m["w"].enter||-1===this.listIndex)return;this.tiles[this.listIndex].click()}t.preventDefault()}else this.isActive=!1},closeConditional(t){const e=t.target;return this.isActive&&!this._isDestroyed&&this.closeOnClick&&!this.$refs.content.contains(e)},genActivatorAttributes(){const t=n["a"].options.methods.genActivatorAttributes.call(this);return this.activeTile&&this.activeTile.id?{...t,"aria-activedescendant":this.activeTile.id}:t},genActivatorListeners(){const t=r["a"].options.methods.genActivatorListeners.call(this);return this.disableKeys||(t.keydown=this.onKeyDown),t},genTransition(){const t=this.genContent();return this.transition?this.$createElement("transition",{props:{name:this.transition}},[t]):t},genDirectives(){const t=[{name:"show",value:this.isContentActive}];return!this.openOnHover&&this.closeOnClick&&t.push({name:"click-outside",value:{handler:()=>{this.isActive=!1},closeConditional:this.closeConditional,include:()=>[this.$el,...this.getOpenDependentElements()]}}),t},genContent(){const t={attrs:{...this.getScopeIdAttrs(),role:"role"in this.$attrs?this.$attrs.role:"menu"},staticClass:"v-menu__content",class:{...this.rootThemeClasses,...this.roundedClasses,"v-menu__content--auto":this.auto,"v-menu__content--fixed":this.activatorFixed,menuable__content__active:this.isActive,[this.contentClass.trim()]:!0},style:this.styles,directives:this.genDirectives(),ref:"content",on:{click:t=>{const e=t.target;e.getAttribute("disabled")||this.closeOnContentClick&&(this.isActive=!1)},keydown:this.onKeyDown}};return this.$listeners.scroll&&(t.on=t.on||{},t.on.scroll=this.$listeners.scroll),!this.disabled&&this.openOnHover&&(t.on=t.on||{},t.on.mouseenter=this.mouseEnterHandler),this.openOnHover&&(t.on=t.on||{},t.on.mouseleave=this.mouseLeaveHandler),this.$createElement("div",t,this.getContentSlot())},getTiles(){this.$refs.content&&(this.tiles=Array.from(this.$refs.content.querySelectorAll(".v-list-item")))},mouseEnterHandler(){this.runDelay("open",()=>{this.hasJustFocused||(this.hasJustFocused=!0)})},mouseLeaveHandler(t){this.runDelay("close",()=>{this.$refs.content.contains(t.relatedTarget)||requestAnimationFrame(()=>{this.isActive=!1,this.callDeactivate()})})},nextTile(){const t=this.tiles[this.listIndex+1];if(!t){if(!this.tiles.length)return;return this.listIndex=-1,void this.nextTile()}this.listIndex++,-1===t.tabIndex&&this.nextTile()},prevTile(){const t=this.tiles[this.listIndex-1];if(!t){if(!this.tiles.length)return;return this.listIndex=this.tiles.length,void this.prevTile()}this.listIndex--,-1===t.tabIndex&&this.prevTile()},lastTile(){const t=this.tiles[this.tiles.length-1];t&&(this.listIndex=this.tiles.length-1,-1===t.tabIndex&&this.prevTile())},firstTile(){const t=this.tiles[0];t&&(this.listIndex=0,-1===t.tabIndex&&this.nextTile())},onKeyDown(t){if(t.keyCode===m["w"].esc){setTimeout(()=>{this.isActive=!1});const t=this.getActivator();this.$nextTick(()=>t&&t.focus())}else!this.isActive&&[m["w"].up,m["w"].down].includes(t.keyCode)&&(this.isActive=!0);this.$nextTick(()=>this.changeListIndex(t))},onResize(){this.isActive&&(this.$refs.content.offsetWidth,this.updateDimensions(),clearTimeout(this.resizeTimeout),this.resizeTimeout=window.setTimeout(this.updateDimensions,100))}},render(t){const e={staticClass:"v-menu",class:{"v-menu--attached":""===this.attach||!0===this.attach||"attach"===this.attach},directives:[{arg:"500",name:"resize",value:this.onResize}]};return t("div",e,[!this.activator&&this.genActivator(),this.showLazyContent(()=>[this.$createElement(s["a"],{props:{root:!0,light:this.light,dark:this.dark}},[this.genTransition()])])])}})},ee6f:function(t,e,i){}}]);