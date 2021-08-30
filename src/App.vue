<template>
	<div class="app">
		<v-app>
			<transition name="fade" mode="out-in">
				<router-view /> </transition
		></v-app>
	</div>
</template>

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