<template>
	<div class="pt-10">
		<div class="container">
			<div
				class="flex-col md:flex-row flex justify-between items-stretch gap-4"
			>
				<div
					ref="backgroundEl"
					class="nftcard w-full md:w-[500px] h-[300px] md:h-[500px] rounded-lg transition-all duration-5000 ease-in-out border border-slate-700 bg-slate-900"
					:style="backgroundStyle"
				>
					<div class="absolute top-10 left-6">
						<h1 class="text-2xl md:text-5xl m-0 relative z-10">
							NFT
							<span
								class="text-lg md:text-2xl bg-yellow-400 text-black py-0.5 px-1.5 rounded ml-1"
							>
								{{ event.nftCode }}
							</span>
						</h1>
					</div>
				</div>
				<div
					class="w-full md:w-1/2 h-full flex flex-col justify-between items-start"
				>
					<div class="flex flex-col justify-start items-start">
						<h2 class="text-lg md:text-2xl mb-2.5">{{ event.eventName }}</h2>
						<p class="my-1.5 text-sm md:text-base">
							{{ event.eventDescription }}
						</p>
						<p class="my-1.5 text-sm md:text-base">
							{{ formatDate(event.eventStartDate) }}
						</p>
						<!-- <p class="my-1.5 text-sm md:text-base">
							{{ 10 }} / {{ event.totalAmount }} tickets aviable
						</p> -->
						<p class="my-1.5 text-sm md:text-base">
							{{ event.ticketPrice }} USDT
						</p>
					</div>

					<Button
						:disabled="isDisabled"
						class="w-full"
						size="lg"
						@click="buyTicket"
					>
						Buy Ticket
					</Button>
					<Button disabled class="w-full mt-4" size="lg" @click="buyTicket">
						Bid
					</Button>
				</div>
			</div>

			<div class="mt-10 pt-5 border-t border-white">
				<h2 class="text-center text-2xl">You can also buy here</h2>
				<div class="flex flex-col justify-start items-end gap-4 mt-5">
					<div
						v-for="n in 3"
						:key="n"
						class="flex justify-between items-end gap-5 w-full bg-slate-900 border-[1px] border-slate-700 border-opacity-45 rounded-lg pr-5"
					>
						<div
							ref="backgroundEl"
							class="relative w-52 h-52 rounded-lg transition-all duration-5000 ease-in-out border border-slate-700 bg-slate-800"
							:style="backgroundStyle"
						>
							<div class="absolute top-10 left-6">
								<h1 class="text-2xl md:text-5xl m-0 relative z-10">
									NFT
									<span
										class="text-lg md:text-2xl bg-yellow-400 text-black py-0.5 px-1.5 rounded ml-1"
									>
										{{ event.nftCode }}
									</span>
								</h1>
							</div>
						</div>
						<div
							class="w-1/2 h-full flex flex-col justify-between items-start pb-3"
						>
							<p class="my-1.5 text-sm md:text-base">
								{{ event.ticketPrice }} USDT
							</p>

							<Button
								:disabled="disabledBtn"
								class="w-full"
								size="lg"
								@click="buyTicket"
							>
								Buy Ticket
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useEvents } from "~/composables/useEvents";
import { Button } from "~/components/ui/button";
import { toast } from "vue-sonner";

const backgroundEl = ref(null);
const backgroundStyle = ref({});
const intervalId = ref();
const isDisabled = ref(false);

const eventHook = useEvents();

const event = ref([]);
const disabledBtn = ref(false);
const address = useRoute().params.slug as string;
const link = await eventHook.getEventUrl(address);
const rowData = await fetch(link);
event.value = await rowData.json();

const colors = [
	"#ff00ff",
	"#00ffff",
	"#ffff00",
	"#ff00aa",
	"#00ff00",
	"#ff6600",
	"#0066ff",
];
const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

const createGradient = () => ({
	color: getRandomColor(),
	x: Math.random() * 100,
	y: Math.random() * 100,
	dx: (Math.random() - 0.5) * 0.1, // Slower speed
	dy: (Math.random() - 0.5) * 0.1, // Slower speed
});

const gradients = ref([createGradient(), createGradient(), createGradient()]);

const updateBackground = () => {
	gradients.value = gradients.value.map((g) => ({
		...g,
		x: (g.x + g.dx + 100) % 100,
		y: (g.y + g.dy + 100) % 100,
	}));

	backgroundStyle.value = {
		background: gradients.value
			.map(
				(g) =>
					`radial-gradient(circle at ${g.x}% ${g.y}%, ${g.color}, black 50%)`
			)
			.join(", "),
	};
};

const formatDate = (value) => {
	const date = new Date(value);
	const yyyy = date.getFullYear();
	let mm = date.getMonth() + 1; // Months start at 0!
	let dd = date.getDate();

	if (dd < 10) dd = "0" + dd;
	if (mm < 10) mm = "0" + mm;

	return dd + "/" + mm + "/" + yyyy;
};

const buyTicket = async () => {
	const contractTicketPrice = event.value.ticketPrice * 1e6;
	await eventHook.buyTicket(address, contractTicketPrice);
	disabledBtn.value = true;
	isDisabled.value = true;
	alert("Success!");
};

onMounted(() => {
	intervalId.value = setInterval(updateBackground, 1); // Update every 100ms for smoother animation
});

onUnmounted(() => {
	if (intervalId) {
		clearInterval(intervalId.value);
	}
});
</script>

<style scoped>
.nftcard {
	animation: float 6s ease-in-out infinite;
}

@keyframes float {
	0% {
		box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
		transform: translatey(0px);
	}
	50% {
		box-shadow: 0 25px 15px 0px rgba(0, 0, 0, 0.2);
		transform: translatey(-10px);
	}
	100% {
		box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
		transform: translatey(0px);
	}
}
</style>
