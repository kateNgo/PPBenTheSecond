import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import {MainBottomTabParamList} from './MainBottomTabParams';
import DetailsScreen from './DetailsScreen';
import ListScreen from "./ListScreen";
import AddNewItemScreen from "./AddNewItemScrenn";
import  GameScreen  from "./GameScreen";

const BottomTab = createBottomTabNavigator<MainBottomTabParamList>();

function MainScreen() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen  name="AddNewItem" component={AddNewItemScreen} />
      <BottomTab.Screen name="List" component={ListScreen} />
      <BottomTab.Screen name="Game" component={GameScreen} />

    </BottomTab.Navigator>
  );
}

export default MainScreen;
