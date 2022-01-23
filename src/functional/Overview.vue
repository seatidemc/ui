<template>
	<div overview>
		<h1 title>概览</h1>
		<div class="top-bar">
			<v-tooltip bottom>
				<template #activator="{ on, attrs }">
					<v-btn
						:class="autoUpdate ? 'active' : ''"
						color="blue"
						outlined
						class="auto-update-btn elevation-2"
						@click="autoUpdate = !autoUpdate"
						v-on="on"
						v-bind="attrs"
						:icon="isSM()"
						>{{ !isSM() ? ("实时更新 · " + (autoUpdate ? "ON" : "OFF")) : "" }} <v-icon v-if="isSM()">mdi-update</v-icon></v-btn
					>
				</template>
				实时更新状态信息
			</v-tooltip>
			<v-menu>
				<template v-slot:activator="{ on, attrs }">
					<v-btn
						:icon="isSM()"
						elevation="2"
						v-on="on"
						v-bind="attrs"
						class="green"
						dark
						><v-icon :left="!isSM()">mdi-plus</v-icon
						>{{ isSM() ? "" : "创建实例" }}</v-btn
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
						style="color: #4caf50"
						link
					>
						<v-list-item-icon
							><v-icon style="color: #4caf50"
								>mdi-arrow-right</v-icon
							></v-list-item-icon
						>
						<v-list-item-content>
							<v-list-item-title>继续</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
					<v-list-item link>
						<v-list-item-icon
							><v-icon>mdi-close</v-icon></v-list-item-icon
						>
						<v-list-item-content>
							<v-list-item-title>取消</v-list-item-title>
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
										icon
										class="elevation-1 red"
										><v-icon>mdi-delete</v-icon></v-btn
									>
								</template>
								<v-list max-width="400px">
									<v-list-item>
										<v-list-item-icon
											><v-icon style="color: #f44336"
												>mdi-message-alert</v-icon
											></v-list-item-icon
										>
										<v-list-item-content>
											<v-list-item-title>
												警告：强制删除实例<strong
													>不<br />会进行备份</strong
												>。<br />请确保服务器保有每<br />
												10 分钟一次的计划备<br />份，以防后患。
											</v-list-item-title>
										</v-list-item-content>
									</v-list-item>
									<v-list-item
										@click="deleteInstance()"
										style="color: #f44336"
										link
									>
										<v-list-item-icon
											><v-icon style="color: #f44336"
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
										icon
										class="red elevation-1"
										dark
										><v-icon
											>mdi-close-octagon-outline</v-icon
										></v-btn
									>
								</template>
								<v-list max-width="400px">
									<v-list-item>
										<v-list-item-icon
											><v-icon style="color: #f44336"
												>mdi-message-alert</v-icon
											></v-list-item-icon
										>
										<v-list-item-content>
											<v-list-item-title>
												警告：停止实例并<strong
													>不<br />会正常关闭服务器</strong
												>。<br />极有可能造成存档损<br />坏。请确保服务器保<br />有每
												10 分钟一次的计<br />划备份，以防后患。
											</v-list-item-title>
										</v-list-item-content>
									</v-list-item>
									<v-list-item
										@click="stopInstance()"
										style="color: #f44336"
										link
									>
										<v-list-item-icon
											><v-icon style="color: #f44336"
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
								class="elevation-1 blue"
								icon
								dark
								><v-icon>mdi-launch</v-icon>
							</v-btn>
		</div>
		<v-row>
			<v-col cols="4">
				<v-card :class="getColorByStatus(instance.status)" dark>
					<v-card-title>实例运行状态</v-card-title>
					<v-card-subtitle>实例是指运行服务器的主机</v-card-subtitle>
					<v-card-text>
						<v-progress-circular
							v-if="instance.status === ''"
							size="20"
							width="2"
							indeterminate
						/>
						<p class="display-1">
							<v-icon>{{
								getIconByStatus(instance.status)
							}}</v-icon>
							{{ instance.status }}
						</p>
						<p v-if="instance.status === '实例不存在'">
							当前实例不存在，请重新创建。
						</p>
						<p v-if="instance.status === '已停止'">
							当前实例已停止。也可能是正在进行部署，请稍等。
						</p>
						<p v-if="instance.status === '正常'">
							当前实例运行情况正常。<br />实例 ID: {{ instance.id
							}}<br />IP: {{ server.ip || "暂无" }}
						</p>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="4">
				<v-card :class="getColorByStatus(server.status)" dark>
					<v-card-title>服务器运行状态</v-card-title>
					<v-card-subtitle>Minecraft 服务器运行状态</v-card-subtitle>
					<v-card-text>
						<v-progress-circular
							v-if="server.status === ''"
							size="20"
							width="2"
							indeterminate
						/>
						<p class="display-1">
							<v-icon>{{
								getIconByStatus(server.status)
							}}</v-icon>
							{{ server.status }}
						</p>
						<p v-if="server.status === '不存在'">
							在数据库中找不到服务器的 IP。
						</p>
						<p v-if="server.status === '正常'">
							当前 Minecraft 服务器运行情况正常。<br />IP:
							{{ server.ip }}:25565
						</p>
						<p v-if="server.status === '未开启'">
							服务器未开启或者正在启动中。<br />如果你刚刚创建了一个新的实例，此过程可能需要三到五分钟。
						</p>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="4">
				<v-card :class="getColorByStatus(apiStatus)" dark>
					<v-card-title>API 运行状态</v-card-title>
					<v-card-subtitle
						>API 是操作和控制服务器的基础</v-card-subtitle
					>
					<v-card-text>
						<v-progress-circular
							v-if="apiStatus === ''"
							size="20"
							width="2"
							indeterminate
						/>
						<p class="display-1">
							<v-icon>{{ getIconByStatus(apiStatus) }}</v-icon>
							{{ apiStatus }}
						</p>
						<p v-if="apiStatus === '异常'">
							异常情况下，一切控制均无法正常操作，请及时联系技术人员解决。
						</p>
						<p v-if="apiStatus === '正常'">
							当前 API 状态正常，可以正确地执行和处理操作。<br />API
							地址：<a
								style="color: inherit"
								href="https://seatide.leviatan.cn"
								target="_blank"
								>https://seatide.leviatan.cn</a
							><br />API 版本：v1<br />API 领域：ecs@v1,
							server@v1, user@v1
						</p>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
		<v-alert
			text
			type="success"
			v-if="instance.status === '正常' && server.status === '正常'"
		>
			太棒了！当前实例和服务器均运行正常。<br />你可以在 Minecraft 中输入
			IP 地址 <strong>{{ server.ip }}:25565</strong> 加入游戏。
		</v-alert>
		<v-alert text type="warning" v-if="instance.status === '实例不存在'">
			当前实例不存在，因为服务器超过 1
			个小时无人在线，或者账号内资金不足。你可以点击<strong>「实例操作」->「创建实例」</strong>尝试重新开启服务器。
		</v-alert>
		<v-alert
			text
			type="error"
			v-if="
				instance.status === '正常' && server.status === '服务器不存在'
			"
		>
			当前实例运行正常，但服务器 IP 未知，属于异常情况，请截图联系管理员。
		</v-alert>
		<v-alert
			text
			type="error"
			v-if="instance.status === '正常' && server.status === '未开启'"
		>
			当前实例运行正常，但服务器处于未开启状态，可能是
			<ul>
				<li>服务器正在启动中。此时等待三到五分钟即可。</li>
				<li>服务器已崩溃。<strong>此时请务必联系管理员。</strong></li>
			</ul>
		</v-alert>
		<h1>服务器 MOTD{{ server.onlinePlayers.length !== 0 ? '（' + server.onlinePlayers.length + '/50 在线）': ''}}</h1>
		<div v-if="motdHtml" v-html="motdHtml" />
		<div v-else class="empty">
			服务器尚未开启
		</div>
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
import Vue from "vue";
// @ts-ignore
import Motd from "mcmotdparser";

