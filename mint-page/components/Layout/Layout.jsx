import {Flex, Image} from "@chakra-ui/react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useMediaQuery } from "../../utils/useMediaQuery";
import { Wendy_One, Rosarivo } from '@next/font/google'

const rosarivo = Rosarivo({ 
    weight: '400',
    subsets: ['latin'] });

const wendyOne = Wendy_One({ 
    weight: '400',
    subsets: ['latin'] });

const Layout = (props) => {
    const isBreakpoint = useMediaQuery(1279);

    let backgroundImageSource = "/PC_background.png";

    if (isBreakpoint) {
        backgroundImageSource = "/mobile_background.jpg";
    }


    return (
        <>
            <style jsx global>{`
                html {
                font-family: ${rosarivo.style.fontFamily};
                }
            `}</style>
            <Flex
                w="100%"
                h="100%"
                color="#f0f0f0"
                fontFamily={wendyOne.style.fontFamily + ", " + rosarivo.style.fontFamily + ", Arial, sans-serif"}
                flexDir="column"
                alignItems="stretch"
                id="layout"
            >
                {!isBreakpoint ? (
                    <Image
                        id="backgroundimage"
                        align="center"
                        justify="center"
                        w="-moz-fit-content"
                        h="-moz-fit-content"
                        zIndex="-1" 
                        flex={1}
                        src={backgroundImageSource}
                        objectFit="contain" 
                        quality={100}
                        >
                    </Image>

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
                        flex={1}
                        w={["100%", "100%", "100%", "100%", "90%", "90%"]}
                        h="100%"
                        >
                        {props.children}
                    </Flex>
                    <Footer/>
            </Flex>
        </>
    )
}

export default Layout;