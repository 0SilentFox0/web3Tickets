ʼ
<template>
	<div class="min-h-screen flex flex-col page pb-20">
		<VHeader class="hidden md:flex" />
		<VHeaderMobile class="block md:hidden" />
		<div class="flex justify-start items-stretch gap-4 px-3">
			<SideBar class="hidden lg:flex" />
			<main
				class="shadow-zinc-200 shadow border-[0.5px] border-slate-700 rounded-lg min-w-[200px] py-5 px-2 w-full flex justify-center items-stretch"
			>
				<NuxtPage />
			</main>
		</div>
	</div>
</template>

<script setup lang="ts">
import SideBar from "@/components/profile/SideBar.vue";
import VHeader from "@/components/VHeader.vue";
import VHeaderMobile from "@/components/VHeaderMobile.vue";
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
