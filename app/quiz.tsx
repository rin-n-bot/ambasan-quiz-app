import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { questions } from "../question";

export default function Quiz() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const currentQuestion = questions[currentIndex];

  const selectAnswer = (choice) => {
    setAnswers({ ...answers, [currentQuestion.id]: choice });
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.answer) {
        score++;
      }
    });
    return score;
  };

  const finishQuiz = () => {
    const score = calculateScore();
    router.push({
      pathname: "/result",
      params: { score },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        {currentIndex + 1}. {currentQuestion.question}
      </Text>

      {Object.entries(currentQuestion.choices).map(([key, value]) => (
        <TouchableOpacity
          key={key}
          style={[
            styles.choice,
            answers[currentQuestion.id] === key && styles.selected,
          ]}
          onPress={() => selectAnswer(key)}
        >
          <Text>{key}. {value}</Text>
        </TouchableOpacity>
      ))}

      <View style={styles.nav}>
        <Button
          title="Previous"
          disabled={currentIndex === 0}
          onPress={() => setCurrentIndex(currentIndex - 1)}
        />
        {currentIndex === questions.length - 1 ? (
          <Button title="Finish" onPress={finishQuiz} />
        ) : (
          <Button
            title="Next"
            onPress={() => setCurrentIndex(currentIndex + 1)}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  question: { fontSize: 18, marginBottom: 15 },
  choice: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  selected: {
    backgroundColor: "#cce5ff",
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
