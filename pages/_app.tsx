import '../styles/global.css';

import type { AppProps } from "next/app";
import { ChakraProvider, Box, Flex, Grid, GridItem, Image, HStack } from "@chakra-ui/react";
import { WagmiConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { theme } from "../styles/theme";
import Fonts from "../components/Fonts";
import Footer from "../components/core/Footer";
import "@web3inbox/widget-react/dist/compiled.css";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import Navbar from "../components/core/Navbar";

// 1. Get projectID at https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
if (!projectId) {
  throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
}

// 2. Configure Web3Modal
const chains = [mainnet];
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  appName: "GM Hackers",
});

createWeb3Modal({ wagmiConfig, projectId, chains });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Fonts />
        <HStack minH="100vh" sx={{
          background: `url('./background.png') center / cover`,
        }}>
          <WagmiConfig config={wagmiConfig}>
            <Grid
              minH="100vh"
              templateAreas={`"header" "main" "footer"`}
              w="100%"
              width="100%"
              gridTemplateRows={"100px 3f 40px"}
              gridTemplateColumns={"1fr"}
              // paddingY="2em"
              // backgroundImage="url('./background.png')"  // Replace 'your-image.jpg' with your image URL
              backgroundSize="cover"
              backgroundRepeat="no-repeat"
              backgroundPosition="center center"
            >
              <GridItem area={"header"} padding={4}>
                <Navbar />
              </GridItem>
              <GridItem area={"main"} padding={10}>
                <Flex
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Component {...pageProps} />
                </Flex>
              </GridItem>
              <GridItem area={"footer"}>
                <Footer />
              </GridItem>
            </Grid>
          </WagmiConfig>
        </HStack>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
