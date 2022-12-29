import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import {selectRestaurant } from '../features/restaurantSlice';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import {XCircleIcon} from 'react-native-heroicons/outline';
import {urlfor} from '../sanity';

const BasketScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);
    const items = useSelector(selectBasketItems);
    const baskettotal = useSelector(selectBasketTotal);
    const [grpedItemsInBasket, setGrpedItemsInBasket] = useState([]);
    const dispatch = useDispatch();




    useMemo(()=>{
      //result is a key,value paired object like a python dict
      const grpedItems = items.reduce((results,item)=>{
        (results[item.id] = results[item.id] || []).push(item);
        return results; 
      },{});
      setGrpedItemsInBasket(grpedItems);

    },[items]);


  return (
    <SafeAreaView className="flex-1 bg-white mt-1">
      <View className="flex-1 bg-gray-100 mt-3">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">{restaurant.title}</Text>
          </View>

          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-5 right-5"
          >
            <XCircleIcon color="#00CCBB" height={50} width={50}/>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-2 px-4 py-3 bg-white my-5">
          <Image 
            source={require("../assets/deliver-now2.jpg")}
            className="h-10 w-10 bg-gray-300 rounded-full"
          />
          <Text className="flex-1">Deliver in 50-75 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
            {/*object.entries gives key,value pairs inside that object, you can only iterate over this method. */}
            {Object.entries(grpedItemsInBasket).map(([key,items])=>(
              <View key={key} className="flex-row items-center space-x-3 bg-white py-2 px-5">
                <Text className="text-[#00CCBB]">{items.length} x</Text>
                <Image
                  source={{
                    uri: urlfor(items[0]?.image).url()
                  }}
                  className="h-12 w-12 rounded-full"
                />
                <Text className="flex-1">{items[0]?.name}</Text>
                <Text className="text-gray-600">
                  {'\u20B9'} {items[0]?.price}
                </Text>

                <TouchableOpacity>
                  <Text
                    className="text-[#00CCBB] text-xs"
                    onPress={()=>dispatch(removeFromBasket({id:key}))}
                  >Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
        </ScrollView>

      <View className="p-5 bg-white mt-5 space-y-4">
        <View className="flex-row justify-between">
          <Text className="text-gray-400">Subtotal</Text>
          <Text className="text-gray-400">
            {'\u20B9'} {baskettotal}
          </Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-400">Delivery Fee</Text>
          <Text className="text-gray-400">
            {'\u20B9'} 75
          </Text>
        </View>

        <View className="flex-row justify-between">
          <Text>Order Total</Text>
          <Text className="text-gray-400 font-extrabold">
            {'\u20B9'} {baskettotal+75}
          </Text>
        </View>

        <TouchableOpacity onPress={()=> navigation.navigate("PreparingOrder")} className="rounded-lg bg-[#00CCBB] p-4">
          <Text className="font-extrabold text-white text-center text-lg">Place Order</Text>
        </TouchableOpacity>

      </View>
    </View>
  </SafeAreaView>
  )
}

export default BasketScreen;