
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  TextInput,
  Modal,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import {
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
const ProfileScreen = ({
  userName = "FoodFlow User",
  email = "user@example.com",
  orders = [],
  favoriteItems = [],
  onRemoveFavorite,
  onOpenFavorite,
  onAddFavoriteToCart,
  onLogout,
  onMyOrders,
}) => {
  const [activeProfileTab, setActiveProfileTab] = useState("Orders");
  // Personal Info states
const [showPersonalInfo, setShowPersonalInfo] = useState(false);
const [personalName, setPersonalName] = useState(userName);
const [personalPhone, setPersonalPhone] = useState("");
const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
// Notification settings
const [showNotifications, setShowNotifications] = useState(false);
const [showFavorites, setShowFavorites] = useState(false);
const [showHelpCenter, setShowHelpCenter] = useState(false);
const [selectedFaq, setSelectedFaq] = useState(null);
const [showSettings, setShowSettings] = useState(false);
const [selectedTheme, setSelectedTheme] = useState("Light");
const [selectedLanguage, setSelectedLanguage] = useState("English");
const [orderNotifications, setOrderNotifications] = useState(true);
const [deliveryNotifications, setDeliveryNotifications] = useState(true);
const [offerNotifications, setOfferNotifications] = useState(false);
const [paymentNotifications, setPaymentNotifications] = useState(true);
  // Payment form states
const [showPaymentForm, setShowPaymentForm] = useState(false);
const [editingPaymentId, setEditingPaymentId] = useState(null);
const [cardName, setCardName] = useState("");
const [cardType, setCardType] = useState("Visa");
const [cardLastFour, setCardLastFour] = useState("");
const [cardExpiry, setCardExpiry] = useState("");
  const recentOrders = orders.slice(0, 3);

  const [showAddressForm, setShowAddressForm] = useState(false);
const [editingAddressId, setEditingAddressId] = useState(null);

const [addressType, setAddressType] = useState("Home");
const [fullName, setFullName] = useState("");
const [phone, setPhone] = useState("");
const [house, setHouse] = useState("");
const [street, setStreet] = useState("");
const [city, setCity] = useState("");
const [stateName, setStateName] = useState("");
const [pinCode, setPinCode] = useState("");
 const [savedAddresses, setSavedAddresses] = useState([
  {
    id: "1",
    name: "Home",
    address: "123 Main Street, Apt 43, New York",
    default: true,
  },
  {
    id: "2",
    name: "Work",
    address: "463 Office 23th floor, New York",
    default: false,
  },
  {
    id: "3",
    name: "Other",
    address: "786 Park Avenue, New York",
    default: false,
  },
]);

 
const saveAddress = () => {
  if (!street.trim()) {
    Alert.alert("Missing Details", "Please enter the street address.");
    return;
  }

  const newAddress = {
    id: editingAddressId || Date.now().toString(),
    name: addressType,
    fullName,
    phone,
    house,
    street,
    city,
    stateName,
    pinCode,
    address: [
      house,
      street,
      city,
      stateName,
      pinCode,
    ].filter(Boolean).join(", "),
    default: editingAddressId
      ? savedAddresses.find((item) => item.id === editingAddressId)?.default
      : savedAddresses.length === 0,
  };

  if (editingAddressId) {
    setSavedAddresses((previous) =>
      previous.map((item) =>
        item.id === editingAddressId ? newAddress : item
      )
    );
  } else {
    setSavedAddresses((previous) => [...previous, newAddress]);
  }

  setShowAddressForm(false);
  setEditingAddressId(null);
  Alert.alert("Success", "Address saved successfully!");
};

  const openAddAddress = () => {
    setEditingAddressId(null);
    setAddressType("Home");
    setFullName("");
    setPhone("");
    setHouse("");
    setStreet("");
    setCity("");
    setStateName("");
    setPinCode("");
    setShowAddressForm(true);
  };

  const openEditAddress = (item) => {
    setEditingAddressId(item.id);
    setAddressType(item.name);
    setFullName(item.fullName || "");
    setPhone(item.phone || "");
    setHouse(item.house || "");
    setStreet(item.street || item.address || "");
    setCity(item.city || "");
    setStateName(item.stateName || "");
    setPinCode(item.pinCode || "");
    setShowAddressForm(true);
  };

  const deleteAddress = (item) => {
  setSavedAddresses((previous) =>
    previous.filter((address) => address.id !== item.id)
  );
};

  const [savedPayments, setSavedPayments] = useState([
  {
    id: "1",
    name: "Visa",
    number: "•••• 1234",
    default: true,
  },
  {
    id: "2",
    name: "Mastercard",
    number: "•••• 8888",
    default: false,
  },
]);

  const openAddPayment = () => {
  setEditingPaymentId(null);
  setCardName("");
  setCardType("Visa");
  setCardLastFour("");
  setCardExpiry("");
  setShowPaymentForm(true);
};

const openEditPayment = (item) => {
  setEditingPaymentId(item.id);
  setCardName(item.cardName || "");
  setCardType(item.name);
  setCardLastFour(item.number.slice(-4));
  setCardExpiry(item.expiry || "");
  setShowPaymentForm(true);
};

const savePayment = () => {
  if (
    !cardName.trim() ||
    cardLastFour.length !== 4 ||
    !cardExpiry.trim()
  ) {
    Alert.alert("Missing Details", "Please complete all card fields.");
    return;
  }

  const payment = {
    id: editingPaymentId || Date.now().toString(),
    name: cardType,
    number: `•••• ${cardLastFour}`,
    cardName: cardName.trim(),
    expiry: cardExpiry,
    default: editingPaymentId
      ? savedPayments.find((item) => item.id === editingPaymentId)?.default
      : savedPayments.length === 0,
  };

  if (editingPaymentId) {
    setSavedPayments((previous) =>
      previous.map((item) =>
        item.id === editingPaymentId ? payment : item
      )
    );
  } else {
    setSavedPayments((previous) => [...previous, payment]);
  }

  setShowPaymentForm(false);
  setEditingPaymentId(null);
  Alert.alert("Success", "Payment method saved successfully!");
};
const deletePayment = (item) => {
  setSavedPayments((previous) =>
    previous.filter((payment) => payment.id !== item.id)
  );
};

const setDefaultPayment = (item) => {
  setSavedPayments((previous) =>
    previous.map((payment) => ({
      ...payment,
      default: payment.id === item.id,
    }))
  );
};
const showComingSoon = (title) => {
  Alert.alert(title, "This feature will be available soon!");
};


  const accountItems = [
  {
    icon: "person-outline",
    title: "Personal Info",
    subtitle: "Edit your personal information",
  },
  {
    icon: "notifications-outline",
    title: "Notifications",
    subtitle: "Manage notification settings",
  },
  {
    icon: "heart-outline",
    title: "Favorites",
    subtitle: "Your favorite food items",
  },
];
 const supportItems = [
  {
    icon: "help-circle-outline",
    title: "Help Center",
    subtitle: "Get help and support",
  },
  {
    icon: "settings-outline",
    title: "Settings",
    subtitle: "App preferences and settings",
  },
];

  const renderMenuItem = (item) => (
    <TouchableOpacity
      key={item.title}
      style={styles.menuItem}
      activeOpacity={0.7}
     onPress={() => {
if (item.title === "Personal Info") {
  setPersonalName(userName);
  setShowPersonalInfo(true);
  setIsEditingPersonalInfo(false);
} else if (item.title === "Notifications") {
  setShowNotifications(true);
} else if (item.title === "Favorites") {
  setShowFavorites(true);
} else if (item.title === "Help Center") {
  setShowHelpCenter(true);
} else if (item.title === "Settings") {
  setShowSettings(true);
} else {
  showComingSoon(item.title);
}
}}
    >
      <View style={styles.menuIcon}>
       <Ionicons
  name={item.icon}
  size={23}
  color="#FB5203"
/>
      </View>

      <View style={styles.menuInfo}>
        <Text style={styles.menuTitle}>{item.title}</Text>
        <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
      </View>

      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* PROFILE HEADER */}
          <View style={styles.profileHeader}>
            <Text style={styles.headerTitle}>Profile</Text>
            <Text style={styles.headerSubtitle}>
              Manage your account
            </Text>

            <View style={styles.userCard}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {userName.charAt(0).toUpperCase()}
                </Text>
              </View>

              <View style={styles.userInfo}>
                <Text style={styles.userName}>{userName}</Text>
                <Text style={styles.email}>{email}</Text>

                <View style={styles.premiumBadge}>
                  <Text style={styles.premiumText}>
                    Premium Member
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => showComingSoon("Edit Profile")}
              >
                <Text style={styles.editIcon}>✎</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* PROFILE TABS */}
