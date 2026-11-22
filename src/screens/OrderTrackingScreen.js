
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const OrderTrackingScreen = ({
  order,
  onBack,
  onViewOrder,
  onStatusChange,
}) => {
  const statusSteps = [
    { title: "Order Confirmed", icon: "✓" },
    { title: "Preparing", icon: "♨" },
    { title: "On the Way", icon: "🚚" },
    { title: "Delivered", icon: "✓" },
  ];

  const statusOrder = [
    "Order Confirmed",
    "Preparing",
    "On the Way",
    "Delivered",
  ];

  const currentStatus = order?.status || "Preparing";

  const currentIndex = Math.max(
    0,
    statusOrder.indexOf(currentStatus)
  );

  const steps = statusSteps.map((step, index) => ({
    ...step,
    completed: index <= currentIndex,
  }));

  return (
    <SafeAreaView
      style={styles.outerContainer}
      edges={["top", "left", "right"]}
    >
      <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.back}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Tracking</Text>
        <View style={{ width: 25 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        
    
{/* STATIC MAP DESIGN */}
<View style={styles.mapContainer}>
  <Image
    source={require("../../assets/images/Vibrant San Francisco City Map.png")}
    style={styles.mapImage}
    resizeMode="cover"
  />

  <View style={styles.mapLabel}>
    <Text style={styles.mapEmoji}>📍</Text>
    <Text style={styles.mapText}>Restaurant</Text>
  </View>

  <View style={styles.deliveryPin}>
    <Text style={styles.mapEmoji}>🛵</Text>
    <Text style={styles.mapText}>Delivery</Text>
  </View>

  <View style={styles.destinationPin}>
    <Text style={styles.mapEmoji}>🏠</Text>
    <Text style={styles.mapText}>Your Location</Text>
  </View>

  <View style={styles.routeLine} />
</View>


        {/* ORDER STATUS */}
        <View style={styles.timeline}>
          {steps.map((step, index) => (
            <View key={step.title} style={styles.stepRow}>
              <View style={styles.iconColumn}>
                <View
                  style={[
                    styles.stepCircle,
                    step.completed && styles.completedCircle,
                  ]}
                >
                  <Text
                    style={[
                      styles.stepIcon,
                      step.completed && styles.completedIcon,
                    ]}
                  >
                    {step.icon}
                  </Text>
                </View>

                {index !== steps.length - 1 && (
                  <View
                    style={[
                      styles.verticalLine,
                     index < currentIndex && styles.completedLine
                    ]}
                  />
                )}
              </View>

              <Text
                style={[
                  styles.stepTitle,
                  step.completed && styles.completedTitle,
                ]}
              >
                {step.title}
              </Text>
            </View>
          ))}
        </View>


{/* DEMO ORDER STATUS CONTROLS */}
<View style={styles.demoStatusSection}>
  <Text style={styles.demoStatusTitle}>
    Update Order Status (Demo)
  </Text>

  {["Preparing", "On the Way", "Delivered"].map((status) => (
    <TouchableOpacity
      key={status}
      style={[
        styles.demoStatusButton,
        currentStatus === status && styles.demoStatusSelected,
      ]}
      onPress={() => onStatusChange && onStatusChange(status)}
      disabled={currentStatus === status}
    >
      <Text
        style={[
          styles.demoStatusText,
          currentStatus === status && styles.demoStatusSelectedText,
        ]}
      >
        {currentStatus === status ? "✓ " : ""}
        Set {status}
      </Text>
    </TouchableOpacity>
  ))}
</View>


        {/* DELIVERY PARTNER */}
        <View style={styles.partnerSection}>
          <Text style={styles.partnerHeading}>Delivery Partner</Text>

          <View style={styles.partnerCard}>
            <View style={styles.partnerAvatar}>
              <Text style={styles.avatarText}>DP</Text>
            </View>

            <View style={styles.partnerInfo}>
             <Text style={styles.partnerName}>Ethan Carter</Text>
              <Text style={styles.partnerDescription}>
              Your delivery partner • FoodFlow
      </Text>
            </View>

            <TouchableOpacity
              style={styles.callButton}
              onPress={() => Linking.openURL("tel:+919876543210")}
            >
              <Text style={styles.callText}>Call ☎</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.estimated}>
           Estimated arrival: 15–20 minutes
          </Text>
        </View>

        {/* ACTION BUTTONS */}
        <View style={styles.actionRow}>
          <TouchableOpacity
  style={styles.contactButton}
  onPress={() => {
    const phoneNumber = "919876543210";

    const message = "Hello Ethan, I am your FoodFlow customer. I would like to know about my food delivery.";

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    Linking.openURL(whatsappURL).catch(() => {
      alert("Unable to open WhatsApp. Please install WhatsApp.");
    });
  }}
>
  <Text style={styles.contactText}>Contact</Text>
</TouchableOpacity>

          <TouchableOpacity
            style={styles.viewButton}
            onPress={onViewOrder}
          >
            <Text style={styles.viewText}>View Order</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
  },
  back: {
    fontSize: 32,
    color: "#222222",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222222",
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingBottom: 25,
  },
  mapContainer: {
    height: 175,
    backgroundColor: "#DDF2F0",
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 10,
    justifyContent: "center",
  },
  mapRoad1: {
    position: "absolute",
    width: "120%",
    height: 16,
    backgroundColor: "#FFFFFF",
    transform: [{ rotate: "25deg" }],
    top: 55,
    left: -20,
  },
  mapRoad2: {
    position: "absolute",
    width: "120%",
    height: 12,
    backgroundColor: "#FFFFFF",
    transform: [{ rotate: "-30deg" }],
    top: 115,
    left: -20,
  },
  mapRoad3: {
    position: "absolute",
    width: 12,
    height: "130%",
    backgroundColor: "#FFFFFF",
    transform: [{ rotate: "35deg" }],
    left: "48%",
  },
  mapLabel: {
    position: "absolute",
    left: 15,
    top: 20,
    alignItems: "center",
  },
  deliveryPin: {
    position: "absolute",
    left: "45%",
    top: 65,
    alignItems: "center",
  },
  destinationPin: {
    position: "absolute",
    right: 15,
    bottom: 12,
    alignItems: "center",
  },
  mapEmoji: {
    fontSize: 23,
  },
  mapText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#333333",
    backgroundColor: "#FFFFFF",
    padding: 3,
    borderRadius: 5,
  },
  routeLine: {
    position: "absolute",
    width: "42%",
    height: 3,
    backgroundColor: "#FB5203",
    left: "28%",
    top: "55%",
    transform: [{ rotate: "12deg" }],
  },
  timeline: {
    marginTop: 20,
  },
  stepRow: {
    flexDirection: "row",
    minHeight: 39,
  },
  iconColumn: {
    width: 28,
    alignItems: "center",
  },
  stepCircle: {
    width: 23,
    height: 23,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: "#AAAAAA",
    alignItems: "center",
    justifyContent: "center",
  },
  completedCircle: {
    backgroundColor: "#FB5203",
    borderColor: "#FB5203",
  },
  stepIcon: {
    fontSize: 12,
    color: "#888888",
  },
  completedIcon: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  verticalLine: {
    width: 2,
    height: 16,
    backgroundColor: "#CCCCCC",
  },
  completedLine: {
    backgroundColor: "#FB5203",
  },
  stepTitle: {
    fontSize: 13,
    color: "#777777",
    marginLeft: 12,
    marginTop: 3,
  },
  completedTitle: {
    color: "#222222",
    fontWeight: "600",
  },
  partnerSection: {
    marginTop: 15,
  },
  partnerHeading: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#222222",
  },
  partnerCard: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  partnerAvatar: {
    width: 43,
    height: 43,
    borderRadius: 25,
    backgroundColor: "#FFF0E8",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#FB5203",
    fontWeight: "bold",
  },
  partnerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  partnerName: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#222222",
  },
  partnerDescription: {
    fontSize: 11,
    color: "#888888",
    marginTop: 3,
  },
  callButton: {
    backgroundColor: "#FFE0D1",
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
  },
  callText: {
    color: "#222222",
    fontSize: 11,
    fontWeight: "bold",
  },
  estimated: {
    fontSize: 12,
    color: "#555555",
    marginTop: 18,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 15,
  },
  contactButton: {
    backgroundColor: "#FB5203",
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 22,
  },
  contactText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  viewButton: {
    backgroundColor: "#FFE0D1",
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 22,
  },
  viewText: {
    color: "#222222",
    fontSize: 12,
    fontWeight: "bold",
  },
  outerContainer: {
  flex: 1,
  backgroundColor: "#F2F2F2",
  alignItems: "center",
},

container: {
  flex: 1,
  width: "100%",
  maxWidth: 480,
  backgroundColor: "#FFFFFF",
  overflow: "hidden",
},
mapImage: {
  width: "100%",
  height: "100%",
  position: "absolute",
},

demoStatusSection: {
  marginTop: 18,
  padding: 14,
  backgroundColor: "#FFF5F0",
  borderRadius: 14,
},

demoStatusTitle: {
  fontSize: 13,
  fontWeight: "bold",
  color: "#222222",
  marginBottom: 10,
},

demoStatusButton: {
  paddingVertical: 10,
  paddingHorizontal: 12,
  borderRadius: 20,
  backgroundColor: "#FFFFFF",
  marginBottom: 8,
  borderWidth: 1,
  borderColor: "#FB5203",
},

demoStatusSelected: {
  backgroundColor: "#FB5203",
},

demoStatusText: {
  textAlign: "center",
  color: "#FB5203",
  fontSize: 12,
  fontWeight: "bold",
},

demoStatusSelectedText: {
  color: "#FFFFFF",
},

});

export default OrderTrackingScreen;
