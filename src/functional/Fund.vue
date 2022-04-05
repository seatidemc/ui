<template>
	<div fund>
		<div class="balance elevation-1">
			<v-icon class="background-cash">mdi-currency-jpy</v-icon>
			<div class="section-a">
				<h2>当前账户可用余额</h2>
				<h1>
					<span class="money"
						><span class="sign">￥</span
						>{{
							balance > 100 ? (balance - 100).toFixed(2) : 0
						}}</span
					>
				</h1>
				<small class="available-hint"
					><v-icon>mdi-help-circle-outline</v-icon> 可用余额 =
					实际余额 - <span class="money">100</span></small
				>
			</div>
			<div class="section-b">
				<h2>今日消费</h2>
				<h1>
					<span class="money"
						><span class="sign">￥</span
						>{{ statistics.today.toFixed(2) }}</span
					>
				</h1>
				<small
					class="available-hint"
					v-if="statistics.today - statistics.yesterday !== 0"
					><v-icon>mdi-information-outline</v-icon> 较昨日{{
						statistics.today - statistics.yesterday > 0 ? "↑" : "↓"
					}}<span class="money">{{
						Math.abs(
							statistics.today - statistics.yesterday
						).toFixed(2)
					}}</span></small
				>
			</div>
			<div class="section-c">
				<div class="item">
					<strong>本月日均消费</strong>
					<span class="money"
						>￥{{ (statistics.full30 / 30).toFixed(2) }}</span
					>
				</div>
				<div class="item">
					<strong>本月总消费</strong>
					<span class="money"
						>￥{{ statistics.full30.toFixed(2) }}</span
					>
				</div>
				<div class="item">
					<strong>30 天内最高单次消费</strong>
					<v-tooltip bottom>
						<template v-slot:activator="{ on, attrs }">
							<span v-on="on" v-bind="attrs" class="money">{{
								statistics.top30 === 0
									? "..."
									: "￥" + statistics.top30.toFixed(2)
							}}</span>
						</template>
						{{ formatDate(statistics.top30raw.date) + " (" + (statistics.top30raw.type || '?') + ")" }}
					</v-tooltip>
				</div>
				<div class="item">
					<strong>历史最高单次消费</strong>
					<v-tooltip bottom>
						<template v-slot:activator="{ on, attrs }">
							<span v-on="on" v-bind="attrs" class="money">{{
								statistics.top === 0
									? "..."
									: "￥" + statistics.top.toFixed(2)
							}}</span>
						</template>
						{{ formatDate(statistics.topraw.date) + " (" + (statistics.topraw.type || '?') +")" }}
					</v-tooltip>
				</div>
			</div>
		</div>
		<v-data-table
			:class="showColor ? 'withcolor' : ''"
			:loading="fundTable.loading"
			loading-text="加载数据中..."
			:options.sync="fundTable.options"
			:headers="fundTable.headers"
			:items="fundTable.items"
			class="elevation-1"
			:server-items-length="fundTable.total"
			hide-default-footer
			:items-per-page="fundTable.options.itemsPerPage"
			loader-height="2px"
		>
			<template #top>
				<div class="config mx-4 pt-4">
					<v-select
						v-model="fundTable.options.itemsPerPage"
						:items="[5, 10, 15, 20]"
						label="每页显示数量"
					/>
					<v-checkbox label="显示颜色" v-model="showColor" />
				</div>
			</template>
			<template #[`item.amount`]="x">
				<span
					class="money"
					:class="
						x.item.flow === 'Expense'
							? Number(x.item.amount) < -0.5
								? Number(x.item.amount) < -1
									? 'high-expense'
									: 'mid-expense'
								: 'expense'
							: 'income'
					"
				>
					{{ x.item.amount }}
				</span>
			</template>
			<template #footer>
				<v-pagination
					class="pagination"
					v-if="totalPages > 1"
					v-model="fundTable.options.page"
					:length="totalPages"
					:total-visible="isSM() ? 4 : 10"
				></v-pagination>
			</template>
		</v-data-table>
		<div section-divider style="height: 32px; width: 100%" />
		<h3>当前实例配置</h3>
		<v-list
			class="instance-set"
			elevation="1"
			rounded
			:dense="isSM()"
			v-if="instanceInfoRender.length > 0"
		>
			<v-list-item v-for="(x, i) in instanceInfoRender" :key="i">
				<v-list-item-icon
					><v-icon>mdi-{{ x.icon }}</v-icon></v-list-item-icon
				>
				<v-list-item-content>
					<v-list-item-title>{{ x.value }}</v-list-item-title>
					<v-list-item-subtitle>{{ x.name }}</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</div>