<View style={styles.profileTabs}>
  {["Orders", "Addresses", "Payments"].map((tab) => (
    <TouchableOpacity
      key={tab}
      style={[
        styles.profileTab,
        activeProfileTab === tab && styles.activeProfileTab,
      ]}
      onPress={() => setActiveProfileTab(tab)}
    >
      <Text
        style={[
          styles.profileTabText,
          activeProfileTab === tab && styles.activeProfileTabText,
        ]}
      >
        {tab}
      </Text>
    </TouchableOpacity>
  ))}
</View>

          {/* STATISTICS */}
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
             <Text style={styles.statNumber}>{orders.length}</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>420</Text>
              <Text style={styles.statLabel}>Saved</Text>
            </View>
          </View>

         {/* ORDERS TAB */}
{activeProfileTab === "Orders" && (
  <View style={styles.tabContent}>
    {recentOrders.length > 0 ? (
      recentOrders.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.orderCard}
          onPress={onMyOrders}
        >
          <Image
            source={{ uri: item.image }}
            style={styles.foodImage}
          />

          <View style={styles.orderInfo}>
            <Text style={styles.foodName}>{item.name}</Text>
            <Text style={styles.orderId}>{item.id}</Text>
            <Text style={styles.orderId}>{item.date}</Text>
          </View>

          <View style={styles.orderRight}>
            <Text style={styles.orderPrice}>{item.price}</Text>
            <Text style={styles.orderStatus}>{item.status}</Text>
          </View>
        </TouchableOpacity>
      ))
    ) : (
      <Text style={styles.emptyText}>No orders yet.</Text>
    )}

    <TouchableOpacity
      style={styles.addButton}
      onPress={onMyOrders}
    >
      <Text style={styles.addButtonText}>View All Orders</Text>
    </TouchableOpacity>
  </View>
)}

