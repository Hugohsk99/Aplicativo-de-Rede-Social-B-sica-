import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Profile: ProfileScreen
});

export default createAppContainer(AppNavigator);
