<template>
	<div class="home">
		<v-app>
			<v-navigation-drawer v-model="drawer" app>
				<v-list-item>
					<v-list-item-content>
						<v-list-item-title class="username">{{
							username
						}}</v-list-item-title>
						<v-list-item-subtitle class="position">{{
							$isAdmin ? "管理员" : "普通用户"
						}}</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
				<v-divider />
				<v-list>
					<v-list-item-group v-model="listItem">
						<v-list-item
							:class="
								'f.' + x.to === $route.name ? 'realactive' : ''
							"
							@click.native="
								$router.push('/' + x.to);
								closeDrawerOptional();
							"
							link
							v-for="(x, i) in getDrawerItems()"
							:key="i"
						>
							<v-list-item-icon
								><v-icon>{{ x.icon }}</v-icon></v-list-item-icon
							>
							<v-list-item-content>
								<v-list-item-title>{{
									x.title
								}}</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list-item-group>
				</v-list>
				<template v-slot:append>
					<div class="pa-2">
						<v-btn @click="logout()" block outlined
							>退出登录&emsp;<v-icon
								>mdi-exit-to-app</v-icon
							></v-btn
						>
					</div>
				</template>
			</v-navigation-drawer>
			<v-app-bar elevate color="white" app>
				<v-btn icon @click="drawer = !drawer">
					<v-icon>mdi-menu</v-icon>
				</v-btn>
				<v-toolbar-title
					@click="$router.push('/overview')"
					class="tidelab-typo"
				>
					<img src="@/assets/seatide-main.svg" />
					<span class="no-font-feature">TiDELab</span>
				</v-toolbar-title>
				<v-spacer />
				<v-tooltip
					bottom
					v-if="$route.name === 'f.overview' && deployStatus !== ''"
				>
					<template v-slot:activator="{ on, attrs }">
						<v-btn
							v-bind="attrs"
							v-on="on"
							@click="$bus.$emit('open-deploy-dialog')"
							icon
						>
							<v-icon v-if="deployStatus !== 'loading'">{{
								deployStatus === "ok"
									? "mdi-check"
									: "mdi-alert"
							}}</v-icon>
							<v-progress-circular
								:width="2"
								:size="20"
								indeterminate
								v-if="deployStatus === 'loading'"
							/>
						</v-btn>
					</template>
					<span>查看部署情况</span>
				</v-tooltip>
				<v-tooltip bottom>
					<template v-slot:activator="{ on, attrs }">
						<v-btn
							v-bind="attrs"
							v-on="on"
							@click="pageHelpDialog = true"
							icon
						>
							<v-icon>mdi-help-circle-outline</v-icon>
						</v-btn>
					</template>
					查看本页帮助
				</v-tooltip>
				<v-tooltip bottom>
					<template v-slot:activator="{ on, attrs }">
						<v-btn
							v-bind="attrs"
							v-on="on"
							@click="
								$open(
									'https://w.seatide.top/automation/tidelab-index'
								)
							"
							icon
						>
							<v-icon>mdi-book-search-outline</v-icon>
						</v-btn>
					</template>
					<span>阅读帮助文档</span>
				</v-tooltip>
				<v-tooltip left>
					<template v-slot:activator="{ on, attrs }">
						<v-btn
							v-bind="attrs"
							v-on="on"
							@click="$open('https://seatide.top')"
							icon
						>
							<v-icon>mdi-arrow-top-right</v-icon>
						</v-btn>
					</template>
					<span>前往官网</span>
				</v-tooltip>
			</v-app-bar>
			<v-main>
				<v-container>
					<div class="main-container">
						<router-view />
					</div>
				</v-container>
			</v-main>
		</v-app>
		<v-dialog v-model="pageHelpDialog" max-width="700px">
			<v-card>
				<v-card-title>本页帮助</v-card-title>
				<v-card-text v-html="getCurrentPageHelp()"> </v-card-text>
			</v-card>
		</v-dialog>
	</div>
</template>

<script lang="ts">
import { delToken, getTokenUsername, ltMdBreakpoint } from "@/fn";
import Vue from "vue";

