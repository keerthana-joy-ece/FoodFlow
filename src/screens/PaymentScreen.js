
import React, { useState } from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const PaymentScreen = ({ onBack, onPay }) => {

  const [selectedMethod, setSelectedMethod] = useState("UPI");

  const paymentMethods = [
    {
      name: "Card",
      description: "Add a new card",
      image: require("../../assets/images/payment/card.png"),
      background: "#F9EFE2",
    },
    {
      name: "UPI",
      description: "Pay with UPI",
      image: require("../../assets/images/payment/upi.png"),
      background: "#214B50",
    },
    {
      name: "Cash on Delivery",
      description: "Pay with cash",
      image: require("../../assets/images/payment/cash.png"),
      background: "#F8D2BA",
    },
  ];

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
            Payment
          </Text>

          <View style={styles.headerSpace} />

        </View>

        {/* PAYMENT METHODS */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >

          <Text style={styles.sectionTitle}>
            Payment Method
          </Text>

          {paymentMethods.map((method) => {

            const isSelected =
              selectedMethod === method.name;

            return (
              <TouchableOpacity
                key={method.name}
                style={styles.methodRow}
                activeOpacity={0.8}
                onPress={() =>
                  setSelectedMethod(method.name)
                }
              >

                <View style={styles.methodInfo}>

                  {isSelected && (
                    <Text style={styles.selectedLabel}>
                      Selected
                    </Text>
                  )}

                  <Text style={styles.methodName}>
                    {method.name}
                  </Text>

                  <Text style={styles.methodDescription}>
                    {method.description}
                  </Text>

                </View>

                <View
                  style={[
                    styles.iconBox,
                    { backgroundColor: method.background },
                  ]}
                >
                  <Image
                    source={method.image}
                    style={styles.paymentImage}
                    resizeMode="contain"
                  />
                </View>

              </TouchableOpacity>
            );
          })}

        </ScrollView>

        {/* PAY BUTTON */}
        <View style={styles.bottomSection}>

          <TouchableOpacity
            style={styles.payButton}
            onPress={() => onPay(selectedMethod)}
            activeOpacity={0.8}
          >
            <Text style={styles.payButtonText}>
              Pay Now
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
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  backButton: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  backText: {
    fontSize: 30,
    color: "#222222",
  },

  headerTitle: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    color: "#171717",
  },

  headerSpace: {
    width: 45,
  },

  // SCROLL
  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingTop: 12,
    paddingBottom: 20,
  },

  sectionTitle: {
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    color: "#222222",
    marginBottom: 30,
  },

  // PAYMENT OPTIONS
  methodRow: {
    minHeight: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },

  methodInfo: {
    flex: 1,
    paddingRight: 12,
  },

  selectedLabel: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: "#999999",
    marginBottom: 4,
  },

  methodName: {
    fontSize: 19,
    fontFamily: "Poppins_700Bold",
    color: "#222222",
  },

  methodDescription: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#999999",
    marginTop: 5,
  },

  iconBox: {
    width: 135,
    height: 82,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  paymentImage: {
    width: "85%",
    height: "85%",
  },

  // BOTTOM BUTTON
  bottomSection: {
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: "#FFFFFF",
  },

  payButton: {
    backgroundColor: "#FB5203",
    height: 65,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  payButtonText: {
    color: "#FFFFFF",
    fontSize: 19,
    fontFamily: "Poppins_700Bold",
  },

});

export default PaymentScreen;
