import React, { useEffect, useState, useCallback } from "react";
import { Image, Button, Flex, Spinner, useToast, chakra, Text } from "@chakra-ui/react";

const useMediaQuery = (width) => {
    const [targetReached, setTargetReached] = useState(false);
  
    const updateTarget = useCallback((e) => {
      if (e.matches) {
        setTargetReached(true);
      } else {
        setTargetReached(false);
      }
    }, []);
  
    useEffect(() => {
      const media = window.matchMedia(`(max-width: ${width}px)`);
      media.addListener(updateTarget);
  
      // Check on mount (callback is not called until a change occurs)
      if (media.matches) {
        setTargetReached(true);
      }
  
      return () => media.removeListener(updateTarget);
    }, []);
  
    return targetReached;
};

const SaleStep = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isAvaliable, setIsAvaliable] = useState(false);
    const [seconds, setSeconds] = useState(null);
    const [minutes, setMinutes] = useState(null);
    const [hours, setHours] = useState(null);
    const [days, setDays] = useState(null);
    const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000));

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
            date_now = new Date(date_now.getTime() +120*60000000);

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

    const isBreakpoint = useMediaQuery(768);
    
    return (
        <Flex 
            borderColor="black" 
            borderWidth={4} 
            borderRadius="5rem"
            //w="100%"
            padding="2vh"
            bgColor="#000000b0"
            boxShadow="0px 0px 0.6rem grey"
            margin="8vh"
        >
            {isLoading ? (
                <Spinner />
                ) : (
                <Flex direction={["column", "column", "row", "row"]}>
                    {props.align !== "right" || isBreakpoint ? (
                        <Flex direction="column" align="center" justify="center">
                            <Image
                                src={props.imgSource}
                                quality={100}
                                borderRadius="5rem"
                                width={["5rem", "7rem", "15rem", "20rem"]}
                                height={["5rem", "7rem", "15rem", "20rem"]}
                                marginBottom={["1rem", "1rem", "0rem", "0rem"]}
                            />
                        </Flex>
                    ) : (<></>)}
                    <Flex direction="column" align="center" justify="center">
                        <Text fontSize={["0.75rem", "0.75rem", "1rem", "1.5rem"]}>Step {props.step}</Text>
                        {isAvaliable ? (
                            <Button
                                colorScheme="cyan"
                                fontSize={15}
                            >
                                Mint now !
                            </Button>
                        ) : (
                        <>
                            <Text fontSize={["0.75rem", "0.75rem", "1rem", "1.5rem"]}>Whitelist Sale starts in</Text>
                            <Flex align="center" justify="center" p="2rem">
                                <Flex direction="column" justify="center" align="center" p={["1rem", "1rem", "2rem", "2rem"]}>
                                    <Text fontWeight="bold" fontSize={["1rem", "1rem", "2.5rem", "2.5rem"]}>{days}</Text>
                                    <Text fontStyle="italic">Days</Text>
                                </Flex>
                                <Flex direction="column" justify="center" align="center" p={["1rem", "1rem", "2rem", "2rem"]}>
                                    <Text fontWeight="bold" fontSize={["1rem", "1rem", "2.5rem", "2.5rem"]}>{hours}</Text>
                                    <Text fontStyle="italic">Hours</Text>
                                </Flex>
                                <Flex direction="column" justify="center" align="center" p={["1rem", "1rem", "2rem", "2rem"]}>
                                    <Text fontWeight="bold" fontSize={["1rem", "1rem", "2.5rem", "2.5rem"]}>{minutes}</Text>
                                    <Text fontStyle="italic">Mins</Text>
                                </Flex>
                                <Flex direction="column" justify="center" align="center" p={["1rem", "1rem", "2rem", "2rem"]}>
                                    <Text fontWeight="bold" fontSize={["1rem", "1rem", "2.5rem", "2.5rem"]}>{seconds}</Text>
                                    <Text fontStyle="italic">Secs</Text>
                                </Flex>
                            </Flex>
                        </>
                        )}
                    </Flex>
                    {props.align === "right" && !isBreakpoint ? (
                        <Flex direction="column" align="center" justify="center">
                            <Image
                                src={props.imgSource}
                                quality={100}
                                borderRadius="5rem"
                                width={["5rem", "7rem", "15rem", "20rem"]}
                                height={["5rem", "7rem", "15rem", "20rem"]}
                                marginBottom={["1rem", "1rem", "0rem", "0rem"]}
                            />
                        </Flex>
                    ) : (<></>)}
                </Flex>
            )}
        </Flex>
    )
}

export default SaleStep;