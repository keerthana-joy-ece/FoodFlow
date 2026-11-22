
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";

const SuccessScreen = ({
  orderId = "1234567890",
  onTrackOrder,
  onBackHome,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.headerTitle}>
          Payment Successful
        </Text>

        <View style={styles.successImage}>
          <Text style={styles.checkmark}>✓</Text>
        </View>

        <Text style={styles.successTitle}>
          Order Placed Successfully
        </Text>

        <Text style={styles.description}>
          Your order has been placed successfully.
          You can track your order status in the app.
        </Text>

        <Text style={styles.orderLabel}>Order ID</Text>

        <Text style={styles.orderId}>
          {orderId}
        </Text>
      </ScrollView>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.trackButton}
          onPress={onTrackOrder}
        >
          <Text style={styles.trackText}>
            Track Order
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={onBackHome}
        >
          <Text style={styles.homeText}>
            Back to Home
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  content: {
    paddingBottom: 20,
  },
  headerTitle: {
    textAlign: "center",
    fontSize: 21,
    fontFamily: "Poppins_700Bold",
    marginBottom: 25,
    color: "#222222",
  },
  successImage: {
    height: 165,
    width: "100%",
    backgroundColor: "#285C5D",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  checkmark: {
    fontSize: 100,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  successTitle: {
    fontSize: 19,
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
    marginTop: 5,
  },
  description: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    color: "#555555",
    marginTop: 10,
  },
  orderLabel: {
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    marginTop: 25,
  },
  orderId: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    marginTop: 8,
  },
  buttons: {
    paddingBottom: 10,
  },
  trackButton: {
    backgroundColor: "#FB5203",
    padding: 14,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 10,
  },
  trackText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: "Poppins_700Bold",
  },
  homeButton: {
    borderWidth: 1,
    borderColor: "#FB5203",
    padding: 13,
    borderRadius: 30,
    alignItems: "center",
  },
  homeText: {
    color: "#222222",
    fontSize: 15,
    fontFamily: "Poppins_700Bold",
  },
});

export default SuccessScreen;
