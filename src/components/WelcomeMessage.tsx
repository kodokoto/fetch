//Import Box from NativeBase
import { Box, Text }  from 'native-base';
import React from "react";

type User = {
    userName: string
}

export default function Tabs(props: User) {
    return(
        <Box className='items-start ml-5 mt-10 mb-6 border border-solid border-[#4c8ab9] rounded-md w-56 h-16 bg-[#4c8ab9]'>
            <Text className='font-bold text-xl m-auto' >Hello {props.userName}!</Text>
        </Box>
    );
}