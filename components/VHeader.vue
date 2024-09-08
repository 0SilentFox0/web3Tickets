<template>
	<header class="flex justify-between container w-full py-10 mx-auto">
		<div>
			<img src="/assets/img/logo.png" alt="" width="56" height="56" />
		</div>
		<NavigationMenu
			class="bg-slate-800 rounded-lg px-3 py-1 border-slate-700 border-[1px]"
		>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuLink href="/" :class="navigationMenuTriggerStyle()">
						Market
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink
						href="/community"
						:class="navigationMenuTriggerStyle()"
					>
						Community market
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink>
						<WorldCoinWidget></WorldCoinWidget>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink>
						<w3m-button />
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink
						href="/profile"
						:class="navigationMenuTriggerStyle()"
					>
						<div
							class="w-10 h-10 bg-primary rounded-full flex justify-center items-center"
						>
							<User />
						</div>
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	</header>
</template>

<script setup lang="ts">
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { User } from "lucide-vue-next";
import WorldCoinWidget from "@/components/auth/WorldCoinWidget.vue";
</script>
