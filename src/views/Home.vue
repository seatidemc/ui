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
				<v-toolbar-title class="tidelab-typo">
					<img src="@/assets/seatide-main.svg" />
					<span>TiDELab</span>
				</v-toolbar-title>
				<v-spacer />
				<v-tooltip left>
					<template v-slot:activator="{ on, attrs }">
						<v-btn
							v-bind="attrs"
							v-on="on"
							@click="$open('https://seatide.top')"
							icon
						>
							<v-icon>mdi-launch</v-icon>
						</v-btn>
					</template>
					<span>前往官网</span>
				</v-tooltip>
			</v-app-bar>
			<v-main>
				<v-container>
					<v-card class="main-card">
						<component :is="current" />
					</v-card>
				</v-container>
			</v-main>
		</v-app>
	</div>
</template>

<script lang="ts">
import { delToken, getTokenUsername, ltMdBreakpoint } from "@/sn";
import Vue from "vue";
import Overview from "@/functional/Overview.vue";
import Users from "@/functional/Users.vue";
import Server from "@/functional/Server.vue";

export default Vue.extend({
	data() {
		return {
			username: "",
			drawer: null as null | boolean,
			listItem: 0,
			dict: ["overview", "users", "server"],
		};
	},
	mounted() {
		this.username = getTokenUsername();
		this.listItem = this.dict.indexOf(this.current);
	},
	components: {
		Overview,
		Users,
		Server,
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
			];
			if (this.$isAdmin) {
				r = r.concat(
					{
						title: "用户管理",
						icon: "mdi-account-box-multiple",
						to: "users",
					}
					// {
					// 	title: "服务器管理",
					// 	icon: "mdi-minecraft",
					// 	to: "server",
					// }
				);
			}
			return r;
		},
	},
	beforeRouteEnter(to, from, next) {
		if (to.params.current === undefined) {
			next("/overview");
		} else {
			next();
		}
	},
	computed: {
		current() {
			return this.$route.params.current;
		},
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
	margin-top: 32px;

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
</style>