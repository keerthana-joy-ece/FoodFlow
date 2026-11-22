
import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
} from "react-native";

import { COLORS } from "../constants/colors";

const SearchBar = ({ value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.searchIcon}>🔍</Text>

      <TextInput
        placeholder="Search food items..."
        placeholderTextColor={COLORS.grey}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightGrey,
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 48,
    marginHorizontal: 16,
    marginVertical: 10,
  },

  searchIcon: {
    fontSize: 17,
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 13,
    color: COLORS.black,
    fontFamily: "Poppins_400Regular",
  },
});

export default SearchBar;
