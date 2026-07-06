// Seed script — creates sample documents for every collection using the
// Mongoose models in ./model. Run inside the server image so mongoose/bcrypt
// and the models are available, e.g.:
//   docker compose run --rm \
//     -e MONGO_URI=mongodb://mongo:27017/gamestoredb \
//     -v "$PWD/server/seed.js:/app/seed.js" \
//     server node seed.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";

import Platform from "./model/Platform.js";
import Genre from "./model/Genre.js";
import Game from "./model/Game.js";
import User from "./model/User.js";
import Cart from "./model/Cart.js";
import Order from "./model/Order.js";

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://mongo:27017/gamestoredb";

// Mirrors client/src/utils/calDiscount.js (discount is a percentage)
const finalPrice = (price, discount) => price - (price * discount) / 100;

const run = async () => {
  await mongoose.connect(MONGO_URI);

  const gameCount = await Game.countDocuments();

  // if database isn't empty -> skip this seed phase
  if (gameCount > 0) {
    console.log("Database already seeded. Skip....");
    await mongoose.disconnect();
    return;
  }

  // --- Platforms ---
  const [pc, playstation, xbox, nintendo] = await Platform.create([
    { platformName: "PC" },
    { platformName: "Playstation" },
    { platformName: "Xbox" },
    { platformName: "Nintendo Switch" },
  ]);

  // --- Genres ---
  const [action, fighting, adventure, rpg, shooter, sports, horror, strategy] =
    await Genre.create([
      { genreName: "Action" },
      { genreName: "Fighting" },
      { genreName: "Adventure" },
      { genreName: "RPG" },
      { genreName: "Shooter" },
      { genreName: "Sports" },
      { genreName: "Horror" },
      { genreName: "Strategy" },
    ]);

  // --- Games (20 titles) ---
  const gameDefs = [
    {
      gameName: "MARVEL VS. CAPCOM: INFINITE",
      platform: [playstation._id, xbox._id, pc._id],
      genres: [fighting._id, action._id],
      price: 650000,
      discount: 31,
      description:
        "Được tạo ra từ tầm nhìn chung của hai công ty lớn, Marvel vs. Capcom: Infinite mang đến những trận đấu đối kháng 2v2 mãn nhãn giữa các anh hùng Marvel và các nhân vật huyền thoại của Capcom.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXvZLzRj21ue21UiOIN9eJsaWWcIVeWM_x3ERv4bdOFw&s=10",
      isFeatured: true,
      isNewGame: true,
    },
    {
      gameName: "Elden Ring",
      platform: [pc._id, playstation._id, xbox._id],
      genres: [action._id, rpg._id, adventure._id],
      price: 1200000,
      discount: 20,
      description:
        "Một tựa game nhập vai hành động lấy bối cảnh thế giới mở, được tạo ra bởi FromSoftware và George R. R. Martin.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWk9NacV1sBqNJUk5WrWuFlI93T_lqbxajO3QTdiVMiQ&s=10",
      isFeatured: true,
      isNewGame: false,
    },
    {
      gameName: "The Legend of Zelda: Tears of the Kingdom",
      platform: [nintendo._id],
      genres: [adventure._id, action._id],
      price: 1400000,
      discount: 10,
      description:
        "Cuộc phiêu lưu tiếp theo của Link trong vương quốc Hyrule, mở rộng cả trên không lẫn dưới lòng đất.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGPNWiuneoJHD5-mkUvIzWhFBRFU6LtfXuZjEnoYVpeg&s=10",
      isFeatured: false,
      isNewGame: true,
    },
    {
      gameName: "God of War Ragnarök",
      platform: [playstation._id, pc._id],
      genres: [action._id, adventure._id],
      price: 1100000,
      discount: 15,
      description:
        "Kratos và Atreus tiếp tục hành trình đối mặt với vận mệnh Ragnarök trong thế giới thần thoại Bắc Âu.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThdx0vhWAquiOetnH_GJzkYs45yFfs0kvPJOVgEhHvuw&s=10",
      isFeatured: true,
      isNewGame: false,
    },
    {
      gameName: "Cyberpunk 2077",
      platform: [pc._id, playstation._id, xbox._id],
      genres: [action._id, rpg._id],
      price: 900000,
      discount: 40,
      description:
        "Một tựa game nhập vai hành động thế giới mở lấy bối cảnh Night City, thành phố của tham vọng và quyền lực.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYcjeyUiRzN_gI_T-xk84CIPGMBO8Ffhd_xa582gi2tw&s=10",
      isFeatured: false,
      isNewGame: false,
    },
    {
      gameName: "Call of Duty: Modern Warfare III",
      platform: [pc._id, playstation._id, xbox._id],
      genres: [shooter._id, action._id],
      price: 1500000,
      discount: 5,
      description:
        "Phần tiếp theo trong loạt game bắn súng góc nhìn thứ nhất nổi tiếng nhất thế giới với chiến dịch và multiplayer kịch tính.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTA4VPvymWw04K5T7bGXM8tVUDRpp_2MWVffH0Ap4iEA&s=10",
      isFeatured: true,
      isNewGame: true,
    },
    {
      gameName: "FIFA 23",
      platform: [pc._id, playstation._id, xbox._id],
      genres: [sports._id],
      price: 1000000,
      discount: 25,
      description:
        "Trải nghiệm bóng đá chân thực nhất với cả giải nam và nữ, cùng công nghệ HyperMotion2 mới.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHiai-e7tyHhbsHqsDXV2C0VSUio8zJ6zY52Ng_EKvFg&s=10",
      isFeatured: false,
      isNewGame: false,
    },
    {
      gameName: "Resident Evil 4 Remake",
      platform: [pc._id, playstation._id, xbox._id],
      genres: [horror._id, action._id],
      price: 1300000,
      discount: 12,
      description:
        "Bản làm lại của siêu phẩm kinh dị sinh tồn kinh điển, đưa Leon S. Kennedy trở lại nhiệm vụ giải cứu con gái tổng thống.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVXgOPsnryaHMQUNcIaVfb4LUbSUb6gvMnYPBhS5Liug&s=10",
      isFeatured: false,
      isNewGame: true,
    },
    {
      gameName: "Civilization VI",
      platform: [pc._id],
      genres: [strategy._id],
      price: 700000,
      discount: 50,
      description:
        "Xây dựng đế chế của riêng bạn để đứng vững trước thử thách của thời gian trong tựa game chiến thuật theo lượt kinh điển.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXu7OoGz_Ez3H3L6eUeLMUhtJGAyRKJt-TreO_dDCYsQ&s=10",
      isFeatured: false,
      isNewGame: false,
    },
    {
      gameName: "Street Fighter 6",
      platform: [pc._id, playstation._id, xbox._id],
      genres: [fighting._id],
      price: 1450000,
      discount: 8,
      description:
        "Thế hệ tiếp theo của dòng game đối kháng huyền thoại với hệ thống chiến đấu Drive mới và chế độ World Tour.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyLCoiIWJ3rYxNvEvZYpDRlCmMSdwx3hewWUxZD-eifg&s=10",
      isFeatured: true,
      isNewGame: true,
    },
    {
      gameName: "The Witcher 3: Wild Hunt",
      platform: [pc._id, playstation._id, xbox._id, nintendo._id],
      genres: [rpg._id, adventure._id],
      price: 500000,
      discount: 60,
      description:
        "Geralt xứ Rivia bước vào cuộc săn lùng cuối cùng trong thế giới mở đầy rẫy quái vật và những lựa chọn đạo đức khó khăn.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0blVOmSuB_N1U91kKY6gYBu3hjSkOGlHFF3hFwl9GKA&s=10",
      isFeatured: false,
      isNewGame: false,
    },
    {
      gameName: "Hogwarts Legacy",
      platform: [pc._id, playstation._id, xbox._id],
      genres: [action._id, rpg._id, adventure._id],
      price: 1250000,
      discount: 18,
      description:
        "Trải nghiệm thế giới phù thủy của Harry Potter trong vai một học sinh năm thứ năm tại trường Hogwarts.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6WwZ5UedneNKe_wDGvLeLSIotRHjfAMGD4dsGE6SIkw&s",
      isFeatured: true,
      isNewGame: false,
    },
    {
      gameName: "Mortal Kombat 1",
      platform: [pc._id, playstation._id, xbox._id, nintendo._id],
      genres: [fighting._id, action._id],
      price: 1400000,
      discount: 10,
      description:
        "Khởi đầu lại vũ trụ Mortal Kombat với cốt truyện mới và những trận chiến đẫm máu đặc trưng của thương hiệu.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE2j-hqB9wYdR4Zvlivz7jR-LuajYslQk9tcoY4-_EgA&s=10",
      isFeatured: false,
      isNewGame: true,
    },
    {
      gameName: "Diablo IV",
      platform: [pc._id, playstation._id, xbox._id],
      genres: [rpg._id, action._id],
      price: 1350000,
      discount: 5,
      description:
        "Vùng đất Sanctuary rơi vào bóng tối một lần nữa, Lilith trở lại và người chơi phải đối đầu với quỷ dữ.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDZLqu2_Uw0xnIPfnc5zHgfNMLl9yFJMkMW-IR30zsYA&s=10",
      isFeatured: true,
      isNewGame: true,
    },
    {
      gameName: "Animal Crossing: New Horizons",
      platform: [nintendo._id],
      genres: [adventure._id],
      price: 950000,
      discount: 0,
      description:
        "Xây dựng hòn đảo trong mơ của riêng bạn, kết bạn với những cư dân dễ thương và tận hưởng cuộc sống thư giãn.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKu8qo1mp_BLFlKGZuWT86VCMsraV3XbzwvT6qK_fKSA&s",
      isFeatured: false,
      isNewGame: false,
    },
    {
      gameName: "Dead Space Remake",
      platform: [pc._id, playstation._id, xbox._id],
      genres: [horror._id, shooter._id],
      price: 1150000,
      discount: 22,
      description:
        "Isaac Clarke trở lại con tàu USG Ishimura trong bản làm lại đầy ám ảnh của tựa game kinh dị không gian kinh điển.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSamwcJ6_xjnDoygCAK7UazH6KD1LDVgB1VjalIABTt8Q&s=10",
      isFeatured: false,
      isNewGame: true,
    },
    {
      gameName: "EA Sports FC 24",
      platform: [pc._id, playstation._id, xbox._id],
      genres: [sports._id],
      price: 1050000,
      discount: 15,
      description:
        "Kỷ nguyên mới của game bóng đá EA Sports với công nghệ HyperMotionV và trải nghiệm chân thực chưa từng có.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDc0HX9I7nvjUV8RhTemT5f8tulrjuMfRplOH5FC4P-w&s=10",
      isFeatured: false,
      isNewGame: true,
    },
    {
      gameName: "Baldur's Gate 3",
      platform: [pc._id, playstation._id],
      genres: [rpg._id, strategy._id, adventure._id],
      price: 1400000,
      discount: 5,
      description:
        "Tựa game nhập vai chiến thuật theo lượt dựa trên Dungeons & Dragons với cốt truyện sâu sắc và tự do lựa chọn tuyệt đối.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVoQ72esmZjIRycAjGPqGoPwlZmyavtvg0wXKcQze3_w&s=10",
      isFeatured: true,
      isNewGame: true,
    },
    {
      gameName: "Age of Empires IV",
      platform: [pc._id],
      genres: [strategy._id],
      price: 800000,
      discount: 30,
      description:
        "Dòng game chiến thuật thời gian thực huyền thoại trở lại với đồ họa hiện đại và các nền văn minh lịch sử đa dạng.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfiDf-WMkfN5zFU1JP0Jd6nq8GM4CJ6l4mgZESbSf6WA&s=10",
      isFeatured: false,
      isNewGame: false,
    },
    {
      gameName: "Super Smash Bros. Ultimate",
      platform: [nintendo._id],
      genres: [fighting._id, action._id],
      price: 1300000,
      discount: 10,
      description:
        "Tập hợp lớn nhất từ trước đến nay của các nhân vật Nintendo trong một tựa game đối kháng đa người chơi hỗn loạn và vui nhộn.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9qxLmv4oUvHPnfeSuN8cJdQ9fmNY4JexCvTt-j80kzQ&s=10",
      isFeatured: false,
      isNewGame: false,
    },
  ];

  const games = await Game.create(gameDefs);
  const gameByName = Object.fromEntries(games.map((g) => [g.gameName, g]));

  const marvel = gameByName["MARVEL VS. CAPCOM: INFINITE"];
  const elden = gameByName["Elden Ring"];
  const zelda = gameByName["The Legend of Zelda: Tears of the Kingdom"];
  const witcher3 = gameByName["The Witcher 3: Wild Hunt"];
  const baldursGate3 = gameByName["Baldur's Gate 3"];
  const hogwarts = gameByName["Hogwarts Legacy"];

  // --- Users ---
  // "vy" keeps the exact bcrypt hash from your sample so the original password
  // still works. The others are freshly hashed.
  const salt = 10;
  const [vy, minh, admin] = await User.create([
    {
      userName: "vy",
      email: "vy@gmail.com",
      password:
        "$2b$10$4cymffawLwFxbS2pGVL7YOjAkg6852Y8VKrYidGGQRQxKt2qIXLAG",
      isAdmin: false,
    },
    {
      userName: "minh",
      email: "minh@gmail.com",
      password: await bcrypt.hash("minh123", salt),
      isAdmin: false,
    },
    {
      userName: "admin",
      email: "admin@gamestore.com",
      password: await bcrypt.hash("admin123", salt),
      isAdmin: true,
    },
  ]);

  // --- Carts ---
  await Cart.create([
    {
      userId: vy._id,
      items: [
        { gameId: marvel._id, quantity: 1 },
        { gameId: elden._id, quantity: 2 },
      ],
    },
    {
      userId: minh._id,
      items: [
        { gameId: witcher3._id, quantity: 1 },
        { gameId: baldursGate3._id, quantity: 1 },
        { gameId: hogwarts._id, quantity: 1 },
      ],
    },
  ]);

  // --- Orders ---
  const buildOrder = (userId, items, status) => {
    const totalAmount = items.reduce(
      (sum, i) => sum + finalPrice(i.price, i.discount) * i.quantity,
      0
    );
    return { userId, items, status, totalAmount };
  };

  const vyOrderItems = [
    {
      gameId: marvel._id,
      gameName: marvel.gameName,
      price: marvel.price,
      discount: marvel.discount,
      quantity: 1,
    },
    {
      gameId: zelda._id,
      gameName: zelda.gameName,
      price: zelda.price,
      discount: zelda.discount,
      quantity: 1,
    },
  ];

  const minhOrderItems = [
    {
      gameId: witcher3._id,
      gameName: witcher3.gameName,
      price: witcher3.price,
      discount: witcher3.discount,
      quantity: 1,
    },
    {
      gameId: hogwarts._id,
      gameName: hogwarts.gameName,
      price: hogwarts.price,
      discount: hogwarts.discount,
      quantity: 2,
    },
  ];

  await Order.create([
    buildOrder(vy._id, vyOrderItems, 0),
    buildOrder(minh._id, minhOrderItems, 1),
  ]);

  // --- Summary ---
  const counts = {
    platforms: await Platform.countDocuments(),
    genres: await Genre.countDocuments(),
    games: await Game.countDocuments(),
    users: await User.countDocuments(),
    carts: await Cart.countDocuments(),
    orders: await Order.countDocuments(),
  };
  console.log("Seeded:", counts);

  await mongoose.disconnect();
};

run().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
