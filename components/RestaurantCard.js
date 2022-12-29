import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { StarIcon } from 'react-native-heroicons/solid';
import {MapPinIcon} from 'react-native-heroicons/outline';
import { StyleSheet } from 'react-native';
import { urlfor } from '../sanity';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 7.00,

        elevation: 6,
    }
})

const RestaurantCard = ({
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
}) => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      onPress={()=>{
        navigation.navigate("Restaurant",{
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
        })
      }}
      className="bg-white mr-3 rounded-lg" 
      style={styles.shadow}>
      <Image
        source={{
          uri: urlfor(imgUrl).url(),          
        }}
        className='h-36 w-66 rounded-lg'
      />
      <View className="px-3 pb-2">
        <Text className="font-bold text-lg pt-1">{title}</Text>
        <View className="flex-row items-center space-x-1">
          <StarIcon color="green" opacity={0.5} size={22}/>
          <Text className="text-xs text-gray-500"> 
            <Text className="text-green-500">{rating}</Text> . {genre}
          </Text>
        </View>

        <View className="flex-row items-center space-x-2">
          <MapPinIcon color="gray" opacity={0.4} size={22}/>
          <Text className="text-sm text-gray-500">Nearby . {address}</Text>
        </View>

      </View>
    </TouchableOpacity>
  )
}

export default RestaurantCard;