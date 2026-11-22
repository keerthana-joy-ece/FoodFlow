
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CardPaymentScreen = ({
  totalAmount = 199,
  onBack,
  onPaymentSuccess,
}) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const deliveryFee = 30;
  const taxes = 10;
  const itemTotal = Number(totalAmount) || 0;
  const finalTotal = itemTotal + deliveryFee + taxes;

  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length > 2) {
      return digits.slice(0, 2) + " / " + digits.slice(2);
    }
    return digits;
  };

  

const handlePayment = () => {
  const cleanCardNumber = cardNumber.replace(/\s/g, "");
  const cleanExpiry = expiry.replace(/\D/g, "");
  
console.log("CARD NUMBER:", cardNumber);
console.log("CARD LENGTH:", cardNumber.replace(/\s/g, "").length);

console.log("CARD NAME:", cardName);
console.log("EXPIRY:", expiry);
console.log("EXPIRY LENGTH:", expiry.replace(/\D/g, "").length);

console.log("CVV:", cvv);
console.log("CVV LENGTH:", cvv.length);
  if (
    cleanCardNumber.length !== 16 ||
    !cardName.trim() ||
    cleanExpiry.length !== 4 ||
    cvv.length !== 3
  ) {
    window.alert("Please enter all card details correctly.");
    return;
  }

  window.alert("Payment Successful!");

  if (onPaymentSuccess) {
    onPaymentSuccess();
  }
};


  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Card Payment</Text>
        <Text style={styles.lock}>♙</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.savedCard}>
          <View>
            <Text style={styles.savedCardTitle}>Card</Text>
            <Text style={styles.savedCardNumber}>.... 1234</Text>
          </View>
          <View style={styles.visaBox}>
            <Text style={styles.visaText}>VISA</Text>
          </View>
        </View>

        <Text style={styles.label}>Card Number</Text>
        <TextInput
          style={styles.input}
          placeholder="1234 5678 9012 3456"
          keyboardType="number-pad"
          value={cardNumber}
          onChangeText={(value) => setCardNumber(formatCardNumber(value))}
          maxLength={19}
        />

        <Text style={styles.label}>Name on Card</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter cardholder name"
          value={cardName}
          onChangeText={setCardName}
          autoCapitalize="words"
        />

        <View style={styles.row}>
          <View style={styles.half}>
            <Text style={styles.label}>Expiry Date</Text>
            <TextInput
              style={styles.input}
              placeholder="MM / YY"
              keyboardType="number-pad"
              value={expiry}
              onChangeText={(value) => setExpiry(formatExpiry(value))}
              maxLength={7}
            />
          </View>

          <View style={styles.half}>
            <Text style={styles.label}>CVV</Text>
            <TextInput
              style={styles.input}
              placeholder="123"
              keyboardType="number-pad"
              secureTextEntry
              value={cvv}
              onChangeText={(value) =>
                setCvv(value.replace(/\D/g, "").slice(0, 3))
              }
              maxLength={3}
            />
          </View>
        </View>

        <Text style={styles.secureText}>
          🔒 Your card details are encrypted and secure
        </Text>

        <Text style={styles.summaryTitle}>Payment Summary</Text>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Item Total</Text>
          <Text style={styles.amount}>₹{itemTotal.toFixed(2)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery Fee</Text>
          <Text style={styles.amount}>₹{deliveryFee.toFixed(2)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Taxes</Text>
          <Text style={styles.amount}>₹{taxes.toFixed(2)}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>₹{finalTotal.toFixed(2)}</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          <Text style={styles.payButtonText}>
            Pay ₹{finalTotal.toFixed(2)}
          </Text>
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: 20,
  },
  backButton: {
    width: 35,
  },
  backText: {
    fontSize: 32,
    color: "#222222",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#171717",
  },
  lock: {
    fontSize: 20,
    color: "#222222",
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
  },
  savedCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
    paddingVertical: 10,
  },
  savedCardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#222222",
  },
  savedCardNumber: {
    fontSize: 12,
    color: "#777777",
    marginTop: 5,
  },
  visaBox: {
    width: 95,
    height: 42,
    backgroundColor: "#F5F0E8",
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  visaText: {
    color: "#174477",
    fontSize: 23,
    fontWeight: "900",
    fontStyle: "italic",
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    color: "#222222",
    marginBottom: 7,
    marginTop: 10,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: "#777777",
    borderRadius: 9,
    paddingHorizontal: 12,
    fontSize: 13,
    color: "#222222",
    backgroundColor: "#FFFFFF",
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  half: {
    flex: 1,
  },
  secureText: {
    fontSize: 11,
    color: "#555555",
    marginTop: 13,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222222",
    marginTop: 25,
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
  },
  summaryLabel: {
    fontSize: 12,
    color: "#666666",
  },
  amount: {
    fontSize: 12,
    color: "#222222",
  },
  divider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginTop: 5,
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#222222",
  },
  totalAmount: {
    fontSize: 14,
    fontWeight: "700",
    color: "#222222",
  },
  bottomSection: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: "#FFFFFF",
  },
  payButton: {
    height: 48,
    backgroundColor: "#FB5203",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  payButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});

export default CardPaymentScreen;
