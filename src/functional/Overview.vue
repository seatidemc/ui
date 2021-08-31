<template>
	<div overview>
		<h1>概览</h1>
		<v-row>
			<v-col cols="4">
				<v-card :color="getColorByStatus(instance.status)" dark>
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
							{{ instance.status }}
						</p>
						<p v-if="instance.status === '实例不存在'">
							实例不存在大多数情况下是因为长时间无人在线，被自动释放；也有可能因为库存问题被强制释放，一般重新开启即可解决。
						</p>
						<p v-if="server.status === '正常'">
							当前实例运行情况正常。<br />实例 ID: {{ instance.id
							}}<br />IP: {{ server.ip || "-" }}
						</p>
					</v-card-text>
					<v-card-actions>
						<v-spacer />
						<v-btn
							v-if="instance.status === '实例不存在'"
							text
							outlined
							@click="dialogs.createInstance = true"
							>解决 &raquo;</v-btn
						>
					</v-card-actions>
				</v-card>
			</v-col>
			<v-col cols="4">
				<v-card :color="getColorByStatus(server.status)" dark>
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
							{{ server.status }}
						</p>
						<p v-if="server.status === '服务器不存在'">
							服务器不存在是因为数据库中不含有服务器的 IP
							信息。一般情况下，实例存在则服务器存在。
						</p>
						<p v-if="server.status === '正常'">
							当前 Minecraft 服务器运行情况正常。<br />IP:
							{{ server.ip }}:25565
						</p>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="4">
				<v-card :color="getColorByStatus(apiStatus)" dark>
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
						<p class="display-1">{{ apiStatus }}</p>
						<p v-if="apiStatus === '异常'">
							异常情况下，一切控制均无法正常操作，请及时联系技术人员解决。
						</p>
						<p v-if="apiStatus === '正常'">
							当前 API 状态正常，可以正确地执行和处理操作。<br />API
							地址：<a
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
		<v-expansion-panels class="expansions">
			<v-expansion-panel>
				<v-expansion-panel-header disable-icon-rotate>
					<template #actions
						><v-progress-circular
							indeterminate
							v-if="instance.info.status === 'loading'"
							width="2"
							size="20"
						/><v-icon color="green" v-else
							>mdi-check</v-icon
						></template
					>实例信息
				</v-expansion-panel-header>
				<v-expansion-panel-content>
					<p>
						这些信息是提前预设的信息，所有新创建的实例都会基于此信息进行配置。
					</p>
					<v-list
						:dense="isSM()"
						v-if="
							instance.info.status === 'ok' &&
							instance.infoRender.length > 0
						"
					>
						<v-list-item
							v-for="(x, i) in instance.infoRender"
							:key="i"
						>
							<v-list-item-icon
								><v-icon
									>mdi-{{ x.icon }}</v-icon
								></v-list-item-icon
							>
							<v-list-item-content>
								<v-list-item-title>{{
									x.value
								}}</v-list-item-title>
								<v-list-item-subtitle>{{
									x.name
								}}</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
					</v-list>
				</v-expansion-panel-content>
			</v-expansion-panel>
			<v-expansion-panel>
				<v-expansion-panel-header> 实例操作 </v-expansion-panel-header>
				<v-expansion-panel-content>
					<p>如果你是管理员，你可以对当前实例进行一些操作。</p>
					<div class="instance-action">
						<v-btn color="green" dark @click="createInstance()"
							><v-icon>mdi-plus</v-icon>创建实例</v-btn
						>
						<v-menu>
							<template v-slot:activator="{ on, attrs }">
								<v-btn v-on="on" v-bind="attrs" color="red" dark
									><v-icon>mdi-delete</v-icon
									>强制删除实例</v-btn
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
									color="pink"
									dark
									v-on="on"
									v-bind="attrs"
									><v-icon>mdi-close-octagon-outline</v-icon
									>停止实例</v-btn
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
											警告：停止实例并<strong>不<br />会正常关闭服务器</strong>。<br />极有可能造成存档损<br />坏。请确保服务器保<br />有每
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
						<v-btn @click="startInstance()" color="blue" dark
							><v-icon>mdi-launch</v-icon>启动实例
						</v-btn>
					</div>
				</v-expansion-panel-content>
			</v-expansion-panel>
			<v-expansion-panel v-if="deployStatus.length > 0">
				<v-expansion-panel-header disable-icon-rotate
					><template #actions
						><v-progress-circular
							indeterminate
							v-if="deployStatus === 'loading'"
							width="2"
							size="20"
						/><v-icon v-if="deployStatus === 'ok'" color="green"
							>mdi-check</v-icon
						><v-icon v-if="deployStatus === 'ng'" color="red"
							>mdi-close</v-icon
						></template
					>部署情况</v-expansion-panel-header
				>
				<v-expansion-panel-content>
					<p>
						你已经成功请求了实例的创建，你可以在这里查看其运行情况。如果运行失败，请注意分析内容，再尝试重新运行。<br />请尽量认真，避免出现多开、超开的情况，造成不必要的金额损失。
					</p>
					<div
						class="deploy-result"
						v-html="
							deployResult ||
							'暂无运行信息，请等待其出现，大约需要 5~15 秒。若长时间不出现，请联系技术人员进行排查。'
						"
					></div>
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>
		<v-dialog max-width="400px" v-model="dialogs.createInstance">
			<v-card>
				<v-card-title>操作：创建实例</v-card-title>
				<v-card-text
					>创建一个实例并开启服务器，需要大约 5
					分钟的时间。服务器开启以后，如果在线人数为 0 持续 6
					小时，将会被自动释放。</v-card-text
				>
				<v-card-actions>
					<v-spacer />
					<v-btn text @click="dialogs.createInstance = false"
						>取消</v-btn
					>
					<v-btn
						class="btn-primary"
						@click="
							createInstance();
							dialogs.createInstance = false;
						"
						>立即创建</v-btn
					>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-snackbar v-model="snackbar.open">{{ snackbar.text }}</v-snackbar>
	</div>
