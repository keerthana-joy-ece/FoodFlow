 import CardPaymentScreen from "./CardPaymentScreen";
 import PaymentSuccessScreen from "./PaymentSuccessScreen";
 import OrderTrackingScreen from "./OrderTrackingScreen";
 import ProfileScreen from "./ProfileScreen";
 import OrderScreen from "./OrderScreen";
import PaymentScreen from "./PaymentScreen";
import CheckoutScreen from "./CheckoutScreen";
import CartScreen from "./CartScreen";
import FoodDetailsScreen from "./FoodDetailsScreen";
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  useWindowDimensions,
} from "react-native";

import { COLORS } from "../constants/colors";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import OfferBanner from "../components/OfferBanner";
import CategoryCard from "../components/CategoryCard";
import FoodCard from "../components/FoodCard";
import BottomNavigation from "../components/BottomNavigation";

const categories = [
  { name: "Popular", icon: "🔥" },
  { name: "Pizza", icon: "🍕" },
  { name: "Burger", icon: "🍔" },
  { name: "Sushi", icon: "🍣" },
  { name: "Drinks", icon: "🥤" },
];




const popularFoods = [
  // PIZZA
  {
    id: "1",
    name: "Margherita Pizza",
    description: "Fresh cheese and tomato",
    price: "₹199",
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=500",
  },
  {
    id: "5",
    name: "Pepperoni Pizza",
    description: "Cheesy pizza with pepperoni",
    price: "₹249",
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500",
  },
  {
    id: "6",
    name: "Veggie Pizza",
    description: "Loaded with fresh vegetables",
    price: "₹229",
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
  },
  {
    id: "7",
    name: "Farmhouse Pizza",
    description: "Mushrooms, capsicum and cheese",
    price: "₹279",
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=500",
  },

  // BURGER
  {
    id: "3",
    name: "Classic Burger",
    description: "Juicy burger with cheese",
    price: "₹149",
    category: "Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
  },
  {
    id: "8",
    name: "Chicken Burger",
    description: "Crispy chicken with fresh lettuce",
    price: "₹189",
    category: "Burger",
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500",
  },
  {
    id: "9",
    name: "Veg Burger",
    description: "Delicious vegetable patty burger",
    price: "₹129",
    category: "Burger",
    image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=500",
  },
  {
    id: "10",
    name: "Double Cheese Burger",
    description: "Double patty with extra cheese",
    price: "₹219",
    category: "Burger",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500",
  },

  // SUSHI
  {
    id: "2",
    name: "Sushi Combo",
    description: "Fresh and delicious sushi",
    price: "₹299",
    category: "Sushi",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500",
  },
  {
    id: "11",
    name: "California Roll",
    description: "Fresh California-style sushi rolls",
    price: "₹259",
    category: "Sushi",
    image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=500",
  },
  {
    id: "12",
    name: "Veg Sushi",
    description: "Fresh vegetable sushi rolls",
    price: "₹199",
    category: "Sushi",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500",
  },

  // DRINKS
  {
    id: "4",
    name: "Fresh Orange Juice",
    description: "Freshly squeezed orange juice",
    price: "₹99",
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500",
  },
  {
    id: "13",
    name: "Mango Juice",
    description: "Refreshing fresh mango juice",
    price: "₹119",
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=500",
  },
  {
    id: "14",
    name: "Cold Coffee",
    description: "Chilled creamy iced coffee",
    price: "₹139",
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500",
  },
];


