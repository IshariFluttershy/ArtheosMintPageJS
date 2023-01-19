import React, {useState, useEffect} from "react";
import { Flex, Button, Text, useToast, Spinner } from "@chakra-ui/react";
import Layout from "../components/Layout/Layout"
import Before from "../components/Before/Before"
import Reveal from "../components/Reveal/Reveal"
import WhitelistSale from "../components/WhitelistSale/WhitelistSale"
import PublicSale from "../components/PublicSale/PublicSale"
import SoldOut from "../components/SoldOut/SoldOut"



export default function Home() {
  return (
    <Layout>
      <Flex align="center" justify="center">
        <WhitelistSale/>
      </Flex>
    </Layout>
  )
}
