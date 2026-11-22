import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import React, { useEffect, useRef, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";

import { StatusBar } from "expo-status-bar";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";


import OnboardingScreen from "./screens/OnboardingScreen";

const { width, height } = Dimensions.get("window");

// SPLASH SCREEN

function SplashScreen({ onFinish }) {
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  const dot1 = useRef(new Animated.Value(0.3)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 5,
        tension: 50,
        useNativeDriver: true,
      }),

      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),

      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 1200,
        delay: 400,
        useNativeDriver: true,
      }),
    ]).start();

    const animateDot = (dot, delay) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, {
            toValue: 1,
            duration: 350,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0.3,
            duration: 350,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const animation1 = animateDot(dot1, 0);
    const animation2 = animateDot(dot2, 180);
    const animation3 = animateDot(dot3, 360);

    animation1.start();
    animation2.start();
    animation3.start();

    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => {
      clearTimeout(timer);
      animation1.stop();
      animation2.stop();
      animation3.stop();
    };
  }, []);

  return (
    <View style={styles.splashContainer}>
      <StatusBar style="light" />

      {/* Decorative circles */}

      <View style={styles.circleTop} />
      <View style={styles.circleBottom} />

      {/* Floating food illustrations */}

      <Text style={styles.foodTopLeft}>🍕</Text>
      <Text style={styles.foodTopRight}>🍟</Text>
      <Text style={styles.foodBottomLeft}>🍔</Text>
      <Text style={styles.foodBottomRight}>🥤</Text>

      {/* Main logo */}

      <Animated.View
        style={[
          styles.logoCircle,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          },
        ]}
      >
        <Text style={styles.logoIcon}>🍴</Text>
      </Animated.View>

      {/* Brand name */}

      <Animated.View
        style={[
          styles.brandContainer,
          { opacity: textOpacity },
        ]}
      >
        <Text style={styles.brandName}>FoodFlow</Text>

        <Text style={styles.tagline}>
          Delicious Food, Delivered Fast!
        </Text>

        <Text style={styles.subTagline}>
          Fresh • Tasty • Just for You
        </Text>
      </Animated.View>

      {/* Animated loading dots */}

      <View style={styles.loadingContainer}>
        {[dot1, dot2, dot3].map((dot, index) => (
          <Animated.View
            key={index}
            style={[
              styles.loadingDot,
              { opacity: dot },
            ]}
          />
        ))}
      </View>

      <Text style={styles.loadingText}>
        Preparing something delicious...
      </Text>

      <Text style={styles.footerText}>
        MADE WITH ❤️ FOR FOOD LOVERS
      </Text>
    </View>
  );
}


// MAIN APP

function AppContent() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
const [currentUser, setCurrentUser] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(true);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingScreen}>
        <Text style={styles.loadingBrand}>FoodFlow 🍔</Text>
      </View>
    );
  }

  // First: Splash Screen

  if (showSplash) {
    return (
      <SplashScreen
        onFinish={() => setShowSplash(false)}
      />
    );
  }

  // Second: Onboarding Screens

  if (showOnboarding) {
    return (
      <>
        <StatusBar style="dark" />
        <OnboardingScreen
          onFinish={() => setShowOnboarding(false)}
        />
      </>
    );
  }

  // Third: Login Screen

if (!isLoggedIn) {
  return (
    <LoginScreen
      onLoginSuccess={(user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      }}
    />
  );
}

// Show Home Screen after successful login
return (
  <HomeScreen
    currentUser={currentUser}
    onLogout={() => {
      setIsLoggedIn(false);
      setCurrentUser(null);
    }}
  />
);
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}


// STYLES

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    backgroundColor: "#FB5203",
    justifyContent: "center",
    alignItems: "center",
  },

  loadingBrand: {
    color: "#FFFFFF",
    fontFamily: "Poppins_700Bold",
    fontSize: 28,
  },

  splashContainer: {
    flex: 1,
    backgroundColor: "#FB5203",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    paddingHorizontal: 20,
  },

  circleTop: {
    position: "absolute",
    width: 230,
    height: 230,
    borderRadius: 115,
    backgroundColor: "rgba(255,255,255,0.08)",
    top: -90,
    right: -65,
  },

  circleBottom: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "rgba(255,255,255,0.08)",
    bottom: -120,
    left: -100,
  },

  foodTopLeft: {
    position: "absolute",
    top: height * 0.19,
    left: width * 0.13,
    fontSize: 35,
  },

  foodTopRight: {
    position: "absolute",
    top: height * 0.22,
    right: width * 0.13,
    fontSize: 35,
  },

  foodBottomLeft: {
    position: "absolute",
    bottom: height * 0.22,
    left: width * 0.12,
    fontSize: 38,
  },

  foodBottomRight: {
    position: "absolute",
    bottom: height * 0.22,
    right: width * 0.12,
    fontSize: 35,
  },

  logoCircle: {
    width: 125,
    height: 125,
    borderRadius: 65,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28,

    elevation: 12,
    shadowColor: "#000000",
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
  },

  logoIcon: {
    fontSize: 58,
  },

  brandContainer: {
    alignItems: "center",
  },

  brandName: {
    fontFamily: "Poppins_700Bold",
    fontSize: 32,
    color: "#FFFFFF",
    marginBottom: 8,
  },

  tagline: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
  },

  subTagline: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#FFFFFF",
    marginTop: 12,
    opacity: 0.9,
  },

  loadingContainer: {
    flexDirection: "row",
    marginTop: 45,
    alignItems: "center",
  },

  loadingDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 5,
  },

  loadingText: {
    fontFamily: "Poppins_400Regular",
    color: "#FFFFFF",
    fontSize: 11,
    marginTop: 14,
  },

  footerText: {
    position: "absolute",
    bottom: 30,
    fontFamily: "Poppins_700Bold",
    fontSize: 9,
    letterSpacing: 2,
    color: "#FFFFFF",
    opacity: 0.8,
  },
});
