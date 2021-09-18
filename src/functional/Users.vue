<template>
	<div users>
		<h1>用户管理</h1>
		<p>下面展示了所有的注册用户信息，你可以修改它们。</p>
		<v-data-table
			no-results-text="暂无结果"
			loading-text="加载数据中..."
			:loading="tableLoading"
			:items="data"
			no-data-text="暂无任何信息"
			:headers="headers"
			v-model="selectedItems"
			show-select
			hide-default-footer
		>
			<template v-slot:top>
				<v-toolbar flat>
					<v-toolbar-title v-if="selectedItems.length > 0"
						>已选 {{ selectedItems.length }} 个</v-toolbar-title
					>
					<v-spacer />
					<v-btn
						color="primary"
						@click="
							dialog.editAction = 'create';
							currentTarget = {};
							dialog.edit = true;
						"
						>创建用户 <v-icon>mdi-plus</v-icon></v-btn
					>
					<v-btn
						class="ml-4"
						color="red"
						dark
						v-if="selectedItems.length > 0"
						@click="
							dialog.confirm = true;
							dialog.confirmAction = deleteMultiple;
						"
						>全部删除 <v-icon>mdi-delete</v-icon></v-btn
					>
					<!-- <v-btn
						class="ml-4"
						color="blue"
						dark
						v-if="selectedItems.length > 0"
						@click="
							dialog.editAction = 'multiple';
							dialog.edit = true;
						"
						>批量修改 <v-icon>mdi-pencil</v-icon></v-btn
					> -->
					<v-dialog max-width="400px" v-model="dialog.confirm">
						<v-card>
							<v-card-title>是否确定？</v-card-title>
							<v-card-text>此操作无法撤销。</v-card-text>
							<v-card-actions>
								<v-spacer />
								<v-btn
									class="primary"
									@click="dialog.confirm = false"
									>取消</v-btn
								>
								<v-btn text @click="dialog.confirmAction"
									>确定</v-btn
								>
							</v-card-actions>
						</v-card>
					</v-dialog>
					<v-dialog max-width="600px" v-model="dialog.edit">
						<v-card>
							<v-card-title
								>{{
									dialog.editAction === ""
										? "修改"
										: {
												multiple: "批量修改",
												create: "创建",
										  }[dialog.editAction]
								}}用户</v-card-title
							>
							<v-card-text>
								<p v-if="dialog.editAction === 'multiple'">
									目前支持批量修改的项目只有权限组。
								</p>
								<p v-if="dialog.editAction === 'create'">
									建议仅在有需要的时候使用。正常情况下，用户应在注册页面注册。
								</p>
								<v-text-field
									type="text"
									label="用户名"
									hint="不能与已有的重复"
									v-if="dialog.editAction !== 'multiple'"
									v-model="currentTarget.newUsername"
								/>
								<v-text-field
									hint="昵称可以为空，暂时没有实际作用"
									type="text"
									label="昵称"
									v-if="dialog.editAction === ''"
									v-model="currentTarget.nickname"
								/>
								<v-text-field
									type="text"
									label="电子邮箱"
									v-if="dialog.editAction !== 'multiple'"
									v-model="currentTarget.email"
								/>
								<v-text-field
									v-if="dialog.editAction === 'create'"
									type="text"
									label="密码"
									v-model="currentTarget.password"
								/>
								<v-select
									v-if="dialog.editAction !== 'create'"
									persistent-hint
									hint="admin 为管理组，std 为普通组"
									label="权限组"
									v-model="currentTarget.group"
									:items="['admin', 'std']"
								/>
							</v-card-text>
							<v-card-actions>
								<v-spacer />
								<v-btn class="primary" @click="submitEdit()"
									>提交</v-btn
								>
								<v-btn text @click="dialog.edit = false"
									>取消</v-btn
								>
							</v-card-actions>
						</v-card>
					</v-dialog>
				</v-toolbar>
			</template>
			<template v-slot:[`item.actions`]="{ item }">
				<v-icon
					class="mr-4"
					@click="
						currentTarget = item;
						currentTarget.newUsername = item.username;
						dialog.edit = true;
					"
				>
					mdi-pencil
				</v-icon>
				<v-icon
					@click="
						currentTarget = item;
						dialog.confirmAction = deleteSingle;
						dialog.confirm = true;
					"
				>
					mdi-delete
				</v-icon>
			</template>
		</v-data-table>
		<v-pagination v-if="totalPages > 1" v-model="paginPage" :length="totalPages"></v-pagination>
		<v-snackbar v-model="snackbar">
			{{ snackbarText }}
		</v-snackbar>
	</div>
