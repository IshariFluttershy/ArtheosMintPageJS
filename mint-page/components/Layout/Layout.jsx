import {Flex, Image} from "@chakra-ui/react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = (props) => {
    return (
        <>
            <Flex
                w="100%"
                h="100%"
                minH="100vh"
                color="#f0f0f0"
                fontFamily="Arial, sans-serif"
                flexDir="column"
                alignItems="stretch"
            >
                <Flex
                    w="100%"
                    h="100%"
                    minH="100vh"
                    bgColor="#00000055"
                    color="#f0f0f0"
                    fontFamily="Arial, sans-serif"
                    flexDir="column"
                    alignItems="stretch"
                    //backgroundImage="/BACKGROUND_SITE_NFT.png"
                >
                    <Header/>
                    <Flex 
                        align="center"
                        justify="center"
                        flexDir="column"
                        w="100%"
                        flex={1}
                    >
                        {props.children}
                    </Flex>
                    <Footer/>
                </Flex>
            </Flex>
        </>
    )
}

export default Layout;