const HomeScreen = ({ onLogout, currentUser }) => {
 const { width } = useWindowDimensions();
 const [selectedCategory, setSelectedCategory] = useState("Popular");
 const [searchQuery, setSearchQuery] = useState("");
const [showOfferItems, setShowOfferItems] = useState(false);
 const [selectedFood, setSelectedFood] = useState(null);
const [cartItems, setCartItems] = useState([]);
const [activeTab, setActiveTab] = useState("Home");
const [favoriteItems, setFavoriteItems] = useState([]);
const [showCheckout, setShowCheckout] = useState(false);
const [showPayment, setShowPayment] = useState(false);
const [showCardPayment, setShowCardPayment] = useState(false);
const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
const [completedOrder, setCompletedOrder] = useState(null);
const [showOrderTracking, setShowOrderTracking] = useState(false);


const [orders, setOrders] = useState([
  {
    id: "ORD1001-1",
    productId: "2",
    name: "Sushi Combo",
    price: "₹299",
    quantity: 1,
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500",
    status: "Delivered",
    date: "12/11/2026",
    paymentMethod: "UPI",
  },
  {
    id: "ORD1002-1",
    productId: "12",
    name: "Veg Sushi",
    price: "₹199",
    quantity: 1,
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500",
    status: "Delivered",
    date: "12/11/2026",
    paymentMethod: "Card",
  },
]);

const cardWidth =
  width > 900 ? "32%" :
  width > 600 ? "48%" :
  "100%";


const filteredFoods = popularFoods.filter((item) => {
  const matchesCategory =
    selectedCategory === "Popular" ||
    item.category === selectedCategory;

  const query = searchQuery.trim().toLowerCase();

  const matchesSearch =
    item.name.toLowerCase().includes(query) ||
    item.category.toLowerCase().includes(query) ||
    item.description.toLowerCase().includes(query);

  return matchesCategory && matchesSearch;
});

  const handleAddFood = (item, quantity = 1) => {
  setCartItems((previousItems) => {
    const existingItem = previousItems.find(
      (food) => food.id === item.id
    );

    if (existingItem) {
      return previousItems.map((food) =>
        food.id === item.id
          ? { ...food, quantity: food.quantity + quantity }
          : food
      );
    }

    return [...previousItems, { ...item, quantity }];
  });

  setSelectedFood(null);
  setActiveTab("Cart");
};

const updateQuantity = (id, change) => {
  setCartItems((items) =>
    items
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + change }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};

const removeItem = (id) => {
  setCartItems((items) =>
    items.filter((item) => item.id !== id)
  );
};
const toggleFavorite = (item) => {
  setFavoriteItems((previous) => {
    const alreadyFavorite = previous.some(
      (food) => food.id === item.id
    );

    if (alreadyFavorite) {
      return previous.filter((food) => food.id !== item.id);
    }

    return [...previous, item];
  });
};


const placeOrder = (paymentMethod) => {
  if (cartItems.length === 0) {
    return;
  }

  const orderId = `ORD${Date.now()}`;

  const subtotal = cartItems.reduce(
    (total, item) =>
      total +
      Number(String(item.price).replace(/[^\d.]/g, "")) *
        item.quantity,
    0
  );

  const deliveryFee = 30;
  const taxes = 10;
  const finalTotal = subtotal + deliveryFee + taxes;

  const newOrders = cartItems.map((item, index) => ({
    id: `${orderId}-${index + 1}`,
    productId: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    image: item.image,
    status: "Preparing",
    date: new Date().toLocaleDateString("en-IN"),
    paymentMethod,
  }));

  setOrders((previousOrders) => [
    ...newOrders,
    ...previousOrders,
  ]);

 setCompletedOrder({
  id: orderId,
  totalAmount: finalTotal,
  paymentMethod,
  status: "Preparing",
});

  setShowCardPayment(false);
  setShowPayment(false);
  setShowCheckout(false);
  setShowPaymentSuccess(true);
};

// ORDER TRACKING SCREEN


const updateOrderStatus = (newStatus) => {
  if (!completedOrder?.id) return;

  setOrders((previousOrders) =>
    previousOrders.map((item) =>
      item.id.startsWith(`${completedOrder.id}-`)
        ? { ...item, status: newStatus }
        : item
    )
  );

  setCompletedOrder((previousOrder) => ({
    ...previousOrder,
    status: newStatus,
  }));
};

if (showOrderTracking) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F2F2F2",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flex: 1,
          width: "100%",
          maxWidth: 480,
          backgroundColor: "#FFFFFF",
        }}
      >
        <OrderTrackingScreen
  order={completedOrder}
  onBack={() => setShowOrderTracking(false)}
  onStatusChange={updateOrderStatus}
  onViewOrder={() => {
    setShowOrderTracking(false);
    setActiveTab("Order");
  }}
/>

        <BottomNavigation
          activeTab="Order"
          onTabPress={(tab) => {
            setShowOrderTracking(false);
            setActiveTab(tab);
          }}
        />
      </View>
    </View>
  );
}



// PAYMENT SUCCESS SCREEN
if (showPaymentSuccess) {
  return (
    <PaymentSuccessScreen
      order={completedOrder}
      onTrackOrder={() => {
        setShowPaymentSuccess(false);
        setShowOrderTracking(true);
      }}
      onBackToHome={() => {
        setShowPaymentSuccess(false);
        setShowOrderTracking(false);
        setActiveTab("Home");
      }}
      onBack={() => {
        setShowPaymentSuccess(false);
        setActiveTab("Home");
      }}
    />
  );
}

// EXISTING FOOD DETAILS SCREEN
if (selectedFood) {
  return (
    <FoodDetailsScreen
      item={selectedFood}
      onBack={() => setSelectedFood(null)}
      onAddToCart={handleAddFood}
      onOrderNow={(item, quantity) =>
        console.log("Order Now:", item.name, quantity)
      }
    />
  );
}

