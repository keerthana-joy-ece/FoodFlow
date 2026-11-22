
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PaymentSuccessScreen = ({
  order,
  onTrackOrder,
  onBackToHome,
  onBack,
}) => {
  const orderId = order?.id || "1234567890";

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack || onBackToHome}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Payment Successful</Text>
        <View style={{ width: 25 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Illustration */}
        <View style={styles.illustration}>
           
  <Image
    source={require("../../assets/images/Depth 4, Frame 0.jpg")}
    style={styles.successImage}
    resizeMode="cover"
  />
          <View style={styles.checkCircle}>
            <Text style={styles.check}>✓</Text>
          </View>
          <View style={styles.platform} />
        </View>

        {/* Success Message */}
        <Text style={styles.title}>
          Order Placed Successfully
        </Text>

        <Text style={styles.subtitle}>
          Your order has been placed successfully.
          You can track your order status in the app.
        </Text>

        {/* Order ID */}
        <View style={styles.orderSection}>
          <Text style={styles.orderLabel}>Order ID</Text>
          <Text style={styles.orderValue}>
            #{orderId}
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.trackButton}
            onPress={onTrackOrder}
          >
            <Text style={styles.trackButtonText}>
              Track Order
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.homeButton}
            onPress={onBackToHome}
          >
            <Text style={styles.homeButtonText}>
              Back to Home
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  header: {
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
  },

  backArrow: {
    fontSize: 32,
    color: "#222222",
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222222",
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },

 
illustration: {
  width: "100%",
  height: 155,
  borderRadius: 12,
  overflow: "hidden",
  marginTop: 12,
  marginBottom: 22,
},

successImage: {
  width: "100%",
  height: "100%",
},

  checkCircle: {
    width: 105,
    height: 105,
    borderRadius: 55,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },

  check: {
    fontSize: 75,
    fontWeight: "bold",
    color: "#20A45A",
    marginTop: -8,
  },

  platform: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 17,
    backgroundColor: "#B9D8D0",
  },

  title: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#222222",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 13,
    color: "#555555",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 22,
  },

  orderSection: {
    marginBottom: 25,
  },

  orderLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#222222",
    marginBottom: 12,
  },

  orderValue: {
    fontSize: 14,
    color: "#222222",
    textAlign: "center",
    fontWeight: "600",
  },

  buttons: {
    marginTop: "auto",
    gap: 9,
  },

  trackButton: {
    height: 46,
    backgroundColor: "#FB5203",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  trackButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },

  homeButton: {
    height: 46,
    borderWidth: 1,
    borderColor: "#FB5203",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  homeButtonText: {
    color: "#222222",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default PaymentSuccessScreen;
