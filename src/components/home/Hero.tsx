import { Box, Button, Flex, SimpleGrid, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import Demo from "./Demo";

const Hero = () => {
  return (
    <Box px={{ base: 2, md: 6 }}>
      <SimpleGrid
        as="main"
        minHeight="30rem"
        flex="1"
        flexDirection="column"
        marginX="auto"
        maxWidth="container.lg"
        columns={{ base: 1, lg: 2 }}
        px={{ base: 4, lg: 0 }}
        py={{ base: 10, lg: 0 }}
        gap={{ base: 10, lg: 0 }}
      >
        <VStack
          className="color"
          alignItems={{ base: "center", sm: "flex-start" }}
          spacing={10}
          justifyContent="center"
          flexDirection="column"
        >
          <Box textAlign={{ base: "center", sm: "left" }}>
            <Box
              mb={3}
              as="h1"
              maxWidth="43rem"
              lineHeight={{ base: "1.6rem", sm: "3rem" }}
              fontSize={{ base: "1.6rem", sm: "3rem" }}
              fontWeight="black"
            >
              Professional Corporate Headshots
            </Box>
            <Box
              as="h2"
              maxWidth="30rem"
              fontSize={{ base: "md", sm: "3md" }}
              lineHeight={{ base: "md", sm: "3md" }}
            >
              <b>#1 Best Professional AI Headshot Generator</b> 
            </Box>
            <br></br>
            <Box
              as="h3"
              maxWidth="50rem"
              fontSize={{ base: "sm", sm: "3sm" }}
              lineHeight={{ base: "sm", sm: "3sm" }}
            >
              Get professional corporate headshots in less than 10 minutes with our AI photographer!{" "}
              Upload 12 pictures and get 70 headshots in various styles in minutes!
            </Box>
          </Box>
          <Button
            as={Link}
            href="/dashboard"
            variant="brand"
            size="lg"
            shadow="xl"
            rightIcon={<HiArrowRight />}
          >
            Start Creating Now
          </Button>
        </VStack>
        <Flex alignItems="center">
          <Demo />
        </Flex>
      </SimpleGrid>
    </Box>
  );
};

export default Hero;
