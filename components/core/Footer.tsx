import { Box, Flex, IconButton, useColorMode, Image } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import { FaGithub, FaMoon, FaSun } from "react-icons/fa";

function Footer() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box justifyContent="flex-end" position="fixed" right="36px" bottom="36px">
      <Flex alignItems="center" gap={4}>
        <Image
          aria-label="WalletConnect"
          src={
            "./pink-purple-glasses.png"
          }
        />
        <IconButton
          aria-label="toggle theme"
          size="md"
          rounded={"full"}
          onClick={toggleColorMode}
          icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
        />
      </Flex>
    </Box>
  );
}

export default Footer;
