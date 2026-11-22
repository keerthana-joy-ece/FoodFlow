
import React, { useState } from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const OrderScreen = ({
  orders = [],
  onReorder,
  onTrackOrder,
}) => {
  const [selectedTab, setSelectedTab] = useState("Active");

  const activeOrders = orders.filter(
    (order) => order.status !== "Delivered"
  );

  const pastOrders = orders.filter(
    (order) => order.status === "Delivered"
  );

  const displayedOrders =
    selectedTab === "Active" ? activeOrders : pastOrders;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>My Orders</Text>
          <Text style={styles.subtitle}>
            Track and manage your orders
          </Text>
        </View>

        {/* ACTIVE / PAST TABS */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === "Active" && styles.activeTab,
            ]}
            onPress={() => setSelectedTab("Active")}
          >
            <Text style={[
              styles.tabText,
              selectedTab === "Active" && styles.activeTabText,
            ]}>
              Active ({activeOrders.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === "Past" && styles.activeTab,
            ]}
            onPress={() => setSelectedTab("Past")}
          >
            <Text style={[
              styles.tabText,
              selectedTab === "Past" && styles.activeTabText,
            ]}>
              Past ({pastOrders.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* ORDER LIST */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {displayedOrders.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>
                {selectedTab === "Active"
                  ? "No Active Orders"
                  : "No Past Orders"}
              </Text>

              <Text style={styles.emptyText}>
                Your {selectedTab.toLowerCase()} orders will appear here.
              </Text>
            </View>
          ) : (
            displayedOrders.map((order) => (
              <View
                key={order.id}
                style={
                  selectedTab === "Past"
                    ? styles.pastOrderCard
                    : styles.orderCard
                }
              >

                {/* PAST ORDER DESIGN */}
                {selectedTab === "Past" ? (
                  <>
                    <View style={styles.pastFoodRow}>
                      <Image
                        source={{ uri: order.image }}
                        style={styles.pastFoodImage}
                        resizeMode="cover"
                      />

                      <View style={styles.pastFoodDetails}>
                        <Text style={styles.pastFoodName}>
                          {order.restaurantName || order.name}
                        </Text>

                        <Text style={styles.pastPrice}>
                          {order.price}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.pastDescription}>
                      {order.description ||
                        `Quantity: ${order.quantity}`}
                    </Text>

                    <Text style={styles.pastDate}>
                      {order.deliveryTime || order.date}
                    </Text>

                    <View style={styles.pastBottomRow}>
                      <View style={styles.deliveredRow}>
                        <Text style={styles.deliveredIcon}>☑</Text>
                        <Text style={styles.deliveredText}>
                          Delivered
                        </Text>
                      </View>

                      <TouchableOpacity
                        onPress={() =>
                          onReorder && onReorder(order)
                        }
                        activeOpacity={0.7}
                      >
                        <Text style={styles.pastReorderText}>
                          Reorder
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                ) : (

                  /* ACTIVE ORDER DESIGN */
                  <>
                    <View style={styles.orderTop}>
                      <Text style={styles.orderId}>
                        #{order.id}
                      </Text>

                      <Text style={styles.orderDate}>
                        {order.date}
                      </Text>
                    </View>

                    <View style={styles.foodRow}>
                      <Image
                        source={{ uri: order.image }}
                        style={styles.foodImage}
                        resizeMode="cover"
                      />

                      <View style={styles.foodDetails}>
                        <Text style={styles.foodName}>
                          {order.name}
                        </Text>

                        <Text style={styles.quantity}>
                          Quantity: {order.quantity}
                        </Text>

                        <Text style={styles.price}>
                          {order.price}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.statusRow}>
                      <Text style={styles.statusLabel}>
                        Order Status
                      </Text>

                      <View
                        style={[
                          styles.statusBadge,
                          order.status === "Preparing"
                            ? styles.preparing
                            : styles.outForDelivery,
                        ]}
                      >
                        <Text style={styles.statusText}>
                          {order.status}
                        </Text>
                      </View>
                    </View>

                    <TouchableOpacity
                      style={styles.trackButton}
                      onPress={() =>
                        onTrackOrder && onTrackOrder(order)
                      }
                    >
                      <Text style={styles.trackText}>
                        🚚 Track Order
                      </Text>
                    </TouchableOpacity>
                  </>
                )}

              </View>
            ))
          )}
        </ScrollView>
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
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },

  header: {
    paddingTop: 15,
    paddingBottom: 20,
  },

  title: {
    fontSize: 27,
    fontFamily: "Poppins_700Bold",
    color: "#222222",
  },

  subtitle: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    color: "#888888",
    marginTop: 4,
  },

  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#EEEEEE",
    borderRadius: 25,
    padding: 5,
    marginBottom: 18,
  },

  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 22,
  },

  activeTab: {
    backgroundColor: "#FFFFFF",
  },

  tabText: {
    fontSize: 12,
    color: "#777777",
    fontFamily: "Poppins_400Regular",
  },

  activeTabText: {
    color: "#222222",
    fontFamily: "Poppins_700Bold",
  },

  scrollContent: {
    paddingBottom: 25,
  },

  /* PAST ORDER CARD */

  pastOrderCard: {
    backgroundColor: "#F4F4F4",
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
  },

  pastFoodRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  pastFoodImage: {
    width: 70,
    height: 70,
    borderRadius: 13,
  },

  pastFoodDetails: {
    flex: 1,
    marginLeft: 13,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  pastFoodName: {
    flex: 1,
    fontSize: 13,
    fontFamily: "Poppins_700Bold",
    color: "#222222",
  },

  pastPrice: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: "#222222",
    marginLeft: 5,
  },

  pastDescription: {
    fontSize: 11,
    fontFamily: "Poppins_400Regular",
    color: "#888888",
    marginTop: 10,
  },

  pastDate: {
    fontSize: 11,
    fontFamily: "Poppins_400Regular",
    color: "#888888",
    marginTop: 3,
  },

  pastBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#DDDDDD",
    marginTop: 14,
    paddingTop: 12,
  },

  deliveredRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  deliveredIcon: {
    color: "#31A354",
    fontSize: 14,
    marginRight: 6,
  },

  deliveredText: {
    color: "#31A354",
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },

  pastReorderText: {
    color: "#FB5203",
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },

  /* ACTIVE ORDER CARD */

  orderCard: {
    backgroundColor: "#FFF5F0",
    borderRadius: 18,
    padding: 15,
    marginBottom: 18,
  },

  orderTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  orderId: {
    fontSize: 13,
    fontFamily: "Poppins_700Bold",
    color: "#FB5203",
  },

  orderDate: {
    fontSize: 11,
    fontFamily: "Poppins_400Regular",
    color: "#888888",
  },

  foodRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  foodImage: {
    width: 90,
    height: 85,
    borderRadius: 13,
  },

  foodDetails: {
    flex: 1,
    marginLeft: 14,
  },

  foodName: {
    fontSize: 15,
    fontFamily: "Poppins_700Bold",
    color: "#222222",
  },

  quantity: {
    fontSize: 12,
    color: "#888888",
    marginTop: 5,
  },

  price: {
    fontSize: 16,
    color: "#FB5203",
    fontFamily: "Poppins_700Bold",
    marginTop: 5,
  },

  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 17,
  },

  statusLabel: {
    fontSize: 12,
    color: "#666666",
    fontFamily: "Poppins_400Regular",
  },

  statusBadge: {
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 20,
  },

  preparing: {
    backgroundColor: "#FFF0CE",
  },

  outForDelivery: {
    backgroundColor: "#DCEBFF",
  },

  statusText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#333333",
  },

  trackButton: {
    backgroundColor: "#FFF0E8",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 16,
  },

  trackText: {
    color: "#FB5203",
    fontSize: 14,
    fontFamily: "Poppins_700Bold",
  },

  /* EMPTY STATE */

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 70,
  },

  emptyTitle: {
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    color: "#222222",
  },

  emptyText: {
    fontSize: 13,
    color: "#888888",
    marginTop: 8,
    textAlign: "center",
  },

});

export default OrderScreen;
