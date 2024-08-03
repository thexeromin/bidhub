'use client'

import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import moment from 'moment'
import {
    Alert,
    AlertIcon,
    Box,
    Flex,
    Avatar,
    Text,
    Stack,
    Badge,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    useToast
} from '@chakra-ui/react'
import { isAuth } from '@/components/Auth'
import LoadingSpinner from '@/components/LoadingSpinner'
import Base from '@/components/Base'
import { Bid } from '@/api/types'
import { handleGetReq } from '@/api'

function Dashboard() {
    const session = useSession()
    const toast = useToast()
    const { data, isLoading } = useSWR(
        session.data?.accessToken
            ? ['product/bid/recent_bids', session.data.accessToken]
            : null,
        ([url, token]) => handleGetReq<Array<Bid>>(url, token),
        {
            onError: (error) => {
                toast({
                    title: 'An error occurred.',
                    description: error.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'top-right',
                })
            },
        },
    )
    const user = {
        name: session.data?.user?.name || '',
        email: session.data?.user?.email || '',
        avatarUrl: session.data?.user?.image || 'https://bit.ly/broken-link',
        memberSince: moment(session.data?.user?.createdAt).format('MMMM YYYY'),
        totalAuctions: 15,
        reputation: 4.8,
    }

    return (
        <Base>
            <Box mt={5} p={5} shadow="md" borderWidth="1px" borderRadius="md">
                <Flex alignItems="center">
                    <Avatar size="xl" name={user.name} src={user.avatarUrl} />
                    <Stack ml={4}>
                        <Text fontWeight="bold" fontSize="xl">
                            {user.name}
                        </Text>
                        <Text>{user.email}</Text>
                        <Text color="gray.500">
                            Member since {user.memberSince}
                        </Text>
                        {/* <Flex alignItems="center">
                            <Badge colorScheme="green" mr={2}>
                                {user.totalAuctions} Auctions
                            </Badge>
                            <Badge colorScheme="yellow">
                                {user.reputation} Stars
                            </Badge>
                        </Flex> */}
                    </Stack>
                </Flex>
                <Box mt={5}>
                    <Text fontWeight="bold" fontSize="lg" mb={3}>
                        Recent Bids
                    </Text>
                    {isLoading && <LoadingSpinner minH={'300px'} />}
                    {!data?.length ? (
                        <Alert status="info" mt={5}>
                            <AlertIcon />
                            No bids found.
                        </Alert>
                    ) : (

                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>Product Id</Th>
                                    <Th>Amount</Th>
                                    <Th>Date</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data.map((bid) => (
                                    <Tr key={bid.id}>
                                        <Td>{bid.productId}</Td>
                                        <Td>{bid.amount}</Td>
                                        <Td>{moment(bid.createdAt).fromNow()}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    )}
                </Box>
            </Box>
        </Base>
    )
}

export default isAuth(Dashboard)
