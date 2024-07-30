import { Spinner, HStack, LayoutProps } from '@chakra-ui/react'

interface Props {
    minH?: LayoutProps['minH']
}

export default function LoadingSpinner({ minH }: Props) {
    return (
        <HStack align={'center'} justify={'center'} minH={minH}>
            <Spinner
                color="green.500"
                thickness="4px"
                emptyColor="gray.200"
                size="xl"
            />
        </HStack>
    )
}
