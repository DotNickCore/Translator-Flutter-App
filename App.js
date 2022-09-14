import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useState } from 'react';



export default function App() {

  // -------------------- states ---------------------------------------

  const [enteredWord, setEnteredWord] = useState(''); 
  
  // state to remember user's word history
  const [wordHistory, AddToWordHistory] = useState([]);


  // ------------------- event handlers ---------------------------------


  // a function that listens for words for user to enter

  function wordInputHandler(enteredText) {
    setEnteredWord(enteredText);
  };

  // a function that fires up when Translate button is clicked

  function translateHandler() {

    AddToWordHistory([CurrentWordHistory => [...CurrentWordHistory, enteredWord]]);
  };


  


  // ------------------------------ The app view --------------------------

  return (
    <View style={styles.container}>

      <View style={styles.InputContainer}>
        
        <TextInput placeholder='type any word...' style={styles.textInput} onChangeText={wordInputHandler}/>
        <Button title='Translate' onPress={translateHandler} />

      </View>

      <View style={styles.goalsContainer}>
        
        {wordHistory.map((word) => <Text>{word}</Text>)};

      </View>

    </View>
  );
}



// --------------------- styling ----------------------------------------

const styles = StyleSheet.create(
  {
    container: {
      padding: 50,
      flex: 1,
      paddingHorizontal: 30,
      borderWidth: 1,
      borderColor: 'blue'
    },

    InputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
      borderBottomWidth: 1,
      borderBottomColor: 'black',
      flex: 1,
      
    },

    textInput: {
      borderWidth: 1,
      borderColor: 'blue',
      width: '70%',
      marginRight: 10,
      padding: 8,
    },


    goalsContainer: {
      flex: 4

    }

  }
);


