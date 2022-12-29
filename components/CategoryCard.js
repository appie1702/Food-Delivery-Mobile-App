import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { urlfor } from '../sanity'

const CategoryCard = ({imgUrl,title}) => {
  return (

    //we have to make parent a relative in some situations,and child a
    //absolute class name.
    <TouchableOpacity className="relative mr-2">
        <Image
            source={{
                uri:urlfor(imgUrl).width(200).url(),
            }}
            className="h-20 w-20 rounded"
        />
      <Text className="absolute bottom-1 left-1 text-white font-bold">{title}</Text>
    </TouchableOpacity>
  )
}

export default CategoryCard;