import { StatusBar } from "expo-status-bar";
import { countBy, Dictionary } from "lodash";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
const weights: number[] = [0.5, 1, 1.25, 2.5, 5, 10, 20].reverse();
export default function App() {
  const [weight, setWeight] = useState<string>("20");
  const [showError, setShowError] = useState<boolean>(false);
  const [result, setResult] = useState<Dictionary<number>>({});
  const handleChange = (text: string) => {
    if (parseFloat(text) <= 0) {
      setShowError(true);
      setWeight("1");
    } else {
      setWeight(text);
      setShowError(false);
    }
  };
  const calculatePlates = () => {
    const numbWeight = parseFloat(weight);
    let numbHolder = 20;
    const usedW = [];
    for (const i of weights) {
      const twoPlates = 2 * i;
      while (twoPlates <= numbWeight - numbHolder) {
        numbHolder += twoPlates;
        usedW.push(i, i);
      }
    }
    const countedObj = countBy(usedW);
    setResult(countedObj);
  };
  return (
    <>
      {showError && (
        <Text style={styles.errorContainer}>Weight must be higher than 0!</Text>
      )}
      <View style={styles.container}>
        <Text>Input Weight</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleChange}
          keyboardType={"numeric"}
          value={weight}
        />
        <Button title="Calculate Plates" onPress={calculatePlates} />
        <StatusBar style="auto" />
      </View>
      <View style={styles.platesContainer}>
        {Object.entries(result).map((item) => {
          const key = item[0];
          const value = item[1];
          return (
            <Text>
              {key} x {value}
            </Text>
          );
        })}
      </View>
    </>
  );
}
const spacing = 10;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  font: {
    color: "black",
  },
  input: {
    borderColor: "grey",
    padding: 3,
    borderWidth: 1,
    borderStyle: "solid",
    width: "80%",
    borderRadius: 6,
    marginBottom: spacing,
    marginTop: spacing,
  },
  button: {
    marginTop: 4,
  },
  platesContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  errorContainer: {
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
  },
});
