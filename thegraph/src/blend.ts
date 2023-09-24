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

import { Lien, Loan } from "../generated/schema"


export function handleLoanOfferTaken(event: LoanOfferTaken): void {

  const lienId = event.params.lienId.toString()

  const loanAmount = event.params.loanAmount
  const rate = event.params.rate
  const lender = event.params.lender

  let lien = Lien.load(lienId)



  //scenario1: brand new lien. create new lien & loan
  if (!lien) {
    lien = new Lien(lienId)

    lien.collection = event.params.collection
    lien.tokenId = event.params.tokenId
    lien.borrower = event.params.borrower
    lien.timeStarted = event.block.timestamp
    lien.auctionDuration = event.params.auctionDuration

    let loan = new Loan(`${lender.toHexString()}-${rate}-${loanAmount}`)
    loan.lien = lienId
    loan.lienId = lienId
    loan.lender = lender
    loan.loanAmount = loanAmount
    loan.rate = rate
    loan.startTime = event.block.timestamp
    loan.save()

    lien.loans = [loan.id]
    lien.save()
  }

  else {

    let loans = lien.loans

    for (let i = 0; i < loans.length; i++) {
      let item = Loan.load(loans[i])

      if (item) {
        // scenario 2: same term. update loan amount (borrower paid back some money)
        if (item.lender == lender && item.rate == rate && item.loanAmount != loanAmount) {
          let loan = Loan.load(item.id)
          if (loan) {
            loan.loanAmount = loanAmount
            loan.save()
          }
        } else {
          // scenario 3: some term changed. create new loan.
          let loanid = `${lender.toHexString()}-${rate}-${loanAmount}`
          let loan = new Loan(loanid)
          loan.lien = lienId
          loan.lienId = lienId
          loan.lender = lender
          loan.loanAmount = loanAmount
          loan.rate = rate
          loan.startTime = event.block.timestamp
          loan.save()

          loans.push(loanid) // comment out for v16. no error v16.
          lien.loans = loans

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
  // const lienId = event.params.lienId

  // let lien = Lien.load(lienId.toString())
  // if (lien) {
  //   lien.repayTime = event.block.timestamp
  //   lien.save()
  // }
}

// track when SEIZE event was triggered
export function handleSeize(event: Seize): void {
  // const lienId = event.params.lienId

  // let lien = Lien.load(lienId.toString())
  // if (lien) {
  //   lien.seizeTime = event.block.timestamp
  //   lien.save()
  // }
}

export function handleStartAuction(event: StartAuction): void {
  // const lienId = event.params.lienId

  // let lien = Lien.load(lienId.toString())
  // if (lien) {
  //   lien.auctionStarted = event.block.timestamp
  //   lien.save()
  // }
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
