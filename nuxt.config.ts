// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },
	modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt", "nuxt-svgo"],
	// svgo: {
	// 	autoImportPath: "./assets/icons/",
	// },
	shadcn: {
		/**
		 * Prefix for all the imported component
		 */
		prefix: "",
		/**
		 * Directory that the component lives in.
		 * @default "./components/ui"
		 */
		componentDir: "./components/ui",
	},

	app: {
		layoutTransition: { name: "fade", mode: "out-in" },
		head: {
			title: "Web3 Tickets",
			charset: "utf-8",
			viewport: "width=device-width, initial-scale=1",
			link: [
				{
					rel: "apple-touch-icon",
					sizes: "180x180",
					href: "/favicon/apple-touch-icon.png",
				},
				{
					rel: "icon",
					type: "image/png",
					sizes: "32x32",
					href: "/favicon/favicon-32x32.png",
				},
				{
					rel: "icon",
					type: "image/png",
					sizes: "16x16",
					href: "/favicon/favicon-16x16.png",
				},
				{ rel: "manifest", href: "/favicon/site.webmanifest" },
				{
					rel: "mask-icon",
					href: "/favicon/safari-pinned-tab.svg",
					color: "#5bbad5",
				},
				{ rel: "shortcut icon", href: "/favicon/favicon.ico" },
			],
			meta: [
				{ name: "msapplication-TileColor", content: "#da532c" },
				{ name: "msapplication-config", content: "/favicon/browserconfig.xml" },
				{ name: "theme-color", content: "#ffffff" },
			],
		},
	},
	runtimeConfig: {
		public: {
			walletConnectProjectId: process.env.NUXT_WALLET_CONNECT_PROJECT_ID,
			worldcoinApplicationId: process.env.NUXT_WORLDCOIN_APPLICATION_ID,
		},
	},
});
