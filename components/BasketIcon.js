import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { useNavigation } from '@react-navigation/native'

const BasketIcon = () => {
    const items = useSelector(selectBasketItems);
    const navigation = useNavigation();
    const basketTotal = useSelector(selectBasketTotal);
  return (
    <>
    {items.length>0 && (
    <View className={`absolute bottom-5 w-full z-50`}>
      <TouchableOpacity onPress={()=>navigation.navigate('Basket')} className="mx-5 bg-[#00CCBB] flex-row p-3 rounded-lg items-center space-x-1">
        <Text className="text-white font-extrabold text-lg bg-[#01A296] py-1 px-3 rounded-lg">{items.length}</Text>
        <Text className="flex-1 text-white font-extrabold text-lg text-center">View Basket</Text>
        <Text className="text-lg text-white font-extrabold ">
            {'\u20B9'} {basketTotal}
        </Text>
      </TouchableOpacity>
    </View>
    )}
    </>
    
  )
}

export default BasketIcon;