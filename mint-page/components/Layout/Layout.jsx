import {Flex} from "@chakra-ui/react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = (props) => {
    return (
        <>
            <Flex
                w="100%"
                h="100%"
                minH="100vh"
                //bgColor="#f0f0f055"
                color="#f0f0f0"
                fontFamily="Arial, sans-serif"
                flexDir="column"
                alignItems="stretch"
            >
                {<Flex
                    position="fixed"
                    right={0}
                    bottom={0}
                    minH="100%"
                    minW="100%"
                    zIndex={-1}
                >
                    <video autoPlay={false} muted loop>         
                        <source src="./BACKGROUND_SITE_NFT.mp4" type="video/mp4"/>       
                    </video>
                 </Flex>}
                <Flex
                    w="100%"
                    h="100%"
                    minH="100vh"
                    bgColor="#00000055"
                    color="#f0f0f0"
                    fontFamily="Arial, sans-serif"
                    flexDir="column"
                    alignItems="stretch"
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