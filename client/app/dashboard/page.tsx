'use client'

import { useSession } from 'next-auth/react'
import {
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
} from '@chakra-ui/react'
import { isAuth } from '@/components/Auth'
import Base from '@/components/Base'
import moment from 'moment'

function Dashboard() {
    const session = useSession()
    const user = {
        name: session.data?.user?.name || '',
        email: session.data?.user?.email || '',
        avatarUrl: session.data?.user?.image || 'https://bit.ly/broken-link',
        memberSince: moment().format('MMMM YYYY'),
        totalAuctions: 15,
        reputation: 4.8,
    }

    const recentBids = [
        { id: 1, item: 'Vintage Watch', amount: '$120', date: '2024-07-25' },
        { id: 2, item: 'Antique Vase', amount: '$350', date: '2024-07-22' },
        { id: 3, item: 'Art Piece', amount: '$220', date: '2024-07-20' },
    ]

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
                        <Flex alignItems="center">
                            <Badge colorScheme="green" mr={2}>
                                {user.totalAuctions} Auctions
                            </Badge>
                            <Badge colorScheme="yellow">
                                {user.reputation} Stars
                            </Badge>
                        </Flex>
                    </Stack>
                </Flex>
                <Box mt={5}>
                    <Text fontWeight="bold" fontSize="lg" mb={3}>
                        Recent Bids
                    </Text>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Item</Th>
                                <Th>Amount</Th>
                                <Th>Date</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {recentBids.map((bid) => (
                                <Tr key={bid.id}>
                                    <Td>{bid.item}</Td>
                                    <Td>{bid.amount}</Td>
                                    <Td>{bid.date}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            </Box>
        </Base>
    )
}

export default isAuth(Dashboard)
