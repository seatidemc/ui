<template>
	<div overview>
		<div class="top-bar">
			<v-tooltip bottom>
				<template #activator="{ on, attrs }">
					<v-btn
						:class="autoUpdate ? 'active' : ''"
						color="blue"
						outlined
						class="auto-update-btn"
						@click="autoUpdate = !autoUpdate"
						v-on="on"
						v-bind="attrs"
						:icon="isSM()"
						>{{
							!isSM()
								? "实时更新 · " + (autoUpdate ? "ON" : "OFF")
								: ""
						}}
						<v-icon v-if="isSM()">mdi-update</v-icon></v-btn
					>
				</template>
				实时更新状态信息
			</v-tooltip>
		</div>
		<v-row class="content">
			<v-col cols="12">
				<div class="status-card">
					<h2>当前服务器 IP</h2>
					<h1 class="primary-text ip">
						{{ server.ip || "--" }}
						<smart-button
							v-if="
								!isSM() && /\d+\.\d+\.\d+\.\d+/.test(server.ip)
							"
							:onclick="[copyIP, server.ip]"
							class="copy-button"
							iconInactive="mdi-clipboard-multiple-outline"
							iconActive="mdi-check"
							textInactive="点击复制"
							textActive="复制成功"
							colorInactive=""
							colorActive="white"
							backgroundInactive=""
							backgroundActive="#4caf50"
							borderColorInactive=""
							borderColorActive="#4caf50"
						/>
					</h1>
					<hr />
					<meta-bar style="margin-top: 8px; margin-bottom: 16px">
						<meta-item icon="mdi-minecraft">
							<template #name>版本</template>
							<template #text>1.18.2</template>
						</meta-item>
						<meta-item icon="mdi-package">
							<template #name>周目</template
							><template #text>ST5</template>
						</meta-item>
						<meta-item icon="mdi-calendar"
							><template #name>开始时间</template>
							<template #text>2022.07.29 或更晚</template></meta-item
						>
					</meta-bar>
					<h3>状态</h3>
					<div class="running-status">
						<div class="status">
							<v-progress-circular
								v-if="mainLoading"
								width="3.5"
								:size="35"
								indeterminate
								style="margin-right: 16px"
							/>
							<v-icon
								v-if="!mainLoading"
								:color="mainIconColor"
								>{{ mainIcon }}</v-icon
							>
							{{ mainStatus }}
						</div>
						<meta-bar class="status-meta">
							<div class="status-item">
								<v-icon small>mdi-server</v-icon>
								<span class="name">实例</span>
								<span
									v-if="instance.status === 'ok'"
									class="text green--text"
									><v-icon color="green"
										>mdi-check</v-icon
									></span
								>
								<span
									v-if="instance.status === 'ng'"
									class="text red--text"
								>
									<v-icon color="red">mdi-close</v-icon>
									{{ server.statusText }}
								</span>
								<span
									v-if="
										instance.status !== 'ok' &&
										instance.status !== 'ng'
									"
								>
									<v-progress-circular
										:size="13"
										color="gray"
										width="1.5"
										indeterminate
										class="loading"
									/>
								</span>
							</div>
							<div class="status-item">
								<v-icon small>mdi-minecraft</v-icon>
								<span class="name">服务器</span>
								<span
									v-if="server.status === 'ok'"
									class="text green--text"
									><v-icon color="green"
										>mdi-check</v-icon
									></span
								>
								<span
									v-if="server.status === 'ng'"
									class="text red--text"
								>
									<v-icon color="red">mdi-close</v-icon>
									{{ server.statusText }}
								</span>
								<span
									v-if="
										server.status !== 'ok' &&
										server.status !== 'ng'
									"
								>
									<v-progress-circular
										:size="13"
										color="gray"
										width="1.5"
										indeterminate
										class="loading"
									/>
								</span>
							</div>
						</meta-bar>
					</div>
					<h3 v-if="server.onlinePlayers.length > 0">
						在线玩家 · {{ server.onlinePlayers.length }}/50
					</h3>
					<div
						class="player-details"
						v-if="server.onlinePlayers.length > 0"
					>
						<div
							@click="$open('https://namemc.com/profile/' + x.id)"
							class="player"
							v-for="(x, i) in server.onlinePlayers"
							:key="i"
						>
							<img
								:src="
									'https://crafatar.com/renders/head/' + x.id
								"
							/>
							<h1>{{ x.name }}</h1>
						</div>
					</div>
					<h3>MOTD 信息</h3>
					<div v-if="motdHtml" v-html="motdHtml" />
					<div v-else class="empty">开启服务器后显示</div>
					<h3>操作</h3>
					<div class="empty">7.29 或更晚开放</div>
					<div v-if="false" class="actions">
						<v-menu>
							<template v-slot:activator="{ on, attrs }">
								<v-btn
									v-on="on"
									v-bind="attrs"
									class="green"
									elevation="0"
									dark
									><v-icon left>mdi-plus</v-icon
									>创建实例</v-btn
								>
							</template>
							<v-list max-width="400px">
								<v-list-item>
									<v-list-item-icon
										><v-icon
											>mdi-help-circle-outline</v-icon
										></v-list-item-icon
									>
									<v-list-item-content>
										<v-list-item-title>
											是否立即创建实例？
										</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
								<v-list-item
									@click="createInstance()"
									color="green"
									link
								>
									<v-list-item-icon
										><v-icon color="green"
											>mdi-arrow-right</v-icon
										></v-list-item-icon
									>
									<v-list-item-content>
										<v-list-item-title
											>继续</v-list-item-title
										>
									</v-list-item-content>
								</v-list-item>
								<v-list-item link>
									<v-list-item-icon
										><v-icon
											>mdi-close</v-icon
										></v-list-item-icon
									>
									<v-list-item-content>
										<v-list-item-title
											>取消</v-list-item-title
										>
									</v-list-item-content>
								</v-list-item>
							</v-list>
						</v-menu>
						<v-menu>
							<template v-slot:activator="{ on, attrs }">
								<v-btn
									v-if="$isAdmin"
									v-on="on"
									v-bind="attrs"
									dark
									elevation="0"
									color="red"
									outlined
									><v-icon left>mdi-delete</v-icon>
									删除实例</v-btn
								>
							</template>
							<v-list max-width="400px">
								<v-list-item>
									<v-list-item-icon
										><v-icon color="red"
											>mdi-message-alert</v-icon
										></v-list-item-icon
									>
									<v-list-item-content>
										<v-list-item-title>
											删除实例可能导致<strong>数据丢失</strong>，<br />且不会自动备份。
										</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
								<v-list-item
									@click="deleteInstance()"
									color="red"
									link
								>
									<v-list-item-icon
										><v-icon color="red"
											>mdi-check</v-icon
										></v-list-item-icon
									>
									<v-list-item-content>
										<v-list-item-title
											>继续</v-list-item-title
										>
									</v-list-item-content>
								</v-list-item>
								<v-list-item link>
									<v-list-item-icon
										><v-icon
											>mdi-close</v-icon
										></v-list-item-icon
									>
									<v-list-item-content>
										<v-list-item-title
											>取消</v-list-item-title
										>
									</v-list-item-content>
								</v-list-item>
							</v-list>
						</v-menu>
						<v-menu>
							<template v-slot:activator="{ on, attrs }">
								<v-btn
									v-if="$isAdmin"
									v-on="on"
									v-bind="attrs"
									color="red"
									outlined
									elevation="0"
									><v-icon left
										>mdi-close-octagon-outline</v-icon
									>
									停止实例</v-btn
								>
							</template>
							<v-list max-width="400px">
								<v-list-item>
									<v-list-item-icon
										><v-icon color="red"
											>mdi-message-alert</v-icon
										></v-list-item-icon
									>
									<v-list-item-content>
										<v-list-item-title>
											停止实例可能造成<strong>存档损坏</strong>，<br />且不会自动备份。
										</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
								<v-list-item
									@click="stopInstance()"
									color="red"
									link
								>
									<v-list-item-icon
										><v-icon color="red"
											>mdi-check</v-icon
										></v-list-item-icon
									>
									<v-list-item-content>
										<v-list-item-title
											>继续</v-list-item-title
										>
									</v-list-item-content>
								</v-list-item>
								<v-list-item link>
									<v-list-item-icon
										><v-icon
											>mdi-close</v-icon
										></v-list-item-icon
									>
									<v-list-item-content>
										<v-list-item-title
											>取消</v-list-item-title
										>
									</v-list-item-content>
								</v-list-item>
							</v-list>
						</v-menu>
						<v-btn
							v-if="$isAdmin"
							@click="startInstance()"
							color="blue"
							outlined
							dark
							><v-icon left>mdi-launch</v-icon> 启动实例
						</v-btn>
					</div>
				</div>
			</v-col>
		</v-row>
		<v-dialog max-width="700px" v-model="deployDialog">
			<v-card>
				<v-card-title>部署情况</v-card-title>
				<v-card-text>
					<p>
						你已经成功请求了实例的创建，你可以在这里查看其运行情况。整个过程大约需要
						5
						分钟左右，<strong>不建议</strong>中途刷新或者离开网页。<strong
							>如果运行失败，请截图联系管理员。</strong
						><br />{{
							deployResult
								? ""
								: "运行信息大约需要 15 秒左右的时间加载。若长时间未出现，请联系管理员。"
						}}
					</p>
					<div
						class="deploy-result"
						v-html="deployResult || '运行信息加载中...'"
					></div>
				</v-card-text>
				<v-card-actions>
					<v-spacer />
					<v-btn class="primary" @click="deployDialog = false"
						>关闭</v-btn
					>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-snackbar v-model="snackbar.open">{{ snackbar.text }}</v-snackbar>
	</div>
