import React from 'react';
import {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button, StatusBar, Image} from 'react-native';

export default function App() {
  // Mapeamento de teclas
  
  const buttons = ['LIMPAR', 'DEL', '%', '/', 7, 8, 9, "x", 4, 5, 6, '-', 1, 2, 3, '+','.', 0, '+/-', '=']

  const [currentNumber, setCurrentNumber] = useState("")
  const [lastNumber, setLastNumber] = useState("")
  const [darkMode, setDarkMode] = useState(false)

  function calculator(){
    const splitNumbers = currentNumber.split(' ')
    const fistNumber = parseFloat(splitNumbers[0])
    const lastNumber = parseFloat(splitNumbers[2])
    const operator = splitNumbers[1]

    // Faz ação referente tecla pressionada
    switch(operator){
      case '+':
        setCurrentNumber((fistNumber + lastNumber).toString())
        return
      case '-': 
        setCurrentNumber((fistNumber - lastNumber).toString())
        return
      case 'x':
        setCurrentNumber((fistNumber * lastNumber).toString())
        return
      case '/': 
        setCurrentNumber((fistNumber / lastNumber).toString())
        return
      case '%': 
        setCurrentNumber(((fistNumber * lastNumber) /100).toString())
        return
    }
  }



  function handleInput(buttonPressed){
    
    console.log(buttonPressed) // Mostra no Console a tecla pressionada
    if(buttonPressed === '+' | buttonPressed === "-" | buttonPressed === "x" | buttonPressed === "/" | buttonPressed === "%"){
      setCurrentNumber(currentNumber + " " + buttonPressed + " ")
      return
    }
    switch(buttonPressed){
      case 'DEL':
        setCurrentNumber(currentNumber.substring(0, (currentNumber.length - 1)))
        return
      case 'LIMPAR': // Limpa todo o conteúdo
        setLastNumber("") 
        setCurrentNumber("") 
        return
      case '=':
        setLastNumber(currentNumber + " = ")
        calculator()
        return
      case '+/-':
        let numero; //criei uma variavel
        if(0 == 0 ){  //condição sempre verdadeira pare entrar no if
          numero = currentNumber;
         
          numero = (numero * (-1));
         
          setCurrentNumber(numero)
        }
        return 
    }

    setCurrentNumber(currentNumber + buttonPressed)
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    results: {
      
      backgroundColor: darkMode ? "#282f3b" : "#f5f5f5",
      width: '100%',
    
      minHeight: 280,
      alignItems: 'flex-end',
      justifyContent: 'flex-end'
    },
    resultText: {
      color: darkMode ? "#f5f5f5" : "#282F38",
      margin: 10,
      fontSize: 40
    },

    historyText:{
      color: darkMode ? "#B5B7BB" : "#7c7c7c",
      fontSize: 20,
      marginRight: 10,
      alignSelf: 'flex-end',
    },
    themeButton: {
      alignSelf: 'flex-start',
      bottom: 110,
      margin: 5,
      backgroundColor: darkMode ? "#7b8084" : "#e5e5e5",
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
      
    },
    buttons: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    button: {
      borderColor: darkMode ? "#4b0082" : "#7b8084",
      backgroundColor: darkMode ? "#4b0082" : "#e5e5e5",
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 90, 
      minHeight: 58,
      flex: 1,
    },
    imagem:{
        
        width: '90%', 
        height: '90%'
        
      },
    

    textButton: {
      color: darkMode ? "#7b8084" : "#7c7c7c",
      fontSize: 20,
    },
  });

  return (
    
    <View>
    <View style={styles.results}>
      {/* Area onde o resultado é exibido */}
      <TouchableOpacity style={styles.themeButton} onPress={() => darkMode ? setDarkMode(false) : setDarkMode(true)}>
        <Image style={styles.imagem} source = {require('./src/img/img.png')}></Image>
      </TouchableOpacity>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
     </View>

      {/* Area onde os botões são exibidos*/}
      <View style={styles.buttons}>

        {buttons.map((button) => 
          button === '=' ? // Mapeamento do botão =
        <TouchableOpacity onPress={() => handleInput(button)} key={button} style={[styles.button, {backgroundColor: '#282f3b'}]}>
          <Text style={[styles.textButton, {color: "white", fontSize: 30}]}>{button}</Text>
        </TouchableOpacity>
          : // Mapeamento dos outros botões
          <TouchableOpacity onPress={() => handleInput(button)} key={button} style={styles.button}>
            <Text style={[styles.textButton, {color: typeof(button) === 'number' ? darkMode === true ? 'white' : 'black': darkMode === true ? 'white' : 'black'}]}>{button}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>

    
  );
}


