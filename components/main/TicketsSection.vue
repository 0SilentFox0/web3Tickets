<template>
	<div class="container">
		<div class="mt-10 flex items-center justify-center gap-4">
			<div class="relative w-full max-w-sm">
				<Input
					v-model="search"
					id="search"
					type="text"
					placeholder="Search..."
					class="pl-10"
				/>
				<span
					class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
				>
					<Search class="size-6 text-muted-foreground" />
				</span>
			</div>
			<Popover>
				<PopoverTrigger as-child>
					<Button variant="outline" class="w-10 h-10 p-0">
						<Filter class="h-4 w-4" />
					</Button>
				</PopoverTrigger>
				<PopoverContent class="w-80">
					<div class="grid gap-4">
						<div class="space-y-2">
							<h4 class="font-medium leading-none">Filters</h4>
							<p class="text-sm text-muted-foreground">
								Apply filters to refine your search
							</p>
						</div>
						<div class="grid gap-2">
							<div class="grid grid-cols-3 items-center gap-4">
								<Label htmlFor="accessType">Access Type</Label>
								<Select v-model="filters.accessType">
									<SelectTrigger class="w-[180px]">
										<SelectValue placeholder="Select a acces" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem
												v-for="item in uniqueAccessTypes"
												:value="item"
											>
												{{ item }}
											</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>
							<div class="grid grid-cols-3 items-center gap-4">
								<Label htmlFor="minPrice">Min Price (ETH)</Label>
								<Input
									id="minPrice"
									type="number"
									v-model="filters.minPrice"
									class="col-span-2"
								/>
							</div>
							<div class="grid grid-cols-3 items-center gap-4">
								<Label htmlFor="maxPrice">Max Price (ETH)</Label>
								<Input
									id="maxPrice"
									type="number"
									v-model="filters.maxPrice"
									class="col-span-2"
								/>
							</div>
						</div>
					</div>
				</PopoverContent>
			</Popover>
		</div>

		<TransitionGroup
			name="list"
			tag="div"
			mode="easy-in"
			class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 gap-y-8 mt-10 place-items-center"
		>
			<NFTTicket
				v-for="event in filteredEvents"
				:key="event.eventName"
				:event="event"
				:withQr="false"
			>
				<template #button="eventData">
					<Button
						class="w-full"
						@click="$router.push({ path: `/event/${eventData.event.hash}` })"
					>
						Check event
					</Button>
				</template>
			</NFTTicket>
		</TransitionGroup>
	</div>
</template>

<script lang="ts" setup>
import NFTTicket from "../cards/NFTTicket.vue";
import { Input } from "../ui/input";
import { Search, Filter } from "lucide-vue-next";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { useFilter } from "~/composables/useFilter";

import { useEvents } from "@/composables/useEvents.js";

const eventsHook = useEvents();

const props = defineProps({
	events: Array,
});

const { search, filters, uniqueAccessTypes, filteredEvents } = useFilter(
	props.events
);
</script>
