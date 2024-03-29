import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

export const RoundedButton = ({
    style = {},
    textStyle = {},
    size = 125,
    ...props
}) => {
    return(
        <TouchableOpacity style={[styles(size).radius, style]} onPress={props.onPress}>
            <Text style={[styles(size).text, textStyle]}>{props.title}</Text>
        </TouchableOpacity>
    )

}

const styles = (size) => StyleSheet.create({
    radius:{
        borderRadius:size/2,
        width:size,
        height:size,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'white',
        borderWidth:2
    },
    text:{
        color:"white",
        fontSize: size/3,
    }
})