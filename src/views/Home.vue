<template>
	<div class="home">
		<v-app>
			<v-navigation-drawer v-model="drawer" app>
				<v-list-item>
					<v-list-item-content>
						<v-list-item-title class="username">{{
							username
						}}</v-list-item-title>
						<v-list-item-subtitle class="position"
							>管理员</v-list-item-subtitle
						>
					</v-list-item-content>
				</v-list-item>
				<v-divider />
				<v-list>
					<v-list-item link v-for="(x, i) in drawerItems" :key="i">
						<v-list-item-icon
							><v-icon>{{ x.icon }}</v-icon></v-list-item-icon
						>
						<v-list-item-content>
							<v-list-item-title>{{ x.title }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
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
			<v-app-bar absolute elevate color="black" dark app>
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
						<overview />
					</v-card>
				</v-container>
			</v-main>
		</v-app>
	</div>
</template>

<script lang="ts">
import { delToken, getTokenUsername } from "@/sn";
import Vue from "vue";
import Overview from "@/functional/Overview.vue";

export default Vue.extend({
	data() {
		return {
			username: "",
			drawer: null,
			drawerItems: [
				{
					title: "概览",
					icon: "mdi-view-dashboard",
				},
				{
					title: "服务器",
					icon: "mdi-server",
				},
			],
			current: "overview",
		};
	},
	mounted() {
		this.username = getTokenUsername();
	},
	components: {
		Overview,
	},
	methods: {
		logout() {
			delToken();
			this.$router.push({ name: "auth" });
		},
	},
});
</script>

<style lang="less" scoped>
.username {
	font-weight: bold;
	font-size: 24px;
	.primary-text;
}

.main-card {
	padding: 16px 32px;
}
</style>