{/* ADDRESSES TAB */}
{activeProfileTab === "Addresses" && (
  <View style={styles.tabContent}>
    {showAddressForm && (
  <View style={styles.addressForm}>
    <Text style={styles.formTitle}>
      {editingAddressId ? "Edit Address" : "Add New Address"}
    </Text>

    <Text style={styles.formLabel}>Address Type</Text>

    <View style={styles.addressTypeRow}>
      {["Home", "Work", "Other"].map((type) => (
        <TouchableOpacity
          key={type}
          style={[
            styles.typeButton,
            addressType === type && styles.selectedTypeButton,
          ]}
           onPress={() => setAddressType(type)}
        >
          <Text
            style={[
              styles.typeButtonText,
              addressType === type && styles.selectedTypeText,
            ]}
          >
            {type}
          </Text>
        </TouchableOpacity>
      ))}
    </View>

    {[
      ["Full Name", fullName, setFullName],
      ["Phone Number", phone, setPhone],
      ["House / Flat Number", house, setHouse],
      ["Street Address", street, setStreet],
      ["City", city, setCity],
      ["State", stateName, setStateName],
      ["PIN Code", pinCode, setPinCode],
    ].map(([label, value, setter]) => (
      <View key={label}>
        <Text style={styles.formLabel}>{label}</Text>
        <TextInput
          style={styles.formInput}
          placeholder={`Enter ${label}`}
          value={value}
          onChangeText={setter}
          keyboardType={
            label === "Phone Number" || label === "PIN Code"
              ? "numeric"
              : "default"
          }
        />
      </View>
    ))}

    <TouchableOpacity style={styles.saveAddressButton} onPress={saveAddress}>
      <Text style={styles.saveAddressText}>Save Address</Text>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => setShowAddressForm(false)}
      style={styles.cancelButton}
    >
      <Text style={styles.cancelText}>Cancel</Text>
    </TouchableOpacity>
  </View>
)}
    {savedAddresses.map((item) => (
      <View key={item.id} style={styles.savedCard}>
        <View style={styles.savedInfo}>
          <Text style={styles.savedName}>
            {item.name}
            {item.default ? "  • Default" : ""}
          </Text>
          <Text style={styles.savedDescription}>
            {item.address}
          </Text>
        </View>

<View style={styles.addressActions}>
  <TouchableOpacity
    onPress={() => openEditAddress(item)}
  >
    <Text style={styles.editText}>Edit</Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => deleteAddress(item)}
  >
    <Text style={styles.deleteText}>Delete</Text>
  </TouchableOpacity>
</View>
      </View>
    ))}

    <TouchableOpacity
      style={styles.addButton}
      onPress={openAddAddress}
    >
      <Text style={styles.addButtonText}>+ Add New Address</Text>
    </TouchableOpacity>
  </View>
)}

