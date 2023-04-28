import {useNavigation} from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Animated, TextInput } from "react-native";
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../RootStackParams';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {MainBottomTabParamList} from './MainBottomTabParams';
import { db } from '../../../firebase-config';
import {
  ref,
  onValue,
  push,
  update,
  remove
} from 'firebase/database';
import WordItem from "./WordItem";
import { PPBenItem } from "../../interfaces/PPBenInterface";
import firebase from "firebase/compat";

type HomeScreenProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'Main'>,
  BottomTabNavigationProp<MainBottomTabParamList, 'Home'>
>;

const HomeScreen = () : JSX.Element => {
  const navigation = useNavigation<HomeScreenProp>();

  const [words, setWords] = useState({});
  const [presentWord, setPresentWord] = useState({word:'', notes: '', imageURL: ''});
  const wordsKeys = Object.keys(words);

  useEffect(() => {
    return onValue(ref(db, '/words'), querySnapShot => {
      let data = querySnapShot.val() || {};
      console.log('data: ', data)
      const keys = Object.keys(data);
      console.log('keys: ', keys)
      let wordItems  = {...data};
      console.log('wordItems: ', wordItems)
      setWords(wordItems);

    });
  }, []);
  function addNewWord() {
    push(ref(db, '/words'), {
      word: presentWord.word,
      notes: presentWord.notes,
      imageURL: presentWord.imageURL
    });
    setPresentWord({ word: '',
      notes: '',
      imageURL: '' });
  }
  function clearWords() {
    remove(ref(db, '/words'));
  }

  return (
    <Animated.ScrollView style={styles.container} contentContainerStyle={styles.contentContainerStyle}>
      <View>
        {wordsKeys.length > 0 ? (
          wordsKeys.map(key => {
              // @ts-ignore
              console.log('words[key]', words[key])
              // @ts-ignore
              // @ts-ignore
              return(
                <WordItem
                  key={key}
                  id={key}
                  item={words[key]} />
              );}
              )
        ) : (
          <Text>No word item</Text>
        )}
      </View>

      <TextInput
        placeholder="New Word"
        value={presentWord.word}
        style={styles.textInput}
        onChangeText={text => {
          setPresentWord({ word: text,
            notes: presentWord.notes,
            imageURL: presentWord.imageURL });
          // setPresentWord(presentWord);
        }}

      />
      <TextInput
        placeholder="Description..."
        value={presentWord.notes}
        style={styles.textInput}
        onChangeText={text => {
          presentWord.notes = text
          setPresentWord({ word: presentWord.word,
            notes: text,
            imageURL: presentWord.imageURL });
          // setPresentWord(presentWord);
        }}

      />
      <View>
        <View style={{marginTop: 20}}>
          <Button
            title="Add new word"
            onPress={addNewWord}
            color="green"
            disabled={presentWord.word === ''}
          />
        </View>

        <View style={{marginTop: 20}}>
          <Button
            title="Clear word list"
            onPress={clearWords}
            color="green"

          />
        </View>
      </View>
    </Animated.ScrollView>
  );
}

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
  wordItem: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center'
  },
  wordText: {
    paddingHorizontal: 5,
    fontSize: 16
  },
});

export default HomeScreen;
