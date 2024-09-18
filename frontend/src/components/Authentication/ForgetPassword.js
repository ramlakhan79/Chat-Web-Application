import React, { useState } from "react";
import { VStack, HStack } from "@chakra-ui/react";
import { Input, InputGroup } from "@chakra-ui/input";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import Login from "./Login"
import { useHistory } from "react-router-dom";

const ForgetPassword = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const handleForgetPassword = async () => {
    if (!username || !email) {
      toast({
        title: "Please fill all the fields",
        description: "Username and email are required",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { username, email },
        config
      );

      toast({
        title: "Password reset link sent",
        description: "Please check your email for a password reset link",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      history.push("/login");
    } catch (error) {
      toast({
        title: "Error Occured",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
const handleLogin = () => {
  setShowLogin(true); // Show the Login component when the button is clicked
};
  return (
    <VStack spacing="5px" color="black">
        {showLogin ? (
        <Login /> // Render the ForgetPassword component when showForgetPassword is true
      ) : (
        <>
      <FormControl id="username" isRequired>
        <FormLabel>Username</FormLabel>
        <Input
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <HStack justify="space-between">
        <Button
          colorScheme="red"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={handleForgetPassword}
          isLoading={loading}
        >
          Password Reset
        </Button>
        <Button
          colorScheme="blue"
        //   width="100%"
          style={{ marginTop: 15 }}
          onClick={handleLogin}
          isLoading={loading}
        >
         Login
        </Button>
      </HStack>
      </>)}
    </VStack>
  );
};

export default ForgetPassword;
