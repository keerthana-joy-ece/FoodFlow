import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";

import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const FoodDetailsScreen = ({
  item,
  onBack,
  onAddToCart,
  onOrderNow,
}) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
  onPress={onBack}
  style={styles.backTouch}
  hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
>
  <Text style={styles.backButton}>←</Text>
</TouchableOpacity>

          <Text style={styles.headerTitle}>
            Food Details
          </Text>

          <Text style={styles.heart}>♡</Text>
        </View>

        {/* Food Image */}
        <Image
          source={{ uri: item.image }}
          style={styles.foodImage}
          resizeMode="cover"
        />

        {/* Food Information */}
        <View style={styles.content}>

          <Text style={styles.foodName}>
            {item.name}
          </Text>

          <Text style={styles.description}>
            {item.description}
          </Text>

          {/* Rating */}
          <View style={styles.ratingSection}>
            <View>
              <Text style={styles.rating}>4.5 ⭐</Text>
              <Text style={styles.reviews}>
                120 reviews
              </Text>
            </View>

            <View style={styles.ratingBars}>
              <Text style={styles.ratingText}>5  ━━━━━ 40%</Text>
              <Text style={styles.ratingText}>4  ━━━━ 30%</Text>
              <Text style={styles.ratingText}>3  ━━ 15%</Text>
              <Text style={styles.ratingText}>2  ━ 10%</Text>
              <Text style={styles.ratingText}>1  ━ 5%</Text>
            </View>
          </View>

          {/* Price */}
          <Text style={styles.label}>Price</Text>

          <Text style={styles.price}>
            {item.price}
          </Text>

          {/* Quantity */}
          <Text style={styles.label}>Quantity</Text>

          <View style={styles.quantityContainer}>

            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() =>
                setQuantity(Math.max(1, quantity - 1))
              }
            >
              <Text style={styles.quantityText}>−</Text>
            </TouchableOpacity>

            <Text style={styles.quantity}>
              {quantity}
            </Text>

            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setQuantity(quantity + 1)}
            >
              <Text style={styles.quantityText}>+</Text>
            </TouchableOpacity>

          </View>

          {/* Order Now */}
          <TouchableOpacity
            style={styles.orderButton}
            onPress={() => onOrderNow?.(item, quantity)}
          >
            <Text style={styles.orderButtonText}>
              Order Now
            </Text>
          </TouchableOpacity>

          {/* Add to Cart */}
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => onAddToCart?.(item, quantity)}
          >
            <Text style={styles.cartButtonText}>
              Add to Cart
            </Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

    backTouch: {
  width: 50,
  height: 50,
  justifyContent: "center",
  alignItems: "center",
},

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },

  backButton: {
    fontSize: 28,
    color: "#222222",
  },

  headerTitle: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    color: "#222222",
  },

  heart: {
    fontSize: 28,
    color: "#FB5203",
  },

  foodImage: {
  width: "100%",
  height: 230,
  resizeMode: "cover",
},

  content: {
    padding: 20,
  },

  foodName: {
    fontSize: 23,
    fontFamily: "Poppins_700Bold",
    color: "#222222",
  },

  description: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#777777",
    marginTop: 8,
  },

  ratingSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    marginBottom: 25,
  },

  rating: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222222",
  },

  reviews: {
    fontSize: 12,
    color: "#777777",
  },

  ratingBars: {
    justifyContent: "center",
  },

  ratingText: {
    fontSize: 11,
    color: "#FB5203",
    marginBottom: 3,
  },

  label: {
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    color: "#222222",
    marginTop: 15,
  },

  price: {
    fontSize: 22,
    fontFamily: "Poppins_700Bold",
    color: "#FB5203",
    marginTop: 8,
  },

  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FCE0D3",
    borderRadius: 25,
    marginTop: 12,
    padding: 10,
  },

  quantityButton: {
    width: 45,
    height: 35,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  quantityText: {
    fontSize: 23,
    color: "#FB5203",
    fontWeight: "bold",
  },

  quantity: {
    fontSize: 18,
    fontWeight: "bold",
  },

  orderButton: {
    backgroundColor: "#FB5203",
    borderRadius: 30,
    padding: 15,
    alignItems: "center",
    marginTop: 30,
  },

  orderButtonText: {
    color: "#FFFFFF",
    fontFamily: "Poppins_700Bold",
    fontSize: 15,
  },

  cartButton: {
    borderWidth: 1,
    borderColor: "#FB5203",
    borderRadius: 30,
    padding: 15,
    alignItems: "center",
    marginTop: 12,
    marginBottom: 20,
  },

  cartButtonText: {
    color: "#FB5203",
    fontFamily: "Poppins_700Bold",
    fontSize: 15,
  },

});

export default FoodDetailsScreen;
