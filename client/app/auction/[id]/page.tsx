'use client'

import useSWR from 'swr'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import {
    Box,
    Badge,
    Image,
    Stack,
    Heading,
    Text,
    Button,
    useToast,
} from '@chakra-ui/react'
import Base from '@/components/Base'
import { isAuth } from '@/components/Auth'
import { viewAuctionAPI } from '@/api/auction'
import LoadingSpinner from '@/components/LoadingSpinner'

function ViewAuction({ params }: { params: { id: string } }) {
    const session = useSession()
    const toast = useToast()
    const { data: auctionData, isLoading: isLoadingAuction } = useSWR(
        session.data?.accessToken && params.id
            ? [`auction/${params.id}`, session.data.accessToken]
            : null,
        ([url, token]) => viewAuctionAPI(url, token),
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
            {isLoadingAuction ? (
                <LoadingSpinner minH={'300px'} />
            ) : (
                <Box
                    p={5}
                    shadow="md"
                    borderWidth="1px"
                    borderRadius="lg"
                    mt={10}
                >
                    <Box position="relative">
                        <Image
                            src={'https://placehold.co/300x200'}
                            alt={auctionData?.title}
                            borderRadius="lg"
                            objectFit="cover"
                        />

                        <Badge
                            position="absolute"
                            top="1"
                            right="1"
                            colorScheme="teal"
                        >
                            {auctionData?.status}
                        </Badge>
                    </Box>

                    <Stack mt="6" spacing="3">
                        <Heading size="md">{auctionData?.title}</Heading>

                        <Text>{auctionData?.description}</Text>

                        <Text>
                            Start Date:{' '}
                            {new Date(
                                auctionData?.startDate || 0,
                            ).toLocaleString()}
                        </Text>

                        <Text>
                            End Date:{' '}
                            {new Date(
                                auctionData?.endDate || 0,
                            ).toLocaleString()}
                        </Text>

                        <Stack direction="row" spacing={4}>
                            <Link href={`/auction/product/add/${params.id}`}>
                                <Button variant="solid" colorScheme="blue">
                                    List Product
                                </Button>
                            </Link>

                            <Link href={`/auction/products/${params.id}`}>
                                <Button variant="solid" colorScheme="green">
                                    View Products
                                </Button>
                            </Link>
                        </Stack>
                    </Stack>
                </Box>
            )}
        </Base>
    )
}

export default isAuth(ViewAuction)
