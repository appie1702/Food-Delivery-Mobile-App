import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline';
import RestaurantCard from './RestaurantCard';
import sanityClient from '../sanity';



const FeaturedRow = ({id,title,desc}) => {
    const [restaurants,setrestaurants] = useState([]);
    useEffect(()=>{
        //type under dishes is restaurant's category field.
        sanityClient.fetch(
            `
                *[_type == "featured" && _id == $id] {
                    ...,
                    restaurants[]->{
                        ...,
                        dishes[]->,
                        type->{
                            name
                        }
                    }
                }[0]
            `,{id}
        ).then((data) => {
            setrestaurants(data?.restaurants);
        })
    },[id])

  return (
    <View className="my-3">
        <View className="mt-1 flex-row items-center justify-between px-4">
            <Text className="font-bold text-lg">{title}</Text>
            <ArrowRightIcon color="#00CCBB"/>
        </View>
        <Text className="px-4 text-gray-500 text-xs">{desc}</Text>
        <ScrollView
            horizontal
            contentContainerStyle={{
                paddingHorizontal:15,
            }}
            showsHorizontalScrollIndicator={false}
            className="pt-4"
        >
        {/* RestaurantCards... */}

        {restaurants?.map(restaurant=>(
            <RestaurantCard
                key={restaurant._id}
                id={restaurant._id}
                imgUrl={restaurant.image}
                address={restaurant.address}
                title={restaurant.name}
                dishes={restaurant.dishes}
                rating={restaurant.rating}
                short_desc={restaurant.short_desc}
                genre={restaurant.type?.name}
                long={restaurant.long}
                lat={restaurant.lat}
            />
        ))}
        


        </ScrollView>
    
    </View>
  )
}

export default FeaturedRow;