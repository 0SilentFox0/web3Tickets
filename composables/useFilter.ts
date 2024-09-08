import { ref, computed } from "vue";

// Define the useFilter composable
export function useFilter(events: any[]) {
	// Search input reference
	const search = ref("");

	// Filter input references for access type and price range
	const filters = ref({
		accessType: "",
		minPrice: "",
		maxPrice: "",
	});

	// Compute unique access types based on event data
	const uniqueAccessTypes = computed(() => {
		return [...new Set(events.map((event) => event.accessType)), "All"];
	});

	// Filtered events based on search and filters
	const filteredEvents = computed(() => {
		if (!events.length) return [];
		return events.filter((event) => {
			const matchesSearch =
				event.eventName.toLowerCase().includes(search.value.toLowerCase()) ||
				event.eventLocation.toLowerCase().includes(search.value.toLowerCase());

			const matchesAccessType =
				!filters.value.accessType ||
				filters.value.accessType === "All" ||
				event.accessType === filters.value.accessType;

			const matchesMinPrice =
				!filters.value.minPrice ||
				event.ticketPrice >= Number(filters.value.minPrice);

			const matchesMaxPrice =
				!filters.value.maxPrice ||
				event.ticketPrice <= Number(filters.value.maxPrice);

			return (
				matchesSearch && matchesAccessType && matchesMinPrice && matchesMaxPrice
			);
		});
	});

	// Return all reactive data and computed properties
	return {
		search,
		filters,
		uniqueAccessTypes,
		filteredEvents,
	};
}
