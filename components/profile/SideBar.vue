<template>
	<aside
		class="sidebar flex flex-col gap-3 bg-transparent border-[0.5px] border-slate-700 rounded-lg min-w-[200px] py-5 px-2 shadow-zinc-200 shadow"
	>
		<NuxtLink to="/profile"><Button class="w-full"> Profile </Button></NuxtLink>
		<NuxtLink to="/profile/tickets"
			><Button class="w-full"> Tickets </Button></NuxtLink
		>
		<NuxtLink to="/profile/events"
			><Button class="w-full"> Events </Button></NuxtLink
		>
	</aside>
</template>

<script lang="ts" setup></script>

<style scoped>
.sidebar {
	height: auto;
	min-height: calc(100vh - 140px);
}
</style>
