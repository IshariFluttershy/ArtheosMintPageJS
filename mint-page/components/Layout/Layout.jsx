import {Flex, Image} from "@chakra-ui/react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useMediaQuery } from "../../utils/useMediaQuery";

const Layout = (props) => {
    const isBreakpoint = useMediaQuery(768);

    let backgroundImageSource = "/PC_background.png";

    if (isBreakpoint) {
        backgroundImageSource = "/mobile_background.jpg";
    }


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
                //bgColor="#00000055"
            >
                {!isBreakpoint ? (
                    <Image
                        align="center"
                        justify="center"
                        w="-moz-fit-content"
                        h="-moz-fit-content"
                        zIndex="-1" 
                        position="absolute" 
                        flex={1}
                        src={backgroundImageSource}
                        objectFit="contain" 
                        quality={100}
                    />
                ) : (
                    <Image
                        align="center"
                        justify="center"
                        w="100%" 
                        h="100%"
                        zIndex="-1" 
                        position="fixed" 
                        flex={1}
                        src={backgroundImageSource}
                        layout="fill"
                        objectFit="cover" 
                        quality={100}
                    />
                )}
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
        </>
    )
}

export default Layout;