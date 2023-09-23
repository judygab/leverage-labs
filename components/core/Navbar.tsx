import { Flex } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "./NavLink";
import { Image } from "@chakra-ui/react";

function Navbar() {
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
      <w3m-button label="Connect Wallet" balance="show" />
    </Flex>
  );
}

export default Navbar;
