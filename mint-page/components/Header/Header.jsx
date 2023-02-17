import React, { useState } from "react";
import { Button, Flex, useToast, Text, Spinner, chakra, Image} from "@chakra-ui/react";
import { hasMetamask } from "../../utils/hasMetamask";
import useEthersProvider from "../../hooks/useEthersProvider";
import { ethers } from "ethers";

const Header = () => {

    const [isLoading, setIsLoading] = useState(false);
    const { account , setAccount, provider} = useEthersProvider();
    const toast = useToast();

    const connectWallet = async() => {
        if(!hasMetamask()) {
            toast({
                description: "Please install Metamask browser extension and retry",
                status: "error",
                duration: 4000,
                isClosable: "true"
            })
        }
        else {
            setIsLoading(true);
            if(provider) {
                let network = await provider.getNetwork();

                if(network.chainId !== 1) {
                    const resultAccount = await provider.send("eth_requestAccounts", []);
                    setAccount(ethers.utils.getAddress(resultAccount[0]));
                    setIsLoading(false);
                    toast({
                        description: "Your wallet has been successfully connected !",
                        status: "success",
                        duration: 4000,
                        isClosable: "true"
                    })
                }
                else {
                    setAccount(null)
                    setIsLoading(false)
                    toast({
                        description: "Please switch to main Ethereum network on Metamask",
                        status: "error",
                        duration: 4000,
                        isClosable: "true"
                    })
                }
            }
        }
    }

    return (
        <Flex
            align="center"
            flexDir={["column", "column","column","column", "row", "row"]}
            my="md"
            px={["sm", "sm", "lg", "lg"]}
            p="2rem"
            position={["null", "null", "null", "null", "absolute", "absolute"]}
            top={0}
            w="100%"
        >
            {/*<Text
                fontSize="2rem"
                fontWeight={900}
                letterSpacing={2}
            >
                Artheos
            </Text>*/}
            <Image
                src="Logo_small.jpg"
                quality={100}
                borderRadius="50%"
                width={["40%", "40%", "40%", "40%", "5%"]}
                height={["80%", "80%", "80%", "100%"]}
                /*width={["13rem", "17rem", "25rem", "30rem", "40%", "40%"]}
                height={["13rem", "17rem", "25rem", "30rem", "100%", "100%"]}*/
                marginBottom={["1rem", "1rem", "0rem", "0rem"]}
                objectFit="contain"
                align="center" justify="center"
            />
            <Flex
                align="center"
                justify="flex-end"
                flex={1}
                position={["null", "null", "null", "null", "absolute", "absolute"]}
                right="2%"
            >
                {isLoading ? (
                    <Spinner/>
                ) : account ? (
                    <Flex
                        flexDir="column"
                        align={["center", "center", "flex-end", "flex-end"]}
                    >
                        <Text
                            fontSize={15}
                        >
                            Connected Wallet : 
                            <chakra.span 
                                fontWeight="bold"
                                color="cyan.400"
                            >
                                {account.substring(0, 6)}...{account.substring(account.length - 4, account.lenght)}
                            </chakra.span>

                        </Text>
                    </Flex>
                ) : (
                    <Button
                        colorScheme="cyan"
                        bgGradient="linear(to-b, #ffffff, #61a6ce)"
                        _hover={{
                            bgGradient: 'linear(to-b, #ffffff, #61a6ce)',
                        }}
                        _active={{
                            bgGradient: 'linear(to-b, #ffffff, #61a6ce)',
                        }}
                        onClick={() => connectWallet()}
                        fontSize={15}
                    >
                        Connect Wallet
                    </Button>
                )}
            </Flex>
        </Flex>
    )
}

export default Header;