{/* PAYMENTS TAB */}
{activeProfileTab === "Payments" && (
  <View style={styles.tabContent}>
    {showPaymentForm && (
  <View style={styles.addressForm}>
    <Text style={styles.formTitle}>
      {editingPaymentId ? "Edit Payment Method" : "Add New Card"}
    </Text>

    <Text style={styles.formLabel}>Cardholder Name</Text>
    <TextInput
      style={styles.formInput}
      placeholder="Enter cardholder name"
      value={cardName}
      onChangeText={setCardName}
    />

    <Text style={styles.formLabel}>Card Type</Text>
    <View style={styles.addressTypeRow}>
      {["Visa", "Mastercard"].map((type) => (
        <TouchableOpacity
          key={type}
          style={[
            styles.typeButton,
            cardType === type && styles.selectedTypeButton,
          ]}
          onPress={() => setCardType(type)}
        >
          <Text
            style={[
              styles.typeButtonText,
              cardType === type && styles.selectedTypeText,
            ]}
          >
            {type}
          </Text>
        </TouchableOpacity>
      ))}
    </View>

    <Text style={styles.formLabel}>Last 4 Digits</Text>
    <TextInput
      style={styles.formInput}
      placeholder="1234"
      value={cardLastFour}
      onChangeText={(value) =>
        setCardLastFour(value.replace(/[^0-9]/g, "").slice(0, 4))
      }
      keyboardType="numeric"
      maxLength={4}
    />

    <Text style={styles.formLabel}>Expiry Date</Text>
    <TextInput
      style={styles.formInput}
      placeholder="MM/YY"
      value={cardExpiry}
      onChangeText={setCardExpiry}
      maxLength={5}
    />

    <TouchableOpacity
      style={styles.saveAddressButton}
 onPress={savePayment}   >
      <Text style={styles.saveAddressText}>Save Card</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.cancelButton}
    onPress={() => {
  setShowPaymentForm(false);
  setEditingPaymentId(null);
}}
    >
      <Text style={styles.cancelText}>Cancel</Text>
    </TouchableOpacity>
  </View>
)}
    {savedPayments.map((item) => (
      <View key={item.id} style={styles.savedCard}>
       <View style={styles.paymentIcon}>
  <Ionicons
    name="card-outline"
    size={24}
    color="#FB5203"
  />
</View>

        <View style={styles.savedInfo}>
          <Text style={styles.savedName}>
            {item.name} {item.number}
          </Text>
          <Text style={styles.savedDescription}>
            {item.default ? "Default payment method" : "Saved card"}
          </Text>
        </View>
<View style={styles.addressActions}>
  <TouchableOpacity
    onPress={() => openEditPayment(item)}
  >
    <Text style={styles.editText}>Edit</Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => deletePayment(item)}
  >
    <Text style={styles.deleteText}>Delete</Text>
  </TouchableOpacity>
</View>
      </View>
    ))}

    <TouchableOpacity
      style={styles.addButton}
      onPress={openAddPayment}
    >
      <Text style={styles.addButtonText}>+ Add New Card</Text>
    </TouchableOpacity>
  </View>
)}

          {/* ACCOUNT */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ACCOUNT</Text>
            {accountItems.map(renderMenuItem)}
          </View>

          {/* SUPPORT */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>SUPPORT</Text>
            {supportItems.map(renderMenuItem)}
          </View>

          {/* LOGOUT */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={onLogout}
            activeOpacity={0.8}
          >
            <Text style={styles.logoutIcon}>⇥</Text>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

          <Text style={styles.version}>FoodFlow Version 1.0.0</Text>
        </ScrollView>
        <Modal
  visible={showPersonalInfo}
  animationType="slide"
  onRequestClose={() => setShowPersonalInfo(false)}
>
  <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F8F8" }}>
    <View style={{ padding: 20 }}>
      <Text
        style={{
          fontSize: 22,
          fontFamily: "Poppins_700Bold",
          color: "#222222",
          marginBottom: 20,
        }}
      >
        Personal Information
      </Text>

      <Text style={styles.formLabel}>Full Name</Text>
      <TextInput
        style={styles.formInput}
        value={personalName}
        onChangeText={setPersonalName}
        editable={isEditingPersonalInfo}
        placeholder="Enter your name"
      />

      <Text style={styles.formLabel}>Phone Number</Text>

      <TextInput
  style={styles.formInput}
  value={personalPhone}
  onChangeText={setPersonalPhone}
  editable={true}
  placeholder="Enter your phone number"
  keyboardType="numeric"
  maxLength={10}
/>

      <TouchableOpacity
        style={styles.saveAddressButton}
        onPress={async () => {
          if (isEditingPersonalInfo) {
            if (!personalName.trim()) {
              Alert.alert("Missing Name", "Please enter your name.");
              return;
            }

            try {
              const currentUser = auth.currentUser;

              if (!currentUser) {
                Alert.alert("Error", "Please log in again.");
                return;
              }

              await updateProfile(currentUser, {
                displayName: personalName.trim(),
              });

              setIsEditingPersonalInfo(false);
              Alert.alert("Success", "Your name has been updated successfully.");
            } catch (error) {
              console.log("Profile update error:", error);
              Alert.alert("Error", "Unable to update your name. Please try again.");
            }
          } else {
            setIsEditingPersonalInfo(true);
          }
        }}
      >
        <Text style={styles.saveAddressText}>
          {isEditingPersonalInfo ? "Save" : "Edit"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => setShowPersonalInfo(false)}
      >
        <Text style={styles.cancelText}>Back to Profile</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
</Modal>

<Modal
  visible={showSettings}
  animationType="slide"
  onRequestClose={() => setShowSettings(false)}
>
  <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F8F8" }}>
    <ScrollView contentContainerStyle={{ padding: 20 }}>

      <Text style={{
        fontSize: 24,
        fontWeight: "bold",
        color: "#222222",
        marginBottom: 5
      }}>
        Settings
      </Text>

      <Text style={{
        fontSize: 13,
        color: "#888888",
        marginBottom: 22
      }}>
        Manage your FoodFlow preferences
      </Text>

      {/* PASSWORD */}
      <Text style={styles.sectionTitle}>ACCOUNT SECURITY</Text>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={async () => {
          const userEmail = auth.currentUser?.email || email;

          if (!userEmail) {
            Alert.alert("Error", "No email address found.");
            return;
          }

          try {
            await sendPasswordResetEmail(auth, userEmail);
            Alert.alert(
              "Email Sent",
              `Password reset instructions have been sent to ${userEmail}.`
            );
          } catch (error) {
            console.log("Password reset error:", error);
            Alert.alert(
              "Error",
              error.code === "auth/invalid-email"
                ? "Please check your email address."
                : "Unable to send the password reset email. Please try again."
            );
          }
        }}
      >
        <Ionicons name="lock-closed-outline" size={23} color="#FB5203" />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.menuTitle}>Change Password</Text>
          <Text style={styles.menuSubtitle}>
            Receive a password reset email
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#999999" />
      </TouchableOpacity>

      {/* THEME */}
      <Text style={[styles.sectionTitle, { marginTop: 22 }]}>
        APP PREFERENCES
      </Text>

      <View style={{
        backgroundColor: "#FFFFFF",
        padding: 15,
        borderRadius: 12,
        marginBottom: 12
      }}>
        <Text style={styles.menuTitle}>Choose Theme</Text>
        <Text style={styles.menuSubtitle}>
          Select your preferred app appearance
        </Text>

        <View style={styles.addressTypeRow}>
          {["Light", "Dark"].map((theme) => (
            <TouchableOpacity
              key={theme}
              style={[
                styles.typeButton,
                selectedTheme === theme && styles.selectedTypeButton
              ]}
              onPress={() => setSelectedTheme(theme)}
            >
              <Text style={[
                styles.typeButtonText,
                selectedTheme === theme && styles.selectedTypeText
              ]}>
                {theme}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* LANGUAGE */}
      <View style={{
        backgroundColor: "#FFFFFF",
        padding: 15,
        borderRadius: 12,
        marginBottom: 12
      }}>
        <Text style={styles.menuTitle}>Language</Text>
        <Text style={styles.menuSubtitle}>
          Select your preferred language
        </Text>

        <View style={styles.addressTypeRow}>
          {["English", "Tamil"].map((language) => (
            <TouchableOpacity
              key={language}
              style={[
                styles.typeButton,
                selectedLanguage === language && styles.selectedTypeButton
              ]}
              onPress={() => setSelectedLanguage(language)}
            >
              <Text style={[
                styles.typeButtonText,
                selectedLanguage === language && styles.selectedTypeText
              ]}>
                {language}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* PRIVACY */}
      <Text style={[styles.sectionTitle, { marginTop: 15 }]}>
        LEGAL
      </Text>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() =>
          Alert.alert(
            "Privacy Policy",
            "FoodFlow demo privacy policy: Your account information is used to provide app services. This demo does not provide a complete published privacy policy."
          )
        }
      >
        <Ionicons name="shield-checkmark-outline" size={23} color="#FB5203" />
        <Text style={[styles.menuTitle, { flex: 1, marginLeft: 12 }]}>
          Privacy Policy
        </Text>
        <Ionicons name="chevron-forward" size={20} color="#999999" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() =>
          Alert.alert(
            "Terms & Conditions",
            "FoodFlow is a demonstration food delivery application. Orders and payments shown in this demo are for demonstration purposes."
          )
        }
      >
        <Ionicons name="document-text-outline" size={23} color="#FB5203" />
        <Text style={[styles.menuTitle, { flex: 1, marginLeft: 12 }]}>
          Terms & Conditions
        </Text>
        <Ionicons name="chevron-forward" size={20} color="#999999" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.saveAddressButton}
        onPress={() => {
          setShowSettings(false);
          Alert.alert("Success", "Your preferences have been selected!");
        }}
      >
        <Text style={styles.saveAddressText}>Save Preferences</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => setShowSettings(false)}
      >
        <Text style={styles.cancelText}>Back to Profile</Text>
      </TouchableOpacity>

    </ScrollView>
  </SafeAreaView>
</Modal>

<Modal
  visible={showHelpCenter}
  animationType="slide"
  onRequestClose={() => setShowHelpCenter(false)}
>
  <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F8F8" }}>
    <ScrollView contentContainerStyle={{ padding: 20 }}>

      <Text style={{
        fontSize: 24,
        fontWeight: "bold",
        color: "#222222",
        marginBottom: 6
      }}>
        Help Center
      </Text>

      <Text style={{
        fontSize: 13,
        color: "#888888",
        marginBottom: 22
      }}>
        How can we help you today?
      </Text>

      <View style={{
        backgroundColor: "#FFF0E8",
        padding: 18,
        borderRadius: 14,
        marginBottom: 22,
        alignItems: "center"
      }}>
        <Ionicons name="headset-outline" size={38} color="#FB5203" />
        <Text style={{
          fontSize: 16,
          fontWeight: "bold",
          color: "#333333",
          marginTop: 8
        }}>
          Welcome to FoodFlow Support
        </Text>
        <Text style={{
          fontSize: 12,
          color: "#777777",
          textAlign: "center",
          marginTop: 5
        }}>
          Find answers to common questions below.
        </Text>
      </View>

      <Text style={{
        fontSize: 17,
        fontWeight: "bold",
        color: "#222222",
        marginBottom: 12
      }}>
        Frequently Asked Questions
      </Text>

      {[
        {
          question: "How can I track my order?",
          answer: "Open My Orders and select your order to view its current delivery status."
        },
        {
          question: "How can I cancel my order?",
          answer: "Open My Orders and check the available cancellation option for your order."
        },
        {
          question: "What payment methods are available?",
          answer: "FoodFlow supports the payment methods displayed on the checkout and payment screens."
        },
        {
          question: "What should I do if payment fails?",
          answer: "Check your payment details and try again. If the issue continues, contact customer support."
        },
        {
          question: "How can I change my delivery address?",
          answer: "Go to Profile, open Addresses, and add or edit your saved delivery address."
        },
        {
          question: "How can I contact customer support?",
          answer: "Use the Contact Support option below to see the available support instructions."
        }
      ].map((faq, index) => (
        <TouchableOpacity
          key={index}
          onPress={() =>
            setSelectedFaq(selectedFaq === index ? null : index)
          }
          style={{
            backgroundColor: "#FFFFFF",
            padding: 15,
            borderRadius: 11,
            marginBottom: 10
          }}
        >
          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <Text style={{
              flex: 1,
              fontSize: 13,
              fontWeight: "bold",
              color: "#333333"
            }}>
              {faq.question}
            </Text>

            <Ionicons
              name={selectedFaq === index ? "chevron-up" : "chevron-down"}
              size={20}
              color="#FB5203"
            />
          </View>

          {selectedFaq === index && (
            <Text style={{
              fontSize: 12,
              color: "#777777",
              lineHeight: 20,
              marginTop: 12
            }}>
              {faq.answer}
            </Text>
          )}
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.saveAddressButton}
        onPress={() =>
          Alert.alert(
            "FoodFlow Support",
            "Please contact your FoodFlow support team for further assistance."
          )
        }
      >
        <Text style={styles.saveAddressText}>
          Contact Support
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => {
          setShowHelpCenter(false);
          setSelectedFaq(null);
        }}
      >
        <Text style={styles.cancelText}>Back to Profile</Text>
      </TouchableOpacity>

    </ScrollView>
  </SafeAreaView>
</Modal>

<Modal
  visible={showFavorites}
  animationType="slide"
  onRequestClose={() => setShowFavorites(false)}
>
  <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F8F8" }}>
    <ScrollView contentContainerStyle={{ padding: 18 }}>

      <Text style={{
        fontSize: 24,
        fontWeight: "bold",
        color: "#222222",
        marginBottom: 5
      }}>
        My Favorites ❤️
      </Text>

      <Text style={{
        fontSize: 13,
        color: "#888888",
        marginBottom: 20
      }}>
        Your favorite food items
      </Text>

      {favoriteItems.length === 0 ? (
        <View style={{
          backgroundColor: "#FFFFFF",
          padding: 35,
          borderRadius: 15,
          alignItems: "center",
          marginTop: 30
        }}>
          <Ionicons name="heart-outline" size={55} color="#FB5203" />

          <Text style={{
            fontSize: 16,
            fontWeight: "bold",
            marginTop: 15,
            color: "#333333"
          }}>
            No Favorites Yet
          </Text>

          <Text style={{
            fontSize: 12,
            color: "#888888",
            textAlign: "center",
            marginTop: 8
          }}>
            Explore delicious food and add your favorites!
          </Text>
        </View>
      ) : (
        favoriteItems.map((item) => (
          <View
            key={item.id}
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 14,
              padding: 12,
              marginBottom: 14
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setShowFavorites(false);
                onOpenFavorite?.(item);
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  width: "100%",
                  height: 155,
                  borderRadius: 10
                }}
                resizeMode="cover"
              />

              <Text style={{
                fontSize: 15,
                fontWeight: "bold",
                color: "#222222",
                marginTop: 10
              }}>
                {item.name}
              </Text>

              <Text style={{
                fontSize: 13,
                color: "#FB5203",
                fontWeight: "bold",
                marginTop: 4
              }}>
                {item.price}
              </Text>
            </TouchableOpacity>

            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 12
            }}>
              <TouchableOpacity
                onPress={() => onRemoveFavorite?.(item)}
              >
                <Text style={{
                  color: "#E53935",
                  fontWeight: "bold",
                  fontSize: 12
                }}>
                  ❤️ Remove
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setShowFavorites(false);
                  onAddFavoriteToCart?.(item);
                }}
                style={{
                  backgroundColor: "#FB5203",
                  paddingHorizontal: 15,
                  paddingVertical: 9,
                  borderRadius: 8
                }}
              >
                <Text style={{
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  fontSize: 12
                }}>
                  Add to Cart
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => setShowFavorites(false)}
      >
        <Text style={styles.cancelText}>Back to Profile</Text>
      </TouchableOpacity>

    </ScrollView>
  </SafeAreaView>
