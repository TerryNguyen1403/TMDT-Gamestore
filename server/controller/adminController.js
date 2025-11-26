import User from "../model/User.js";

// Lấy danh sách người dùng
export const allUsers = async (req, res) => {
  try {
    // Lấy danh sách người dùng
    const users = await User.find({});

    const totalUsers = users.length;

    // Trả về danh sách
    res.status(200).json({
      message: "Lấy danh sách người dùng thành công",
      totalUsers,
      users: users.map((u) => ({
        _id: u._id,
        userName: u.userName,
        email: u.email,
        isAdmin: u.isAdmin,
        createdAt: u.createdAt,
      })),
    });
  } catch (error) {
    console.error(`Xảy ra lỗi khi tải danh sách người dùng: ${error.message}`);
  }
};
