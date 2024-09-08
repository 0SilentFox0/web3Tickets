<template>
	<div>
		<h1 class="text-center text-3xl md:text-7xl">Your tickets</h1>

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
				<template #button="eventData">
					<Dialog v-model:open="isOpen">
						<DialogTrigger as-child>
							<Button class="w-full bg-red-700">Sell</Button>
						</DialogTrigger>
						<DialogContent class="w-full">
							<DialogHeader>
								<DialogTitle>Sell event</DialogTitle>
							</DialogHeader>
							<div class="grid gap-4 py-4">
								<div class="flex flex-col justify-start items-start gap-2">
									<Label for="price" class="text-right">
										Ticket price (USDT)
									</Label>
									<Input
										min="0"
										id="price"
										type="number"
										class="col-span-3"
										v-model="eventData.event.ticketPrice"
									/>
								</div>
							</div>
							<DialogFooter>
								<Button
									class="w-full bg-red-700"
									type="submit"
									@click="sellTicket(eventData)"
								>
									Sell
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</template>
			</NFTTicket>
		</TransitionGroup>
	</div>
</template>

<script lang="ts" setup>
import NFTTicket from "@/components/cards/NFTTicket.vue";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEvents } from "@/composables/useEvents";

definePageMeta({
	layout: "profile",
});

const eventHook = useEvents();

const events = ref([]);
const isOpen = ref(false);

const getEvents = async () => {
	events.value = [];
	const eventAddress = await eventHook.getEvents();
	for (const address of eventAddress) {
		const allAddress = await eventHook.getUserTickets(address, "");

		if (allAddress && allAddress.length > 0) {
			const link = await eventHook.getEventUrl(address);
			const rowData = await fetch(link);
			const event = await rowData.json();
			event.address = address;
			event.id = allAddress[0].toString();
			events.value.push(event);
		}
	}
};

onMounted(async () => {
	await getEvents();
});

const sellTicket = async (eventData: any) => {
	// await Promise.all([
	// 	await eventHook.sellTicket(
	// 		eventData.event.address,
	// 		eventData.event.id,
	// 		eventData.event.ticketPrice * 1e6
	// 	),
	// 	await getEvents(),
	// ]);
	const index = events.value.findIndex((el) => el.id === eventData.event.id);
	events.value.splice(index, 1);
	isOpen.value = true;
};
</script>
