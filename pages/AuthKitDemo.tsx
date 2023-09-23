// import Box from '@mui/material/Box'
// import Button from '@mui/material/Button'
// import Divider from '@mui/material/Divider'
// import Link from '@mui/material/Link'
// import Stack from '@mui/material/Stack'
import { Text, Button } from '@chakra-ui/react'
// import Code from 'src/components/code/Code'

// import ConnectedWalletLabel from 'src/components/connected-wallet-label/ConnectedWalletLabel'
// import SafeAccount from 'src/components/safe-account/SafeAccount'
import { useAccountAbstraction } from '../store/accountAbstractionContext'
import { WEB3AUTH_SNIPPET } from '../utils/snippets'

const AuthKitDemo = () => {
  const { loginWeb3Auth, isAuthenticated } = useAccountAbstraction()
  console.log('isAuthenticated', isAuthenticated)
  console.log('loginWeb3Auth', loginWeb3Auth);

  return (
    <>
      <Text variant="h2">
        The Auth Kit
      </Text>

      <Text marginTop="16px">
        Generate or authenticate a blockchain account using an email address, social media account,
        or traditional crypto wallets like Metamask.
      </Text>

      <Text marginTop="24px" marginBottom="8px">
        Find more info at:
      </Text>

      {/*  Auth Demo */}
      {/* <Text variant="h4" component="h2" fontWeight="700" marginBottom="16px">
        Interactive demo
      </Text>

      {isAuthenticated ? (
        <Box display="flex" gap={3}> */}
      {/* safe Account */}
      {/* <SafeAccount flex={1} /> */}

      {/* owner ID */}
      {/* <ConnectedContainer flex={2}>
            <Text fontWeight="700">Owner ID</Text>

            <Text fontSize="14px" marginTop="8px" marginBottom="32px">
              Your Owner account signs transactions to unlock your assets.
            </Text> */}

      {/* Owner details */}
      {/* <ConnectedWalletLabel />
          </ConnectedContainer>
        </Box>
      ) : (
        <ConnectContainer display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Text variant="h4" component="h3" fontWeight="700">
            Create a safe using the Auth Kit
          </Text> */}

      <button onClick={loginWeb3Auth}>
        Connect
      </button>
      {/* </ConnectContainer>
      )}

      <Divider style={{ margin: '40px 0 30px 0' }} />

      <Text variant="h3" component="h2" fontWeight="700" marginBottom="16px">
        How to use it
      </Text> */}
    </>
  )
}

export default AuthKitDemo