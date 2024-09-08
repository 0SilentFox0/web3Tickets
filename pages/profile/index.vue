ʼ
<template>
	<div class="flex justify-start items-stretch gap-4 px-3 w-full">
		<Card
			class="w-1/2 mx-auto p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow"
		>
			<!-- Profile Image -->
			<CardHeader class="flex justify-center items-center">
				<Avatar class="">
					<AvatarImage
						src="https://github.com/radix-vue.png"
						alt="@radix-vue"
					/>
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
			</CardHeader>

			<!-- User Info -->
			<CardContent class="text-center">
				<h2 class="text-2xl font-bold mb-2">{{ name }}</h2>
				<p class="text-sm text-muted-foreground">{{ role }}</p>
				<p class="text-sm text-muted-foreground">{{ location }}</p>
			</CardContent>
		</Card>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // shadcn UI components
import { Button } from "@/components/ui/button"; // shadcn UI components
import {
	Card,
	CardHeader,
	CardContent,
	CardFooter,
} from "@/components/ui/card"; // shadcn UI components

definePageMeta({
	layout: "profile",
});

// Mock user data
const name = ref("John Doe");
const role = ref("Senior Blockchain Developer");
const location = ref("Amsterdam, Netherlands");

// Wallet data (replace with actual wallet integration)
const connectedWallet = ref("0x1234...abcd"); // Replace with null or actual wallet address dynamically
</script>

<style scoped></style>
