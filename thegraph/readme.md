## The Graph

### Endpoint:
The subgraph was successfully deployed. 
https://api.studio.thegraph.com/query/53192/blend/0.0.26
version 26 is the one currently used, using a very recent blocktime.  (2-3 days ago)
version 27 coveres a little more time (7-8 days ago)... but not being used for the demo. 

### Note about the structure & context:
We have 2 entities: Lien and Loan. 

When a borrower takes out a loan for the first time, they get a lien. 
Throughout the course of the lien, there may be many different loans. 
The original loan may be withdrawn by the lender, leading to the borrower taking on a different loan offer from other lenders, most likely at a higher interest rate.
If they don't do that, there are only 2 options:
1. repay full amount to save collateral (Repay event)
2. lose the collateral (Seize event)

#### LoanOfferTaken
Most data comes from the LoanOfferTaken event. It's hard to decipher because even when a borrower repays some funds, the same loanOfferTaken event is emitted. 
Blur/Blend did some funky stuff with their data structures to save on gas, so the events are hard to understand.

So the event handlers distinguish between such situations to create a subgraph that logically separates these things. 

#### Seize, repay, StartAuction
When these events are triggered, the time this hpapened gets written into the lien entity.

## Usage in app

1. Notifications
We show notifications when a lender wants to withdraw a loan, therefore triggering the StartAuction event. That opens a 30 hour window for borrower to respond. 
Blur doesn't have good notifications at the moment. 
We query all liens with a recent "Auction Started" timestamp. 
If any of these apply to our user, we show a notification. 
For demo purposes, we just show various other users' "Start auction" alerts to the logged in account.

2. Insights
Having a clear data structure just with these 2 entities makes way for creating useful insights. 
We could only index a short time frame so the insights are limited to the events from the past few days. 
Nevertheless, it can show things like average loan duration, aggregate outstanding debt, see all new cases of liquidations. 


## next steps
We intend to further optimize our subgraph to enable deeper insights. 
We can see ourselves make a full dashboard, showing many insights that even Blur.io can't show to its users.

