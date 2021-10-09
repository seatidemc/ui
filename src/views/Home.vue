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
								$router.push('/' + x.to)
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
						<v-btn @click="logout()" color="black" block dark
							>退出登录&emsp;<v-icon
								>mdi-exit-to-app</v-icon
							></v-btn
						>
					</div>
				</template>
			</v-navigation-drawer>
			<v-app-bar elevate color="black" dark app>
				<v-btn icon @click="drawer = !drawer">
					<v-icon>mdi-menu</v-icon>
				</v-btn>
				<v-toolbar-title class="tidelab-typo">TiDELab</v-toolbar-title>
				<v-spacer />
				<v-btn icon>
					<v-icon>mdi-help-circle-outline</v-icon>
				</v-btn>
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
// import Server from "@/functional/Server.vue";

export default Vue.extend({
	data() {
		return {
			username: "",
			drawer: null as null | boolean,
			listItem: 0,
			dict: ['overview', 'users']
		};
	},
	mounted() {
		this.username = getTokenUsername();
		this.listItem = this.dict.indexOf(this.current);
	},
	components: {
		Overview,
		Users,
		// Server
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
						icon: "mdi-server",
						to: "users",
					},
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
		}
	}
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

	@media (max-width: 800px) {
		box-shadow: none !important;
		padding: 0;
	}
}
</style>