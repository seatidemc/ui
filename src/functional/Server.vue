<template>
	<div>
		此页面尚未完工。
		<div class="basics">
			<div class="basic">
				<div class="btitle">在线人数</div>
				<div class="text">
					{{ onlinePlayerCount
					}}<span v-if="online" class="semi">/50</span>
				</div>
			</div>
			<div class="basic">
				<div class="btitle">运行时间</div>
				<div class="text">{{ toHMS(uptime) }}</div>
			</div>
			<div class="basic">
				<div class="btitle">TPS</div>
				<div class="text">{{ tps }}</div>
			</div>
			<div class="basic">
				<div class="btitle">CPU 占用</div>
				<div class="text">{{ cpu }}<span class="semi">%</span></div>
			</div>
			<div class="basic">
				<div class="btitle">RAM 占用</div>
				<div class="text">{{ ram }}<span class="semi">%</span></div>
				<span class="allocated"
					>{{ (ramTotal / 1024 / 1024 / 1024).toFixed(0) }}G</span
				>
			</div>
			<div class="basic">
				<div class="btitle">周目玩家数</div>
				<div class="text">{{ totalPlayerCount }}</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { get, toHMS } from "@/fn";
import { bus } from "@/bus";
import axios from "axios";
import Vue from "vue";
import nProgress from "nprogress";
export default Vue.extend({
	data() {
		return {
			online: false,
			ip: "",
			onlinePlayerCount: 0,
			uptime: 0,
			uptimeInterval: -1,
			tps: "0",
			cpu: "0.0",
			ram: "0.0",
			totalPlayerCount: 0,
			ramTotal: 0,
		};
	},
	watch: {
		online(v) {
			if (!v) {
				this.$router.push({ name: "f.overview" });
			}
		},
	},
	methods: {
		toHMS,
		getInformation() {
			get("/api/server/v1/get/server")
				.then((r) => {
					let d = r.data.data as Partial<ServerInformationFull>;
					this.online = d.online || false;
					this.ip = d.ip || "";
				})
				.then(() => {
					if (this.ip !== "") {
						axios
							.get("http://" + this.ip + ":25575/all-info")
							.then((r) => {
								let data = r.data as ServerStatusInformation;
								this.uptime = data.server.uptime;
								this.uptimeInterval = setInterval(() => {
									this.uptime++;
								}, 1000);
								this.totalPlayerCount =
									data.server.total.length;
								this.ramTotal = data.device.ram.max;
							});
					}
				});
		},
		async updateDynamicInformation() {
			get("/api/server/v1/get/server")
				.then((r) => {
					let d = r.data.data as Partial<ServerInformationFull>;
					this.online = d.online || false;
					this.ip = d.ip || "";
				})
				.then(() => {
					if (this.ip !== "") {
						axios
							.get("http://" + this.ip + ":25575/all-info")
							.then((r) => {
								let data = r.data as ServerStatusInformation;
								this.tps = data.server.tps.toFixed(1);
								this.onlinePlayerCount =
									data.server.online.length;
								this.cpu = data.device.cpu.usage.toFixed(2);
								this.ram = (
									data.device.ram.avail / data.device.ram.max
								).toFixed(2);
							});
					}
				});
		},
		async sleep(time: number) {
			return new Promise((re) => setTimeout(re, time * 1000));
		},
		async startAutoRefresh() {
			while (true) {
				this.updateDynamicInformation();
				await this.sleep(2);
			}
		},
	},
	mounted() {
		this.getInformation();
		this.startAutoRefresh();
	},
	beforeRouteEnter(to, from, next) {
		get("/api/server/v1/get/server").then((r) => {
			//@ts-ignore
			if (r.data.data.online === false) {
				bus.$emit("global-snackbar", "请在服务器开启后访问此页。");
				nProgress.done(true);
				next(false);
			} else {
				next();
			}
		});
	},
});
</script>

<style lang="less" scoped>
.basics {
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	flex-flow: row wrap;

	.basic {
		border-radius: 5px;
		padding: 16px;
		margin: 4px;
		flex: 0 0 calc(33.33% - 8px);
		border: 1px solid rgba(0, 0, 0, 0.21);
		position: relative;

		.btitle {
			font-size: 14px;
		}

		.text {
			font-size: 32px;
			font-weight: bold;
		}

		.allocated {
			position: absolute;
			right: 16px;
			top: 16px;
			font-size: 14px;
			color: rgba(0, 0, 0, 0.21);
		}

		.semi {
			color: rgba(0, 0, 0, 0.21);
			font-weight: normal;
			font-size: 20px;
		}
	}
}
</style>