import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../model/User.js";

export const verify = async (req, res, next) => {
  // Lấy JWT từ headers
  const authHeader = req.headers.authorization;

  // Kiểm tra
  if (!authHeader) {
    console.error("No authorization header provided");
    return res.status(401).json({ message: "Không tìm thấy token" });
  }

  try {
    // Xác thực token - tách "Bearer " prefix
    let token = authHeader;
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.slice(7);
    }
    
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    console.log("Token verified for user:", verified);

    // Đi đến tác vụ tiếp theo
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(401).json({ message: "Token không hợp lệ!" });
  }
};

// Chỉ cho phép admin truy cập
export const adminOnly = async (req, res, next) => {
  try {
    const userId = req?.user?.userId;
    console.log("Checking admin access for userId:", userId);
    
    if (!userId) {
      console.error("No userId found in token");
      return res.status(403).json({ message: "Không có userId trong token" });
    }

    const user = await User.findById(userId).select("isAdmin");
    if (!user) {
      console.error("User not found:", userId);
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    console.log("User isAdmin status:", user.isAdmin);
    
    if (!user.isAdmin) {
      console.error("User is not admin:", userId);
      return res
        .status(403)
        .json({ message: "Không có quyền truy cập (Admin)" });
    }

    next();
  } catch (error) {
    console.error("Admin check error:", error.message);
    return res.status(500).json({ message: "Lỗi xác thực quyền admin" });
  }
};
