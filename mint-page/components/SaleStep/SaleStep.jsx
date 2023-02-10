import React, { useEffect, useState, useCallback } from "react";
import { Image, Button, Flex, Spinner, useToast, chakra, Text } from "@chakra-ui/react";
import { useMediaQuery } from "../../utils/useMediaQuery";

const SaleStep = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isAvaliable, setIsAvaliable] = useState(false);
    const [seconds, setSeconds] = useState(null);
    const [minutes, setMinutes] = useState(null);
    const [hours, setHours] = useState(null);
    const [days, setDays] = useState(null);
    const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000));

    let imageSource = props.imgSource;

    if (isAvaliable) {
        imageSource += "_Colored";
    }
    imageSource += ".png";

    const saleStartTime = props.startTimestamp;

    useEffect(() => {
        getCount()
    }, [])



    const getCount = () => {
        setIsLoading(true);
        var calc = setInterval(function() {
            let unixTime = saleStartTime * 1000;
            let date_future = new Date(unixTime);
            let date_now = new Date();
            date_now = new Date(date_now.getTime() /*+120*60000000*/);

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

    const isBreakpoint = useMediaQuery(1279);
    
    return (
        <Flex 
            borderColor="#ffffff7a" 
            borderWidth="0.5rem" 
            borderRadius="5rem"
            borderStyle="double"
            boxShadow="0px 0px 0.6rem rgba(255, 255, 255, 0.62)"
            w={["100%", "100%", "100%", "100%", "60%", "60%"]}
            padding={["2vh", "2vh", "2vh", "2vh", "0", "0"]}
            bgColor="#000000b0"
            marginY={["8vh", "8vh", "8vh", "8vh", "0", "0"]}
            id="hey"
        >
            {isLoading ? (
                <Spinner />
                ) : (
                <Flex direction={["column", "column", "column", "column", "row", "row"]}>
                    {isBreakpoint ? (
                        <Flex
                            align="center"
                            justify="center"
                        >
                            <Image
                                src={imageSource}
                                quality={100}
                                borderRadius="5rem"
                                //width={["40%", "40%", "40%", "40%"]}
                                //height={["80%", "80%", "80%", "100%"]}
                                width={["13rem", "17rem", "25rem", "30rem", "40%", "40%"]}
                                height={["13rem", "17rem", "25rem", "30rem", "100%", "100%"]}
                                marginBottom={["1rem", "1rem", "0rem", "0rem"]}
                                objectFit="contain"
                                align="center" justify="center"
                            />
                        </Flex>
                    ) : props.align !== "right" ? (
                            <Image
                                src={imageSource}
                                quality={100}
                                borderRadius="5rem"
                                width={["40%", "40%", "40%", "40%"]}
                                height={["80%", "80%", "80%", "100%"]}
                                marginBottom={["2%", "2%", "0%", "0%"]}
                                objectFit="contain"
                            />
                    ) : (<></>)}
                    <Flex 
                        direction="column" 
                        align="center" 
                        justify="center" 
                        width={["null", "null", "null", "null", "60%", "60%"]}
                        flexWrap="nowrap"
                        flexGrow="0px"
                    >
                        <Text fontSize={["2.75rem", "2.75rem", "3rem", "3.5rem", "2.75rem", "3.5rem"]}>Step {props.step}</Text>
                        {isAvaliable ? (
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
                            >
                                Mint now !
                            </Button>
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
                    {props.align === "right" && !isBreakpoint ? (
                            <Image
                                src={imageSource}
                                quality={100}
                                borderRadius="5rem"
                                width={["40%", "40%", "40%", "40%"]}
                                height={["80%", "80%", "80%", "100%"]}
                                marginBottom={["2%", "2%", "0%", "0%"]}
                                objectFit="contain"
                            />
                    ) : (<></>)}
                </Flex>
            )}
        </Flex>
    )
}

export default SaleStep;