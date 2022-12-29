import { createSlice,current } from '@reduxjs/toolkit'

//to check if redux is working -> console.log(current(state));

const initialState = {
    items: [],
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      
      state.items = [...state.items,action.payload];
      
    },
    removeFromBasket: (state,action) => {
      const index = state.items.findIndex((item)=> item.id === action.payload.id);

      let newBasket = [...state.items];
      if(index>=0){
        newBasket.splice(index,1);
      }else{
        console.warn(
          `Can't remove product {id: ${action.payload.id}} as it's not in basket`
        );
      }
      state.items = newBasket;
    },
  },
})

export const { addToBasket, removeFromBasket } = basketSlice.actions;

export const selectBasketItems = (state) => state.basket.items;
export const selectBasketItemswithId = (state,id) => state.basket.items.filter((item)=>item.id===id);

//reduce amazing es6 function to add the price of all the items in basket -> .reduce(()=?(),initial_value)
export const selectBasketTotal = (state) => state.basket.items.reduce((total,item)=> total+=item.price,0);


export default basketSlice.reducer;