import React, { useState } from "react";
import { Button, Flex, useToast, Text, Spinner, chakra} from "@chakra-ui/react";
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
            h="100%"
        >
            <Text
                fontSize="2rem"
                fontWeight={900}
                letterSpacing={2}
            >
                Artheos
            </Text>
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