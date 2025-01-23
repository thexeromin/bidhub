import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    UnorderedList,
    ListItem,
} from '@chakra-ui/react'

interface Props {
    isOpen: boolean
    onClose: () => void
}

export default function TestCredentialModal({ isOpen, onClose }: Props) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Test Credentails</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <UnorderedList>
                        <ListItem>Email: <b>{'test@example.com'} </b></ListItem>
                        <ListItem>Password: <b>{'wDG3vAXeCEjmDt0'} </b></ListItem>
                    </UnorderedList>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
