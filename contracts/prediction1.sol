// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

contract PredictionMarket {
    error InsufficientLiquidity();
    error MarketExpired();
    error MarketNotExpired();
    error UnauthorizedResolver();
    error MarketAlreadyResolved();
    error InvalidAmount();
    error InsufficientBalance();
    error MarketNotResolved();
    error InvalidTimeframe();
    error WithdrawFailed();

    struct MarketBase {
        string question;          
        uint256 endTime;         
        uint256 resolutionTime;   
        bool resolved;            
        bool outcome;             
        bool cancelled;           
    }

    struct MarketInfo {
        uint256 yesPool;          
        uint256 noPool;           
        address creator;          
        uint256 creatorFee;       
        uint256 minBet;           
        uint256 maxBet;           
        uint256 totalYesVotes;    
        uint256 totalNoVotes;     
    }

    // State variables
    mapping(uint256 => MarketBase) public marketsBase;
    mapping(uint256 => MarketInfo) public marketsInfo;
    mapping(uint256 => mapping(address => uint256)) public yesPositions;
    mapping(uint256 => mapping(address => uint256)) public noPositions;
    uint256 public marketCount;
    
    uint256 public constant MIN_DURATION = 60;     // 60 seconds
    uint256 public constant MAX_DURATION = 1 days; // 1 day
    
    event MarketCreated(uint256 indexed marketId, string question, uint256 endTime, address creator);
    event PositionTaken(uint256 indexed marketId, address indexed user, bool isYes, uint256 amount, uint256 cost);
    event MarketResolved(uint256 indexed marketId, bool outcome, uint256 totalPayout);

    function createMarket(
        string memory question,
        uint256 duration,
        uint256 _creatorFee,
        uint256 _minBet,
        uint256 _maxBet
    ) external payable {
        if (duration < MIN_DURATION || duration > MAX_DURATION) revert InvalidTimeframe();
        if (_creatorFee > 500) revert InvalidAmount();
        if (_minBet >= _maxBet) revert InvalidAmount();
        if (msg.value < _minBet * 2) revert InsufficientLiquidity();

        uint256 marketId = marketCount++;
        
        MarketBase storage base = marketsBase[marketId];
        MarketInfo storage info = marketsInfo[marketId];
        
        base.question = question;
        base.endTime = block.timestamp + duration;
        base.resolutionTime = base.endTime + 1 minutes;
        
        info.creator = msg.sender;
        info.creatorFee = _creatorFee;
        info.minBet = _minBet;
        info.maxBet = _maxBet;
        info.yesPool = msg.value / 2;
        info.noPool = msg.value / 2;
        
        emit MarketCreated(marketId, question, base.endTime, msg.sender);
    }

    function takePosition(uint256 marketId, bool isYes) external payable {
        MarketBase storage base = marketsBase[marketId];
        MarketInfo storage info = marketsInfo[marketId];
        
        if (block.timestamp >= base.endTime) revert MarketExpired();
        if (base.cancelled) revert MarketAlreadyResolved();
        if (msg.value < info.minBet) revert InvalidAmount();
        if (msg.value > info.maxBet) revert InvalidAmount();
        
        uint256 amount = msg.value;
        uint256 cost = calculateCost(marketId, amount, isYes);
        
        if (isYes) {
            info.yesPool += amount;
            yesPositions[marketId][msg.sender] += amount;
            info.totalYesVotes++;
        } else {
            info.noPool += amount;
            noPositions[marketId][msg.sender] += amount;
            info.totalNoVotes++;
        }
        
        emit PositionTaken(marketId, msg.sender, isYes, amount, cost);
    }

    function calculateCost(
        uint256 marketId,
        uint256 amount,
        bool isYes
    ) public view returns (uint256) {
        MarketInfo storage info = marketsInfo[marketId];
        
        uint256 pool = isYes ? info.yesPool : info.noPool;
        uint256 otherPool = isYes ? info.noPool : info.yesPool;
        
        uint256 cost = (amount * otherPool) / pool;
        return cost + (cost * info.creatorFee) / 10000;
    }

    function getVoteCounts(uint256 marketId) external view returns (
        uint256 yesVotes,
        uint256 noVotes,
        uint256 totalVotes
    ) {
        MarketInfo storage info = marketsInfo[marketId];
        return (
            info.totalYesVotes,
            info.totalNoVotes,
            info.totalYesVotes + info.totalNoVotes
        );
    }

    function getTimeRemaining(uint256 marketId) external view returns (
        uint256 timeLeft,
        bool isExpired
    ) {
        MarketBase storage base = marketsBase[marketId];
        if (block.timestamp >= base.endTime) {
            return (0, true);
        }
        return (base.endTime - block.timestamp, false);
    }

    function resolveMarket(uint256 marketId, bool outcome) external {
        MarketBase storage base = marketsBase[marketId];
        MarketInfo storage info = marketsInfo[marketId];
        
        if (msg.sender != info.creator) revert UnauthorizedResolver();
        if (block.timestamp < base.resolutionTime) revert MarketNotExpired();
        if (base.resolved || base.cancelled) revert MarketAlreadyResolved();
        
        base.resolved = true;
        base.outcome = outcome;
        
        emit MarketResolved(marketId, outcome, info.yesPool + info.noPool);
    }

    function claimPosition(uint256 marketId) external {
        MarketBase storage base = marketsBase[marketId];
        
        if (!base.resolved && !base.cancelled) revert MarketNotResolved();
        
        uint256 payout = calculatePayout(marketId, msg.sender);
        if (payout == 0) revert InsufficientBalance();
        
        clearPositions(marketId, msg.sender, base.outcome || base.cancelled);
        
        (bool success, ) = payable(msg.sender).call{value: payout}("");
        if (!success) revert WithdrawFailed();
    }

    function calculatePayout(uint256 marketId, address user) internal view returns (uint256) {
        MarketBase storage base = marketsBase[marketId];
        if (base.cancelled) {
            return yesPositions[marketId][user] + noPositions[marketId][user];
        }
        return base.outcome ? yesPositions[marketId][user] : noPositions[marketId][user];
    }

    function clearPositions(uint256 marketId, address user, bool clearYes) internal {
        if (clearYes) {
            yesPositions[marketId][user] = 0;
        } else {
            noPositions[marketId][user] = 0;
        }
    }

    function getMarketDetails(uint256 marketId) external view returns (
        string memory question,
        uint256 endTime,
        bool resolved,
        uint256 yesPool,
        uint256 noPool,
        address creator
    ) {
        MarketBase storage base = marketsBase[marketId];
        MarketInfo storage info = marketsInfo[marketId];
        return (
            base.question,
            base.endTime,
            base.resolved,
            info.yesPool,
            info.noPool,
            info.creator
        );
    }
}