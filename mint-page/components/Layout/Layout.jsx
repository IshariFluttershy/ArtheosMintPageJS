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
                color="#f0f0f0"
                fontFamily="Arial, sans-serif"
                flexDir="column"
                alignItems="stretch"
            >
                {!isBreakpoint ? (
                    <Flex 
                    w="100%"
                h="100%"                        
                    >
                    <Image
                        id="backgroundimage"
                        align="center"
                        justify="center"
                        w="-moz-fit-content"
                        h="-moz-fit-content"
                        zIndex="-1" 
                        //position="absolute" 
                        flex={1}
                        src={backgroundImageSource}
                        objectFit="contain" 
                        quality={100}
                        >
                    </Image>
                    <Header/>
                    <Flex 
                        align="center"
                        justify="center"
                        flexDir="column"
                        flex={1}
                        w="90%"
                        h="100%"
                        >
                        {props.children}
                    </Flex>
                    <Footer/>
                    </Flex>
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

            </Flex>
        </>
    )
}

export default Layout;