<template>
	<div server>
		<h1 title>服务器管理</h1>
		<div class="status-badge" :class="serverData.created ? 'on' : 'off'">
			实例{{ serverData.created ? "在线" : "不在线" }}
			<v-icon>mdi-{{ serverData.created ? "check" : "close" }}</v-icon>
		</div>
		<div class="status-badge" :class="serverData.created ? 'on' : 'off'">
			服务器{{ serverData.online ? "在线" : "不在线" }}
			<v-icon>mdi-{{ serverData.created ? "check" : "close" }}</v-icon>
		</div>
		<div class="status-badge blue">自动更新 · ON</div>
		<div class="informations">
			<div class="info-item">
				<div class="name">已运行时间</div>
				<div class="content">
					{{
						serverGc.uptime[0] +
						"h " +
						serverGc.uptime[1] +
						"m " +
						serverGc.uptime[2] +
						"s"
					}}
				</div>
			</div>
			<div class="info-item" :class="tpsColor">
				<div class="name">TPS</div>
				<div class="content">
					{{ serverGc.tps }}
				</div>
			</div>
			<div class="info-item" :class="ramColor">
				<div class="name">内存</div>
				<div class="content">
					{{ (serverGc.ram.free / 1024).toFixed(1) }}
					<span dim>/</span>
					{{ (serverGc.ram.used / 1024).toFixed(1) }} GB
				</div>
			</div>
		</div>
		<div class="informations">
			<div class="info-item">
				<div class="name">玩家数量</div>
				<div class="content">
					{{ serverData.onlinePlayers }} <span dim>/</span>
					{{ serverData.maxPlayers }}
				</div>
			</div>
			<div class="info-item">
				<div class="name">下次备份</div>
				<div class="content">{{ times.toBackup }} 秒后</div>
			</div>
			<div class="info-item">
				<div class="name">释放时间</div>
				<div class="content">
					{{
						serverData.onlinePlayers > 0
							? "暂不释放"
							: times.toDelete + "秒后"
					}}
				</div>
			</div>
		</div>
		<v-expansion-panels
			v-model="currentAction"
			class="actions"
			popout
			multiple
		>
			<v-expansion-panel>
				<v-expansion-panel-header>操作</v-expansion-panel-header>
				<v-expansion-panel-content>
					下面是当前支持的对服务器的操作。
					<div class="server-actions">
						<v-btn disabled class="primary" @click="commandDialog = true">
							<v-icon left>mdi-code-tags</v-icon>
							执行指令
						</v-btn>
					</div>
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>
		<v-dialog v-model="commandDialog" max-width="600px">
			<v-card>
				<v-card-title>执行指令</v-card-title>
				<v-card-text
					>在下面的文本框中输入你要执行的指令（不带 /）后回车，将以 OP
					权限执行。
					<v-text-field
						@keydown.enter="execute(command)"
						type="text"
						v-model="command"
						counter
					/>
					<div class="result" v-html="commandResult" />
				</v-card-text>
				<v-card-actions>
					<v-btn text @click="commandDialog = false">关闭</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script lang="ts">
import { get, getToken, post } from "@/sn";
import Vue from "vue";

export interface ServerInformationGc {
	uptime: number[];
	tps: number;
	ram: {
		free: number;
		used: number;
	};
}