export default Vue.extend({
	data() {
		return {
			username: "",
			drawer: null as null | boolean,
			listItem: 0,
			dict: ["overview", "users", "server"],
			pageHelpDialog: false,
			deployStatus: "",
		};
	},
	mounted() {
		this.username = getTokenUsername();
		this.listItem = this.dict.indexOf(this.current);
		this.$bus.$on("deploy-status-change", (v: string) => {
			this.deployStatus = v;
		});
	},
	methods: {
		logout() {
			delToken();
			this.$router.push({ name: "auth" });
		},
		closeDrawerOptional() {
			if (ltMdBreakpoint()) {
				this.drawer = false;
			}
		},
		getDrawerItems() {
			let r = [
				{
					title: "概览",
					icon: "mdi-view-dashboard",
					to: "overview",
				},
				// {
				// 	title: "服务器管理",
				// 	icon: "mdi-minecraft",
				// 	to: "server"
				// },
				{
					title: "资金流",
					icon: "mdi-cash",
					to: "fund",
				},
			];
			if (this.$isAdmin) {
				r.push({
					title: "用户管理",
					icon: "mdi-account-box-multiple",
					to: "users",
				});
			}
			return r;
		},
		getCurrentPageHelp() {
			if (this.$route.name === "f.fund") {
				return `
				<p><strong>「资金流」</strong>页面提供了查看服务器收支情况的简便方式。你可以在这里浏览自 SEATiDE 开启以来任意时刻的收支情况和简要的统计信息。下面是一些概念解释。</p>
				<ul>
				<li><strong>显示颜色</strong>选项 — 若开启，会用不同的颜色标记收支数字以便辨识。收入一律标记为绿色，一般支出（低于 <span class='money'>￥0.5</span>）标记为黑色，中等支出（在 <span class='money'>￥0.5</span> 和 <span class='money'>￥1.0</span> 之间）标记为黄色，高支出（高于 <span class='money'>￥1.0</span>）标记为红色。</li>
				<li><strong>当前账户可用余额</strong> — 指当前账户中所剩余的可供扣款的余额，实际上账户里的余额是这个数字加上 100 以后的结果。这样的原因是抢占式实例需要账户中至少有 100 元才能正常运行。</li>
				<li><strong>本月日均消费</strong> — 用于粗略衡量 SEATiDE 的运营模式相较于包月、按量计费的节省效果。其计算公式为月总消费 / 30。</li>
				<li><strong>30 天内最高单次消费</strong> — 指最近 30 天内最高的一次单次消费金额。其获取需要分析数千条数据，因而较为缓慢。</li>
				<li><strong>历史最高单次消费</strong> — 指从 SEATiDE 开启以来最高的一次单次消费金额。其获取需要分析数千条数据，因而较为缓慢。</li>
				</ul>
				<p>下方的<strong>实例配置</strong>板块反映了当前 SEATiDE 所使用的配置信息。其各项对最终价格的决定方式如下：</p>
				<ul>
				<li><b>实例类型</b> — 代表着该实例所拥有的 CPU、GPU 和内存等基本配置信息。例如 ecs.g6.large 为 2 核 8G，ecs.g6.xlarge 为 4 核 16G。其间还有代数的差距，ecs.g7.large 与 g6 的主要区别在于 CPU 的类型，更加优质价格也更贵。 </li>
				<li><b>峰值带宽</b> — 代表着该实例的理论最大输出带宽，与最终价格没有直接联系。在网络方面，我们选用的是按量计费，每 GB 流量 0.8 元。</li>
				<li><b>系统盘和数据盘</b> — 代表着实例的存储能力。其大小构成实例的基本价格，后期运行中不会发生改变。</li>
				<li><b>地域</b> — 代表该实例的物理形态存在的地点。每个地域分为用英文字母表示的若干可用区。不同地域、不同可用区的网络质量不一样，价格也不一样。一般我们会选择最低价的。<strong>价格相差略大，例如上海某可用区与张家口某可用区的首小时价格可以相差最多 1 元。</strong></li>
				<li><b>首小时价格</b> — 代表该实例每次收费的参考价格。理论上每次收费的价格会在该价格周围波动（一般为 ±0.5）。具体的波动情况可以参考收支表格。<strong>注意：实例的扣费时间不定，并不是规律性的每小时扣一次。</strong></li>
				</ul>
				`;
			}
			return '<div class="no-help-for-this-page empty">当前页面暂无可用的帮助</div>';
		},
	},
	computed: {
		current() {
			return this.$route.params.current;
		},
	},
	beforeRouteEnter(to, from, next) {
		if (to.name === "home") {
			next("/overview");
		}
		next();
	},
});
</script>

<style lang="less" scoped>
.username {
	font-weight: bold;
	font-size: 24px;
	.primary-text;
	display: inline-block;
}

.main-card {
	padding: 16px 32px;

	@media (min-width: 800px) {
		margin-top: 32px;
	}

	@media (max-width: 800px) {
		box-shadow: none !important;
		padding: 0;
	}
}

.tidelab-typo {
	display: inline-flex;
	flex-wrap: nowrap;
	align-items: center;
	padding: 0 !important;
	img {
		height: 38px;
	}
	span {
		margin-left: 0.5em;
		font-style: "SF Pro Display", "Inter", Segoe UI, sans-serif;
		font-weight: 600;
		color: rgba(0, 0, 0, 0.75);
		font-size: 26px;
		&::selection {
			background: transparent;
			pointer-events: none;
		}
	}
	cursor: pointer;
}

.main-container {
	max-width: 1000px;
	padding: 16px;
	margin: auto;
	position: relative;
}
</style>