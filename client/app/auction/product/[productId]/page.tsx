'use client'

import useSWR from 'swr'
import { useSession } from 'next-auth/react'
import {
    Box,
    Badge,
    Image,
    Stack,
    Heading,
    Text,
    useToast,
} from '@chakra-ui/react'
import Base from '@/components/Base'
import { isAuth } from '@/components/Auth'
import { viewProductAPI, viewWinnerAPI } from '@/api/auction'
import LoadingSpinner from '@/components/LoadingSpinner'

function ViewProduct({ params }: { params: { productId: string } }) {
    const session = useSession()
    const toast = useToast()
    const { data: productData, isLoading: isLoadingProduct } = useSWR(
        session.data?.accessToken && params.productId
            ? [`product/${params.productId}`, session.data.accessToken]
            : null,
        ([url, token]) => viewProductAPI(url, token),
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

    const { data: winnerData, isLoading: isLoadingWinner } = useSWR(
        session.data?.accessToken && params.productId
            ? [`product/winner/${params.productId}`, session.data.accessToken]
            : null,
        ([url, token]) => viewWinnerAPI(url, token),
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
            {isLoadingProduct ? (
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
                            src={
                                productData?.photo ||
                                'https://placehold.co/300x200'
                            }
                            alt={productData?.name}
                            borderRadius="lg"
                            objectFit="cover"
                        />

                        <Badge
                            position="absolute"
                            top="1"
                            right="1"
                            colorScheme="teal"
                        >
                            {productData?.status}
                        </Badge>
                    </Box>

                    <Stack mt="6" spacing="3">
                        <Heading size="md">{productData?.name}</Heading>

                        <Text>{productData?.description}</Text>

                        <Heading size="md">Winner</Heading>

                        {isLoadingWinner ? (
                            <LoadingSpinner minH={'300px'} />
                        ) : !winnerData?.id ? (
                            <Text>No bid found.</Text>
                        ) : (
                            <>
                                <Text>id: {winnerData?.id}</Text>
                                <Text>email: {winnerData?.email}</Text>
                            </>
                        )}
                    </Stack>
                </Box>
            )}
        </Base>
    )
}

export default isAuth(ViewProduct)
