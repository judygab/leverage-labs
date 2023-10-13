"use client";
import { useCallback, useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "./NavLink";
import { Image } from "@chakra-ui/react";
import {
  useInitWeb3InboxClient,
  useManageSubscription,
  useW3iAccount,
} from "@web3inbox/widget-react";
import { useAccount, usePublicClient, useSignMessage } from "wagmi";
import {
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { Web3Button } from '@web3modal/react'

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN as string;

function Navbar() {
  /** Web3Inbox SDK hooks **/
  const isW3iInitialized = useInitWeb3InboxClient({
    projectId,
    domain: appDomain,
  });
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

  console.log("isSubscribed", isSubscribed);

  const { address } = useAccount({
    onDisconnect: () => {
      setAccount("");
    },
  });
  const { signMessageAsync } = useSignMessage();
  const wagmiPublicClient = usePublicClient();

  const { colorMode } = useColorMode();
  const toast = useToast();

  const [lastBlock, setLastBlock] = useState<string>();
  const [isBlockNotificationEnabled, setIsBlockNotificationEnabled] =
    useState(true);

  const signMessage = useCallback(
    async (message: string) => {
      const res = await signMessageAsync({
        message,
      });

      return res as string;
    },
    [signMessageAsync]
  );

  // We need to set the account as soon as the user is connected
  // useEffect(() => {
  //   if (!Boolean(address)) {
  //     toast({
  //       title: "Please connect your wallet to subscribe to notifications",
  //       position: "top",
  //       variant: "subtle",
  //     });
  //     return;
  //   }
  //   setAccount(`eip155:1:${address}`);
  // }, [signMessage, address, setAccount]);

  const handleRegistration = useCallback(async () => {
    if (!account) return;
    try {
      await registerIdentity(signMessage);
    } catch (registerIdentityError) {
      console.error({ registerIdentityError });
    }
  }, [signMessage, registerIdentity, account]);

  useEffect(() => {
    if (!identityKey) {
      handleRegistration();
    }
  }, [handleRegistration, identityKey]);

  return (
    <Flex alignItems="center" justifyContent={"space-between"} w="full" position="relative">
      <Flex gap={4} alignItems="center">
        <NavLink href="/">
          <Image
            aria-label="WalletConnect"
            src={
              "./logo.svg"
            }
          />
        </NavLink>
      </Flex>
      {/* <div className="flex">
        <button onClick={subscribe} className="bg-[#CAEFF9] hover:bg-[#99e4f9] px-4 py-2 mr-4 text-black rounded flex">
          <Image aria-label="ring" src={"./bell-rounded.svg"} paddingRight={2} />
          {(!Boolean(address) || !isSubscribed) ? <span>Subscribe to Alerts</span> : null}
        </button>
        <w3m-button label="Connect Wallet" balance="show" />
        <Web3Button />
      </div> */}
    </Flex>
  );
}

export default Navbar;