export default Vue.extend({
	data() {
		return {
			serverData: {} as ServerInformationFull,
			serverGc: {
				uptime: [0, 0, 0],
				tps: 0,
				ram: {
					free: 0,
					used: 0,
				},
			} as ServerInformationGc,
			times: {
				toBackup: 0,
				toDelete: 0,
			},
			currentAction: [0],
			commandDialog: false,
			command: "",
			commandResult: "",
		};
	},
	methods: {
		async getServerInfo() {
			await this._getServer();
            // TODO: 将 RCON 换成自写 HTTP 服务器
			await this._getGc();
			await this._getBackuptime();
			await this._getDeltime();
		},
		async _getDeltime() {
			post("/api/server/v1/action", {
				token: getToken(),
				type: "execute",
				cmd: "seatidecore get deltime",
			}).then((r) => {
				if (r.data.status === "ok") {
					// @ts-ignore
					let deltime = r.data.data[0];
					let time = /实例将在 (\d+) 秒后/.exec(deltime);
					if (time !== null) {
						this.times.toDelete = Number(time[1]);
					}
				}
			});
		},
		async _getServer() {
			get("/api/server/v1/get/server").then((r) => {
				if (r.data.status === "ok") {
					this.serverData = r.data.data as any;
				}
			});
		},
		async _getBackuptime() {
			post("/api/server/v1/action", {
				token: getToken(),
				type: "execute",
				cmd: "seatidecore get backuptime",
			}).then((r) => {
				if (r.data.status === "ok") {
                    console.log(r);
					// @ts-ignore
					let backuptime = r.data.data[0];
					let time = /备份在 (\d+) 秒后/.exec(backuptime);
					if (time !== null) {
						this.times.toBackup = Number(time[1]);
					}
				}
			});
		},
		async _getGc(getTime = true) {
			post("/api/server/v1/action", {
				token: getToken(),
				type: "execute",
				cmd: "gc",
			}).then((r) => {
				if (r.data.status === "ok") {
					let gc = (r.data.data as string[])[0];
					gc = gc.replace(/§(\w|\d)/g, "").replace(/\n/g, "");
					let uptime = [0, 0, 0],
						tps = 0,
						freeRam = 0,
						usedRam = 0;
					let uptimeR =
						/运行时间：(\d+) 小时 (\d+) 分钟 (\d+) 秒/.exec(gc);
					if (uptimeR !== null) {
						uptime = [
							Number(uptimeR[1]),
							Number(uptimeR[2]),
							Number(uptimeR[3]),
						];
					}
					let tpsR = /TPS=(\d+)/.exec(gc);
					if (tpsR !== null) {
						tps = Number(tpsR[1]);
					}
					let usedRamR = /已分配内存：(\d+),(\d+)/.exec(gc);
					if (usedRamR !== null) {
						usedRam = Number(usedRamR[1] + usedRamR[2]);
					}
					let freeRamR = /空闲内存：(\d+),(\d+)/.exec(gc);
					if (freeRamR !== null) {
						freeRam = Number(freeRamR[1] + freeRamR[2]);
					}
					if (
						getTime &&
						JSON.stringify(uptime) !== JSON.stringify([0, 0, 0])
					)
						this.serverGc.uptime = uptime;
					if (tps !== 0) this.serverGc.tps = tps;
					if (usedRam !== 0) this.serverGc.ram.used = usedRam;
					if (freeRam !== 0) this.serverGc.ram.free = freeRam;
				}
			});
		},
		async sleep(time: number) {
			return new Promise((re) => setTimeout(re, time * 1000));
		},
		async autoUpdate() {
			while (true) {
				this.getServerInfo();
				await this.sleep(1);
			}
		},
		execute(cmd: string) {
            
			post("/api/server/v1/action", {
				type: "execute",
				cmd,
				token: getToken(),
			}).then((r) => {
				if (r.data.status === "ok") {
					let data = r.data.data as any;
                    let result: string = data[0];
                    result.replace("/\n/g", "<br/>")
                    // TODO: fix 返回值重叠
					this.commandResult +=
						"<br/><span cmd-date>[" +
						new Date().toTimeString().substr(0, 8) +
						"]</span> " +
						result;
				}
			});
		},
	},
	async mounted() {
		await this.getServerInfo();
		this.autoUpdate();
	},
	computed: {
		tpsColor() {
			// @ts-ignore
			let tps = this.serverGc.tps;
			return tps > 18 ? "green" : tps > 15 ? "amber" : "red";
		},
		ramColor() {
			// @ts-ignore
			let ram = this.serverGc.ram.free / this.serverGc.ram.used;
			return ram < 0.6 ? "green" : ram < 0.8 ? "amber" : "red";
		},
	},
});
</script>

<style lang="less" scoped>
.status-badge,
h1[title] {
	display: inline-block;
}

.actions {
	margin: 16px 0;
}

.server-actions {
	margin-top: 16px;
	display: flex;
	align-items: center;
}

.status-badge {
	margin-left: 16px;
	border: 1px solid;
	border-radius: 5px;
	padding: 4px 8px;
	line-height: 1;
	font-size: 14px;
	display: inline-flex;
	align-items: center;

	.mdi {
		font-size: 14px;
		margin-left: 4px;
	}

	&.off {
		border-color: #f44336;
		color: #f44336;
		.mdi {
			color: #f44336;
		}
	}

	&.on {
		border-color: #4caf50;
		color: #4caf50;
		.mdi {
			color: #4caf50;
		}
	}

	&.blue {
		border-color: #2196f3;
		color: #2196f3;
		background: transparent !important;
	}
}

.informations {
	display: flex;
	align-items: center;
	padding: 8px 0;

	.info-item {
		width: 33.33%;
		display: block;
		margin: 0 8px;
		text-align: center;
		background: black;
		padding: 8px 0;
		border-radius: 5px;
		.name,
		[dim] {
			color: rgba(255, 255, 255, 0.6);
		}
		.content {
			color: white;
			font-weight: bold;
			font-size: 26px;
		}
	}
}

.result {
	background: black;
	padding: 16px;
	border-radius: 5px;
	font-family: ui-monospace, "Consolas", "Menlo", monospace;
	color: white;
	max-height: 400px;
    overflow-y: scroll;
}

[cmd-date] {
	color: rgba(255, 255, 255, 0.5) !important;
}
</style>