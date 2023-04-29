import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Animated, TextInput } from "react-native";
import { db } from '../../../firebase-config';
import {
  ref,
  onValue,
  remove
} from 'firebase/database';
import WordItem from "./WordItem";


const ListScreen = () => {
  const [words, setWords] = useState({});
  const wordsKeys = Object.keys(words);
  useEffect(() => {
    return onValue(ref(db, "/words"), querySnapShot => {
      let data = querySnapShot.val() || {};

      let wordItems = { ...data };
      setWords(wordItems);

    });
  }, []);
  function clearWords() {
    remove(ref(db, "/words"));
  }

  return (
    <Animated.ScrollView
      scrollEnabled={true}
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}
    >
      <View>
        {wordsKeys.length > 0 ? (
          wordsKeys.map(key => {
              // @ts-ignore
              const word = words[key];
              return (
                <WordItem word={word.word} imageURL={word.imageURL} notes={word.notes}
                          key={key}
                />
              );
            }
          )
        ) : (
          <Text>No word item</Text>
        )}
      </View>
      <View style={{ marginTop: 20 }}>
        <Button
          title="Clear word list"
          onPress={clearWords}
          color="green"
        />
      </View>
    </Animated.ScrollView>
  )
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
export default ListScreen;
