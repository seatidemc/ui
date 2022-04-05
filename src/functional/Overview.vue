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
						{{ server.ip || "暂无" }}
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
							<template #text>1.16.5</template>
						</meta-item>
						<meta-item icon="mdi-gamepad">
							<template #name>主题</template
							><template #text>养老</template>
						</meta-item>
						<meta-item icon="mdi-calendar"
							><template #name>开始时间</template>
							<template #text>2022-04-04</template></meta-item
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
								<v-icon>mdi-server</v-icon>
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
								<span v-if="instance.status !== 'ok' && instance.status !== 'ng'">
									<v-progress-circular :size="13" color="gray" width="1.5" indeterminate/>
								</span>
							</div>
							<div class="status-item">
								<v-icon>mdi-minecraft</v-icon>
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
								<span v-if="server.status !== 'ok' && server.status !== 'ng'">
									<v-progress-circular :size="13" color="gray" width="1.5" indeterminate/>
								</span>
							</div>
						</meta-bar>
					</div>
					<h3 v-if="server.onlinePlayers.length > 0">在线玩家 · {{ server.onlinePlayers.length }}/50</h3>
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
					<div v-else class="empty">服务器尚未开启</div>
					<h3>操作</h3>
					<div class="actions">
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
			mainStatus: "一切正常" as
				| "一切正常"
				| "空转"
				| "无人游玩"
				| "尚未开启"
				| "加载中"
				| "部署请求超时",
			mainLoading: false,
			mainIcon: "mdi-check-all" as
				| "mdi-check-all"
				| "mdi-close"
				| "mdi-alert-outline"
				| "mdi-hexagon-outline",
			mainIconColor: "green" as "green" | "amber" | "red" | "gray",
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
				players: this.server.onlinePlayers.length
			};
		},
	},
	watch: {
		statusAll: {
			deep: true,
			handler(v) {
				if (v.deploy === "ok" || v.deploy === "") {
					this.mainLoading = false;
					if (v.instance === "stopped") {
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
							(v.server === "stopped" || v.server === "ng") &&
							v.instance === "ok"
						) {
							this.mainStatus = "空转";
							this.mainIcon = "mdi-alert-outline";
							this.mainIconColor = "amber";
						}
