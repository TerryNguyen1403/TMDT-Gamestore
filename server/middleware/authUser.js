import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../model/User.js";

export const verify = async (req, res, next) => {
  // Lấy JWT từ headers
  const authHeader = req.headers.authorization;

  // Kiểm tra
  if (!authHeader) {
    return res.status(401).json({ message: "Không tìm thấy token" });
  }

  try {
    // Xác thực token
    const token = authHeader;
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    // Đi đến tác vụ tiếp theo
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token không hợp lệ!" });
  }
};

// Chỉ cho phép admin truy cập
export const adminOnly = async (req, res, next) => {
  try {
    const userId = req?.user?.userId;
    if (!userId) {
      return;
    }

    const user = await User.findById(userId).select("isAdmin");
    if (!user) {
      return;
    }

    if (!user.isAdmin) {
      return res
        .status(403)
        .json({ message: "Không có quyền truy cập (Admin)" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Lỗi xác thực quyền admin" });
  }
};