</template>

<script lang="ts">
import { get, getToken, post, translate, isSM } from "@/fn";
import { bus } from "@/bus";
import Vue from "vue";
// @ts-ignore
import Motd from "mcmotdparser";
import MetaBar from "@/components/MetaBar.vue";
import MetaItem from "@/components/MetaItem.vue";
import SmartButton from "@/components/SmartButton.vue";

export default Vue.extend({
	data() {
		return {
			instance: {
				id: "",
				status: "" as "ok" | "ng" | "" | "stopped",
				statusText: "",
				info: {} as InstanceInfo,
				infoRender: [] as Array<{
					name: string;
					value: string;
					icon: string;
				}>,
			},
			server: {
				status: "" as "ok" | "ng" | "" | "stopped",
				statusText: "",
				ip: "",
				onlinePlayers: [] as Array<{
					id: string;
					name: string;
				}>,
			},
			apiStatus: "",
			snackbar: {
				open: false,
				text: "",
			},
			deployStatus: "" as "ok" | "loading" | "ng" | "",
			deployResult: "",
			autoUpdate: false,
			deployDialog: false,
			motdHtml: "",
			mainStatus: "获取中..." as
				| "一切正常"
				| "空转"
				| "无人游玩"
				| "尚未开启"
				| "创建中..."
				| "部署请求超时",
			mainLoading: false,
			mainIcon: "mdi-help-circle-outline" as
				| "mdi-check-all"
				| "mdi-close"
				| "mdi-alert-outline"
				| "mdi-hexagon-outline",
			mainIconColor: "gray" as "green" | "amber" | "red" | "gray",
		};
	},
	components: {
		MetaBar,
		MetaItem,
		SmartButton,
	},
	computed: {
		statusAll(): Dictionary {
			return {
				deploy: this.deployStatus,
				server: this.server.status,
				instance: this.instance.status,
				players: this.server.onlinePlayers.length,
			};
		},
	},
	watch: {
		statusAll: {
			deep: true,
			handler(v) {
				console.log(v);
				if (v.deploy === "ok" || v.deploy === "") {
					this.mainLoading = false;
					if (v.server === "ng" && v.instance === "ng") {
						this.mainStatus = "尚未开启";
						this.mainIcon = "mdi-hexagon-outline";
						this.mainIconColor = "gray";
					} else {
						if (v.server === "ok" && v.instance === "ok") {
							if (v.players === 0) {
								this.mainStatus = "无人游玩";
								this.mainIcon = "mdi-hexagon-outline";
								this.mainIconColor = "amber";
							} else {
								this.mainStatus = "一切正常";
								this.mainIcon = "mdi-check-all";
								this.mainIconColor = "green";
							}
						}
						if (
							(v.server === "ng" || v.server === "stopped") &&
							v.instance === "ok"
						) {
							this.mainStatus = "空转";
							this.mainIcon = "mdi-alert-outline";
							this.mainIconColor = "amber";
						}
					}
				} else if (v.deploy === "loading") {
					this.mainStatus = "创建中...";
					this.mainLoading = true;
				} else if (v.deploy === "ng") {
					this.mainStatus = "部署请求超时";
					this.mainLoading = false;
					this.mainIcon = "mdi-alert-outline";
					this.mainIconColor = "red";
				}
			},
		},
		autoUpdate(v) {
			this.$cookies.set("tl-overview-auto-update", v, -1);
		},
		deployStatus(v) {
			bus.$emit("deploy-status-change", v);
		},
	},
	methods: {
		createInstance() {
			this.snackbar.text = "正在请求中，请稍等...";
			this.snackbar.open = true;
			post("/api/ecs/v1/action", {
				type: "new",
				token: getToken(),
			}).then((r) => {
				if (r.data.status !== "ok") {
					this.snackbar.text = translate(r.data.msg as string);
					this.snackbar.open = true;
					return;
				} else {
					this.snackbar.text = "请求成功，现在开始部署。";
					this.snackbar.open = true;
					this.deployStatus = "loading";
					this.getDeployResult();
					this.deployDialog = true;
				}
			});
		},
		async getDeployResult() {
			let deployData: {
				status: "Pending" | "Success" | "Running";
				output: string;
				error: string;
			};
			let data: {
				data: typeof deployData;
				status: "ok" | "ng" | "error";
				msg?: string;
			};
			let tobreak = false;
			let notFoundTime = 0;
			while (true) {
				if (notFoundTime > 5) {
					this.deployStatus = "ng";
					this.deployResult =
						"请求超时，但请求可能仍然在处理。请前往 https://seatide.leviatan.cn/api/ecs/v1/describe/last-invoke 查看执行结果。";
					break;
				}
				await this.sleep(3);
				get("/api/ecs/v1/describe/last-invoke").then((r) => {
					data = r.data as any;
					try {
						if (data.msg === "No invocation history found.") {
							notFoundTime++;
							return;
						}
						if (data.data.status === "Pending") {
							return;
						}
						if (data.data.status !== "Running") {
							notFoundTime = 0;
							this.deployStatus =
								data.data.status === "Success" ? "ok" : "ng";
							if (this.deployStatus === "ok") {
								this.deployResult +=
									"<br/>实例部署成功，Minecraft 服务器启动中。";
								this.snackbar.text =
									"实例部署成功，开始启动服务器。";
								this.snackbar.open = true;
								setTimeout(() => {
									this.refresh();
								}, 3000);
							} else {
								this.deployResult +=
									"<br/>部署失败，但实例已经存在，请手动排查或者立即删除以免不必要的损失。" +
									data.data.error;
								this.snackbar.text =
									"实例部署失败，请查看执行信息。";
								this.snackbar.open = false;
							}
							tobreak = true;
						} else {
							this.deployResult = data.data.output
								.split("\n")
								.join("<br/>");
						}
					} catch (e) {
						console.warn("Exception in while loop: " + e);
					}
				});
				if (tobreak) {
					break;
				}
			}
		},
		async sleep(time: number) {
			return new Promise((re) => setTimeout(re, time * 1000));
		},
		isSM,
		deleteInstance() {
			post("/api/ecs/v1/action", {
				type: "delete",
				token: getToken(),
			}).then((r) => {
				if (r.data.status !== "ok") {
					this.snackbar.text = translate(r.data.msg as string);
					this.snackbar.open = true;
					return;
				} else {
					this.snackbar.text = "成功删除实例。";
					this.motdHtml = "";
					this.instance.status = "";
					this.server.status = "";
					this.deployStatus = "";
					this.snackbar.open = true;
					this.refresh();
				}
			});
		},
		stopInstance() {
			post("/api/ecs/v1/action", {
				type: "stop",
				token: getToken(),
			}).then((r) => {
				if (r.data.status !== "ok") {
					this.snackbar.text = translate(r.data.msg as string);
					this.snackbar.open = true;
					return;
				} else {
					this.snackbar.text = "成功停止实例。";
					this.motdHtml = "";
					this.instance.status = "stopped";
					this.instance.statusText = "已停止";
					this.deployStatus = "";
					this.snackbar.open = true;
					this.refresh();
				}
			});
		},
		startInstance() {
			post("/api/ecs/v1/action", {
				type: "start",
				token: getToken(),
			}).then((r) => {
				if (r.data.status !== "ok") {
					if (r.data.msg?.includes("is Running but")) {
						this.snackbar.text = "服务器正在运行中，无需启动。";
						this.snackbar.open = true;
						return;
					}
					this.snackbar.text = translate(r.data.msg as string);
					this.snackbar.open = true;
					return;
				} else {
					this.instance.status = "ok";
					this.instance.statusText = "正常";
					this.snackbar.text = "成功开启实例。";
					this.snackbar.open = true;
					this.refresh();
				}
			});
		},
		refresh() {
			get("/api/ecs/v1/describe/status").then((r) => {
				if (r.data.status !== "ok") {
					this.instance.status = "ng";
					this.instance.statusText = translate(
						r.data.msg as string,
						true
					);
				} else {
					if ((r.data.data as any).status === "Running") {
						this.instance.status = "ok";
						this.instance.statusText = "正常";
					} else {
						this.instance.status = "stopped";
						this.instance.statusText = "已停止";
					}
					this.instance.id = (r.data.data as any).id;
				}
			});
			get("/api/server/v1/get/server").then((r) => {
				if (r.data.status !== "ok") {
					this.server.status = "ng";
					this.server.statusText = translate(
						r.data.msg as string,
						true
					);
				} else {
					let d: ServerInformationFull = r.data.data as any;
					if (d.created === false) {
						this.server.status = "ng";
						this.server.statusText = "不存在";
						return;
					}
					if (d.online === false) {
						this.server.status = "stopped";
						this.server.statusText = "未开启";
						return;
					} else {
						this.server.status = "ok";
						this.server.statusText = "正常";
					}
					this.server.ip = d.ip;
					if (d.onlinePlayersDetails !== null) {
						this.server.onlinePlayers = d.onlinePlayersDetails.sort(
							(a, b) => {
								return a.name < b.name
									? -1
									: a.name > b.name
									? 1
									: 0;
							}
						);
					}
				}
			});
			get("/api").then((r) => {
				if (r.data.status) {
					if (r.data.status === "http-error") {
						this.apiStatus = "正常";
						return;
					}
				}
				this.apiStatus = "异常";
			});
			this.getMotd();
		},
		async autoRefresh() {
			while (true) {
				if (this.autoUpdate) {
					this.refresh();
				}
				await this.sleep(5);
			}
		},
		getMotd() {
			get("/api/server/v1/get/server").then((r) => {
				if (r.data.data !== null) {
					//@ts-ignore
					Motd.toHtml(r.data.data.motd, (err, res) => {
						this.motdHtml = res;
					});
				}
			});
		},
		copyIP(ip: string) {
			navigator.clipboard
				.writeText(ip)
				.then((r) => {})
				.catch((r) => {
					console.warn("copy: something wrong happend: ", r);
				});
		},
	},
	mounted() {
		this.refresh();
		this.autoRefresh();
		this.autoUpdate =
			this.$cookies.get("tl-overview-auto-update") === "true";
		bus.$on("open-deploy-dialog", () => {
			this.deployDialog = true;
		});
	},
});
</script>

