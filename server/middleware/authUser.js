import jwt from "jsonwebtoken";
import "dotenv/config";

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
