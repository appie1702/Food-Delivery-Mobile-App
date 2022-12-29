import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import { Provider } from 'react-redux';
import { store } from './store';
import BasketScreen from './screens/BasketScreen';
import PreparingOrderScreen from './screens/PreparingOrderScreen';
import DeliveryScreen from './screens/DeliveryScreen';
const stack = createNativeStackNavigator();


export default function App() {
  return (
    
    <NavigationContainer>
      <Provider store={store}>
        <TailwindProvider>
          <stack.Navigator>

              <stack.Group screenOptions={{headerShown:false, animation:"slide_from_right"}}>
                
                <stack.Screen name='Home' component={HomeScreen}/>
                <stack.Screen name='Restaurant' component={RestaurantScreen}/>
              
              </stack.Group>
              
              <stack.Group screenOptions={{headerShown:false}}>
              
                <stack.Screen name='Basket' component={BasketScreen} options={{
                  presentation: 'transparentModal'
                }} />
                <stack.Screen name='PreparingOrder' component={PreparingOrderScreen}
                  options={{presentation: 'transparentModal'}}
                />
                <stack.Screen name='Delivery' component={DeliveryScreen}
                  options={{presentation: 'transparentModal'}}
                />
              
              </stack.Group>

          </stack.Navigator>
        </TailwindProvider>
      </Provider>
    </NavigationContainer>
  );
}