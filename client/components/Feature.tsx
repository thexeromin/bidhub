'use client'

import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Icon,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import { ReactElement } from 'react'
import {
    FcAbout,
    FcAssistant,
    FcCollaboration,
    FcDonate,
    FcManager,
} from 'react-icons/fc'

interface CardProps {
    heading: string
    description: string
    icon: ReactElement
    href: string
}

const Card = ({ heading, description, icon, href }: CardProps) => {
    return (
        <Box
            maxW={{ base: 'full', md: '275px' }}
            w={'full'}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={5}
        >
            <Stack align={'start'} spacing={2}>
                <Flex
                    w={16}
                    h={16}
                    align={'center'}
                    justify={'center'}
                    color={'white'}
                    rounded={'full'}
                    bg={useColorModeValue('gray.100', 'gray.700')}
                >
                    {icon}
                </Flex>
                <Box mt={2}>
                    <Heading size="md">{heading}</Heading>
                    <Text mt={1} fontSize={'sm'}>
                        {description}
                    </Text>
                </Box>
                <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
                    Learn more
                </Button>
            </Stack>
        </Box>
    )
}

export default function gridListWith() {
    return (
        <Box p={4}>
            <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                <Heading
                    fontSize={{ base: '2xl', sm: '4xl' }}
                    fontWeight={'bold'}
                >
                    Smart Auction Management
                </Heading>
                <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }}>
                    Manage auctions effortlessly with smart reminders, real-time
                    updates, and seamless scheduling for every bid.
                </Text>
            </Stack>

            <Container maxW={'5xl'} mt={12}>
                <Flex flexWrap="wrap" gridGap={6} justify="center">
                    <Card
                        heading={'Support'}
                        icon={<Icon as={FcAssistant} w={10} h={10} />}
                        description={
                            'Get 24/7 assistance for all your auction needs.'
                        }
                        href={'#'}
                    />
                    <Card
                        heading={'Converstation'}
                        icon={<Icon as={FcCollaboration} w={10} h={10} />}
                        description={
                            'Engage seamlessly with buyers and sellers.'
                        }
                        href={'#'}
                    />
                    <Card
                        heading={'Deposit'}
                        icon={<Icon as={FcDonate} w={10} h={10} />}
                        description={
                            'Secure and manage your funds with ease.'
                        }
                        href={'#'}
                    />
                    <Card
                        heading={'Customer'}
                        icon={<Icon as={FcManager} w={10} h={10} />}
                        description={
                            'Track and manage customer interactions effortlessly.'
                        }
                        href={'#'}
                    />
                    <Card
                        heading={'FAQ'}
                        icon={<Icon as={FcAbout} w={10} h={10} />}
                        description={
                            'Find answers to common questions quickly.'
                        }
                        href={'#'}
                    />
                </Flex>
            </Container>
        </Box>
    )
}
