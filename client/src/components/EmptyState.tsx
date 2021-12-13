import React from 'react'
import { Box, Heading, Stack, Text, Button } from '@chakra-ui/core'

const EmptyState = (): JSX.Element => {
  return (
    <Box
      backgroundColor="white"
      ml={0}
      mr={0}
      borderRadius={8}
      boxShadow="0px 4px 10px rgba(0, 0, 0, 0.05)"
    >
      <Box
        backgroundColor="gray.50"
        borderTopLeftRadius={8}
        borderTopRightRadius={8}
        borderBottom="1px solid"
        borderBottomColor="gray.200"
        height="40px"
      />
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={2}
        p={16}
        borderRadius={8}
      >
        <Heading size="lg">You haven’t added any campaigns.</Heading>
        <Text>Let’s get started.</Text>
        <Button>
          Create your first campaign!
        </Button>
      </Stack>
    </Box>
  )
}

export default EmptyState