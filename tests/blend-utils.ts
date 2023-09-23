import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  AdminChanged,
  BeaconUpgraded,
  BuyLocked,
  Initialized,
  LoanOfferTaken,
  NonceIncremented,
  OfferCancelled,
  OwnershipTransferStarted,
  OwnershipTransferred,
  Refinance,
  Repay,
  Seize,
  StartAuction,
  Upgraded
} from "../generated/Blend/Blend"

export function createAdminChangedEvent(
  previousAdmin: Address,
  newAdmin: Address
): AdminChanged {
  let adminChangedEvent = changetype<AdminChanged>(newMockEvent())

  adminChangedEvent.parameters = new Array()

  adminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdmin",
      ethereum.Value.fromAddress(previousAdmin)
    )
  )
  adminChangedEvent.parameters.push(
    new ethereum.EventParam("newAdmin", ethereum.Value.fromAddress(newAdmin))
  )

  return adminChangedEvent
}

export function createBeaconUpgradedEvent(beacon: Address): BeaconUpgraded {
  let beaconUpgradedEvent = changetype<BeaconUpgraded>(newMockEvent())

  beaconUpgradedEvent.parameters = new Array()

  beaconUpgradedEvent.parameters.push(
    new ethereum.EventParam("beacon", ethereum.Value.fromAddress(beacon))
  )

  return beaconUpgradedEvent
}

export function createBuyLockedEvent(
  lienId: BigInt,
  collection: Address,
  buyer: Address,
  seller: Address,
  tokenId: BigInt
): BuyLocked {
  let buyLockedEvent = changetype<BuyLocked>(newMockEvent())

  buyLockedEvent.parameters = new Array()

  buyLockedEvent.parameters.push(
    new ethereum.EventParam("lienId", ethereum.Value.fromUnsignedBigInt(lienId))
  )
  buyLockedEvent.parameters.push(
    new ethereum.EventParam(
      "collection",
      ethereum.Value.fromAddress(collection)
    )
  )
  buyLockedEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  buyLockedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  buyLockedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return buyLockedEvent
}

export function createInitializedEvent(version: i32): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return initializedEvent
}

export function createLoanOfferTakenEvent(
  offerHash: Bytes,
  lienId: BigInt,
  collection: Address,
  lender: Address,
  borrower: Address,
  loanAmount: BigInt,
  rate: BigInt,
  tokenId: BigInt,
  auctionDuration: BigInt
): LoanOfferTaken {
  let loanOfferTakenEvent = changetype<LoanOfferTaken>(newMockEvent())

  loanOfferTakenEvent.parameters = new Array()

  loanOfferTakenEvent.parameters.push(
    new ethereum.EventParam(
      "offerHash",
      ethereum.Value.fromFixedBytes(offerHash)
    )
  )
  loanOfferTakenEvent.parameters.push(
    new ethereum.EventParam("lienId", ethereum.Value.fromUnsignedBigInt(lienId))
  )
  loanOfferTakenEvent.parameters.push(
    new ethereum.EventParam(
      "collection",
      ethereum.Value.fromAddress(collection)
    )
  )
  loanOfferTakenEvent.parameters.push(
    new ethereum.EventParam("lender", ethereum.Value.fromAddress(lender))
  )
  loanOfferTakenEvent.parameters.push(
    new ethereum.EventParam("borrower", ethereum.Value.fromAddress(borrower))
  )
  loanOfferTakenEvent.parameters.push(
    new ethereum.EventParam(
      "loanAmount",
      ethereum.Value.fromUnsignedBigInt(loanAmount)
    )
  )
  loanOfferTakenEvent.parameters.push(
    new ethereum.EventParam("rate", ethereum.Value.fromUnsignedBigInt(rate))
  )
  loanOfferTakenEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  loanOfferTakenEvent.parameters.push(
    new ethereum.EventParam(
      "auctionDuration",
      ethereum.Value.fromUnsignedBigInt(auctionDuration)
    )
  )

  return loanOfferTakenEvent
}

export function createNonceIncrementedEvent(
  user: Address,
  newNonce: BigInt
): NonceIncremented {
  let nonceIncrementedEvent = changetype<NonceIncremented>(newMockEvent())

  nonceIncrementedEvent.parameters = new Array()

  nonceIncrementedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  nonceIncrementedEvent.parameters.push(
    new ethereum.EventParam(
      "newNonce",
      ethereum.Value.fromUnsignedBigInt(newNonce)
    )
  )

  return nonceIncrementedEvent
}

