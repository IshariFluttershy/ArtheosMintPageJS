import React, {useState, useEffect} from "react";
import { Flex, Button, Text, useToast, Spinner, Spacer } from "@chakra-ui/react";
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
      <Flex align="center" justify="center" h="100%" w="90%">
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
                  //my="md"
                  //px={["sm", "sm", "lg", "lg"]}
                  //p="2rem"    
                  position="absolute"
                  top="10%"  
                  left={["null", "null","null","null","28%","35%"]}
                  >
                  <CurrentSaleStep
                    step="1"
                  />
                </Flex>
            }
          })()
          ) : (
            <Flex 
              borderColor="black" 
              borderWidth={4} 
              borderRadius="5rem"
              //padding="2vh"
              bgColor="#000000b0"
              boxShadow="0px 0px 0.6rem grey"
              //margin="1vh"
              position="absolute"
              top="12.6%"  
              left={["null", "null","null","null","36%","41%"]}
            >
              <Text fontSize={30}>
                Please connect your wallet
              </Text>
            </Flex>
        )}
      </Flex>
      <Flex direction="column">
        <Flex justify={["center", "center", "left", "left"]}
          position="absolute"
          top={["null", "null", "null", "null", "39%", "40.1%"]}
          left="7%"
        >
          <SaleStep 
            startTimestamp={1678143604}
            step="1" 
            align="left" 
            imgSource="Capsule_Paresse"
          />
        </Flex>
        <Flex justify={["center", "center", "right", "right"]}
          position="absolute"
          right="7%"
          top={["null", "null", "null", "null", "46.4%", "47.5%"]}
        >
          <SaleStep 
            startTimestamp={1680818404}
            step="2"  
            align="right" 
            imgSource="Capsule_Colere"
          />
        </Flex>
        <Flex justify={["center", "center", "left", "left"]}
          position="absolute"
          top={["null", "null", "null", "null", "53.7%", "54.8%"]}

          left="7%"
        >
          <SaleStep 
            startTimestamp={1683410404}
            step="3"  
            align="left" 
            imgSource="Capsule_Luxure"
          />
        </Flex>
        <Flex justify={["center", "center", "right", "right"]}
          position="absolute"
          right="7%"
          top={["null", "null", "null", "null", "60.2%", "61.3%"]}
        >
          <SaleStep 
            startTimestamp={1686088804}
            step="4"  
            align="right" 
            imgSource="Capsule_Gourmandise"
          />
        </Flex>
        <Flex justify={["center", "center", "left", "left"]}
          position="absolute"
          top={["null", "null", "null", "null", "66.9%", "68%"]}
          left="7%"
        >
          <SaleStep 
            startTimestamp={1688680800}
            step="5"  
            align="left" 
            imgSource="Capsule_Envie"
          />
        </Flex>
        <Flex justify={["center", "center", "right", "right"]}
          position="absolute"
          right="7%"
          top={["null", "null", "null", "null", "74.2%", "75.3%"]}
        >
          <SaleStep 
            startTimestamp={1691359200}
            step="6" 
            align="right" 
            imgSource="Capsule_Orgueil"
          />
        </Flex>
        <Flex justify={["center", "center", "left", "left"]}
          position={["relative", "relative", "absolute", "absolute"]}
          top={["null", "null", "null", "null", "81.2%", "82.3%"]}

          left="7%"
        >
          <SaleStep 
            startTimestamp={1694037600}
            step="7"  
            align="left" 
            imgSource="Capsule_Avarice"
          />
        </Flex>
      </Flex>
    </Layout>
  )
}