<style lang="less" scoped>
.top-bar {
	position: absolute;
	right: 32px;
	top: 32px;
	align-items: center;
	grid-auto-flow: column;
	grid-column-gap: 16px;
	@media (max-width: 800px) {
		right: 4px;
		top: 4px;
	}
}

.auto-update-btn {
	transition: all 0.2s ease;

	&.active {
		background: #2196f3 !important;
		color: white !important;
		border-color: #2196f3 !important;
	}
}

.display-1 {
	color: white;
	font-weight: bold;
	display: inline-flex;
	align-items: center;
	margin: 28px 0;

	.mdi {
		width: 40px;
		margin-right: 0.5em;
		transform: scale(1.6);
		display: inline-flex;
		align-items: center;
	}
}

.row {
	align-items: stretch;
	.v-card {
		height: 100%;
	}
	.v-card__actions {
		margin-right: 16px;
		margin-bottom: 16px;
	}
}

.expansions {
	margin-top: 16px;
}

.deploy-result {
	background: black;
	border-radius: 5px;
	padding: 16px;
	color: white;
	line-height: 1.2;
	font-family: ui-monospace, "Consolas", "Menlo", monospace;
	font-size: 14px;
	overflow-y: scroll;
	max-height: 400px;
	overflow-x: hidden;
}

