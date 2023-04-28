import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import {MainBottomTabParamList} from './MainBottomTabParams';
import DetailsScreen from './DetailsScreen';
import ListScreen from "./ListScreen";

const BottomTab = createBottomTabNavigator<MainBottomTabParamList>();

function MainScreen() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="Home" component={HomeScreen} />
      <BottomTab.Screen name="List" component={ListScreen} />
    </BottomTab.Navigator>
  );
}

export default MainScreen;
