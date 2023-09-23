import { Box, Flex, IconButton, useColorMode, Image, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import Link from "next/link";
import { FaGithub, FaMoon, FaSun } from "react-icons/fa";
import MessageBot from "../MessageBot";
// import XRoundedIcon from "../public/x-rounded.svg";

function Footer() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [notificationsShow, setNotificationsShow] = useState(true);

  return (
    <Box justifyContent="flex-end" position="fixed" right="36px" bottom="36px">
      <Flex alignItems="center" gap={4} position="relative">
        <Image
          aria-label="WalletConnect"
          src={
            "./pink-purple-glasses.png"
          }
        />
        {
          notificationsShow && <><MessageBot close={() => setNotificationsShow(false)} />
            <Image
              aria-label="Notification"
              src={
                "./notification-tail.png"
              }
              position={"absolute"}
              right="1.5rem"
              bottom="5rem"
              zIndex={0}
            />
          </>}
        {/* <IconButton
          aria-label="toggle theme"
          size="md"
          rounded={"full"}
          onClick={toggleColorMode}
          icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
        /> */}
      </Flex>
    </Box>
  );
}

export default Footer;
