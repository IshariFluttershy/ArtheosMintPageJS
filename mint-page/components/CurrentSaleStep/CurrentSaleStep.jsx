import React, { useEffect, useState } from "react";
import { Image, Button, Flex, Spinner, useToast, chakra, Text, Center} from "@chakra-ui/react";
import useEthersProvider from "../../hooks/useEthersProvider";
import Contract from "../../ArtheosYushaERC721R.json";
import { ethers } from "ethers";
import tokens from "../../tokens.json";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256"; 
import { CONTRACT_ADDRESS } from "../../utils/constants";


const CurrentSaleStep = (props) => {
    const { account, provider } = useEthersProvider();
    const [isLoading, setIsLoading] = useState(false);
    const [seconds, setSeconds] = useState(null);
    const [minutes, setMinutes] = useState(null);
    const [hours, setHours] = useState(null);
    const [days, setDays] = useState(null);
    const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000));
    const [isAvaliable, setIsAvaliable] = useState(false);
    const [multipleMintAvaliable, setMultipleMintAvaliable] = useState(false);
    const [mintIsLoading, setMintIsLoading] = useState(false);
    const [counter, setCounter] = useState(1);

    const saleStartTime = props.startTimestamp;

    const toast = useToast();
    const contractAddress = CONTRACT_ADDRESS;

    useEffect(() => {
        getCount()
    }, [])

    const mint = async() => {
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, Contract.abi, signer);

        let tab = [];
        tokens.map((token) => {
            tab.push(token.address);
        });
        let leaves = tab.map((address) => keccak256(address));
        let tree = new MerkleTree(leaves, keccak256, {sort: true});
        let leaf = keccak256(account);
        let proof = tree.getHexProof(leaf);

        let value;
        if (props.step == 4 || props.step == 7 || props.step == 10 || 
            props.step == 13 || props.step ==16 || props.step == 19 || 
            props.step == 22) {
            value = await props.BNPublicSalePrice;
        } else if (props.step == 1) {
            value = await props.wl1SalePrice;
        } else if (props.step == 2 || props.step == 5 || props.step == 8 || 
            props.step == 11 || props.step == 14 || props.step == 17 || 
            props.step == 20) {
            value = await props.BNWl2SalePrice;
        } else {
            value = await props.BNWl3SalePrice;
        }

        let overrides = {
            value: value
        }

        try {
            let transaction;
            if (props.step == 4 || props.step == 7 || props.step == 10 || 
                props.step == 13 || props.step ==16 || props.step == 19 || 
                props.step == 22) {
                transaction = await contract.publicMint(counter, props.wave, overrides);
            } else {
                transaction = await contract.whitelistMint(counter, proof, props.wave, overrides);
            }
            setMintIsLoading(true);
            await transaction.wait();
            setMintIsLoading(false);
            toast({
                description: "Congratulations ! You have minted your NFT !",
                status: "success",
                duration: 4000,
                isClosable: true
            });
            props.getDatas();
        } catch(e) {
            console.log(e);
            toast({
                description: e.reason,
                status: "error",
                duration: 4000,
                isClosable: true
            });
        }
    }

    const getCount = () => {
        setIsLoading(true);
        var calc = setInterval(function() {
            let unixTime = saleStartTime * 1000;
            let date_future = new Date(unixTime);
            let date_now = new Date();
            date_now = new Date(date_now.getTime() +120*10000000000);

            if (props.step == 4 || props.step == 7 || props.step == 10 || 
                props.step == 13 || props.step ==16 || props.step == 19 || 
                props.step == 22 || 
                props.step == 3 || props.step == 6 || props.step == 9 || 
                props.step == 12 || props.step ==15 || props.step == 18 || 
                props.step == 21) {
                setMultipleMintAvaliable(true);
            }

            if (date_now > date_future) {
                setIsLoading(false);
                setIsAvaliable(true);
            } else {
                let seconds = Math.floor((date_future - (date_now)) / 1000);
                let minutes = Math.floor(seconds / 60);
                let hours = Math.floor(minutes / 60);
                let days = Math.floor(hours / 24);
                
                hours = hours-(days * 24);
                minutes = minutes-(days * 24 * 60)-(hours * 60);
                seconds = seconds-(days * 24 * 60 * 60)-(hours * 60 * 60)-(minutes * 60);
        
                setDays(days)
                setHours(hours)
                setMinutes(minutes)
                setSeconds(seconds)
                setIsLoading(false);
            }
        }, 1000);
    }

    //increase counter
    const increase = () => {
        if (counter < 5 && (props.step == 3 || props.step == 6 || props.step == 9 || 
            props.step == 12 || props.step == 15 || props.step == 18 || 
            props.step == 21)) {
            setCounter(count => count + 1);
        } else if (props.step == 4 || props.step == 7 || props.step == 10 || 
            props.step == 13 || props.step ==16 || props.step == 19 || 
            props.step == 22) {
            setCounter(count => count + 1);
        }
    };
    
    //decrease counter
    const decrease = () => {
        if (counter > 1)
            setCounter(count => count - 1);
    };
    
    return (
        <Flex 
            borderColor="#ffffff7a" 
            borderWidth="0.5rem" 
            borderRadius="5rem"
            borderStyle="double"
            boxShadow="0px 0px 0.6rem rgba(255, 255, 255, 0.62)"
            w={["150%", "150%", "150%", "150%", "150%", "150%"]}

            //padding={["2rem", "2.5rem", "3.5rem", "4.5rem", "10%"]}
            padding={["2vh", "2vh", "2vh", "2vh", "10%", "10%"]}

            bgColor="#000000b0"
            marginY={["8vh", "8vh", "8vh", "8vh", "0", "0"]}
            //w={[null, null, null, null, "150%"]}
            direction="column" align="center"


            /*borderColor="#ffffff7a" 
            borderWidth="0.5rem" 
            borderRadius="5rem"
            borderStyle="double"
            boxShadow="0px 0px 0.6rem rgba(255, 255, 255, 0.62)"

            w={["100%", "100%", "100%", "100%", "60%", "60%"]}
            padding={["2vh", "2vh", "2vh", "2vh", "0", "0"]}
            bgColor="#000000b0"
            marginY={["8vh", "8vh", "8vh", "8vh", "0", "0"]}
            id="hey"*/
        >
            <Center>
                {isLoading ? (
                    <Spinner />
                    ) : (
                    <Flex>
                        <Flex direction="column" align="center">
                            <Text fontSize={["2.75rem", "2.75rem", "3rem", "3.5rem", "2.75rem", "3.5rem"]}>Step {props.wave}</Text>
                            {isAvaliable ? (
                                <>
                                    {mintIsLoading ? (
                                        <Text fontSize={["2.75rem", "2.75rem", "3rem", "3.5rem", "2.75rem", "3.5rem"]}>Mint en cours</Text>
                                    ) : (
                                    <>
                                        <Button
                                            colorScheme="cyan"
                                            bgGradient="linear(to-b, #ffffff00, #61a6ceff)"
                                            _hover={{
                                                bgGradient: 'linear(to-b, #ffffff00, #61a6ceff)',
                                            }}
                                            _active={{
                                                bgGradient: 'linear(to-b, #ffffff00, #61a6ceff)',
                                            }}
                                            fontSize={["2.5rem", "2.5rem", "3rem", "4rem", "3rem", "4rem"]}
                                            padding={["2.5rem", "2.5rem", "3rem", "4rem", "3rem", "4rem"]}
                                            margin={["1.5rem", "2.5rem", "3rem", "4rem", "3rem", "4rem"]}
                                            onClick={mint}
                                        >
                                            Mint now !
                                        </Button>
                                        {multipleMintAvaliable ? (
                                            <>
                                                <Flex>
                                                <Button className="control__btn" onClick={decrease}                                          
                                                        colorScheme="cyan"
                                                        bgGradient="linear(to-b, #ffffff00, #61a6ceff)"
                                                        _hover={{
                                                            bgGradient: 'linear(to-b, #ffffff00, #61a6ceff)',
                                                        }}
                                                        _active={{
                                                            bgGradient: 'linear(to-b, #ffffff00, #61a6ceff)',
                                                    }}
                                                    padding={["1.25rem", "1.25rem", "1.5rem", "2rem", "1.5rem", "2rem"]}
                                                    fontSize={["1.25rem", "1.25rem", "1.5rem", "2rem", "1.5rem", "2rem"]}
                                                    >-</Button>
       
                                                    <Text className="counter__output"
                                                        marginX={["1.5rem", "2.5rem", "3rem", "4rem", "3rem", "4rem"]}
                                                        fontSize={["2.5rem", "2.5rem", "3rem", "4rem", "3rem", "4rem"]}
                                                    >{counter}
                                                    </Text>
                                                    <Button className="control__btn" onClick={increase}                                          
                                                        colorScheme="cyan"
                                                        bgGradient="linear(to-b, #ffffff00, #61a6ceff)"
                                                        _hover={{
                                                            bgGradient: 'linear(to-b, #ffffff00, #61a6ceff)',
                                                        }}
                                                        _active={{
                                                            bgGradient: 'linear(to-b, #ffffff00, #61a6ceff)',
                                                    }}
                                                    padding={["1.25rem", "1.25rem", "1.5rem", "2rem", "1.5rem", "2rem"]}
                                                    fontSize={["1.25rem", "1.25rem", "1.5rem", "2rem", "1.5rem", "2rem"]}

                                                    >+</Button>
                                                </Flex>
                                            </>
                                        ) : (<></>)}
                                    </>
                                    )}  
                                </>
                            ) : (
                            <>
                                <Text fontSize={["1.75rem", "1.75rem", "2rem", "2.5rem", "2rem", "2.5rem"]}>Whitelist Sale starts in</Text>
                                <Flex align="center" justify="center" p="0rem" width={["3rem", "3rem", "5rem", "5rem", "3rem", "4rem"]}>
                                    <Flex direction="column" justify="center" align="center" p={["1rem", "1rem", "2rem", "2rem", "1rem", "2rem"]}>
                                        <Text fontWeight="bold" fontSize={["2rem", "2rem", "4rem", "4rem", "2rem", "3rem"]}>{days}</Text>
                                        <Text fontStyle="italic">Days</Text>
                                    </Flex>
                                    <Flex direction="column" justify="center" align="center" p={["1rem", "1rem", "2rem", "2rem", "1rem", "2rem"]}>
                                        <Text fontWeight="bold" fontSize={["2rem", "2rem", "4rem", "4rem", "2rem", "3rem"]}>{hours}</Text>
                                        <Text fontStyle="italic">Hours</Text>
                                    </Flex>
                                    <Flex direction="column" justify="center" align="center" p={["1rem", "1rem", "2rem", "2rem", "1rem", "2rem"]}>
                                        <Text fontWeight="bold" fontSize={["2rem", "2rem", "4rem", "4rem", "2rem", "3rem"]}>{minutes}</Text>
                                        <Text fontStyle="italic">Mins</Text>
                                    </Flex>
                                    <Flex direction="column" justify="center" align="center" p={["1rem", "1rem", "2rem", "2rem", "1rem", "2rem"]}>
                                        <Text fontWeight="bold" fontSize={["2rem", "2rem", "4rem", "4rem", "2rem", "3rem"]}>{seconds}</Text>
                                        <Text fontStyle="italic">Secs</Text>
                                    </Flex>
                                </Flex>
                            </>
                            )}
                        </Flex>
                    </Flex>
                )}
            </Center>
        </Flex>
    )
}

export default CurrentSaleStep;