<template>
	<div auth page>
		<div class="container">
			<div class="center-container">
				<h1 class="auth-hero primary-text">{{ lor }} TiDELab</h1>
				<h2 class="auth-text">
					{{
						lor === "登入"
							? "登入以管理 SEATiDE"
							: "立即加入 TiDELab"
					}}
				</h2>
				<v-tabs class="tab" grow color="#fcd307" v-model="tab">
					<v-tab>登入</v-tab>
					<v-tab>注册</v-tab>
					<v-tab-item>
						<v-form v-model="loginValid" class="inputs">
							<v-text-field
								prepend-icon="mdi-account-circle"
								label="用户名"
								:rules="[rules.required]"
								v-model="info.username"
								hint="注册时填写的 MC 游戏名"
								type="text"
								counter="18"
								max-length="18"
							></v-text-field>
							<v-text-field
								prepend-icon="mdi-key"
								label="密码"
								:rules="[rules.required]"
								v-model="info.password"
								hint="包含数字和字母"
								type="password"
								counter
								@keydown.enter.native="submit()"
							></v-text-field>
						</v-form>
					</v-tab-item>
					<v-tab-item>
						<v-form v-model="registerValid" class="inputs">
							<v-text-field
								prepend-icon="mdi-account-circle"
								label="用户名"
								:rules="[rules.required, rules.username]"
								v-model="info.username"
								hint="建议填写 Minecraft 游戏名"
								type="text"
								counter="18"
								max-length="18"
							></v-text-field>
							<v-text-field
								prepend-icon="mdi-email"
								label="电子邮箱"
								:rules="[rules.required, rules.email]"
								v-model="info.email"
								hint="请填写有效的电子邮箱"
								type="text"
							></v-text-field>
							<v-text-field
								prepend-icon="mdi-key"
								label="密码"
								:rules="[rules.required, rules.password]"
								v-model="info.password"
								hint="包含数字和字母"
								type="password"
								counter
							></v-text-field>
							<v-text-field
								prepend-icon="mdi-key-outline"
								label="确认密码"
								:rules="[rules.required, passwordVerify]"
								v-model="info.passwordVerify"
								hint="重新填写一遍密码"
								type="password"
								counter
							></v-text-field>
						</v-form>
					</v-tab-item>
				</v-tabs>
				<v-btn
					@click="submit()"
					class="btn-primary"
					:disabled="!isValid() || loading"
					><v-progress-circular
						v-if="loading"
						color="white"
						size="15"
						width="2"
						indeterminate
					/><span v-if="!loading"
						>继续<v-icon>mdi-arrow-right</v-icon></span
					></v-btn
				>
				<v-snackbar v-model="snackbar">{{ snackbarText }}</v-snackbar>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import {
	checkLogin,
	getToken,
	getTokenUsername,
	post,
	setToken,
	translate,
} from "@/sn";

export default Vue.extend({
	data() {
		return {
			lor: "登入" as "登入" | "注册",
			tab: 0,
			info: {
				username: "",
				password: "",
				email: "",
				passwordVerify: "",
			},
			rules: {
				required: (v: string) => !!v || "必须填写该项目。",
				username: (v: string) =>
					/^(?=.{3,18}$)[a-zA-Z0-9._]+$/.test(v) ||
					"用户名不符合 MOJANG 规范。",
				password: (v: string) =>
					/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\$_\-]{8,}/.test(v) ||
					"密码至少为 8 位，且包含数字和字母。",
				email: (v: string) =>
					/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
						v
					) || "无效的电子邮箱格式。",
			},
			loginValid: false,
			registerValid: false,
			loading: false,
			snackbar: false,
			snackbarText: "",
		};
	},
	methods: {
		passwordVerify(v: string) {
			return v === this.info.password || "前后密码不匹配。";
		},
		getReverseLor() {
			return this.lor === "登入" ? "注册" : "登入";
		},
		isValid() {
			if (this.lor === "登入") return this.loginValid;
			if (this.lor === "注册") return this.registerValid;
		},
		submit() {
			this.loading = true;
			this.snackbarText = "请稍候...";
			this.snackbar = true;
			if (this.lor === "登入") {
				post("/api/user/v1/auth", {
					username: this.info.username,
					password: this.info.password,
					type: "auth",
				})
					.then((r) => {
						if (r.data.status !== "ok") {
							this.snackbarText = translate(r.data.msg as string);
							this.snackbar = true;
							return;
						} else {
							setToken(r.data.data as string, this.info.username);
							this.$router.push({ name: "home" });
						}
					})
					.finally(() => {
						this.loading = false;
					});
			} else {
				post("/api/user/v1/action", {
					username: this.info.username,
					password: this.info.password,
					email: this.info.email,
					type: "create",
				})
					.then((r) => {
						if (r.data.status !== "ok") {
							this.snackbarText = translate(r.data.msg as string);
							this.snackbar = true;
							return;
						} else {
							this.snackbarText =
								"成功创建用户 " + this.info.username + "。";
							this.snackbar = true;
							this.tab = 0;
							return;
						}
					})
					.finally(() => {
						this.loading = false;
					});
			}
		},
	},
	watch: {
		tab(v) {
			this.lor = ["登入", "注册"][v] as "登入" | "注册";
		},
	},
	beforeRouteEnter(to, from, next) {
		checkLogin(getTokenUsername(), getToken())
			.then(() => {
				next("/");
			})
			.catch(() => {
				next();
			});
	},
});
</script>
<style lang="less" scoped>
.center-container {
	.auth-hero {
		font-size: 54px;
		margin: 0;
		padding: 0;
		@media screen and (max-width: 800px) {
			font-size: 40px;
		}
	}

	.auth-text {
		padding-top: 0;
		font-weight: normal;
		color: rgba(0, 0, 0, 0.21);
		@media screen and (max-width: 800px) {
			font-size: 20px;
		}
	}
}

.tab {
	width: 350px;
	display: block;
	margin: auto;
	@media screen and (max-width: 800px) {
		width: 300px;
	}
}

.btn-primary {
	transition: all 0.2s ease;
	transform: scale(1.1);
	margin: 32px auto 0 auto;
	.v-icon {
		transform: scale(0.7);
	}
}

.inputs {
	margin-top: 32px;
}

.container {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>