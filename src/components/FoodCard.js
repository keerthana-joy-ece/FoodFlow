
import React from "react";

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { COLORS } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";

const FoodCard = ({
  item,
  onAdd,
  onPress,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <View style={styles.card}>
      {/* Food Image with Favorite Button */}
      <View>
        <TouchableOpacity onPress={() => onPress?.(item)}>
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="cover"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => onToggleFavorite?.(item)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={23}
            color={isFavorite ? "#FB5203" : "#777777"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.details}>

        {/* Clickable Food Name and Description */}
        <TouchableOpacity onPress={() => onPress?.(item)}>
          <Text style={styles.name}>
            {item.name}
          </Text>

          <Text style={styles.description}>
            {item.description}
          </Text>
        </TouchableOpacity>

        <View style={styles.bottomRow}>

          <Text style={styles.price}>
            {item.price}
          </Text>

          {/* Existing Add Button */}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => onAdd(item)}
            activeOpacity={0.7}
          >
            <Text style={styles.addText}>+</Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 15,
    width: "100%",
    elevation: 2,
  },

  image: {
    width: "100%",
    height: 150,
  },

  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },

  details: {
    padding: 12,
  },

  name: {
    fontSize: 15,
    fontFamily: "Poppins_700Bold",
    color: COLORS.black,
  },

  description: {
    fontSize: 11,
    fontFamily: "Poppins_400Regular",
    color: COLORS.grey,
    marginTop: 5,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  price: {
    fontSize: 15,
    fontFamily: "Poppins_700Bold",
    color: COLORS.primary,
  },

  addButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  addText: {
    color: COLORS.white,
    fontSize: 23,
    fontWeight: "bold",
  },
  favoriteButton: {
  position: "absolute",
  top: 10,
  right: 10,
  width: 38,
  height: 38,
  borderRadius: 20,
  backgroundColor: "#FFFFFF",
  justifyContent: "center",
  alignItems: "center",
  elevation: 3,
},

});

export default FoodCard;
