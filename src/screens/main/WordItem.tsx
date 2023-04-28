import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Animated, TextInput } from "react-native";
import { PPBenItem } from "../../interfaces/PPBenInterface";

const WordItem = (item: PPBenItem)  => {
  console.log('item.word: ',  item.word)
  return (
    <View style={styles.todoItem}>
      <Text style={[styles.todoText, {opacity:  1}]}>
        {item.word}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12
  },
  contentContainerStyle: {
    padding: 24
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#afafaf',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 20,
    fontSize: 20,
  },
  todoItem: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center'
  },
  todoText: {
    paddingHorizontal: 5,
    fontSize: 16
  },
});

export default WordItem;
