'use client'

import useSWR from 'swr'
import { useSession } from 'next-auth/react'
import { SimpleGrid, useToast } from '@chakra-ui/react'
import Base from '@/components/Base'
import { isAuth } from '@/components/Auth'
import { viewAuctionProductsAPI } from '@/api/auction'
import { ProductCard } from '@/components/Product'
import LoadingSpinner from '@/components/LoadingSpinner'

function ViewProducts({ params }: { params: { slug: string } }) {
    const session = useSession()
    const toast = useToast()
    const { data, isLoading } = useSWR(
        session.data?.accessToken
            ? [`auction/products/${params.slug}`, session.data.accessToken]
            : null,
        ([url, token]) => viewAuctionProductsAPI(url, token),
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
            <SimpleGrid
                columns={{ base: 1, md: 3, xl: 4 }}
                spacing={{ base: 5, lg: 15 }}
                padding={5}
            >
                {data?.map((product) => (
                    <ProductCard
                        key={product.id}
                        {...product}
                        token={session.data?.accessToken}
                    />
                ))}
            </SimpleGrid>
        </Base>
    )
}

export default isAuth(ViewProducts)
