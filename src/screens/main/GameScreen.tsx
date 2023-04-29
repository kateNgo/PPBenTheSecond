import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Animated, TextInput } from "react-native";
import { db } from '../../../firebase-config';
import {
  ref,
  onValue,
  remove
} from 'firebase/database';
import { PPBenItem } from "../../interfaces/PPBenInterface";


const GameScreen = () => {
  const [words, setWords] = useState({});
  const [presentWord, setPresentWord] = useState({ word: "", notes: "", imageURL: "" });
  useEffect(() => {

    return onValue(ref(db, "/words"), querySnapShot => {
      let data = querySnapShot.val() || {};
      let wordItems = { ...data };
      setWords(wordItems);
      const keys = Object.keys(wordItems)
      if (keys.length > 0){
        const min = 0
        const max = keys.length - 1
        const randomNumber =  Math.floor(Math.random() * (max - min + 1) + min)
        // presentWord = wordItems[randomNumber]
        setPresentWord(wordItems[keys[randomNumber]]);
        console.log('PresentWord:', JSON.stringify(presentWord))
      }
    });
  }, []);

  let word: PPBenItem = presentWord;
  const letters = word.word.split('')
  return (
    <Animated.ScrollView
      scrollEnabled={true}
      style={[styles.container]}
      contentContainerStyle={styles.contentContainerStyle}
    >
      <View style={styles.rowContainer}>
        {
          letters.map(letter => {
            return (
              <Text style={styles.letterStyle}>{letter}</Text>
            )
          })
        }
      </View>
    </Animated.ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,

  },
  contentContainerStyle: {
    padding: 24,
    justifyContent: 'center',
    alignItems: "center"
  },
  letterStyle: {
    borderWidth: 1,
    borderColor: "#afafaf",
    borderRadius: 5,
    padding: 10,
    fontSize: 24,
    margin: 5
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default GameScreen;