if (showPayment) {
    // CARD PAYMENT SCREEN
if (showCardPayment) {
  return (
    <View style={{ flex: 1 }}>
      <CardPaymentScreen
        totalAmount={cartItems.reduce(
          (total, item) =>
            total +
            Number(String(item.price).replace(/[^\d.]/g, "")) *
              item.quantity,
          0
        )}
        onBack={() => setShowCardPayment(false)}
        onPaymentSuccess={() => placeOrder("Card")}
      />

      <BottomNavigation
        activeTab="Cart"
        onTabPress={(tab) => {
          setShowCardPayment(false);
          setActiveTab(tab);
        }}
      />
    </View>
  );
}
  return (
    <View style={{ flex: 1 }}>
     <PaymentScreen
  onBack={() => setShowPayment(false)}
 onPay={(method) => {
  if (method === "Card") {
    setShowCardPayment(true);
  } else {
    placeOrder(method);
  }
}}
/>

      <BottomNavigation
        activeTab="Cart"
        onTabPress={(tab) => {
          setShowPayment(false);
          setShowCheckout(false);
          setActiveTab(tab);
        }}
      />
    </View>
  );
}
  if (showCheckout) {
  return (
    <View style={{ flex: 1 }}>
      <CheckoutScreen
        onBack={() => setShowCheckout(false)}
        onProceed={() => setShowPayment(true)}
      />

      <BottomNavigation
        activeTab="Cart"
        onTabPress={(tab) => {
          if (tab === "Cart") {
            setShowCheckout(false);
            setActiveTab("Cart");
          } else {
            setShowCheckout(false);
            setActiveTab(tab);
          }
        }}
      />
    </View>
  );
}
// ORDER HISTORY SCREEN
if (activeTab === "Order") {
  return (
    <View style={{ flex: 1 }}>
    <OrderScreen
onTrackOrder={(order) => {
  const parentOrderId = order.id.split("-")[0];

  setCompletedOrder({
    ...order,
    id: parentOrderId,
    status: order.status,
  });

  setShowOrderTracking(true);
}}

  orders={orders}
  onReorder={(order) => {
    const food = popularFoods.find(
      (item) => item.id === order.productId
    );

    if (food) {
      handleAddFood(food, order.quantity);
    }
  }}
/>

      <BottomNavigation
        activeTab="Order"
        onTabPress={setActiveTab}
      />
    </View>
  );
}
// PROFILE SCREEN
if (activeTab === "Profile") {
  return (
    <View style={{ flex: 1 }}>
      <ProfileScreen
        userName={
          currentUser?.displayName ||
          currentUser?.email?.split("@")[0] ||
          "FoodFlow User"
        }
        email={currentUser?.email || ""}
        orders={orders}
        favoriteItems={favoriteItems}
        onRemoveFavorite={toggleFavorite}
        onOpenFavorite={(item) => setSelectedFood(item)}
        onAddFavoriteToCart={handleAddFood}
        onLogout={onLogout}
        onMyOrders={() => setActiveTab("Order")}
      />

      <BottomNavigation
        activeTab="Profile"
        onTabPress={setActiveTab}
      />
    </View>
  );
}
if (activeTab === "Cart") {
  return (
    <View style={{ flex: 1 }}>
     <CartScreen
  cartItems={cartItems}
  onUpdateQuantity={updateQuantity}
  onRemoveItem={removeItem}
onCheckout={() => setShowCheckout(true)}
  onBack={() => setActiveTab("Home")}

      />

      <BottomNavigation
        activeTab="Cart"
        onTabPress={setActiveTab}
      />
    </View>
  );
}
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header />

        <SearchBar
  value={searchQuery}
  onChangeText={(text) => {
    setSearchQuery(text);
    setShowOfferItems(false);
    setSelectedCategory("Popular");
  }}
/>

        <OfferBanner
  onPress={() => {
    setSearchQuery("");
    setSelectedCategory("Popular");
    setShowOfferItems(true);
  }}
/>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>

          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <CategoryCard
                item={item}
                onPress={() => setSelectedCategory(item.name)}
              />
            )}
          />
        </View>

        <View style={styles.section}>
          
<Text style={styles.sectionTitle}>
  {searchQuery.trim()
    ? "Search Results"
    : showOfferItems
    ? "Choose Your Food"
    : selectedCategory === "Popular"
    ? "Popular Items"
    : `${selectedCategory} Items`}
</Text>

         
{filteredFoods.length > 0 ? (
  <View style={styles.foodGrid}>
    {filteredFoods.map((item) => (
      <View
        key={item.id}
        style={[styles.foodItem, { width: cardWidth }]}
      >
        <FoodCard
  item={item}
  onPress={() => setSelectedFood(item)}
  onAdd={() => handleAddFood(item)}
  isFavorite={favoriteItems.some(
    (food) => food.id === item.id
  )}
  onToggleFavorite={toggleFavorite}
/>
      </View>
    ))}
  </View>
) : (
  <Text style={{ textAlign: "center", padding: 20 }}>
    No food items found. Try another search.
  </Text>
)}
        </View>
      </ScrollView>

      <BottomNavigation
        activeTab="Home"
        onTabPress={setActiveTab}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scrollContent: {
    paddingBottom: 20,
  },

  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.black,
    marginBottom: 16,
  },

  foodGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  foodItem: {
    marginBottom: 16,
  },
});

export default HomeScreen;
