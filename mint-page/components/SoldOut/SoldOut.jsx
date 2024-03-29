import React, { useEffect, useState } from "react";
import {Flex, Text} from "@chakra-ui/react";

const SoldOut = (props) => {
    return (
        <Flex>
            <Text 
                fontWeight="bold"
                fontSize="3rem"
            >
                Sold Out
            </Text>
        </Flex>
    )
}

export default SoldOut;