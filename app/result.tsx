import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

let highestScore = 0;

export default function Result() {
  const { score } = useLocalSearchParams();
  const router = useRouter();
  const numericScore = Number(score);

  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    if (numericScore > highestScore) {
      highestScore = numericScore;
    }
    setBestScore(highestScore);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your Score: {numericScore}</Text>
      <Text style={styles.text}>Highest Score: {bestScore}</Text>

      <Button title="Restart Quiz" onPress={() => router.replace("/quiz")} />
      <Button title="Back to Home" onPress={() => router.replace("/")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 20, marginBottom: 10 },
});
