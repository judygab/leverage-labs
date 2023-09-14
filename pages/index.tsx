"use client";
import { Box, Flex } from "@chakra-ui/react";
import {
  useManageView,
  useAccount as useW3iAccount,
  W3iWidget,
} from "@web3inbox/widget-react";
import "@web3inbox/widget-react/dist/compiled.css";

import type { NextPage } from "next";
import { useCallback, useEffect, useRef, useState } from "react";

import DefaultView from "../views/DefaultView";
import SignedInView from "../views/SignedInView";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useSignMessage } from "wagmi";
import dynamic from "next/dynamic";
import { useOnClickOutside } from "usehooks-ts";

const Web3ModalButton = dynamic(
  () => import("@web3modal/react").then((w3m) => w3m.Web3Button),
  {
    ssr: false,
  }
);

const Home: NextPage = () => {
  const [view, changeView] = useState<"default" | "qr" | "signedIn">("default");
  const { address, isConnected, connector } = useAccount({
    onDisconnect: () => {
      changeView("default");
    },
  });
  const { signMessageAsync } = useSignMessage();

  const signMessage = useCallback(
    async (message: string) => {
      const res = await signMessageAsync({
        message,
      });

      return res as string;
    },
    [signMessageAsync]
  );

  const ref = useRef(null);
  const { setAccount } = useW3iAccount(signMessage);
  const [currentAddress, setCurrentAddress] = useState<`0x${string}`>();
  const { close: closeW3I } = useManageView();
  const { close, open } = useWeb3Modal();

  useOnClickOutside(ref, closeW3I);

  useEffect(() => {
    if (!address) return;
    setCurrentAddress(address);
    setAccount(`eip155:1:${address}`);
  }, [address, setAccount]);

  const connect = useCallback(async () => {
    if (!connector) return open();
    try {
      const connected = await connector.connect({
        chainId: 1,
      });
      console.log({ connected });
    } catch (error) {
      console.log({ error });
    }
  }, [connector, open]);

  useEffect(() => {
    if (currentAddress && isConnected) {
      changeView("signedIn");
      close();
    }
  }, [currentAddress, changeView, close, isConnected]);

  return (
    <>
      <Flex
        width={"100%"}
        justifyContent="center"
        position="relative"
        zIndex={0}
      >
        {view === "default" ? <DefaultView /> : <SignedInView />}
      </Flex>
      <Flex width={"100vw"}>
        <Flex
          position="fixed"
          top={"36px"}
          right={"36px"}
          alignItems="center"
          gap="16px"
          zIndex={1}
        >
          <Box
            ref={ref}
            maxH="600px"
            maxW="400px"
            rounded="2xl"
            position="fixed"
            top={20}
            right={20}
          >
            {currentAddress && (
              <W3iWidget
                account={currentAddress}
                onConnect={connect}
                onSign={signMessage}
                domain="dev.gm.walletconnect.com"
              />
            )}
          </Box>

          {isConnected && (
            <Web3ModalButton
              icon="show"
              label="Connect Wallet"
              balance="show"
            />
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default Home;