import React, { useEffect, useState } from "react";
import { Image, Button, Flex, Spinner, useToast, chakra, Text, Center} from "@chakra-ui/react";

const CurrentSaleStep = (props) => {
    const [isLoading, setIsLoading] = useState(false);
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
        }, 1000);
    }
    
    return (
        <Flex 
            borderColor="black" 
            borderWidth={4} 
            borderRadius="5rem"
            padding={["2rem", "2.5rem", "3.5rem", "4.5rem"]}
            bgColor="#000000b0"
            boxShadow="0px 0px 0.6rem grey"
            marginBottom="20vh"
            marginTop="20vh"
        >
            <Center>
                {isLoading ? (
                    <Spinner />
                    ) : (
                        <Flex>
                        <Flex direction="column" align="center">
                            <Text fontSize={["2.75rem", "2.75rem", "3rem", "3.5rem"]}>Step {props.step}</Text>
                            <Button 
                                colorScheme="cyan" 
                                fontSize={["2.5rem", "2.5rem", "3rem", "4rem"]}
                                padding={["2.5rem", "2.5rem", "3rem", "4rem"]}
                                margin={["1.5rem", "2.5rem", "3rem", "4rem"]}
                            >
                                Mint now !
                            </Button>
                        </Flex>
                    </Flex>
                )}
            </Center>
        </Flex>
    )
}

export default CurrentSaleStep;