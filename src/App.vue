<template>
	<div class="app">
		<v-app>
			<transition name="fade" mode="out-in"> <router-view /> </transition
		></v-app>
		<v-snackbar v-model="globalSnackbar">
			{{ globalSnackbarContent }}
		</v-snackbar>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import { bus } from "./bus";

export default Vue.extend({
	data() {
		return {
			globalSnackbarContent: "",
			globalSnackbar: false,
		};
	},
	mounted() {
		bus.$on("global-snackbar", (p: string) => {
			this.globalSnackbarContent = p;
			this.globalSnackbar = true;
		});
	},
});
</script>

<style lang="less">
.fade-enter,
.fade-leave-to {
	visibility: hidden;
	opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s ease;
}
.fade-enter-to,
.fade-leave {
	opacity: 1;
	visibility: visible;
}
</style>