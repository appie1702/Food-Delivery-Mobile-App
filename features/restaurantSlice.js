import { createSlice,current } from '@reduxjs/toolkit'

//to check if redux is working -> console.log(current(state));

const initialState = {
    restaurant:{
        id:null,
        imgUrl:null,
        title:null,
        rating:null,
        genre:null,
        address:null,
        short_desc:null,
        dishes:null,
        long:null,
        lat:null
    }
}

export const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    setRestaurant: (state,action) => {
        state.restaurant = action.payload;
    }
  },
})

export const { setRestaurant } = restaurantSlice.actions;

export const selectRestaurant = (state) => state.restaurant.restaurant;

//reduce amazing es6 function to add the price of all the items in basket -> .reduce(()=?(),initial_value)
export default restaurantSlice.reducer;