import {
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { HiLogout } from "react-icons/hi";
import { IoIosFlash } from "react-icons/io";

const Header = () => {
  const { data: session, status } = useSession();

  return (
    <div
      className="container mx-auto flex flex-col"
    >
      <Flex justifyContent="space-between" py={4} as="footer">
        <Flex
          role="group"
          as={Link}
          href="/"
          alignItems="center"
          fontWeight="bold"
          fontSize="2xl"
        >
            <svg className="w-10 h-10 text-current" width="240px" height="379px" viewBox="0 0 240 379" version="1.1" xmlns="http://www.w3.org/2000/svg" >
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Group">
                  <path d="M145.710937,77.9140625 C61.8072917,131.908854 19.8554687,189.355469 19.8554687,250.253906 C19.8554687,311.152344 86.7369792,347.25651 220.5,358.566406" id="Path" className="stroke-current" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M79.193938,128.576583 C37.0854793,72.796361 25.7057292,36.4973958 45.0546875,19.6796875 C64.4036458,2.86197917 97.9557292,22.2734375 145.710938,77.9140625" id="Path-3" className="stroke-current" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M188.394531,53.3671875 C129.550781,27.0054341 86.75,13.8245574 59.9921875,13.8245574" id="Path-4" className="stroke-current" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M188.394531,53.3671875 C129.550781,27.0054341 86.75,13.8245574 59.9921875,13.8245574" id="Path-4" className="stroke-current" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M188.394531,53.3671875 C194.545241,49.571047 199.182517,47.3451355 202.306357,46.6894531 C211.841887,44.6879811 220.208984,44.9924599 220.208984,44.9924599" id="Path-5" className="stroke-current" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M45.8350848,306.689359 C73.4995193,209.54374 119.670174,160.97093 184.34705,160.97093 L184.34705,202.501574 C138.796763,259.218481 129.312785,308.177486 155.895117,349.37859" id="Path-6" className="stroke-current" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M163.053424,319.535786 C175.889643,324.478251 185.594254,326.159003 192.167255,324.578044 C198.740256,322.997085 208.087499,316.733921 220.208984,305.788551 C206.886286,302.808246 197.539043,298.779589 192.167255,293.702579 C186.149155,288.014724 183.54242,279.080812 184.34705,266.900843 L220.208984,266.900843" id="Path-7" className="stroke-current" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"></path>
                  <circle id="Oval" className="stroke-current" stroke-width="14" cx="150.5" cy="200.5" r="7"></circle>
                  <rect id="Rectangle" x="0" y="0" width="240" height="379"></rect>
                </g>
              </g>
          </svg>
          <Text display={{ base: "none", sm: "inherit" }}>AIvatar</Text>
        </Flex>
        <HStack spacing={1}>
          {/* <Button
            as={Link}
            href="/prompts"
            colorScheme="beige"
            variant="ghost"
            size="sm"
          >
            Prompts
          </Button> */}
          {session ? (
            <>
              <Tooltip hasArrow label="Public gallery">
                <Button
                  href={`/gallery/${session.userId}`}
                  as={Link}
                  colorScheme="beige"
                  variant="ghost"
                  size="sm"
                >
                  My Gallery
                </Button>
              </Tooltip>
              <Button href="/dashboard" as={Link} variant="brand" size="sm">
                Dashboard
              </Button>
              <Tooltip hasArrow label="Logout">
                <IconButton
                  aria-label="logout"
                  icon={<HiLogout />}
                  size="sm"
                  colorScheme="beige"
                  variant="ghost"
                  onClick={() => {
                    signOut({ callbackUrl: "/" });
                  }}
                />
              </Tooltip>
            </>
          ) : (
            <Button
              isLoading={status === "loading"}
              href="/login"
              as={Link}
              variant="brand"
              size="sm"
            >
              Login
            </Button>
          )}
        </HStack>
      </Flex>
    </div>
  );
};

export default Header;
