
import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function SplashScreen({ onFinish }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>

      <View style={styles.logoCircle}>
        <Text style={styles.logo}>🍴</Text>
      </View>

      <Text style={styles.title}>Food Flow</Text>

      <Text style={styles.subtitle}>
        Delicious Food, Delivered Fast
      </Text>

      <View style={styles.dots}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FB5203",
    justifyContent: "center",
    alignItems: "center",
  },

  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },

  logo: {
    fontSize: 45,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 15,
    color: "#FFFFFF",
  },

  dots: {
    flexDirection: "row",
    marginTop: 35,
    gap: 10,
  },

  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
  },
});
