import { ScrollView, View, Text, Image } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native';
import {ChevronDownIcon, MagnifyingGlassIcon, UserIcon, AdjustmentsVerticalIcon} from "react-native-heroicons/outline";
import { TextInput } from 'react-native';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from "../sanity";

const HomeScreen = () => {
  const [featuredCategories, setfeaturedCategories] = useState([]);
  const navigation = useNavigation();


  //useLayout is used when UI loads
  //useEffect is used is when the functional component loads
  useLayoutEffect(()=>{
    navigation.setOptions({
      headerShown: false,
    })
  },[]);

  useEffect(()=>{
    sanityClient.fetch(`
        *[_type=="featured"] {
          ...,
          restaurants[]->{
            ...,
            dishes[]->
          }
        }`
      )
      .then(data => {
      setfeaturedCategories(data);
    });
  },[]);


  //use flex-1 className when this particular view is supposed to take
  // max width inside flex-row or flex-column parent view.
  
  return (
    <SafeAreaView className="bg-white pt-10 pb-28">
        <View className="flex-row pb-3 items-center mx-4 space-x-2">
            <Image 
              source={require("../assets/deliver-now2.jpg")}
              className="h-7 w-7 bg-gray-300 p-4 rounded-full"
            />
          <View className="flex-1">
              <Text className="font-bold text-gray-400 text-xs">
                Deliver Now!
                </Text>
              <Text className="font-bold text-xl">
                Current Location
                <ChevronDownIcon size={20} color="#00CCBB"/>
              </Text>
          </View>
          <UserIcon size={35} color="#00CCBB"/>
        </View>

        {/* Search */}
        <View className="flex-row items-center space-x-2 pb-2 mx-4">
              <View className=" h-12 flex-row space-x-2 flex-1 bg-gray-200 p-3">
                <MagnifyingGlassIcon color="gray"/>
                <TextInput
                  placeholder="Restaurants and cuisines"
                  keyboardType="default"
                />
              </View>
              <AdjustmentsVerticalIcon color="#00CCBB"/>
        </View>

        {/*ScrollView*/}
        <ScrollView className="bg-gray-100">

          {/*Categories*/}
          <Categories/>
          {/*Featured-rows*/}

          {featuredCategories?.map((fea_category) => (
            <FeaturedRow
              key={fea_category._id}
              id={fea_category._id}
              title={fea_category.name}
              desc={fea_category.short_desc}
            />
          ))}
        </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;


