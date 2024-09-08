<template>
	<div class="pt-10 md:pt-24 relative">
		<h1
			class="text-slate-50 text-center text-5xl md:text-7xl font-bold relative z-10"
		>
			Top Events <br />& Concerts Hub
		</h1>
		<h2
			class="text-indigo-300 text-center md:text-2xl mt-8 relative z-10 w-4/5 mx-auto"
		>
			Discover the Best Events and Live Shows Near You
		</h2>

		<div
			class="absolute bidget bg-indigo-800 opacity-40 w-20 h-20 rounded-full flex justify-center items-center z-10"
		>
			<img
				:src="arweave"
				alt="Bidget"
				width="50"
				height="50"
				class="grayscale"
			/>
		</div>
		<div
			class="absolute eth bg-indigo-800 opacity-40 w-20 h-20 rounded-full flex justify-center items-center z-10"
		>
			<img :src="eth" alt="eth" width="50" height="50" class="grayscale" />
		</div>
		<div
			class="absolute req bg-indigo-800 opacity-40 w-20 h-20 rounded-full flex justify-center items-center z-10"
		>
			<img :src="celo" alt="req" width="50" height="50" class="grayscale" />
		</div>
		<div
			class="absolute redstone bg-indigo-800 opacity-40 w-20 h-20 rounded-full flex justify-center items-center z-10"
		>
			<img :src="redStone" alt="req" width="50" height="50" class="grayscale" />
		</div>
	</div>
</template>

<script setup lang="ts">
import arweave from "@/assets/img/arweave.png";
import eth from "@/assets/img/ethereum-eth-logo.png";
import celo from "@/assets/img/celo.png";
import redStone from "@/assets/img/red_stone.png";
</script>

<style lang="scss" scoped>
.bidget {
	top: 50%;
	left: 10%;
	animation: levitation-1 30s infinite;
}

.eth {
	top: 20%;
	left: 70%;
	animation: levitation-2 30s infinite;
}

.req {
	top: 60%;
	right: 10%;
	animation: levitation-3 30s infinite;
}

.redstone {
	top: 0;
	left: 20%;
	animation: levitation-4 30s infinite;
}

@keyframes levitation {
	0% {
		transform: translate(0);
	}
	20% {
		transform: translate(15px, 20px);
	}
	50% {
		transform: translate(5px, 10px);
	}
	70% {
		transform: translate(15px, 20px);
	}
	100% {
		transform: translate(0);
	}
}
@for $i from 1 through 12 {
	@keyframes levitation-#{$i} {
		0% {
			transform: translate(0);
		}

		// #{$i * 3%} {
		//   filter: brightness(130%);
		// }

		#{20% - $i} {
			transform: translate($i * 20px, $i * 20px) scale(calc(0.87 - $i/100));
		}
		50% {
			transform: translate($i * 1px, $i * 2px);
		}
		#{70% - $i} {
			transform: translate($i * 25px, $i * 25px) scale(calc(0.92 - $i/100));
		}
		100% {
			transform: translate(0);
		}
	}
}
</style>
