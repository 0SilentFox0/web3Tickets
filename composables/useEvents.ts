import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/vue";
import { celoAlfajores } from "viem/chains";
import { reconnect, writeContract } from "@wagmi/core";
import { readContract } from "@wagmi/core";
import factoryABI from "@/abis/factoryABI";
import { ticketABI } from "@/abis/ticketABI.js";
import { usdcABI } from "@/abis/usdcABI";
import { marketplaceABI } from "@/abis/marketplaceABI";

// Define the useFilter composable
export function useEvents() {
	const runtimeConfig = useRuntimeConfig();

	// 1. Define constants
	const projectId = runtimeConfig.public.walletConnectProjectId;

	// 2. Create wagmiConfig
	const metadata = {
		name: "AppKit",
		description: "AppKit Example",
		url: "https://web3modal.com", // origin must match your domain & subdomain
		icons: ["https://avatars.githubusercontent.com/u/37784886"],
	};

	const ticketFactoryABI = factoryABI.ticketFactoryABI;

	const factoryAddress = "0x3418f73dE497a68355d395c4997F35a45d4b497E";
	const usdtAddress = "0x2F25deB3848C207fc8E0c34035B3Ba7fC157602B";
	const marketPlaceAddress = "0xA71B897162CAe072178a14e0b994bA5C009D23f6";
	const chains = [celoAlfajores]; // You can add more networks here if needed

	const config = defaultWagmiConfig({
		chains,
		projectId,
		metadata,
	});

	reconnect(config);

	const getEvents = async () => {
		const events: string[] = await readContract(config, {
			abi: ticketFactoryABI,
			address: factoryAddress,
			functionName: "getAllTickets",
		});

		return events;
	};

	const getCreatorEvents = async (creatorAddress: string) => {
		const events: string[] = await readContract(config, {
			abi: ticketFactoryABI,
			address: factoryAddress,
			functionName: "getTicketsAddresses",
			args: ["0x5b4857C4fCeC6cd4Efb9ACE070c5B8643Ad228c8"],
		});

		return events;
	};

	const getUserTickets = async (ticket: string, ticketuserAddress: string) => {
		const events: string[] = await readContract(config, {
			abi: ticketABI,
			address: ticket,
			functionName: "getUserTokens",
			args: ["0x5b4857C4fCeC6cd4Efb9ACE070c5B8643Ad228c8"],
		});

		return events;
	};

	const getEventInfo = async (ticket: string) => {
		const events: any[] = await readContract(config, {
			abi: ticketABI,
			address: ticket,
			functionName: "getEventData",
		});

		return events;
	};

	const buyTicket = async (tickerAdress: string, ticketPrice: number) => {
		try {
			const res = await writeContract(config, {
				abi: usdcABI,
				address: usdtAddress,
				functionName: "approve",
				args: [tickerAdress, ticketPrice],
			});
			await writeContract(config, {
				abi: ticketABI,
				address: tickerAdress,
				functionName: "purchaseTicket",
				args: [],
			});
		} catch (e) {
			console.log(e);
		}
	};

	const createTicket = async (event: any, arLink: string) => {
		try {
			const res = await writeContract(config, {
				abi: ticketFactoryABI,
				address: factoryAddress,
				functionName: "createTicket",
				args: [
					event.eventName,
					event.nftCode,
					event.totalAmount,
					arLink,
					event.ticketPrice * 1e6,
					(new Date(event.eventStartDate).getTime() / 1000) | 0,
					(new Date(event.eventEndDate).getTime() / 1000) | 0,
				],
			});
			console.log(res);
		} catch (e) {
			console.log(e);
		}
	};

	const getEventUrl = async (ticket: string) => {
		const events: string[] = await readContract(config, {
			abi: ticketABI,
			address: ticket,
			functionName: "tokenURI",
			args: ["1"],
		});

		return events;
	};

	const sellTicket = async (ticket: string, tokenId: string, price: number) => {
		console.log(marketplaceABI);

		const events: string[] = await writeContract(config, {
			abi: marketplaceABI,
			address: marketPlaceAddress,
			functionName: "createOffer",
			args: [ticket, tokenId, price],
		});
		return events;
	};

	const createWeb3 = () =>
		createWeb3Modal({
			wagmiConfig: config,
			projectId,
			enableAnalytics: true, // Optional - defaults to your Cloud configuration
		});

	return {
		getEvents,
		createWeb3,
		buyTicket,
		createTicket,
		getEventInfo,
		getEventUrl,
		getCreatorEvents,
		getUserTickets,
		sellTicket,
	};
}
