<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script lang="ts" setup>
import { useColorMode } from "@vueuse/core";
import { useEvents } from "@/composables/useEvents.js";

useEvents().createWeb3();

const color = useColorMode();

color.value = "dark";
</script>

<style>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.layout-enter-active,
.layout-leave-active {
	transition: opacity 2s;
}
.layout-enter-from,
.layout-leave-to {
	opacity: 0;
}

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
	transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateX(10px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
	/* position: absolute; */
}
</style>
