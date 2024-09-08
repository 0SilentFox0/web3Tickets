<template>
	<div class="min-h-screen flex flex-col page pb-20">
		<MainScreen />
		<TicketsSection :events="events" />
	</div>
</template>

<script setup lang="ts">
import MainScreen from "~/components/main/MainScreen.vue";
import TicketsSection from "~/components/main/TicketsSection.vue";
import { useEvents } from "@/composables/useEvents";

const eventHook = useEvents();

const eventAddress = await eventHook.getEvents();

const events = ref([]);

for (const address of eventAddress) {
	const link = await eventHook.getEventUrl(address);
	const rowData = await fetch(link);
	const event = await rowData.json();
	event.hash = address;
	events.value.push(event);
}
</script>

<style scoped></style>
