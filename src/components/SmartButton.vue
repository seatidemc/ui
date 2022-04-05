<template>
	<button
		@click="
			active = true;
			onclick[0](onclick[1]);
		"
		class="smart-button"
		:style="
			'background: ' +
			background +
			'; color: ' +
			color +
			'; border-color: ' +
			borderColor +
			';'
		"
	>
		<v-icon class="inactive" v-if="!active">{{ iconInactive }}</v-icon>
		<v-icon class="active" v-if="active"> {{ iconActive }}</v-icon>
		{{ text }}
	</button>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	props: [
		"iconInactive",
		"iconActive",
		"textInactive",
		"textActive",
		"backgroundInactive",
		"backgroundActive",
		"colorInactive",
		"colorActive",
		"borderColorInactive",
		"borderColorActive",
		"onclick",
	],
	data() {
		return {
			text: "",
			background: "",
			color: "",
			borderColor: "",
			active: false,
		};
	},
	methods: {
		inactivate() {
			this.text = this.textInactive;
			this.background = this.backgroundInactive;
			this.color = this.colorInactive;
			this.borderColor = this.borderColorInactive;
			this.active = false;
		},
		activate() {
			this.text = this.textActive;
			this.background = this.backgroundActive;
			this.color = this.colorActive;
			this.borderColor = this.colorActive;
			this.active = true;
		},
	},
	mounted() {
		this.inactivate();
	},
	watch: {
		active(v) {
			if (v) {
				this.activate();
				setTimeout(() => {
					this.inactivate();
				}, 650);
			} else {
				this.inactivate();
			}
		},
	},
});
</script>

<style lang="less" scoped>
.smart-button {
	display: inline-flex;
	align-items: center;

	.mdi {
		font-size: 16px;
		margin-right: 4px;
		color: white !important;
	}

	&:hover {
		.mdi.inactive {
			color: @primary !important;
		}
	}
}
</style>