<template>
	<div class="min-h-screen flex flex-col page pb-20">
		<VHeader class="hidden md:flex" />
		<VHeaderMobile class="block md:hidden" />
		<NuxtPage />
	</div>
</template>

<script setup lang="ts">
import VHeader from "../components/VHeader.vue";
</script>

<style scoped>
.page {
	background-image: url("/assets/img/background.png");
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	height: 100%;
}
</style>
