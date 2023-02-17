import React, { useEffect, useState } from "react";
import { Image, Button, Flex, Spinner, useToast, chakra, Text, Center} from "@chakra-ui/react";

const CurrentSaleStep = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [seconds, setSeconds] = useState(null);
    const [minutes, setMinutes] = useState(null);
    const [hours, setHours] = useState(null);
    const [days, setDays] = useState(null);
    const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000));
    const [isAvaliable, setIsAvaliable] = useState(false);

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
                    </Flex>
                )}
            </Center>
        </Flex>
    )
}

export default CurrentSaleStep;