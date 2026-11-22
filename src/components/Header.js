
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { COLORS } from "../constants/colors";

const Header = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>DELIVER TO</Text>

        <TouchableOpacity>
          <Text style={styles.location}>
            📍 Home in 123-Main St. ▼
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.profile}>
        <Text style={styles.profileIcon}>👤</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },

  label: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: COLORS.grey,
  },

  location: {
    fontFamily: "Poppins_700Bold",
    fontSize: 14,
    color: COLORS.black,
    marginTop: 5,
  },

  profile: {
    backgroundColor: "#FFEDE5",
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
  },

  profileIcon: {
    fontSize: 20,
  },
});

export default Header;