.row {
	margin-bottom: 0;
}

.copy-button {
	cursor: pointer;
	padding: 4px 6px;
	border: 0;
	border: 1px solid @primary;
	background: @primary;
	color: white;
	transition: all 0.2s ease;
	vertical-align: middle;
	margin-left: 16px;
	outline: none;
	font-size: 16px;
	font-weight: normal;
	&:hover {
		background: white;
		color: @primary;
		border-color: @primary;
		transform: scale(1.1);
	}
}

.content {
	@media (max-width: 1000px) {
		h2 {
			font-size: 16px;
		}

		.status-card {
			padding: 0 !important;
			.ip {
				font-size: 40px !important;
			}
		}

		.running-status {
			padding: 16px !important;

			.status-item {
				.name {
					display: none;
				}

				&:not(&:last-child):after {
					content: "/";
				}
			}
		}

		.actions {
			flex-direction: column;

			.v-btn {
				margin: 8px 0 !important;
				width: 100%;
			}
		}
	}
	h2 {
		color: rgba(0, 0, 0, 0.2);
		font-weight: normal;
	}
	.status-card {
		padding: 16px;
		.ip {
			margin: 8px 0;
			padding: 0;
			font-size: 56px;
			line-height: 1;
		}

		.running-status {
			padding: 20px 24px;
			padding-top: 16px;
			border-radius: 5px;
			border: 1px solid rgba(0, 0, 0, 0.2);
			.status {
				display: flex;
				align-items: center;
				font-size: 32px;
				margin-bottom: 8px;
				.mdi {
					margin-right: 16px;
					font-size: 48px;
				}
			}

			.status-meta {
				margin-top: 8px;
			}

			.status-item {
				line-height: 1.5;
				display: flex;
				align-items: center;

				.mdi {
					font-size: 18px;
					margin-right: 4px;
				}

				.text {
					margin-left: 8px;
					.v-icon {
						margin-right: -2px;
					}
					@media (max-width: 900px) {
						.v-icon {
							transform: translateY(-1px);
						}
					}
				}

				&::after {
					content: "|";
					font-size: 12px;
					margin-left: 10px;
					margin-right: 12px;
					color: rgba(0, 0, 0, 0.2);
				}
				&:last-child::after {
					content: none;
				}
			}
		}

		.actions {
			display: flex;
			align-items: center;

			> .v-btn {
				margin: 0 8px;
				&:first-child {
					margin-left: 0;
				}

				&:last-child {
					margin-right: 0;
				}
			}
		}

		.player-details {
			display: flex;
			align-items: stretch;
			flex-wrap: wrap;
			margin-left: -8px;
			margin-right: -8px;
			.player {
				@media (max-width: 900px) {
					padding: 5px;
					margin: 5px;
					img {
						width: 20px;
					}
					h1 {
						font-size: 14px;
					}
				}
				@media (min-width: 900px) {
					padding: 8px;
					margin: 0 8px;
					h1 {
						font-size: 16px;
					}
					img {
						width: 24px;
					}
				}
				background: white;
				border-radius: 5px;
				border: 1px solid rgba(0, 0, 0, 0.21);
				display: inline-flex;
				align-items: center;

				h1 {
					font-weight: normal;
					margin: 0;
					margin-left: 0.5em;
					padding: 0;
				}
				background: white;
				color: #272727;
				cursor: pointer;
				transition: all 0.2s ease;
				&:hover {
					background: @primary;
					color: white;
					border-color: white;
				}
			}
		}
	}
}

.loading {
	margin-left: 8px;
}
</style>