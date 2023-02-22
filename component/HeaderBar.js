import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { COLORS,SIZES,FONTS, } from './../constants/theme';
import { icons } from "../constants";

const HeaderBar = ({right}) =>  {
    const navigation=useNavigation();
    return(
        <View style={{paddingHorizontal:SIZES.padding,flexDirection:'row',}}>
            <View style={{flex:1,alignItems:'flex-start'}}>
                <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}
                onPress={()=>navigation.goBack()}>
                <Image source={icons.back_arrow} style={{height:25,width:25,tintColor:COLORS.gray}} resizeMode='contain'/>
                <Text style={{marginLeft:SIZES.base,...FONTS.h3}}>Back</Text>
                </TouchableOpacity>

            </View>
            {right && 
              <View style={{flex:1,alignItems:'flex-end'}}>
                <TouchableOpacity>
                    <Image source={icons.star} style={{height:30,width:30}} resizeMode='contain'/>
                </TouchableOpacity>
               

              </View>   }
           
        </View>
    )
}
export default HeaderBar;


