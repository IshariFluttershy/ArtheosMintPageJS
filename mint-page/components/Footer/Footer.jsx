import {Flex, Text} from "@chakra-ui/react";

const Footer = () => {
    return (
        <Flex align="center" justify="center" my="sm" p="2rem" position="absolute"
        top="8900px" right="45%">
            <Text fontSize={12} fontWeight={400}>
                Copyright &copy; {new Date().getFullYear()}, All rights reserved - Artheos
            </Text>
        </Flex>
    )
}

export default Footer;