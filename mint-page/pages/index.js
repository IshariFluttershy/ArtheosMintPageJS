import React, {useState, useEffect} from "react";
import { Flex, Button, Text, useToast, Spinner } from "@chakra-ui/react";
import Layout from "../components/Layout/Layout"
import useEthersProvider from "../hooks/useEthersProvider";
import Before from "../components/Before/Before"
import Reveal from "../components/Reveal/Reveal"
import WhitelistSale from "../components/WhitelistSale/WhitelistSale"
import PublicSale from "../components/PublicSale/PublicSale"
import SoldOut from "../components/SoldOut/SoldOut"
import SaleStep from "../components/SaleStep/SaleStep"
import CurrentSaleStep from "../components/CurrentSaleStep/CurrentSaleStep"


import { ethers } from "ethers";



export default function Home() {

  const { account, provider } = useEthersProvider();
  const [isLoading, setIsLoading] = useState(false);
  const [sellingStep, setSellingStep] = useState(null);
  const [saleStartTime, setSaleStartTime] = useState(null);
  const [BNWlSalePrice, setBNWlSalePrice] = useState(null);
  const [wlSalePrice, setWlSalePrice] = useState(null);
  const [BNPublicSalePrice, setBNPublicSalePrice] = useState(null);
  const [publicSalePrice, setPublicSalePrice] = useState(null);
  const [totalSupply, setTotalSupply] = useState(null);

  const toast = useToast();
  const contractAddress = "";

  useEffect(() => {
    if (account) {
      getDatas();
    }
  }, [account])

  const getDatas = async() => {
    setIsLoading(true);

    /*const Contract = new ethers.Contract(contractAddress, Contract.abi, provider);
    const sellingStep = await contractAddress.sellingStep();

    let wlSalePrice = await contractAddress.wlSalePrice();
    let wlSalePriceBN = ethers.BigNumber.from(wlSalePrice._hex);
    wlSalePrice = ethers.utils.formatEther(wlSalePriceBN);

    let publicSalePrice = await contractAddress.publicSalePrice();
    let publicSalePriceBN = ethers.BigNumber.from(publicSalePrice._hex);
    publicSalePrice = ethers.utils.formatEther(publicSalePriceBN);

    let totalSupply = await contractAddress.totalSupply();
    totalSupply = totalSupply.toString();

    setSellingStep(sellingStep);
    setWlSalePrice(wlSalePrice);
    setBNWlSalePrice(wlSalePriceBN);
    setPublicSalePrice(publicSalePrice);
    setBNPublicSalePrice(publicSalePriceBN);
    setTotalSupply(totalSupply);*/


    setSellingStep(1);
    /*setWlSalePrice(wlSalePrice);
    setBNWlSalePrice(wlSalePriceBN);
    setPublicSalePrice(publicSalePrice);
    setBNPublicSalePrice(publicSalePriceBN);
    setTotalSupply(totalSupply);*/

    setIsLoading(false);
  }

  return (
    <Layout>
      <Flex align="center" justify="center" h="86vh">
        {isLoading ? (
          <Spinner/>
        ) : account ? (
          (() => {
            switch(sellingStep) {
              case null:
                return <Spinner/>
              case 0: 
                return <Before/>
              case 1:
                return <Flex
                  align="center"
                  flexDir="column"
                  my="md"
                  px={["sm", "sm", "lg", "lg"]}
                  p="2rem"
                >
                  <CurrentSaleStep

                  />
                </Flex>
            }
          })()
          ) : (
            <Text fontSize={30}>
            Please connect your wallet
          </Text>
        )}
      </Flex>
        <SaleStep 
          startTimestamp={1678143604}
          step="1"  
        />
        <SaleStep 
          startTimestamp={1680818404}
          step="2"  
        />
        <SaleStep 
          startTimestamp={1683410404}
          step="3"  
        />
        <SaleStep 
          startTimestamp={1686088804}
          step="4"  
        />
    </Layout>
  )
}

