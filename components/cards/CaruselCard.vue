<template>
	<div class="flex justify-center items-stratch w-full gap-[1px]">
		<div
			class="bg-slate-900 flex flex-col justify-between items-start p-6 border-[1px] border-slate-700 rounded-xl w-1/2"
		>
			<Badge>Ultra ticket</Badge>
			<h3 class="text-slate-50 text-2xl">BlockDown Festival</h3>
			<div>
				<div class="text-slate-400 text-sm">Sep 21 7:00 pm</div>
				<div class="text-slate-400 text-sm">Croatia - GMI</div>
			</div>
		</div>
		<div class="rounded-xl w-1/2">
			<img
				class="w-full h-full rounded-xl object-cover"
				src="/assets/img/caruselItem.png"
				alt="item"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Badge } from "../ui/badge";
</script>