</template>

<script lang="ts">
import { get, getToken, post } from "@/sn";
import Vue from "vue";
export default Vue.extend({
	data() {
		return {
			page: 0,
			pagin: 10,
			tableLoading: true,
			selectedItems: [] as User[],
			currentTarget: {} as User,
			headers: [
				{
					text: "序号",
					value: "id",
				},
				{
					text: "用户名",
					value: "username",
					sortable: false,
				},
				{
					text: "权限组",
					value: "group",
					sortable: false,
				},
				{
					text: "邮箱",
					value: "email",
					sortable: false,
				},
				{
					text: "注册时间",
					value: "created_at",
				},
				{
					text: "操作",
					value: "actions",
					sortable: false,
				},
			],
			data: [] as User[],
			dialog: {
				edit: false,
				delete: false,
				confirm: false,
				create: false,
				confirmAction: "",
				userEditValid: false,
				editAction: "" as "multiple" | "" | "create",
			},
			snackbar: false,
			snackbarText: "",
			paginPage: 1,
			totalPages: 0,
		};
	},
	methods: {
		getData(page: number) {
            this.tableLoading = true;
			get(
				"/api/user/v1/get/all?page=" + page + "&pagin=" + this.pagin
			).then((r) => {
				let data = r.data;
				this.tableLoading = false;
				if (data.status === "ok") {
					this.data = data.data as any;
				}
			});
		},
		deleteSingle() {
			this.dialog.confirm = false;
			post("/api/user/v1/action", {
				type: "delete",
				usernames: [this.currentTarget.username],
				token: getToken(),
			}).then((r) => {
				if (r.data.status === "ok") {
					this.snackbarText = "已删除 " + this.currentTarget.username;
					this.snackbar = true;
					this.refreshTable();
				} else {
					this.snackbarText = "删除失败：" + r.data.msg;
					this.snackbar = true;
				}
			});
		},
		deleteMultiple() {
			this.dialog.confirm = false;
			let usernames: string[] = [];
			this.selectedItems.forEach((k) => {
				usernames.push(k.username);
			});
            if (usernames.length === 1) {
                this.currentTarget = this.selectedItems[0];
                return this.deleteSingle();
            }
			post("/api/user/v1/action", {
				type: "delete",
				usernames,
				token: getToken(),
			}).then((r) => {
				if (r.data.status === "ok") {
					let data = r.data.data as any;
					this.snackbarText =
						"成功删除 " +
						data.deleted +
						" 个用户数据" +
						(data.error ? "有错误发生。" : "");
					this.snackbar = true;
					this.refreshTable();
				} else {
					this.snackbarText = "出现问题：" + r.data.msg;
					this.snackbar = true;
					this.refreshTable();
				}
			});
		},
		refreshTable() {
			this.getData(this.page);
			this.refreshPagin();
            this.selectedItems = [];
		},
		submitEdit() {
			this.dialog.edit = false;
			if (this.dialog.editAction === "create") {
				post("/api/user/v1/action", {
					type: "create",
					username: (this.currentTarget as any).newUsername,
					email: this.currentTarget.email,
					password: (this.currentTarget as any).password,
				}).then((r) => {
					if (r.data.status === "ok") {
						this.snackbarText = "创建成功";
						this.snackbar = true;
						this.refreshTable();
					} else {
						this.snackbarText = "创建失败：" + r.data.msg;
						this.snackbar = true;
					}
				});
			} else {
				post("/api/user/v1/action", {
					type: "alter",
					toAlter: {
						username: (this.currentTarget as any).newUsername,
						nickname: this.currentTarget.nickname,
						email: this.currentTarget.email,
						group: this.currentTarget.group,
					},
					username: this.currentTarget.username,
					token: getToken(),
				}).then((r) => {
					if (r.data.status === "ok") {
						this.snackbarText = "修改成功";
						this.snackbar = true;
						this.refreshTable();
					} else {
						this.snackbarText = "修改失败：" + r.data.msg;
						this.snackbar = true;
					}
				});
			}
		},
		refreshPagin() {
			get("/api/user/v1/get/count").then((r) => {
				if (!isNaN(Number(r.data.data))) {
					this.totalPages = Math.ceil(
						Number(r.data.data) / this.pagin
					);
				}
			});
		},
	},
	mounted() {
		this.getData(0);
		this.refreshPagin();
	},
	watch: {
		paginPage(v) {
			this.page = v - 1;
		},
        page(v) {
            this.getData(v);
        }
	},
});
</script>