import React from 'react'
import ChartsContainer from '../components/ChartsContainer'
import { Flex, Container } from '@chakra-ui/react'


type Props = {}

const Dashboard = (props: Props) => {
  return (
    <Container maxW='md'>
      <Flex w="full" flexDirection={"column"}>
        <ChartsContainer />
      </Flex>
    </Container>
  )
}

export default Dashboard