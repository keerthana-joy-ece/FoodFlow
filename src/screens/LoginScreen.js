
import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Platform,
  ScrollView,
} from "react-native";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "../firebase/firebaseConfig";

const showMessage = (title, message) => {
  if (Platform.OS === "web") {
    window.alert(`${title}\n\n${message}`);
  } else {
    Alert.alert(title, message);
  }
};

export default function LoginScreen({ onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // LOGIN
  const handleLogin = async () => {
    if (!email.trim() || !password) {
      showMessage("Missing Details", "Enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const result = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      showMessage("Success", "Login successful!");

      onLoginSuccess?.(result.user);
    } catch (error) {
      let message = "Unable to login. Please try again.";

      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password"
      ) {
        message = "Incorrect email or password.";
      } else if (error.code === "auth/user-not-found") {
        message = "Account not found. Please sign up.";
      } else if (error.code === "auth/invalid-email") {
        message = "Enter a valid email address.";
      } else if (error.code === "auth/too-many-requests") {
        message = "Too many attempts. Try again later.";
      }

      showMessage("Login Failed", message);
    } finally {
      setLoading(false);
    }
  };

  // SIGN UP
  const handleSignup = async () => {
    if (!email.trim() || !password || !confirmPassword) {
      showMessage("Missing Details", "Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      showMessage("Weak Password", "Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      showMessage("Password Mismatch", "Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const result = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      showMessage("Success", "Your FoodFlow account has been created!");

      onLoginSuccess?.(result.user);
    } catch (error) {
      let message = "Unable to create account.";

      if (error.code === "auth/email-already-in-use") {
        message = "This email is already registered. Please login.";
      } else if (error.code === "auth/invalid-email") {
        message = "Enter a valid email address.";
      } else if (error.code === "auth/weak-password") {
        message = "Please choose a stronger password.";
      } else if (error.code === "auth/operation-not-allowed") {
        message = "Enable Email/Password in Firebase Authentication.";
      }

      showMessage("Signup Failed", message);
    } finally {
      setLoading(false);
    }
  };

  // FORGOT PASSWORD
  const handleForgotPassword = async () => {
    if (!email.trim()) {
      showMessage("Forgot Password", "Enter your email address first.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email.trim());

      showMessage(
        "Password Reset",
        "Password reset instructions have been sent to your email."
      );
    } catch (error) {
      showMessage("Error", error.message);
    }
  };

  // DEMO SOCIAL LOGIN
const handleSocialLogin = (provider) => {
  showMessage(
    `${provider} Demo`,
    `${provider} demo login successful! Welcome to FoodFlow.`
  );

  // Navigate to Home Screen
  onLoginSuccess?.({
    displayName: `FoodFlow ${provider} Demo`,
    email: `${provider.toLowerCase()}-demo@foodflow.test`,
    provider: provider,
  });
};

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>

        <Text style={styles.logo}>FoodFlow 🍔</Text>

        <Text style={styles.title}>
          {activeTab === "login" ? "Welcome Back!" : "Create Account"}
        </Text>

        <Text style={styles.subtitle}>
          {activeTab === "login"
            ? "Login to continue your delicious journey."
            : "Sign up to start ordering delicious food."}
        </Text>

        {/* LOGIN AND SIGNUP TABS */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "login" && styles.activeTab,
            ]}
            onPress={() => setActiveTab("login")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "login" && styles.activeTabText,
              ]}
            >
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "signup" && styles.activeTab,
            ]}
            onPress={() => setActiveTab("signup")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "signup" && styles.activeTabText,
              ]}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        {/* EMAIL */}
        <Text style={styles.label}>Email Address</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#999999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        {/* PASSWORD */}
        <Text style={styles.label}>Password</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#999999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* CONFIRM PASSWORD - SIGNUP ONLY */}
        {activeTab === "signup" && (
          <>
            <Text style={styles.label}>Confirm Password</Text>

            <TextInput
              style={styles.input}
              placeholder="Re-enter your password"
              placeholderTextColor="#999999"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </>
        )}

        {/* FORGOT PASSWORD - LOGIN ONLY */}
        {activeTab === "login" && (
          <TouchableOpacity
            style={styles.forgot}
            onPress={handleForgotPassword}
          >
            <Text style={styles.forgotText}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        )}

        {/* MAIN LOGIN / SIGNUP BUTTON */}
        <TouchableOpacity
          style={styles.mainButton}
          onPress={activeTab === "login" ? handleLogin : handleSignup}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.mainButtonText}>
              {activeTab === "login" ? "LOGIN" : "CREATE ACCOUNT"}
            </Text>
          )}
        </TouchableOpacity>

        {/* SOCIAL LOGIN */}
        <View style={styles.socialDivider}>
          <View style={styles.dividerLine} />
          <Text style={styles.socialText}>or continue with</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => handleSocialLogin("Google")}
        >
          <Text style={styles.googleIcon}>G</Text>
          <Text style={styles.socialButtonText}>
            Continue with Google
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => handleSocialLogin("Facebook")}
        >
          <Text style={styles.facebookIcon}>f</Text>
          <Text style={styles.socialButtonText}>
            Continue with Facebook
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => handleSocialLogin("Apple")}
        >
          <Text style={styles.appleIcon}>🍎</Text>
          <Text style={styles.socialButtonText}>
            Continue with Apple
          </Text>
        </TouchableOpacity>

        {/* BOTTOM LINK */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>
            {activeTab === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
          </Text>

          <TouchableOpacity
            onPress={() => {
              setActiveTab(
                activeTab === "login" ? "signup" : "login"
              );
              setPassword("");
              setConfirmPassword("");
            }}
          >
            <Text style={styles.signupLink}>
              {activeTab === "login" ? " Sign Up" : " Login"}
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 25,
  },

  container: {
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    paddingHorizontal: 25,
  },

  logo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FB5203",
    textAlign: "center",
    marginBottom: 30,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#111111",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: "#777777",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 30,
  },

  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#EEEEEE",
    borderRadius: 12,
    padding: 5,
    marginBottom: 25,
  },

  tab: {
    flex: 1,
    paddingVertical: 11,
    alignItems: "center",
    borderRadius: 9,
  },

  activeTab: {
    backgroundColor: "#FFFFFF",
  },

  tabText: {
    fontSize: 14,
    color: "#333333",
  },

  activeTabText: {
    fontWeight: "bold",
    color: "#FB5203",
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 8,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 14,
    marginBottom: 18,
    color: "#333333",
  },

  forgot: {
    alignItems: "flex-end",
    marginBottom: 22,
  },

  forgotText: {
    color: "#FB5203",
    fontSize: 13,
  },

  mainButton: {
    backgroundColor: "#FB5203",
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },

  mainButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  socialDivider: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#CCCCCC",
  },

  socialText: {
    marginHorizontal: 10,
    fontSize: 13,
    color: "#555555",
  },

  socialButton: {
    height: 48,
    backgroundColor: "#EEEEEE",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  googleIcon: {
    color: "#4285F4",
    fontSize: 22,
    fontWeight: "bold",
    marginRight: 15,
  },

  facebookIcon: {
    color: "#1877F2",
    fontSize: 25,
    fontWeight: "bold",
    marginRight: 15,
  },

  appleIcon: {
    fontSize: 19,
    marginRight: 15,
  },

  socialButtonText: {
    fontSize: 14,
    color: "#222222",
    fontWeight: "500",
  },

  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },

  signupText: {
    color: "#777777",
    fontSize: 13,
  },

  signupLink: {
    color: "#FB5203",
    fontWeight: "bold",
    fontSize: 13,
  },
});
