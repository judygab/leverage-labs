import { Box, Flex, IconButton, useColorMode, Image, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import Link from "next/link";
import { FaGithub, FaMoon, FaSun } from "react-icons/fa";
import MessageBot from "../MessageBot";
import { useW3iAccount, useManageSubscription } from "@web3inbox/widget-react";
// import XRoundedIcon from "../public/x-rounded.svg";

function Footer() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [notificationsShow, setNotificationsShow] = useState(true);
  const { account } = useW3iAccount();
  const {
    isSubscribed,
  } = useManageSubscription(account);

  const toggleNotifications = () => {
    setNotificationsShow(prevNotificationsShow => !prevNotificationsShow);
  }

  console.log(account);

  return (
    <Box justifyContent="flex-end" position="fixed" right="36px" bottom="36px">
      <Flex alignItems="end" flexDirection="column" position="relative">
        {account && <>
          <div className="rounded-full w-2 h-2 bg-red-500 absolute right-3 top-0"></div>
          <button onClick={toggleNotifications}><Image marginBottom="-22px" aria-label="ring" src={"./bell-rounded-light.svg"} paddingRight={2} /></button>
        </>}
        <Image
          aria-label="WalletConnect"
          src={
            "./noun8.png"
          }
          height={130}
        />
        {
          account && notificationsShow && isSubscribed && <><MessageBot close={() => setNotificationsShow(false)} />
            <Image
              aria-label="Notification"
              src={
                "./notification-tail.png"
              }
              position={"absolute"}
              right="1.5rem"
              bottom="9.5rem"
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
