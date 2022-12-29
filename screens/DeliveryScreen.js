import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';
import { selectRestaurant} from "../features/restaurantSlice";
import { TouchableOpacity } from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/outline';
import * as Progress from "react-native-progress";
import MapView,{Marker} from 'react-native-maps';


const DeliveryScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);

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
});

  return (
    <View className="bg-[#00CCBB] flex-1 mt-5">
      <SafeAreaView className="z-50">
        <View className="flex-row justify-between items-center p-5">
            <TouchableOpacity onPress={()=> navigation.navigate("Home")}>
                <XMarkIcon color="white" size={30}/>
            </TouchableOpacity>
            <Text className="font-light text-white text-lg">Order Help</Text>
        </View>

        <View style={styles.shadow} className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md">
            <View className="flex-row justify-between">
                <View >
                    <Text className="text-lg text-gray-400">Estimated Arrival</Text>
                    <Text className="text-3xl font-bold">45-55 Minutes</Text>
                </View>
                <Image
                    source={require("../assets/giphy.webp")}
                    className="h-20 w-20"
                />
            </View>
            <Progress.Bar size={30} color="#00CCBB" indeterminate={true}/>
            
            <Text className="mt-3 text-gray-500">
                Your order at {restaurant.title} is being prepared!
            </Text>
        </View>
      </SafeAreaView>

        <MapView
            initialRegion={{
                latitude: restaurant.lat,
                longitude: restaurant.long,
                latitudeDelta:0.005,
                longitudeDelta:0.005
            }}
            className="flex-1 mt-10 z-0"
            mapType='mutedStandard'
        >
            <Marker
                coordinate={{
                    latitude: restaurant.lat,
                    longitude: restaurant.long,
                }}
                title={restaurant.title}
                description={restaurant.short_desc}
                identifier="origin"
                pinColor='#00CCBB' 
            />
        </MapView>

        <SafeAreaView className='bg-white flex-row items-center space-x-5 h-28'>
            <Image
                source={require("../assets/deliver-now2.jpg")}
                className="h-12 w-12 bg-gray-300 p-4 rounded-full ml-5"
            />
            <View className="flex-1">
                <Text className="text-lg">Appie A</Text>
                <Text className="text-gray-400">Your Rider</Text>
                
            </View>
            
            <TouchableOpacity className="mr-5 py-2 bg-gray-100 rounded-lg">
                <View>
                    <Text className="text-[#00CCBB] text-lg mr-5 font-bold text-center"> Call</Text>
                </View>
            </TouchableOpacity>

        </SafeAreaView>
    </View>
  )
}

export default DeliveryScreen;