</Modal>
<Modal
  visible={showNotifications}
  animationType="slide"
  onRequestClose={() => setShowNotifications(false)}
>
  <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F8F8" }}>
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{
        fontSize: 23,
        fontWeight: "bold",
        color: "#222222",
        marginBottom: 8
      }}>
        Notifications
      </Text>

      <Text style={{
        fontSize: 13,
        color: "#888888",
        marginBottom: 25
      }}>
        Manage your FoodFlow notifications
      </Text>

      {[
        {
          title: "Order Updates",
          description: "Get order confirmation and status updates",
          value: orderNotifications,
          setter: setOrderNotifications
        },
        {
          title: "Delivery Updates",
          description: "Know when your food is on the way",
          value: deliveryNotifications,
          setter: setDeliveryNotifications
        },
        {
          title: "Offers & Promotions",
          description: "Receive discounts and special offers",
          value: offerNotifications,
          setter: setOfferNotifications
        },
        {
          title: "Payment Updates",
          description: "Get payment confirmation messages",
          value: paymentNotifications,
          setter: setPaymentNotifications
        }
      ].map((item) => (
        <View
          key={item.title}
          style={{
            backgroundColor: "#FFFFFF",
            padding: 16,
            borderRadius: 12,
            marginBottom: 12,
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <View style={{ flex: 1, paddingRight: 10 }}>
            <Text style={{
              fontSize: 14,
              fontWeight: "bold",
              color: "#222222"
            }}>
              {item.title}
            </Text>

            <Text style={{
              fontSize: 11,
              color: "#888888",
              marginTop: 5
            }}>
              {item.description}
            </Text>
          </View>

          <Switch
            value={item.value}
            onValueChange={item.setter}
            trackColor={{ false: "#CCCCCC", true: "#FFB38F" }}
            thumbColor={item.value ? "#FB5203" : "#FFFFFF"}
          />
        </View>
      ))}

      <TouchableOpacity
        style={styles.saveAddressButton}
        onPress={() => {
          setShowNotifications(false);
          Alert.alert("Success", "Notification preferences saved!");
        }}
      >
        <Text style={styles.saveAddressText}>
          Save Preferences
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => setShowNotifications(false)}
      >
        <Text style={styles.cancelText}>Back to Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  </SafeAreaView>
</Modal>
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
    backgroundColor: "#F8F8F8",
  },

  scrollContent: {
    paddingBottom: 25,
  },

  profileHeader: {
    backgroundColor: "#FB5203",
    paddingHorizontal: 18,
    paddingTop: 15,
    paddingBottom: 25,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 23,
    fontFamily: "Poppins_700Bold",
  },

  headerSubtitle: {
    color: "#FFE4D8",
    fontSize: 11,
    fontFamily: "Poppins_400Regular",
    marginTop: 2,
  },

  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 13,
    padding: 13,
    marginTop: 18,
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: "#FFF0E8",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: "#FB5203",
    fontSize: 25,
    fontFamily: "Poppins_700Bold",
  },

  userInfo: {
    flex: 1,
    marginLeft: 12,
  },

  userName: {
    fontSize: 15,
    fontFamily: "Poppins_700Bold",
    color: "#222222",
  },

  email: {
    fontSize: 10,
    color: "#888888",
    fontFamily: "Poppins_400Regular",
  },

  premiumBadge: {
    backgroundColor: "#FFF0E8",
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginTop: 5,
  },

  premiumText: {
    color: "#FB5203",
    fontSize: 9,
    fontFamily: "Poppins_700Bold",
  },

  editIcon: {
    fontSize: 22,
    color: "#FB5203",
    padding: 5,
  },

  statsCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 15,
    marginTop: -1,
    paddingVertical: 15,
    borderRadius: 12,
    justifyContent: "space-around",
  },

  statItem: {
    alignItems: "center",
  },

  statNumber: {
    fontSize: 17,
    fontFamily: "Poppins_700Bold",
    color: "#222222",
  },

  statLabel: {
    fontSize: 10,
    color: "#888888",
    fontFamily: "Poppins_400Regular",
  },

  section: {
    marginTop: 20,
    paddingHorizontal: 15,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 14,
    fontFamily: "Poppins_700Bold",
    color: "#333333",
    marginBottom: 10,
  },

  viewAll: {
    color: "#FB5203",
    fontSize: 11,
    fontFamily: "Poppins_700Bold",
  },

  orderCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 9,
    borderRadius: 10,
    marginBottom: 8,
  },

  foodImage: {
    width: 43,
    height: 43,
    borderRadius: 9,
  },

  orderInfo: {
    flex: 1,
    marginLeft: 10,
  },

  foodName: {
    fontSize: 11,
    fontFamily: "Poppins_700Bold",
    color: "#333333",
  },

  orderId: {
    fontSize: 9,
    color: "#999999",
  },

  orderRight: {
    alignItems: "flex-end",
  },

  orderPrice: {
    fontSize: 10,
    fontFamily: "Poppins_700Bold",
    color: "#333333",
  },

  orderStatus: {
    fontSize: 9,
    color: "#168B45",
    marginTop: 3,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
  },

  menuIcon: {
    width: 34,
    height: 34,
    borderRadius: 18,
    backgroundColor: "#FFF0E8",
    alignItems: "center",
    justifyContent: "center",
  },

  iconText: {
    fontSize: 16,
  },

  menuInfo: {
    flex: 1,
    marginLeft: 11,
  },

  menuTitle: {
    fontSize: 11,
    fontFamily: "Poppins_700Bold",
    color: "#333333",
  },

  menuSubtitle: {
    fontSize: 9,
    color: "#999999",
  },

  arrow: {
    fontSize: 21,
    color: "#AAAAAA",
  },

  logoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 15,
    marginTop: 20,
    padding: 13,
    borderRadius: 10,
  },

  logoutIcon: {
    color: "#FB5203",
    fontSize: 18,
    marginRight: 8,
  },

  logoutText: {
    color: "#FB5203",
    fontSize: 13,
    fontFamily: "Poppins_700Bold",
  },

  version: {
    textAlign: "center",
    fontSize: 9,
    color: "#AAAAAA",
    marginTop: 15,
  },
  profileTabs: {
  flexDirection: "row",
  backgroundColor: "#E8E8E8",
  borderRadius: 25,
  marginHorizontal: 15,
  marginTop: 12,
  padding: 4,
},