export function createOfferCancelledEvent(
  user: Address,
  salt: BigInt
): OfferCancelled {
  let offerCancelledEvent = changetype<OfferCancelled>(newMockEvent())

  offerCancelledEvent.parameters = new Array()

  offerCancelledEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  offerCancelledEvent.parameters.push(
    new ethereum.EventParam("salt", ethereum.Value.fromUnsignedBigInt(salt))
  )

  return offerCancelledEvent
}

export function createOwnershipTransferStartedEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferStarted {
  let ownershipTransferStartedEvent = changetype<OwnershipTransferStarted>(
    newMockEvent()
  )

  ownershipTransferStartedEvent.parameters = new Array()

  ownershipTransferStartedEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferStartedEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferStartedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createRefinanceEvent(
  lienId: BigInt,
  collection: Address,
  newLender: Address,
  newAmount: BigInt,
  newRate: BigInt,
  newAuctionDuration: BigInt
): Refinance {
  let refinanceEvent = changetype<Refinance>(newMockEvent())

  refinanceEvent.parameters = new Array()

  refinanceEvent.parameters.push(
    new ethereum.EventParam("lienId", ethereum.Value.fromUnsignedBigInt(lienId))
  )
  refinanceEvent.parameters.push(
    new ethereum.EventParam(
      "collection",
      ethereum.Value.fromAddress(collection)
    )
  )
  refinanceEvent.parameters.push(
    new ethereum.EventParam("newLender", ethereum.Value.fromAddress(newLender))
  )
  refinanceEvent.parameters.push(
    new ethereum.EventParam(
      "newAmount",
      ethereum.Value.fromUnsignedBigInt(newAmount)
    )
  )
  refinanceEvent.parameters.push(
    new ethereum.EventParam(
      "newRate",
      ethereum.Value.fromUnsignedBigInt(newRate)
    )
  )
  refinanceEvent.parameters.push(
    new ethereum.EventParam(
      "newAuctionDuration",
      ethereum.Value.fromUnsignedBigInt(newAuctionDuration)
    )
  )

  return refinanceEvent
}

export function createRepayEvent(lienId: BigInt, collection: Address): Repay {
  let repayEvent = changetype<Repay>(newMockEvent())

  repayEvent.parameters = new Array()

  repayEvent.parameters.push(
    new ethereum.EventParam("lienId", ethereum.Value.fromUnsignedBigInt(lienId))
  )
  repayEvent.parameters.push(
    new ethereum.EventParam(
      "collection",
      ethereum.Value.fromAddress(collection)
    )
  )

  return repayEvent
}

export function createSeizeEvent(lienId: BigInt, collection: Address): Seize {
  let seizeEvent = changetype<Seize>(newMockEvent())

  seizeEvent.parameters = new Array()

  seizeEvent.parameters.push(
    new ethereum.EventParam("lienId", ethereum.Value.fromUnsignedBigInt(lienId))
  )
  seizeEvent.parameters.push(
    new ethereum.EventParam(
      "collection",
      ethereum.Value.fromAddress(collection)
    )
  )

  return seizeEvent
}

export function createStartAuctionEvent(
  lienId: BigInt,
  collection: Address
): StartAuction {
  let startAuctionEvent = changetype<StartAuction>(newMockEvent())

  startAuctionEvent.parameters = new Array()

  startAuctionEvent.parameters.push(
    new ethereum.EventParam("lienId", ethereum.Value.fromUnsignedBigInt(lienId))
  )
  startAuctionEvent.parameters.push(
    new ethereum.EventParam(
      "collection",
      ethereum.Value.fromAddress(collection)
    )
  )

  return startAuctionEvent
}

export function createUpgradedEvent(implementation: Address): Upgraded {
  let upgradedEvent = changetype<Upgraded>(newMockEvent())

  upgradedEvent.parameters = new Array()

  upgradedEvent.parameters.push(
    new ethereum.EventParam(
      "implementation",
      ethereum.Value.fromAddress(implementation)
    )
  )

  return upgradedEvent
}