export default Vue.extend({
	data() {
		return {
			instance: {
				id: "",
				status: "",
				info: {} as InstanceInfo,
				infoRender: [] as Array<{
					name: string;
					value: string;
					icon: string;
				}>,
			},
			server: {
				status: "",
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
		};
	},
	methods: {
		getColorByStatus(status: string) {
			return status === "正常"
				? "color-normal"
				: ["服务器不存在", "未开启"].includes(status)
				? "color-error"
				: "color-warning";
		},
		getIconByStatus(status: string) {
			let dict = {
				实例不存在: "mdi-help-circle-outline",
				不存在: "mdi-help-circle-outline",
				正常: "mdi-check",
				服务器不存在: "mdi-alert-circle-outline",
				未开启: "mdi-power-plug-off-outline",
				异常: "mdi-close",
			} as Dictionary;
			return dict[status];
		},
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
					this.snackbar.text = "请求成功，可查看部署情况。";
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
								this.snackbar.text = "实例部署成功。";
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
					this.motdHtml = ""
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
					this.snackbar.text = "成功开启实例。";
					this.snackbar.open = true;
					this.refresh();
				}
			});
		},
		refresh() {
			get("/api/ecs/v1/describe/status").then((r) => {
				if (r.data.status !== "ok") {
					this.instance.status = translate(
						r.data.msg as string,
						true
					);
				} else {
					this.instance.status =
						(r.data.data as any).status === "Running"
							? "正常"
							: "已停止";
					this.instance.id = (r.data.data as any).id;
				}
			});
			get("/api/server/v1/get/server").then((r) => {
				if (r.data.status !== "ok") {
					this.server.status = translate(r.data.msg as string, true);
				} else {
					let d: ServerInformationFull = r.data.data as any;
					if (d.created === false) {
						this.server.status = "不存在";
						return;
					}
					if (d.online === false) {
						this.server.status = "未开启";
						return;
					} else {
						this.server.status = "正常";
					}
					this.server.ip = d.ip;
					if (d.onlinePlayersDetails !== null) {
						this.server.onlinePlayers = d.onlinePlayersDetails;
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
	},
	mounted() {
		this.refresh();
		this.autoRefresh();
		this.autoUpdate =
			this.$cookies.get("tl-overview-auto-update") === "true";
	},
	watch: {
		autoUpdate(v) {
			this.$cookies.set("tl-overview-auto-update", v, -1);
		},
	},
});
</script>

<style lang="less" scoped>
.top-bar {
	position: absolute;
	right: 32px;
	top: 38px;
	display: grid;
	align-items: center;
	grid-auto-flow: column;
	grid-column-gap: 16px;
	@media (max-width: 800px) {
		right: 0;
		top: 22px;
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

.color-normal {
	background: linear-gradient(#4caf50, #00964b);
}

.color-warning {
	background: linear-gradient(#fca607, #fc8a07);
}

.color-error {
	background: linear-gradient(#f4363f, #c02b10);
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

.actions {
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	@media (max-width: 800px) {
		margin-top: 32px;
	}

	@media (min-width: 800px) {
		position: absolute;
		bottom: 16px;
	}
	> .v-btn {
		margin: 0 8px;
		&:first-child {
			margin-left: 0;
		}
		background: white;
		
	}
}

.col {
	@media (max-width: 1040px) {
		max-width: 100% !important;
		flex: 0 0 100% !important;
	}
}

.instance-action {
	display: flex;
	align-items: center;

	@media (max-width: 800px) {
		flex-direction: column;
		align-items: flex-start;
	}

	.v-btn {
		.v-icon {
			margin-right: 0.5em;
		}
		margin: 0 8px;
		@media (max-width: 800px) {
			margin: 8px 0;
		}
	}
}

.row {
	margin-bottom: 0;
}

.online-players {
	display: flex;
	align-items: center;
	flex-direction: row;
	padding: 5px;

	.player {
		display: inline-flex;
		align-items: center;
		border-radius: 5px;
		border: 1px solid black;
		padding: 6px 8px;
		margin: 5px;

		img {
			width: 24px;
			margin-right: 8px;
		}
	}
}
</style>