</template>

<script lang="ts">
import { get, getToken, post, translate, isSM } from "@/sn";
import Vue from "vue";
export default Vue.extend({
	data() {
		return {
			instance: {
				status: "",
				id: "",
				info: { status: "loading" } as InstanceInfo,
				infoRender: [] as Array<{
					name: string;
					value: string;
					icon: string;
				}>,
			},
			server: {
				status: "",
				ip: "",
			},
			apiStatus: "",
			dialogs: {
				createInstance: false,
			},
			snackbar: {
				open: false,
				text: "",
			},
			deployStatus: "" as "ok" | "loading" | "ng" | "",
			deployResult: "",
		};
	},
	methods: {
		getColorByStatus(status: string) {
			return status === "正常" ? "#4caf50" : "#424242";
		},
		getInstanceInfoRenderList() {
			let info = this.instance.info;
			let price = -1;
			get("/api/ecs/v1/describe/price").then((r) => {
				if (r.data.status === "ok") {
					price = r.data.data as number;
				}
				this.instance.infoRender = [
					{
						name: "实例类型",
						value: info.type,
						icon: "server",
					},
					{
						name: "峰值带宽",
						value: info.bandwidth + "Mbps",
						icon: "web",
					},
					{
						name: "系统盘",
						value:
							info.systemdisk.type +
							" " +
							info.systemdisk.size +
							"GB",
						icon: "harddisk",
					},
					{
						name: "数据盘",
						value:
							info.datadisk.type +
							" " +
							info.datadisk.size +
							"GB",
						icon: "harddisk",
					},
					{
						name: "地域",
						value: info.zone,
						icon: "map-marker",
					},
					{
						name: "首小时价格",
						value: "￥" + price,
						icon: "cash",
					},
				];
			});
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
									"实例部署成功，即将刷新页面。";
								this.snackbar.open = true;
								setTimeout(() => {
									this.$router.go(0);
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
					this.snackbar.open = true;
					this.$router.go(0);
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
					this.snackbar.open = true;
					this.$router.go(0);
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
					this.$router.go(0);
				}
			});
		},
	},
	mounted() {
		get("/api/ecs/v1/describe/status").then((r) => {
			if (r.data.status !== "ok") {
				this.instance.status = translate(r.data.msg as string, true);
			} else {
				this.instance.status = "正常";
				this.instance.id = (r.data.data as any).id;
			}
		});
		get("/api/server/v1/get/server").then((r) => {
			if (r.data.status !== "ok") {
				this.server.status = translate(r.data.msg as string, true);
			} else {
				this.server.status = "正常";
				this.server.ip = (r.data.data as any).ip;
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
		get("/api/ecs/v1/describe/instance").then((r) => {
			if (r.data.status === "ok") {
				this.instance.info = r.data.data as InstanceInfo;
				this.instance.info.status = "ok";
				this.getInstanceInfoRenderList();
			} else {
				this.instance.info.status = "ng";
			}
		});
	},
});
</script>

<style lang="less" scoped>
.display-1 {
	color: white;
	font-weight: bold;
}

h2 + p {
	padding: 0;
	color: rgba(0, 0, 0, 0.4);
}

h2 {
	padding-top: 16px;
	padding-bottom: 0;
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
	margin-top: 32px;
}

.deploy-result {
	background: black;
	border-radius: 5px;
	padding: 16px;
	color: white;
	line-height: 1.2;
	font-family: ui-monospace, "Consolas", "Menlo", monospace;
	font-size: 14px;
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
</style>