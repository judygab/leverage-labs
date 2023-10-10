import { BigInt, log } from "@graphprotocol/graph-ts"

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

import { Lien, Loan } from "../generated/schema"

// LoanOfferTaken is used to emit various situations
// 1. brand new lien. corresponding new loan. 
// 2. borrower repays some money, so loan amount is updated. no new loan is created.
// 3. new loan created on existing lien. (eg. new terms, new lender and/or new amount)
// Handle accordingly: organize data into Lien and Loan
export function handleLoanOfferTaken(event: LoanOfferTaken): void {

  const lienId = event.params.lienId.toString()

  const loanAmount = event.params.loanAmount
  const rate = event.params.rate
  const lender = event.params.lender

  // try to obtain lienId: see if it's already indexed
  let lien = Lien.load(lienId)

  //scenario1: brand new lien. create new lien & loan
  if (!lien) {
    lien = new Lien(lienId)

    lien.collection = event.params.collection
    lien.tokenId = event.params.tokenId
    lien.borrower = event.params.borrower
    lien.timeStarted = event.block.timestamp
    lien.auctionDuration = event.params.auctionDuration

    let loan = new Loan(lender.toHexString() + "_" + rate.toHexString() + "_" + loanAmount.toHexString())
    loan.lien = lienId   // links to parent lien
    loan.lienId = lienId
    loan.lender = lender
    loan.loanAmount = loanAmount
    loan.rate = rate
    loan.startTime = event.block.timestamp
    loan.save()

    // lien.loans = [loan.id]
    lien.save()
  }

  else {

    let loans = lien.loans.load()
    let loansLength = loans.length  //prior to setting this length variable, the loop was running infinitely.

    for (let i = 0; i < loansLength; i++) {
      let item = Loan.load(loans[i].id)

      if (item) {
        // scenario 2: same term. update loan amount (borrower paid back some money)
        if (item.lender == lender && item.rate == rate && item.loanAmount != loanAmount) {
          item.loanAmount = loanAmount
          item.save()
        } else {
          // scenario 3: some term changed. create new loan.
          let loan = new Loan(lender.toHexString() + "_" + rate.toHexString() + "_" + loanAmount.toHexString())
          loan.lien = lienId
          loan.lienId = lienId
          loan.lender = lender
          loan.loanAmount = loanAmount
          loan.rate = rate
          loan.startTime = event.block.timestamp
          loan.save()

          //old code to when lien.loans was manually managed as an array of IDs
          // let newArray = loans
          // newArray.push(loan) // comment out for v16. no error v16.
          // lien.loans = newArray
          // log.warning("Loop # {}", [i.toString()])

          //reset auction start, assuming new loan was taken on existing lien
          lien.auctionStarted = null

          lien.save()
        }
      }
    }
  }
}


// track when repay event was triggered
export function handleRepay(event: Repay): void {
  const lienId = event.params.lienId

  let lien = Lien.load(lienId.toString())
  if (lien) {
    lien.repayTime = event.block.timestamp
    lien.save()
  }
}

// track when SEIZE event was triggered
export function handleSeize(event: Seize): void {
  const lienId = event.params.lienId

  let lien = Lien.load(lienId.toString())
  if (lien) {
    lien.seizeTime = event.block.timestamp
    lien.save()
  }
}

export function handleStartAuction(event: StartAuction): void {
  log.warning("Found StartAuction Event {}", [ event.params.lienId.toString() ])
  const lienId = event.params.lienId

  let lien = Lien.load(lienId.toString())
  if (lien) {
    lien.auctionStarted = event.block.timestamp
    lien.save()
  }
}



export function handleBeaconUpgraded(event: BeaconUpgraded): void { }

export function handleBuyLocked(event: BuyLocked): void { }

export function handleInitialized(event: Initialized): void { }



export function handleNonceIncremented(event: NonceIncremented): void { }

export function handleOfferCancelled(event: OfferCancelled): void { }

export function handleOwnershipTransferStarted(
  event: OwnershipTransferStarted
): void { }

export function handleOwnershipTransferred(event: OwnershipTransferred): void { }

export function handleRefinance(event: Refinance): void { }


export function handleUpgraded(event: Upgraded): void { }
