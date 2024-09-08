<template>
	<div>
		<h1 class="text-center text-3xl md:text-7xl">Your events</h1>
		<div class="mt-10 flex items-center justify-center gap-4">
			<Dialog v-model:open="isOpen">
				<DialogTrigger as-child>
					<Button class="bg-black"><Plus /> Add new event </Button>
				</DialogTrigger>
				<DialogContent class="w-full">
					<DialogHeader>
						<DialogTitle>Add new Event</DialogTitle>
					</DialogHeader>
					<div class="grid gap-4 py-4">
						<div class="flex flex-col justify-start items-start gap-2">
							<Label for="name" class="text-right"> Event title </Label>
							<Input
								id="name"
								v-model="newEvent.eventName"
								class="col-span-3"
							/>
						</div>
						<div class="flex flex-col justify-start items-start gap-2">
							<Label for="name" class="text-right"> Event description </Label>
							<Textarea
								id="name"
								v-model="newEvent.eventDescription"
								class="col-span-3"
							/>
						</div>
						<div class="flex flex-col justify-start items-start gap-2">
							<Label for="total" class="text-right">
								Total amount of tickets
							</Label>
							<Input
								type="number"
								id="total"
								v-model="newEvent.totalAmount"
								class="col-span-3"
							/>
						</div>
						<div class="flex flex-col justify-start items-start gap-2">
							<Label for="location" class="text-right"> Event localtion </Label>
							<Input
								id="location"
								v-model="newEvent.eventLocation"
								class="col-span-3"
							/>
						</div>
						<div class="flex flex-col justify-start items-start gap-2">
							<Label for="username" class="text-right"> NFT symbol </Label>
							<Input
								id="username"
								v-model="newEvent.nftCode"
								class="col-span-3"
							/>
						</div>
						<div class="flex flex-col justify-start items-start gap-2">
							<Label for="price" class="text-right">
								Ticket price (USDT)
							</Label>
							<Input
								id="price"
								min="0"
								type="number"
								v-model="newEvent.ticketPrice"
								class="col-span-3"
							/>
						</div>
						<div class="flex flex-col justify-start items-start gap-2">
							<Label for="startdate" class="text-right">
								Event start date
							</Label>
							<VueDatePicker
								id="startdate"
								dark
								v-model="newEvent.eventStartDate"
							/>
						</div>
						<div class="flex flex-col justify-start items-start gap-2">
							<Label for="enddate" class="text-right"> Event end date </Label>
							<VueDatePicker
								id="enddate"
								dark
								v-model="newEvent.eventEndDate"
							/>
						</div>
					</div>
					<DialogFooter>
						<Button class="w-full" type="submit" @click="saveEvent">
							Save event
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>

		<TransitionGroup
			name="list"
			tag="div"
			mode="easy-in"
			class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 gap-y-8 mt-10 place-items-center"
		>
			<NFTTicket
				v-for="(event, i) in events"
				:key="i"
				:event="event"
				:withQr="true"
			>
				<template #button> <Button class="w-full">Refund</Button> </template>
			</NFTTicket>
		</TransitionGroup>
	</div>
</template>

<script lang="ts" setup>
import NFTTicket from "@/components/cards/NFTTicket.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-vue-next";
import { useEvents } from "@/composables/useEvents.js";

const eventHook = useEvents();

definePageMeta({
	layout: "profile",
});

const isOpen = ref(false);
const newEvent = ref({
	eventName: "",
	eventDescription: "",
	eventStartDate: new Date(),
	eventEndDate: new Date(),
	eventLocation: "",
	nftCode: "",
	ticketPrice: 0,
	totalAmount: 0,
});

const events = ref([]);

const saveEvent = async () => {
	try {
		const rawData = await fetch("https://api.akord.com/files", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Api-Key": "tgj7KRvGvF4nLBBCOjLQYaZg6UxzGnpw5mYaD993",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newEvent.value),
		});

		const response = await rawData.json();

		await eventHook.createTicket(newEvent.value, response.cloud.url);
		await getEvents();
		isOpen.value = false;
	} catch (e) {
		console.log(e);
		isOpen.value = false;
	}
};

const getEvents = async () => {
	events.value = [];
	const eventAddress = await eventHook.getCreatorEvents("");
	for (const address of eventAddress) {
		const link = await eventHook.getEventUrl(address);
		const rowData = await fetch(link);
		const event = await rowData.json();
		events.value.push(event);
	}
};
onMounted(async () => {
	await getEvents();
});
</script>

<style>
.dp__theme_dark {
	--dp-background-color: rgb(3, 7, 18);
	--dp-text-color: #fff;
	--dp-hover-color: #484848;
	--dp-hover-text-color: #fff;
	--dp-hover-icon-color: #959595;
	--dp-primary-color: rgb(109, 40, 217);
	--dp-primary-disabled-color: #61a8ea;
	--dp-primary-text-color: #fff;
	--dp-secondary-color: #a9a9a9;
	--dp-border-color: #2d2d2d;
	--dp-menu-border-color: #2d2d2d;
	--dp-border-color-hover: #aaaeb7;
	--dp-border-color-focus: #aaaeb7;
	--dp-disabled-color: #737373;
	--dp-disabled-color-text: #d0d0d0;
	--dp-scroll-bar-background: #212121;
	--dp-scroll-bar-color: #484848;
	--dp-success-color: #00701a;
	--dp-success-color-disabled: #428f59;
	--dp-icon-color: #959595;
	--dp-danger-color: #e53935;
	--dp-marker-color: #e53935;
	--dp-tooltip-color: #3e3e3e;
	--dp-highlight-color: rgb(0 92 178 / 20%);
	--dp-range-between-dates-background-color: var(--dp-hover-color, #484848);
	--dp-range-between-dates-text-color: var(--dp-hover-text-color, #fff);
	--dp-range-between-border-color: var(--dp-hover-color, #fff);
}
</style>
