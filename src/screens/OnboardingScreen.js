
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const onboardingData = [
  {
    title: "Discover Restaurants",
    description:
      "Find your favorite local restaurant and explore cuisines from the comfort of your home.",
    image: require("../../assets/images/Frame 100.jpg"),
  },
  {
    title: "Fresh & Quality Foods",
    description:
      "Every dish prepared with care and professional chefs using the finest ingredients.",
    image: require("../../assets/images/Frame 103.jpg"),
  },
  {
    title: "Fast Delivery",
    description:
      "Get your food delivered hot and fresh to your doorstep in minutes.",
    image: require("../../assets/images/Frame 104.jpg"),
  },
];

export default function OnboardingScreen({ onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentSlide = onboardingData[currentIndex];

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onFinish();
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={currentSlide.image}
        style={styles.image}
        resizeMode="cover"
      />

      <Text style={styles.title}>
        {currentSlide.title}
      </Text>

      <Text style={styles.description}>
        {currentSlide.description}
      </Text>

      <View style={styles.dots}>
        {onboardingData.map((item, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleNext}
      >
        <Text style={styles.buttonText}>
          {currentIndex === 2 ? "GET STARTED" : "NEXT"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 30,
  },

  image: {
    width: "100%",
    height: "42%",
    borderRadius: 15,
    marginBottom: 35,
  },

  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 23,
    color: "#111111",
    textAlign: "center",
    marginBottom: 15,
  },

  description: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#777777",
    textAlign: "center",
    lineHeight: 23,
    paddingHorizontal: 5,
  },

  dots: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 55,
    marginBottom: 30,
    gap: 15,
  },

  dot: {
    width: 13,
    height: 13,
    borderRadius: 10,
    backgroundColor: "#D9D9D9",
  },

  activeDot: {
    width: 48,
    backgroundColor: "#FB5203",
  },

  button: {
    width: "100%",
    height: 55,
    backgroundColor: "#FB5203",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
  },
});
