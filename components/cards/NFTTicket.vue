<!-- NFTTicket.vue -->
<template>
	<div
		@mouseenter="hover = true"
		@mouseleave="hover = false"
		:class="{ flip: isFlipped && withQr, shadow: hover }"
		class="flipper w-full h-[450px] md:h-[500px] bg-black rounded-[20px] p-[3px] text-white font-sans relative shadow-lg hover:-translate-y-2 transition-all cursor-pointer"
	>
		<div class="front h-full bg-black rounded-[17px] relative overflow-hidden">
			<div @click="flip">
				<div
					class="h-[100px] md:h-[150px] p-5 relative flex justify-center items-center"
				>
					<div
						ref="backgroundEl"
						class="absolute inset-0 opacity-70 transition-all duration-5000 ease-in-out"
						:style="backgroundStyle"
					/>
					<h1 class="text-2xl md:text-5xl m-0 relative z-10">
						NFT
						<span
							class="text-lg md:text-2xl bg-yellow-400 text-black py-0.5 px-1.5 rounded ml-1"
						>
							{{ event.nftCode }}
						</span>
					</h1>
				</div>
				<div class="p-5 min-h-[250px]">
					<h2 class="text-lg md:text-2xl mb-2.5">{{ event.eventName }}</h2>
					<p class="my-1.5 text-sm md:text-base">
						{{ formatDate(event.eventStartDate) }}
					</p>
					<p class="my-1.5 text-sm md:text-base">{{ event.eventLocation }}</p>
					<p class="my-1.5 text-sm md:text-base">
						{{ event.ticketPrice }} USDT
					</p>
				</div>
				<div
					class="relative border-t-2 border-dashed border-white/30 my-5 mx-0"
				></div>
			</div>
			<div class="pb-4 px-3 bg-black/80 flex justify-center">
				<slot name="button" :event="event" />
			</div>
		</div>
		<div
			v-if="withQr"
			@click="flip"
			class="back h-full bg-black rounded-[17px] relative flex flex-col justify-center items-center"
		>
			<h2 class="text-2xl mb-4">Scan QR Code</h2>
			<Transition name="fade">
				<qrcode-vue
					v-if="generatedCode"
					:value="'https://example.com'"
					:size="250"
					level="H"
				/>
			</Transition>
			<Button
				v-if="!generatedCode"
				@click.stop="generatedCode = true"
				class="mt-4"
				>Generate QR Code</Button
			>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import QrcodeVue from "qrcode.vue";

const props = defineProps({
	event: {
		eventName: String,
		eventDate: String,
		eventLocation: String,
		nftCode: String,
		ticketPrice: Number,
	},
	withQr: Boolean,
});

const backgroundEl = ref(null);
const backgroundStyle = ref({});
const isFlipped = ref(false);
const generatedCode = ref(false);

const formatDate = (value) => {
	const date = new Date(value);
	const yyyy = date.getFullYear();
	let mm = date.getMonth() + 1; // Months start at 0!
	let dd = date.getDate();

	if (dd < 10) dd = "0" + dd;
	if (mm < 10) mm = "0" + mm;

	return dd + "/" + mm + "/" + yyyy;
};

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

const flip = () => {
	if (props.withQr) {
		isFlipped.value = !isFlipped.value;
	}
};

const hover = ref(false);
const intervalId = ref();

onMounted(() => {
	intervalId.value = setInterval(updateBackground, 1); // Update every 100ms for smoother animation
});

onUnmounted(() => {
	if (intervalId) {
		clearInterval(intervalId.value);
	}
});
</script>

<style lang="scss" scoped>
.flipper {
	transition: 0.6s;
	transform-style: preserve-3d;
	position: relative;
	width: 300px;
}

.flipper.flip {
	transform: rotateY(180deg);
}

.front,
.back {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.flipper:not(.flip) .front {
	backface-visibility: visible;
}

.flipper:not(.flip) .back {
	backface-visibility: hidden;
}

.flipper.flip .back {
	backface-visibility: visible;
}

.flipper.flip .front {
	backface-visibility: hidden;
}

.back {
	transform: rotateY(180deg);
}

.shadow {
	&:before,
	&:after {
		content: "";
		position: absolute;
		top: -2px;
		left: -2px;
		border-radius: 16px;
		width: calc(100% + 4px);
		height: calc(100% + 4px);
		background: linear-gradient(
			45deg,
			#fb0094,
			#0000ff,
			#00ff00,
			#ffff00,
			#ff0000,
			#fb0094,
			#0000ff,
			#00ff00,
			#ffff00,
			#ff0000
		);
		background-size: 400%;
		z-index: -1;
		animation: shadow 20s linear infinite;
	}

	&:after {
		top: -8px;
		left: -8px;
		width: calc(100% + 16px);
		height: calc(100% + 16px);
		filter: blur(24px);
		opacity: 0.9;
	}
}

@keyframes shadow {
	0% {
		background-position: 0 0;
	}
	50.01% {
		background-position: 200% 0;
	}
	100% {
		background-position: 0 0;
	}
}
</style>
