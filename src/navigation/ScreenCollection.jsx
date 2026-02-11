import SplashScreen from '../screens/SplashScreen';
import TabNavigator from "../navigation/TabNavigation"
import ProductDetailsScreen from '../screens/home/ProductDetailsScreen';
import CartScreen from '../screens/home/CartScreen';
export const mergedStacks = [
  {
    name: 'splashScreen',
    component: SplashScreen,
  },
  {
    name: "TabNavigator",
    component: TabNavigator,
  },
  {
    name: 'productDetails',
    component: ProductDetailsScreen,
  },
  {
    name: 'cartScreen',
    component: CartScreen,
  },
];
