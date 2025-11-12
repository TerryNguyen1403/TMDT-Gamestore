import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const user = await User.findOne({ email: email });

    // Kiểm tra email tồn tại hay chưa
    if (user)
      return res.json({ message: "Email đã tồn tại trong cơ sở dữ liệu" });

    // Hashed password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Lưu user mới vào database
    const newUser = await User.create({
      userName: userName,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();

    res.json({
      message: "Đăng ký thành công",
      newUser,
    });
  } catch (error) {
    console.error("Lỗi: ", error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra user có trong hệ thống hay không
    const user = await User.findOne({ email: email });
    if (!user)
      return res.json({ message: "User không tồn tại trong hệ thống" });

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ message: "Mật khẩu không chính xác" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.error(`Lỗi: ${error.message}`);
  }
};
