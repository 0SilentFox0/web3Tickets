<!-- Navigation.vue -->
<template>
	<header class="max-w-5xl px-4 md:px-6">
		<div>
			<div
				@click="toggleMenu"
				class="h-9 w-9 p-2 rounded-md hover:bg-gray-100/50 focus:outline-none focus:bg-gray-100/50 dark:hover:bg-gray-800/50 dark:focus:bg-gray-800/50"
			>
				<MenuIcon class="h-5 w-5" />
				<span class="sr-only">Toggle menu</span>
			</div>
			<div
				v-if="isMenuOpen"
				class="fixed inset-0 pt-5 bg-white dark:bg-gray-900 z-50"
			>
				<div
					class="absolute top-1 right-1 p-2 rounded-md hover:bg-gray-100/50 focus:outline-none focus:bg-gray-100/50 dark:hover:bg-gray-800/50 dark:focus:bg-gray-800/50"
					@click="toggleMenu"
				>
					<XIcon class="h-4 w-4" />
					<span class="sr-only">Close menu</span>
				</div>
				<div class="flex flex-col gap-2 p-4">
					<NuxtLink
						v-for="(item, index) in menuItems"
						:key="index"
						:to="item.href"
						:class="[
							'flex h-9 items-center justify-start rounded-md p-4 text-sm font-medium transition-colors',
							index === 0
								? 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-50'
								: 'bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-950 hover:text-gray-900 dark:hover:text-gray-50',
						]"
					>
						{{ item.label }}
					</NuxtLink>
					<w3m-button />
				</div>
			</div>
		</div>
	</header>
</template>

<script setup>
import { ref } from "vue";
import { MenuIcon } from "lucide-vue-next";
import { XIcon } from "lucide-vue-next";

const isMenuOpen = ref(false);

const toggleMenu = () => {
	isMenuOpen.value = !isMenuOpen.value;
};

const menuItems = [
	{ label: "Market", href: "/" },
	{ label: "Community market", href: "/community" },
];
</script>
