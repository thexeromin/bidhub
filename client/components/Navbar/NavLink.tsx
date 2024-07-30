'use client'

import { useColorModeValue } from '@chakra-ui/react'
import ChakraNextLink from '../ChakraNextLink'

interface Props {
    link?: string
    children: React.ReactNode
}

export default function NavLink(props: Props) {
    const { children, link } = props

    return (
        <ChakraNextLink
            px={2}
            py={1}
            rounded={'md'}
            _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.700'),
            }}
            href={link || ''}
        >
            {children}
        </ChakraNextLink>
    )
}
