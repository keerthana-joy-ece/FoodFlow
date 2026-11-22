
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { COLORS } from "../constants/colors";

const OfferBanner = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.subtitle}>Special Offer</Text>

        <Text style={styles.title}>Get 50% OFF</Text>

        <Text style={styles.description}>
          only for your first order above ₹500
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={onPress}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Order Now</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.emoji}>🍔</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 12,
    padding: 18,
    minHeight: 135,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  content: {
    flex: 1,
  },

  subtitle: {
    color: COLORS.white,
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
  },

  title: {
    color: COLORS.white,
    fontFamily: "Poppins_700Bold",
    fontSize: 23,
    marginTop: 4,
  },

  description: {
    color: COLORS.white,
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    marginTop: 3,
  },

  button: {
    backgroundColor: COLORS.white,
    paddingVertical: 7,
    paddingHorizontal: 18,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginTop: 10,
  },

  buttonText: {
    color: COLORS.primary,
    fontFamily: "Poppins_700Bold",
    fontSize: 12,
  },

  emoji: {
    fontSize: 43,
    marginLeft: 8,
  },
});

export default OfferBanner;
