import useSWRMutation from 'swr/mutation'
import Link from 'next/link'
import {
    Card,
    CardBody,
    CardFooter,
    Image,
    Text,
    Heading,
    Button,
    ButtonGroup,
    Divider,
    Stack,
    useToast,
} from '@chakra-ui/react'
import { bidOnProductAPI } from '@/api/auction'

interface Props {
    id: string
    name: string
    description: string
    photo: string
    location: string
    sellerId: string
    startingBid: number
    currentBid: number
    status: string
    auctionId: string
    createdAt: string
    updatedAt: string
    token?: string
}

export default function ProductCard(props: Props) {
    const toast = useToast()
    const { trigger, isMutating } = useSWRMutation(
        props.token ? [`product/bid/${props.id}`, props.token] : null,
        ([url, token]) => bidOnProductAPI(url, token),
        {
            onSuccess: () => {
                toast({
                    title: 'Success',
                    description: 'Your bid added.',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                    position: 'top-right',
                })
            },
            onError: (err) => {
                toast({
                    title: 'Error',
                    description: err.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: 'top-right',
                })
            },
        },
    )
    return (
        <Card maxW="sm">
            <CardBody>
                <Image
                    src={props.photo}
                    alt="Green double couch with wooden legs"
                    borderRadius="lg"
                />
                <Stack mt="6" spacing="3">
                    <Heading size="md">{props.name}</Heading>
                    <Text>{props.description}</Text>
                    <Text color="blue.600" fontSize="2xl">
                        $ {props.currentBid}
                    </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <ButtonGroup spacing="2">
                    <Button
                        colorScheme="blue"
                        isLoading={isMutating}
                        onClick={() => trigger()}
                    >
                        Bid Now
                    </Button>

                    <Link href={`/auction/product/${props.id}`}>
                        <Button variant="ghost" colorScheme="blue">
                            View More
                        </Button>
                    </Link>
                </ButtonGroup>
            </CardFooter>
        </Card>
    )
}
