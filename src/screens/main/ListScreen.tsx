import {useNavigation} from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Animated, TextInput } from "react-native";
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../RootStackParams';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {MainBottomTabParamList} from './MainBottomTabParams';
import { TouchableOpacity } from "react-native-gesture-handler";
import { db } from '../../../firebase-config';
import {
  ref,
  onValue,
  push,
  update,
  remove
} from 'firebase/database';
import { PPBenItem } from "../../interfaces/PPBenInterface";
import { render } from "react-dom";

type ListScreenProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'Main'>,
  BottomTabNavigationProp<MainBottomTabParamList, 'List'>
>;

const ListScreen = () => {
  const [words, setWords] = useState({});
  useEffect(() => {
    return onValue(ref(db, '/words'), querySnapShot => {
      let data = querySnapShot.val() || {};
      let wordItems = {...data};
      setWords(wordItems);
    });
  }, []);

};

export default ListScreen;
