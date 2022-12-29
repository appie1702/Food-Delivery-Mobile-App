import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { urlfor } from '../sanity';
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket, selectBasketItemswithId } from '../features/basketSlice';

const DishRow = ({id,name,desc,price,image}) => {

    const [isPressed,setisPressed] = useState(false);
    const dispatch = useDispatch();

    //useSelector needs a callback function i.e ()=>(()) type.
    const items = useSelector((state)=>selectBasketItemswithId(state,id));

    //adding this item to the basket in redux with params as things 
    //to save for each item
    const addItemToBasket = () => {
        dispatch(addToBasket({id,name,desc,price,image}));
    }

    const removeItemFromBasket = ()=>{
        if(!items.length>0) return;
        dispatch(removeFromBasket({id}));
    }


  return (
    <>
    <TouchableOpacity 
        onPress={()=>setisPressed(!isPressed)} 
        className={`bg-white border p-4 border-gray-300 ${isPressed && "border-b-0"}`}
        >
        <View className="flex-row">
            <View className="flex-1 pr-2">
                <Text className="text-lg mb-1">{name}</Text>
                <Text className="text-gray-400">{desc}</Text>
                <Text className="text-gray-400 mt-2">{'\u20B9'} {price}</Text>
            </View>
            <View>
                <Image
                    style={{
                        borderWidth:1,
                        borderColor: '#F3F3F4'
                    }}
                    source={{
                        uri:urlfor(image).url()
                    }}
                    className="h-24 w-24 bg-gray-400 p-4 rounded-md"
                />

            </View>
        </View>
    </TouchableOpacity>

    {isPressed && (
        <View className="bg-white px-4">
            <View className="flex-row items-center space-x-2 pb-3">
                <TouchableOpacity disabled={!items.length} onPress={removeItemFromBasket}>
                    <MinusCircleIcon size={36} color={items.length>0?"#00CCBB":"gray"}/>
                </TouchableOpacity>
                <Text>{items.length}</Text>
                <TouchableOpacity onPress={addItemToBasket} >
                    <PlusCircleIcon size={36} color="#00CCBB"/>
                </TouchableOpacity>
            </View>
        </View>
    )}
    </>
  )
}

export default DishRow;