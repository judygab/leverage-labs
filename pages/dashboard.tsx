import React, { useEffect } from 'react'
import ChartsContainer from '../components/ChartsContainer'
import { Flex, Container } from '@chakra-ui/react'
import {
  useInitWeb3InboxClient,
  useManageSubscription,
  useW3iAccount,
} from "@web3inbox/widget-react";
import "@web3inbox/widget-react/dist/compiled.css";
import useSendNotification from "../utils/useSendNotification";


type Props = {}

const Dashboard = (props: Props) => {
  const {
    account,
    setAccount,
    register: registerIdentity,
    identityKey,
  } = useW3iAccount();
  const {
    subscribe,
    unsubscribe,
    isSubscribed,
    isSubscribing,
    isUnsubscribing,
  } = useManageSubscription(account);
  const { handleSendNotification, isSending } = useSendNotification();

  useEffect(() => {
    if (!Boolean(account)) return;
    if (!isSubscribed) {
      return;
    }

    const fetchData = async () => {
      const result = await fetch("/api/auctions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await result.json();
      const results = data?.data?.liens?.slice(-3) || [];
      console.log(data)
      results.forEach((result: any) => {
        handleSendNotification({
          title: "Auction Started",
          body: result.auctionStarted,
          icon: `${window.location.origin}/eth-glyph-colored.png`,
          url: `https://etherscan.io/tx/${result.auctionStarted}`,
          type: "transactional",
        });
      }
      )
    }
    fetchData();
  }, [account, isSubscribed]);

  return (
    <Container maxW='8xl'>
      <Flex w="full" flexDirection={"column"}>
        <ChartsContainer />
      </Flex>
    </Container>
  )
}

export default Dashboard