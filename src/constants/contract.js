export const CONTRACT_ADDRESS = "0xc3cb1b6fe92ded18a69d285d3f80a1cd8ab920e7"
export const CHAIN_ID = 88882
export const RPC_URL = "https://chiliz-spicy.publicnode.com"

export const CONTRACT_ABI = [
    {
        "inputs": [],
        "name": "InsufficientBalance",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InsufficientLiquidity",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidAmount",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidTimeframe",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "MarketAlreadyResolved",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "MarketExpired",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "MarketNotExpired",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "MarketNotResolved",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "UnauthorizedResolver",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "WithdrawFailed",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "marketId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "question",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "endTime",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "creator",
                "type": "address"
            }
        ],
        "name": "MarketCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "marketId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "outcome",
                "type": "bool"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "totalPayout",
                "type": "uint256"
            }
        ],
        "name": "MarketResolved",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "marketId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "isYes",
                "type": "bool"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "cost",
                "type": "uint256"
            }
        ],
        "name": "PositionTaken",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "MAX_DURATION",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "MIN_DURATION",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "marketId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isYes",
                "type": "bool"
            }
        ],
        "name": "calculateCost",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "marketId",
                "type": "uint256"
            }
        ],
        "name": "claimPosition",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "question",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "duration",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_creatorFee",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_minBet",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_maxBet",
                "type": "uint256"
            }
        ],
        "name": "createMarket",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "marketId",
                "type": "uint256"
            }
        ],
        "name": "getMarketDetails",
        "outputs": [
            {
                "internalType": "string",
                "name": "question",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "endTime",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "resolved",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "yesPool",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "noPool",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "creator",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "marketId",
                "type": "uint256"
            }
        ],
        "name": "getTimeRemaining",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "timeLeft",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isExpired",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "marketId",
                "type": "uint256"
            }
        ],
        "name": "getVoteCounts",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "yesVotes",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "noVotes",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "totalVotes",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "marketCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "marketsBase",
        "outputs": [
            {
                "internalType": "string",
                "name": "question",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "endTime",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "resolutionTime",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "resolved",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "outcome",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "cancelled",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "marketsInfo",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "yesPool",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "noPool",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "creator",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "creatorFee",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "minBet",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "maxBet",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "totalYesVotes",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "totalNoVotes",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "noPositions",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "marketId",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "outcome",
                "type": "bool"
            }
        ],
        "name": "resolveMarket",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "marketId",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isYes",
                "type": "bool"
            }
        ],
        "name": "takePosition",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "yesPositions",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]
