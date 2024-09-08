export const marketplaceABI = [
	{
		inputs: [
			{
				internalType: "contract TicketFactory",
				name: "_ticketFactory",
				type: "address",
			},
			{
				internalType: "contract IERC20",
				name: "_usdt",
				type: "address",
			},
		],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "target",
				type: "address",
			},
		],
		name: "AddressEmptyCode",
		type: "error",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "AddressInsufficientBalance",
		type: "error",
	},
	{
		inputs: [],
		name: "EnforcedPause",
		type: "error",
	},
	{
		inputs: [],
		name: "ExpectedPause",
		type: "error",
	},
	{
		inputs: [],
		name: "FailedInnerCall",
		type: "error",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address",
			},
		],
		name: "OwnableInvalidOwner",
		type: "error",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "OwnableUnauthorizedAccount",
		type: "error",
	},
	{
		inputs: [],
		name: "ReentrancyGuardReentrantCall",
		type: "error",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address",
			},
		],
		name: "SafeERC20FailedOperation",
		type: "error",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address",
			},
		],
		name: "OwnershipTransferred",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "Paused",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "Unpaused",
		type: "event",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "offerId",
				type: "uint256",
			},
		],
		name: "buyOffer",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "id",
				type: "uint256",
			},
		],
		name: "cancelOffer",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "ticket",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "price",
				type: "uint256",
			},
		],
		name: "createOffer",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "getAllTicketsData",
		outputs: [
			{
				components: [
					{
						internalType: "address",
						name: "creator",
						type: "address",
					},
					{
						internalType: "address",
						name: "buyer",
						type: "address",
					},
					{
						internalType: "address",
						name: "saleToken",
						type: "address",
					},
					{
						internalType: "address",
						name: "ticket",
						type: "address",
					},
					{
						internalType: "uint256",
						name: "offerId",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "price",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "tokenId",
						type: "uint256",
					},
					{
						internalType: "uint32",
						name: "creatingTime",
						type: "uint32",
					},
					{
						internalType: "bool",
						name: "active",
						type: "bool",
					},
				],
				internalType: "struct Marketplace.OfferData[]",
				name: "",
				type: "tuple[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "offerId",
				type: "uint256",
			},
		],
		name: "getOfferInfo",
		outputs: [
			{
				components: [
					{
						internalType: "address",
						name: "creator",
						type: "address",
					},
					{
						internalType: "address",
						name: "buyer",
						type: "address",
					},
					{
						internalType: "address",
						name: "saleToken",
						type: "address",
					},
					{
						internalType: "address",
						name: "ticket",
						type: "address",
					},
					{
						internalType: "uint256",
						name: "offerId",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "price",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "tokenId",
						type: "uint256",
					},
					{
						internalType: "uint32",
						name: "creatingTime",
						type: "uint32",
					},
					{
						internalType: "bool",
						name: "active",
						type: "bool",
					},
				],
				internalType: "struct Marketplace.OfferData",
				name: "",
				type: "tuple",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "user",
				type: "address",
			},
		],
		name: "getUserOffers",
		outputs: [
			{
				internalType: "uint256[]",
				name: "",
				type: "uint256[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "offerId",
				type: "uint256",
			},
		],
		name: "isOfferActive",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "offers",
		outputs: [
			{
				internalType: "address",
				name: "creator",
				type: "address",
			},
			{
				internalType: "address",
				name: "buyer",
				type: "address",
			},
			{
				internalType: "address",
				name: "saleToken",
				type: "address",
			},
			{
				internalType: "address",
				name: "ticket",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "offerId",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "price",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256",
			},
			{
				internalType: "uint32",
				name: "creatingTime",
				type: "uint32",
			},
			{
				internalType: "bool",
				name: "active",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "offersCounter",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
			{
				internalType: "address",
				name: "",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
			{
				internalType: "bytes",
				name: "",
				type: "bytes",
			},
		],
		name: "onERC721Received",
		outputs: [
			{
				internalType: "bytes4",
				name: "",
				type: "bytes4",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "paused",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "renounceOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "ticketFactory",
		outputs: [
			{
				internalType: "contract TicketFactory",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		name: "tokenBalances",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newOwner",
				type: "address",
			},
		],
		name: "transferOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "contract IERC20",
				name: "tokenAddress",
				type: "address",
			},
		],
		name: "unlockTokens",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "usdt",
		outputs: [
			{
				internalType: "contract IERC20",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "userOffers",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
];

export default marketplaceABI;
