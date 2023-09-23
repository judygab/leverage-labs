import { BigInt } from "@graphprotocol/graph-ts"
import {
  Blend,
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
import { ExampleEntity } from "../generated/schema"

export function handleAdminChanged(event: AdminChanged): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from)

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from)

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.previousAdmin = event.params.previousAdmin
  entity.newAdmin = event.params.newAdmin

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.amountTaken(...)
  // - contract.blockRange(...)
  // - contract.borrow(...)
  // - contract.buyToBorrow(...)
  // - contract.buyToBorrowLocked(...)
  // - contract.buyToBorrowV2(...)
  // - contract.cancelledOrFulfilled(...)
  // - contract.getOfferHash(...)
  // - contract.getOracleOfferHash(...)
  // - contract.getSellOfferHash(...)
  // - contract.information(...)
  // - contract.liens(...)
  // - contract.nonces(...)
  // - contract.onERC721Received(...)
  // - contract.oracles(...)
  // - contract.owner(...)
  // - contract.pendingOwner(...)
  // - contract.proxiableUUID(...)
}

export function handleBeaconUpgraded(event: BeaconUpgraded): void {}

export function handleBuyLocked(event: BuyLocked): void {}

export function handleInitialized(event: Initialized): void {}

export function handleLoanOfferTaken(event: LoanOfferTaken): void {}

export function handleNonceIncremented(event: NonceIncremented): void {}

export function handleOfferCancelled(event: OfferCancelled): void {}

export function handleOwnershipTransferStarted(
  event: OwnershipTransferStarted
): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleRefinance(event: Refinance): void {}

export function handleRepay(event: Repay): void {}

export function handleSeize(event: Seize): void {}

export function handleStartAuction(event: StartAuction): void {}

export function handleUpgraded(event: Upgraded): void {}