profileTab: {
  flex: 1,
  alignItems: "center",
  paddingVertical: 9,
  borderRadius: 20,
},

activeProfileTab: {
  backgroundColor: "#FFFFFF",
},

profileTabText: {
  fontSize: 11,
  color: "#555555",
  fontFamily: "Poppins_400Regular",
},

activeProfileTabText: {
  color: "#FB5203",
  fontFamily: "Poppins_700Bold",
},

tabContent: {
  paddingHorizontal: 15,
  marginTop: 15,
},

savedCard: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  padding: 13,
  marginBottom: 9,
},

savedInfo: {
  flex: 1,
},

savedName: {
  fontSize: 12,
  color: "#222222",
  fontFamily: "Poppins_700Bold",
},

savedDescription: {
  fontSize: 10,
  color: "#888888",
  marginTop: 4,
  fontFamily: "Poppins_400Regular",
},

editText: {
  color: "#FB5203",
  fontSize: 11,
  fontFamily: "Poppins_700Bold",
},

paymentIcon: {
  width: 38,
  height: 38,
  borderRadius: 20,
  backgroundColor: "#FFF0E8",
  alignItems: "center",
  justifyContent: "center",
  marginRight: 10,
},

addButton: {
  paddingVertical: 12,
  alignItems: "center",
},

