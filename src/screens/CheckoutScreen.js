
import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const CheckoutScreen = ({ onBack, onProceed }) => {
  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top", "left", "right"]}
    >
      <View style={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
          >
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Checkout
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        {/* CHECKOUT CONTENT */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >

          {/* DELIVERY */}
          <View style={styles.deliverySection}>
            <View style={styles.deliveryInfo}>
              <Text style={styles.sectionTitle}>
                Delivery
              </Text>

              <Text style={styles.address}>
                123 Elm Street, Apt 4B
              </Text>

              <Text style={styles.address}>
                New York, NY 10001
              </Text>
            </View>

            <View style={styles.addressIcon}>
              <Text style={styles.houseIcon}>🏠</Text>
            </View>
          </View>

          {/* ORDER SUMMARY */}
          <View style={styles.summarySection}>
            <Text style={styles.summaryTitle}>
              Order Summary
            </Text>

            <View style={styles.deliveryTime}>
              <View style={styles.clockBox}>
                <Text style={styles.clockIcon}>◷</Text>
              </View>

              <View style={styles.timeInfo}>
                <Text style={styles.time}>
                  25–35 min
                </Text>

                <Text style={styles.timeDescription}>
                  Estimated delivery time
                </Text>
              </View>
            </View>
          </View>

        </ScrollView>

        {/* BOTTOM PAYMENT BUTTON */}
        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.proceedButton}
            onPress={onProceed}
            activeOpacity={0.8}
          >
            <Text style={styles.proceedText}>
              Proceed to Payment
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 28,
  },

  // HEADER
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    marginBottom: 18,
  },

  backButton: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  backText: {
    fontSize: 30,
    color: "#FB5203",
    fontWeight: "bold",
  },

  headerTitle: {
    fontSize: 23,
    fontFamily: "Poppins_700Bold",
    color: "#222222",
  },

  headerSpacer: {
    width: 45,
  },

  // SCROLL CONTENT
  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingTop: 12,
    paddingBottom: 25,
  },

  // DELIVERY
  deliverySection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 38,
  },

  deliveryInfo: {
    flex: 1,
    marginRight: 10,
  },

  sectionTitle: {
    fontSize: 19,
    fontFamily: "Poppins_700Bold",
    color: "#222222",
    marginBottom: 12,
  },

  address: {
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    color: "#777777",
    marginBottom: 5,
  },

  addressIcon: {
    width: 100,
    height: 90,
    backgroundColor: "#FCE0D3",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  houseIcon: {
    fontSize: 38,
  },

  // ORDER SUMMARY
  summarySection: {
    marginTop: 5,
  },

  summaryTitle: {
    fontSize: 21,
    fontFamily: "Poppins_700Bold",
    color: "#222222",
    marginBottom: 22,
  },

  deliveryTime: {
    flexDirection: "row",
    alignItems: "center",
  },

  clockBox: {
    width: 65,
    height: 65,
    backgroundColor: "#FCE0D3",
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  clockIcon: {
    fontSize: 30,
    color: "#FB5203",
  },

  timeInfo: {
    flex: 1,
  },

  time: {
    fontSize: 17,
    fontFamily: "Poppins_700Bold",
    color: "#222222",
  },

  timeDescription: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#777777",
    marginTop: 4,
  },

  // BOTTOM BUTTON
  bottomSection: {
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: "#FFFFFF",
  },

  proceedButton: {
    backgroundColor: "#FB5203",
    paddingVertical: 17,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  proceedText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
  },

});

export default CheckoutScreen;
