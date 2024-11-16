// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

contract AdvancedPredictionMarket {
    error InsufficientLiquidity();
    error MarketExpired();
    error UnauthorizedResolver();
    error MarketAlreadyResolved();
    error InvalidAmount();
    error InsufficientBalance();
    error MarketNotResolved();
    error WithdrawFailed();

    struct MarketBase {
        string question;          
        uint256 endTime;         
        uint256 resolutionTime;   
        bool resolved;            
        bool outcome;             
        bool cancelled;           
        uint256 totalLiquidity;   
    }

    struct MarketInfo {
        uint256 yesPool;          
        uint256 noPool;           
        address creator;          
        uint256 creatorFee;       
        mapping(address => uint256) yesStakes;  
        mapping(address => uint256) noStakes;   
    }

    mapping(uint256 => MarketBase) public marketsBase;
    mapping(uint256 => MarketInfo) private marketsInfo;
    uint256 public marketCount;

    uint256 public constant MIN_DURATION = 60;     // 60 seconds
    uint256 public constant MAX_DURATION = 1 days; // 1 day
    
    event MarketCreated(uint256 indexed marketId, string question, uint256 endTime, address creator);
    event PositionTaken(uint256 indexed marketId, address indexed user, bool isYes, uint256 amount);
    event MarketResolved(uint256 indexed marketId, bool outcome, uint256 totalPayout);
    event MarketCancelled(uint256 indexed marketId, uint256 refundAmount);

    function createMarket(
        string memory question,
        uint256 duration,
        uint256 _creatorFee
    ) external payable {
        if (duration < MIN_DURATION || duration > MAX_DURATION) revert InvalidAmount();
        if (_creatorFee > 500) revert InvalidAmount();
        if (msg.value < 1 ether) revert InsufficientLiquidity();

        uint256 marketId = marketCount++;
        MarketBase storage base = marketsBase[marketId];
        base.question = question;
        base.endTime = block.timestamp + duration;
        base.resolutionTime = base.endTime + 1 minutes;
        base.totalLiquidity = msg.value;

        MarketInfo storage info = marketsInfo[marketId];
        info.creator = msg.sender;
        info.creatorFee = _creatorFee;
        info.yesPool = msg.value / 2;
        info.noPool = msg.value / 2;

        emit MarketCreated(marketId, question, base.endTime, msg.sender);
    }

    function takePosition(uint256 marketId, bool isYes) external payable {
        MarketBase storage base = marketsBase[marketId];
        MarketInfo storage info = marketsInfo[marketId];

        if (block.timestamp >= base.endTime) revert MarketExpired();
        if (msg.value == 0) revert InvalidAmount();

        if (isYes) {
            info.yesPool += msg.value;
            info.yesStakes[msg.sender] += msg.value;
        } else {
            info.noPool += msg.value;
            info.noStakes[msg.sender] += msg.value;
        }

        emit PositionTaken(marketId, msg.sender, isYes, msg.value);
    }

    function resolveMarket(uint256 marketId, bool outcome) external {
        MarketBase storage base = marketsBase[marketId];
        MarketInfo storage info = marketsInfo[marketId];

        if (msg.sender != info.creator) revert UnauthorizedResolver();
        if (block.timestamp < base.resolutionTime) revert MarketExpired();
        if (base.resolved || base.cancelled) revert MarketAlreadyResolved();

        base.resolved = true;
        base.outcome = outcome;

        emit MarketResolved(marketId, outcome, base.totalLiquidity);
    }

    function claimPayout(uint256 marketId) external {
        MarketBase storage base = marketsBase[marketId];
        MarketInfo storage info = marketsInfo[marketId];

        if (!base.resolved) revert MarketNotResolved();

        uint256 payout = 0;
        if (base.outcome) {
            payout = calculatePayout(info.yesStakes[msg.sender], info.yesPool, info.noPool, info.creatorFee);
            info.yesStakes[msg.sender] = 0; // Reset stake after claiming
        } else {
            payout = calculatePayout(info.noStakes[msg.sender], info.noPool, info.yesPool, info.creatorFee);
            info.noStakes[msg.sender] = 0; // Reset stake after claiming
        }

        if (payout == 0) revert InsufficientBalance();

        (bool success, ) = payable(msg.sender).call{value: payout}("");
        if (!success) revert WithdrawFailed();
    }

    function calculatePayout(
        uint256 userStake,
        uint256 winningPool,
        uint256 losingPool,
        uint256 creatorFee
    ) internal pure returns (uint256) {
        uint256 totalPool = winningPool + losingPool;
        uint256 userShare = (userStake * totalPool) / winningPool;
        uint256 fee = (userShare * creatorFee) / 10000;
        return userShare - fee;
    }

    function cancelMarket(uint256 marketId) external {
        MarketBase storage base = marketsBase[marketId];
        MarketInfo storage info = marketsInfo[marketId];

        if (msg.sender != info.creator) revert UnauthorizedResolver();
        if (base.resolved || base.cancelled) revert MarketAlreadyResolved();

        base.cancelled = true;

        uint256 refund = info.yesPool + info.noPool;
        (bool success, ) = payable(info.creator).call{value: refund}("");
        if (!success) revert WithdrawFailed();

        emit MarketCancelled(marketId, refund);
    }

    function getMarketDetails(uint256 marketId) external view returns (
        string memory question,
        uint256 endTime,
        uint256 totalLiquidity,
        uint256 yesPool,
        uint256 noPool,
        address creator,
        bool resolved,
        bool cancelled
    ) {
        MarketBase storage base = marketsBase[marketId];
        MarketInfo storage info = marketsInfo[marketId];
        return (
            base.question,
            base.endTime,
            base.totalLiquidity,
            info.yesPool,
            info.noPool,
            info.creator,
            base.resolved,
            base.cancelled
        );
    }
}
