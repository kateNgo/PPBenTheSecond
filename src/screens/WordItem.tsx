import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
  TextInput
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';


const ToDoItem = () => {
  const [doneState, setDone] = useState(false);
  const onCheck = (isChecked: boolean) => {
    setDone(isChecked);
  };
  return (
    <View style={styles.wordItem}>
      <CheckBox
        onValueChange={onCheck}
        value={doneState}
      />
      <Text style={[styles.itemText, {opacity: doneState ? 0.2 : 1}]}>
        A random To-Do item
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wordItem: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  itemText: {
    paddingHorizontal: 5,
    fontSize: 16
  },
});