addButtonText: {
  color: "#FB5203",
  fontSize: 12,
  fontFamily: "Poppins_700Bold",
},

emptyText: {
  color: "#999999",
  fontSize: 12,
  padding: 15,
  textAlign: "center",
},
addressForm: {
  backgroundColor: "#FFFFFF",
  padding: 16,
  borderRadius: 15,
  marginBottom: 15,
},

formTitle: {
  fontSize: 18,
  fontWeight: "bold",
  color: "#222222",
  marginBottom: 15,
},

formLabel: {
  fontSize: 12,
  fontWeight: "600",
  color: "#444444",
  marginTop: 12,
  marginBottom: 6,
},

addressTypeRow: {
  flexDirection: "row",
  gap: 10,
  marginBottom: 8,
},

typeButton: {
  flex: 1,
  padding: 10,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: "#DDDDDD",
  alignItems: "center",
},

selectedTypeButton: {
  backgroundColor: "#FFF0E8",
  borderColor: "#FB5203",
},

typeButtonText: {
  color: "#555555",
  fontSize: 12,
},

selectedTypeText: {
  color: "#FB5203",
  fontWeight: "bold",
},

formInput: {
  backgroundColor: "#F8F8F8",
  borderWidth: 1,
  borderColor: "#E5E5E5",
  borderRadius: 9,
  paddingHorizontal: 12,
  paddingVertical: 11,
  fontSize: 13,
  color: "#222222",
},

saveAddressButton: {
  backgroundColor: "#FB5203",
  padding: 14,
  borderRadius: 10,
  alignItems: "center",
  marginTop: 20,
},

saveAddressText: {
  color: "#FFFFFF",
  fontSize: 14,
  fontWeight: "bold",
},

cancelButton: {
  padding: 12,
  alignItems: "center",
},

cancelText: {
  color: "#FB5203",
  fontSize: 13,
  fontWeight: "600",
},
addressActions: {
  flexDirection: "row",
  alignItems: "center",
  gap: 15,
},

deleteText: {
  color: "#E53935",
  fontSize: 11,
  fontFamily: "Poppins_700Bold",
},
});

export default ProfileScreen;
