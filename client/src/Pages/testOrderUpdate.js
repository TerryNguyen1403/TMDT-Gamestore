// Test script để debug API order update
// Chạy file này trong console browser để test

const testUpdateOrderStatus = async () => {
  const orderId = "6925337474961cec94600fe3"; // Thay bằng ID thực tế
  const token = localStorage.getItem("token");
  
  console.log("Token:", token);
  console.log("Order ID:", orderId);
  
  try {
    const response = await fetch("http://localhost:3000/api/orders/" + orderId + "/status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify({ status: "confirmed" }),
    });
    
    console.log("Response status:", response.status);
    console.log("Response OK:", response.ok);
    
    const data = await response.json();
    console.log("Response data:", data);
    
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

// Chạy: testUpdateOrderStatus()
