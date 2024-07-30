'use client'

import useSWR from 'swr'
import { useSession } from 'next-auth/react'
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    SimpleGrid,
    useToast,
} from '@chakra-ui/react'
import Base from '@/components/Base'
import { isAuth } from '@/components/Auth'
import { viewAllAuctionAPI } from '@/api/auction'
import { AuctionCard } from '@/components/Auction'
import LoadingSpinner from '@/components/LoadingSpinner'

function ViewAuctions() {
    const session = useSession()
    const toast = useToast()
    const { data, isLoading } = useSWR(
        session.data?.accessToken
            ? ['auction', session.data.accessToken]
            : null,
        ([url, token]) => viewAllAuctionAPI(url, token),
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

    return (
        <Base>
            {isLoading && <LoadingSpinner minH={'300px'} />}
            {!data?.length && (
                <Alert status="info" mt={5}>
                    <AlertIcon />
                    No auction found.
                </Alert>
            )}
            <SimpleGrid
                columns={{ base: 1, md: 3, xl: 3 }}
                spacing={{ base: 5, lg: 10 }}
                padding={5}
            >
                {data?.map((auction) => (
                    <AuctionCard
                        key={auction.id}
                        photo={'https://placehold.co/600x400'}
                        {...auction}
                    />
                ))}
            </SimpleGrid>
        </Base>
    )
}

export default isAuth(ViewAuctions)
