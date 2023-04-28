import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Animated, TextInput } from "react-native";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../RootStackParams";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { MainBottomTabParamList } from "./MainBottomTabParams";
import { db } from "../../../firebase-config";
import {
  ref,
  onValue,
  push,
  remove
} from "firebase/database";
import WordItem from "./WordItem";

type HomeScreenProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, "Main">,
  BottomTabNavigationProp<MainBottomTabParamList, "Home">
>;

const HomeScreen = (): JSX.Element => {
  const emptyWord = { word: "", notes: "", imageURL: "" };
  const [words, setWords] = useState({});
  const [presentWord, setPresentWord] = useState(emptyWord);
  const wordsKeys = Object.keys(words);



  function addNewWord() {
    push(ref(db, "/words"), {
      word: presentWord.word,
      notes: presentWord.notes,
      imageURL: presentWord.imageURL
    });
    setPresentWord(emptyWord);
  }



  return (
    <Animated.ScrollView
       scrollEnabled={true}
        style={styles.container}
                         contentContainerStyle={styles.contentContainerStyle}
    >
     <TextInput
        placeholder="New Word"
        value={presentWord.word}
        style={styles.textInput}
        onChangeText={text => {
          setPresentWord({
            word: text,
            notes: presentWord.notes,
            imageURL: presentWord.imageURL
          });
        }}

      />
      <TextInput
        placeholder="Description..."
        value={presentWord.notes}
        style={styles.textInput}
        onChangeText={text => {
          presentWord.notes = text;
          setPresentWord({
            word: presentWord.word,
            notes: text,
            imageURL: presentWord.imageURL
          });
        }}

      />
      <View>
        <View style={{ marginTop: 20 }}>
          <Button
            title="Add new word"
            onPress={addNewWord}
            color="green"
            disabled={presentWord.word === ""}
          />
        </View>
      </View>
    </Animated.ScrollView>
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
    borderColor: "#afafaf",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 20,
    fontSize: 20
  },
  wordItem: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center"
  },
  wordText: {
    paddingHorizontal: 5,
    fontSize: 16
  }
});

export default HomeScreen;
