import React from "react";
import {Text, TouchableOpacity } from 'react-native';

export default function Button({  bgColor, btnLabel, textColor, Press }) {
    return (

        <TouchableOpacity onPress={Press}
            style={{
                backgroundColor: bgColor,
                borderRadius: 100,
                alignItems: 'center',
                width: 350,
                paddingVertical: 10
            }} >
            <Text style={{
                color: textColor,
                fontSize: 25,
                fontWeight: "bold"
            }}>
                {btnLabel}
            </Text>

        </TouchableOpacity>


    )
}