</template>

<script lang="ts">
import { get, isSM } from "@/fn";
import Vue from "vue";
import moment from "moment";

interface FundItemRaw {
	amount: string;
	date: string;
	type: typeDict;
	flow: "Expense" | "Income";
}

interface FundItem {
	amount: string;
	date: string;
	type: typeDictZ;
	flow: "Expense" | "Income";
}

type typeDict = "OSS" | "ECS" | "YUNDISK";
type typeDictZ = "对象存储" | "实例" | "云盘";

export default Vue.extend({
	data() {
		return {
			fundTable: {
				headers: [
					{
						text: "对象",
						value: "type",
						sortable: false,
					},
					{
						text: "金额(￥)",
						value: "amount",
						sortable: false,
					},
					{
						text: "时间",
						value: "date",
						sortable: false,
					},
				],
				items: [] as FundItem[],
				total: 0,
				options: {},
				loading: false,
			},
			showColor: true,
			balance: 0,
			statistics: {
				top30: 0,
				full30: 0,
				top: 0,
				today: 0,
				yesterday: 0,
				top30raw: {},
				topraw: {},
			},
			instanceInfo: {} as InstanceInfo,
			instanceInfoRender: {},
		};
	},
	computed: {
		totalPages(): number {
			return Math.ceil(
				// @ts-ignore
				this.fundTable.total / this.fundTable.options.itemsPerPage
			);
		},
	},
	methods: {
		getFund(pageNum = 1, maxResult = 10) {
			get(
				"/api/info/v1/describe/fund?pageNum=" +
					pageNum +
					"&maxResult=" +
					maxResult
			).then((r) => {
				if (r.data.status === "ok") {
					let d = r.data.data as {
						result: FundItemRaw[];
						total: number;
					};
					this.fundTable.total = d.total;
					this.fundTable.items = this.toFundItem(d.result);
					this.fundTable.loading = false;
				}
			});
		},
		toFundItem(items: FundItemRaw[]) {
			let result: FundItem[] = [];

			let match: { [props in typeDict]: typeDictZ } = {
				OSS: "对象存储",
				ECS: "实例",
				YUNDISK: "云盘",
			};
			items.forEach((k) => {
				result.push({
					amount: (k.flow === "Expense" ? "-" : "+") + k.amount,
					type: match[k.type] || "账号",
					date: this.formatDate(k.date),
					flow: k.flow,
				});
			});
			return result;
		},
		getBalance() {
			get("/api/info/v1/describe/balance").then((r) => {
				if (r.data.status === "ok") {
					this.balance = Number(r.data.data);
				}
			});
		},
		async updateStatistics() {
			let date = moment().utc();
			let [year, month, day] = [
				date.year(),
				date.month() + 1,
				date.date(),
			];
			get(
				`/api/info/v1/describe/billing?type=daily&year=${year}&month=${month}&day=${day}`
			).then((r) => {
				if (r.data.status === "ok") {
					this.statistics.today = r.data.data as number;
				}
			});
			get(
				`/api/info/v1/describe/billing?type=daily&year=${year}&month=${month}&day=${
					day - 1
				}`
			).then((r) => {
				if (r.data.status === "ok") {
					this.statistics.yesterday = r.data.data as number;
				}
			});
			get(
				`/api/info/v1/describe/billing?type=monthly&year=${year}&month=${month}`
			).then((r) => {
				if (r.data.status === "ok") {
					this.statistics.full30 = r.data.data as number;
				}
			});
			get(
				`/api/info/v1/search/fund?target=max-expense&startDate=${date
					.clone()
					.subtract(1, "month")
					.format("YYYY-MM-DD")}&endDate=${date.format("YYYY-MM-DD")}`
			).then((r) => {
				if (r.data.status === "ok") {
					// @ts-ignore
					this.statistics.top30 = Number(r.data.data.amount);
					// @ts-ignore
					this.statistics.top30raw = r.data.data;
				}
			});
			get(
				`/api/info/v1/search/fund?target=max-expense&endDate=${date.format(
					"YYYY-MM-DD"
				)}`
			).then((r) => {
				if (r.data.status === "ok") {
					// @ts-ignore
					this.statistics.top = Number(r.data.data.amount);
					// @ts-ignore
					this.statistics.topraw = r.data.data;
				}
			});
		},
		getInstanceInfoRenderList() {
			let info = this.instanceInfo;
			let price = -1;
			get("/api/ecs/v1/describe/price").then((r) => {
				if (r.data.status === "ok") {
					price = r.data.data as number;
				}
				this.instanceInfoRender = [
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
							"G",
						icon: "harddisk",
					},
					{
						name: "数据盘",
						value:
							info.datadisk.type +
							" " +
							info.datadisk.size +
							"G",
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
		isSM,
		formatDate(date: string) {
			if (!!!date) return "loading..."
			return moment(date).utc().format("YYYY-MM-DD HH:mm:ss")
		}
	},
	watch: {
		"fundTable.options": {
			handler(v) {
				this.fundTable.loading = true;
				this.getFund(v.page, v.itemsPerPage);
			},
			deep: true,
		},
	},
	mounted() {
		this.getBalance();
		this.updateStatistics();
		if (window.innerWidth <= 900) {
			//@ts-ignore
			this.fundTable.options.itemsPerPage = 5;
		}
		get("/api/ecs/v1/describe/instance").then((r) => {
			if (r.data.status === "ok") {
				this.instanceInfo = r.data.data as InstanceInfo;
				this.getInstanceInfoRenderList();
			} else {
			}
		});
	},
});
</script>

<style lang="less" scoped>
.pagination {
	padding: 16px 0;
	width: 100%;
}

.config {
	display: flex;
	align-items: center;
	flex-direction: row;
	@media (max-width: 1000px) {
		flex-direction: column;

		> * {
			max-width: 100%;
		}
	}
	> * {
		max-width: 300px;
		margin: 0 8px;
	}
}

.v-data-table .money {
	display: inline-block;
	transform: scale(1.3);
}

.balance {
	background: linear-gradient(-45deg, #ffb007, #fcd707);
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	border-radius: 5px;
	padding: 16px;
	color: #272727;
	margin: 16px 0;
	position: relative;
	overflow: hidden;
	z-index: 1;

	@media (max-width: 1000px) {
		flex-direction: column;
		align-items: center !important;
	}

	> [class^="section-"] {
		width: 33.33%;
		margin: 0 8px;
	}

	.background-cash {
		position: absolute;
		opacity: 0.1;
		color: black;
		right: 48px;
		bottom: 48px;
		transform: scale(10);
		z-index: -1;
	}

	.section-a,
	.section-b {
		padding: 16px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;

		@media (max-width: 1200px) {
			align-items: center;
		}

		@media (max-width: 1000px) {
			width: 100%;
			padding: 32px 8px;
			border-bottom: 1px dotted rgba(0, 0, 0, 0.21);
		}

		.available-hint {
			color: rgba(0, 0, 0, 0.5);

			.v-icon {
				font-size: 14px;
			}
		}

		h2,
		h1 {
			font-weight: normal;
			padding: 0;
			line-height: 1;
		}

		h1 {
			font-size: 56px;
			margin-top: 16px;
		}

		.sign {
			font-size: 30px;
		}
	}

	.section-c {
		display: grid;
		grid-template-rows: 1fr 1fr;
		grid-auto-columns: 1fr;
		grid-auto-flow: column;
		padding: 16px;

		@media (max-width: 1000px) {
			width: 100%;
			justify-items: center;
			align-items: center;
			.item {
				align-items: center !important;
			}
		}

		.item {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			line-height: 1;
			margin: 8px 0;

			&:nth-child(2n + 1) {
				margin-top: 0;
			}

			strong {
				margin-bottom: 8px;
				font-size: 12px;
				color: rgba(0, 0, 0, 0.5);
			}

			.money {
				font-size: 26px;
			}
		}
	}
}
</style>