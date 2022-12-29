import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { urlfor } from '../sanity';
import { ArrowLeftIcon, ChevronRightIcon, StarIcon, MapPinIcon, QuestionMarkCircleIcon } from 'react-native-heroicons/solid';
import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '../features/restaurantSlice';

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {params:{
    id,
    imgUrl,
    title,
    rating,
    genre,
    address,
    short_desc,
    dishes,
    long,
    lat
  },} = useRoute();

  useLayoutEffect(()=>{
    navigation.setOptions({
      headerShown: false,
    })
  },[]);


  useEffect(()=>{
    dispatch(
      setRestaurant({
        id,imgUrl,title,rating,genre,address,short_desc,dishes,long,lat
      })
    )
  },[dispatch])

  return (
    <>
    <ScrollView className="mb-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal:0,
        paddingTop:0,
    }}>
      <View className="relative">
        <Image
          source={{
            uri: urlfor(imgUrl).url(),
          }}
          className="w-full h-52 bg-gray-300 p-4"
        />
        <TouchableOpacity onPress={navigation.goBack} className="absolute  top-14 left-5 p-2 bg-gray-100 rounded-full">
          <ArrowLeftIcon size={20} color="#00CCBB"/>
        </TouchableOpacity>
      </View>

      <View className="bg-white">
        <View className="px-4 pt-4">
          <Text className="text-3xl font-bold">{title}</Text>
          <View className="flex-row space-x-2 my-1">

            <View className="flex-row items-center space-x-1">
              <StarIcon color="green" opacity={0.5} size={22}/>
              <Text className="text-xs text-gray-500"> 
                <Text className="text-green-500">{rating}</Text> . {genre}
              </Text>
            </View>

            <View className="flex-row items-center space-x-1">
              <MapPinIcon color="gray" opacity={0.4} size={22}/>
              <Text className="text-xs text-gray-500"> 
                Nearby . {address.slice(0,24)}...
              </Text>
            </View>

          </View>

          <Text className="text-gray-500 mt-2 pb-2">{short_desc}</Text>
        </View>

        <TouchableOpacity className="flex-row items-center space-x-1 p-3 bg-gray-50">
          <View className="flex-row flex-1 space-x-2">
              <Text className="font-bold pl-2">Have a food allergy</Text>
              <QuestionMarkCircleIcon color="gray"/>
          </View>
          <ChevronRightIcon color="#00CCBB"/>
        </TouchableOpacity>
      </View>

      <View className="pb-24">
        <Text className="px-4 pt-6 mb-3 font-bold text-xl">
          Menu
        </Text>

        {/* Dishrows */}
          
        {dishes.map(dish=>(
          <DishRow
            key={dish._id}
            id={dish._id}
            name={dish.name}
            desc={dish.short_desc}
            price={dish.price}
            image={dish.image}
          
          />
        ))}


      </View>

    </ScrollView>

    <BasketIcon/>
    </>
  )
}

export default RestaurantScreen;