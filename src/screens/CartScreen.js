
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CartScreen = ({
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onBack,
}) => {
  const totalAmount = cartItems.reduce(
    (total, item) =>
      total +
      Number(String(item.price).replace(/[^\d.]/g, "")) *
        item.quantity,
    0
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
          >
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>

          <Text style={styles.title}>My Cart</Text>
        </View>

        {cartItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🛒</Text>

            <Text style={styles.emptyTitle}>
              Your Cart is Empty
            </Text>

            <Text style={styles.emptyText}>
              Add your favourite food to get started!
            </Text>
          </View>
        ) : (
          <>
            {/* CART PRODUCTS */}
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {cartItems.map((item) => (
                <View key={item.id} style={styles.cartCard}>

                  <Image
                    source={{ uri: item.image }}
                    style={styles.image}
                    resizeMode="cover"
                  />

                  <View style={styles.details}>
                    <Text style={styles.foodName}>
                      {item.name}
                    </Text>

                    <Text style={styles.price}>
                      {item.price}
                    </Text>

                    {/* QUANTITY */}
                    <View style={styles.quantityRow}>
                      <TouchableOpacity
                        onPress={() =>
                          onUpdateQuantity(item.id, -1)
                        }
                      >
                        <Text style={styles.quantityButton}>
                          −
                        </Text>
                      </TouchableOpacity>

                      <Text style={styles.quantity}>
                        {item.quantity}
                      </Text>

                      <TouchableOpacity
                        onPress={() =>
                          onUpdateQuantity(item.id, 1)
                        }
                      >
                        <Text style={styles.quantityButton}>
                          +
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {/* REMOVE */}
                    <TouchableOpacity
                      onPress={() => onRemoveItem(item.id)}
                    >
                      <Text style={styles.remove}>
                        Remove
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>

            {/* BOTTOM TOTAL */}
            <View style={styles.bottomSection}>
              <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>
                  Total Amount
                </Text>

                <Text style={styles.totalAmount}>
                  ₹{totalAmount}
                </Text>
              </View>

              {/* CHECKOUT */}
              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={onCheckout}
                activeOpacity={0.8}
              >
                <Text style={styles.checkoutText}>
                  Checkout
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
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
    paddingHorizontal: 20,
    paddingTop: 8,
  },

  // HEADER
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },

  backButton: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  backText: {
    fontSize: 30,
    color: "#FB5203",
    fontWeight: "bold",
  },

  title: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    color: "#222222",
    marginBottom: 0,
  },

  // EMPTY CART
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyIcon: {
    fontSize: 65,
  },

  emptyTitle: {
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    marginTop: 15,
  },

  emptyText: {
    fontSize: 13,
    color: "#777777",
    marginTop: 8,
  },

  // PRODUCTS
  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingTop: 5,
    paddingBottom: 15,
  },

  cartCard: {
    flexDirection: "row",
    backgroundColor: "#FFF5F0",
    borderRadius: 18,
    padding: 12,
    marginBottom: 15,
    width: "100%",
  },

  image: {
    width: 105,
    height: 115,
    borderRadius: 14,
  },

  details: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },

  foodName: {
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    color: "#222222",
  },

  price: {
    color: "#FB5203",
    fontSize: 17,
    fontFamily: "Poppins_700Bold",
    marginTop: 5,
  },

  // QUANTITY
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  quantityButton: {
    color: "#FB5203",
    fontSize: 25,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },

  quantity: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222222",
  },

  remove: {
    color: "#E53935",
    marginTop: 5,
    fontSize: 13,
    fontWeight: "600",
  },

  // BOTTOM SECTION
  bottomSection: {
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: "#FFFFFF",
  },

  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },

  totalLabel: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    color: "#222222",
  },

  totalAmount: {
    fontSize: 22,
    color: "#FB5203",
    fontFamily: "Poppins_700Bold",
  },

  checkoutButton: {
    backgroundColor: "#FB5203",
    paddingVertical: 18,
    borderRadius: 35,
    alignItems: "center",
    marginBottom: 5,
  },

  checkoutText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
  },

});

export default CartScreen;
