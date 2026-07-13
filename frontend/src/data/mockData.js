// ============================================================
//  MOCK DATA — GameVault Recommendation System
//  Simulates: purchased history, viewed history, recommendations
// ============================================================

export const GENRES = [
  'Action', 'RPG', 'Adventure', 'Strategy', 'Horror',
  'Sports', 'Racing', 'Puzzle', 'Simulation', 'Fighting',
];

export const PLATFORMS = ['PC', 'PS5', 'Xbox', 'Nintendo Switch'];

export const ALL_GAMES = [
  {
    id: 1,
    title: 'Elden Ring',
    coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.webp',
    bannerUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/ss_e73f8e560b4c274637e91d1a40c71a4ea5de93cd.jpg',
    genre: ['RPG', 'Action'],
    platforms: ['PC', 'PS5', 'Xbox'],
    price: 1499000,
    originalPrice: 1999000,
    discountPercent: 25,
    rating: 9.5,
    reviewCount: 24800,
    isNew: false,
    inStock: true,
    description: 'Elden Ring là tựa game nhập vai hành động thế giới mở được phát triển bởi FromSoftware. Khám phá vùng đất Between trong cuộc hành trình sử thi.',
    tags: ['Souls-like', 'Open World', 'Dark Fantasy'],
    releaseYear: 2022,
  },
  {
    id: 2,
    title: 'Cyberpunk 2077',
    coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4wi5.webp',
    bannerUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/ss_872522b978fdb73562cae82df9c3b95a42f60abc.jpg',
    genre: ['RPG', 'Action'],
    platforms: ['PC', 'PS5', 'Xbox'],
    price: 999000,
    originalPrice: 1499000,
    discountPercent: 33,
    rating: 8.7,
    reviewCount: 18200,
    isNew: false,
    inStock: true,
    description: 'Cyberpunk 2077 là RPG thế giới mở đặt trong Night City — một thành phố tương lai nơi quyền lực, phong cách và cải tổ cơ thể con người được tôn thờ.',
    tags: ['Cyberpunk', 'Open World', 'Futuristic'],
    releaseYear: 2020,
  },
  {
    id: 3,
    title: 'God of War Ragnarök',
    coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5s5v.webp',
    bannerUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2322010/ss_8a5a5e5ea1e2b01cdcf4f0ccfbd5ae8eab4c21d5.jpg',
    genre: ['Action', 'Adventure'],
    platforms: ['PC', 'PS5'],
    price: 1299000,
    originalPrice: null,
    discountPercent: null,
    rating: 9.3,
    reviewCount: 31500,
    isNew: true,
    inStock: true,
    description: 'Kratos và Atreus phải đối mặt với sự khởi đầu của Ragnarök trong cuộc hành trình xuyên qua chín thế giới thần thoại Bắc Âu.',
    tags: ['Norse Mythology', 'Action-Adventure', 'Story-Rich'],
    releaseYear: 2022,
  },
  {
    id: 4,
    title: 'The Witcher 3: Wild Hunt',
    coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.webp',
    bannerUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/ss_8cc4df1e8c46e2d36794ec48b61bab43fef31da2.jpg',
    genre: ['RPG', 'Adventure'],
    platforms: ['PC', 'PS5', 'Xbox', 'Nintendo Switch'],
    price: 299000,
    originalPrice: 799000,
    discountPercent: 63,
    rating: 9.7,
    reviewCount: 87600,
    isNew: false,
    inStock: true,
    description: 'The Witcher 3 là RPG thế giới mở đồ sộ với cốt truyện sâu sắc. Đóng vai thợ săn quái vật Geralt trong thế giới fantasy dark tuyệt đẹp.',
    tags: ['Open World', 'RPG', 'Fantasy'],
    releaseYear: 2015,
  },
  {
    id: 5,
    title: 'Hollow Knight',
    coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co3wk8.webp',
    bannerUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/367520/ss_a2fc7e5ed47bc3e4b8a76a70ef5f35b3e1c5b5ef.jpg',
    genre: ['Action', 'Adventure', 'Puzzle'],
    platforms: ['PC', 'Nintendo Switch'],
    price: 149000,
    originalPrice: null,
    discountPercent: null,
    rating: 9.1,
    reviewCount: 54200,
    isNew: false,
    inStock: true,
    description: 'Hollow Knight là trò chơi hành động phiêu lưu Metroidvania với phong cách nghệ thuật đẹp mắt và thế giới ngầm đầy bí ẩn.',
    tags: ['Metroidvania', 'Platformer', 'Indie'],
    releaseYear: 2017,
  },
  {
    id: 6,
    title: 'Red Dead Redemption 2',
    coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1q1f.webp',
    bannerUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1174180/ss_958e7ef00e4b6ca00f01fa0f11f4f3b0e0a3b74d.jpg',
    genre: ['Action', 'Adventure'],
    platforms: ['PC', 'PS5', 'Xbox'],
    price: 799000,
    originalPrice: 1199000,
    discountPercent: 33,
    rating: 9.6,
    reviewCount: 43100,
    isNew: false,
    inStock: true,
    description: 'Red Dead Redemption 2 là sử thi về sự sụp đổ của thời Viễn Tây. Câu chuyện cảm động về tình bạn, lòng trung thành và sự cứu chuộc.',
    tags: ['Open World', 'Western', 'Story-Rich'],
    releaseYear: 2019,
  },
  {
    id: 7,
    title: 'Hades II',
    coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co7obx.webp',
    bannerUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1145360/ss_3bc2cb879fad01ed23e1b8a0de2de2a93ad3e4c7.jpg',
    genre: ['Action', 'RPG'],
    platforms: ['PC'],
    price: 329000,
    originalPrice: null,
    discountPercent: null,
    rating: 9.2,
    reviewCount: 12800,
    isNew: true,
    inStock: true,
    description: 'Hades II là phần tiếp theo của roguelike đoạt giải thưởng, mở rộng thế giới thần thoại Hy Lạp với nhân vật mới và nội dung phong phú hơn.',
    tags: ['Roguelike', 'Mythology', 'Action'],
    releaseYear: 2024,
  },
  {
    id: 8,
    title: 'Baldur\'s Gate 3',
    coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co6lyj.webp',
    bannerUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1086940/ss_c4a0de7a3dc3f66b8bde1a5c0f4e2b1b4c1b98e4.jpg',
    genre: ['RPG', 'Strategy'],
    platforms: ['PC', 'PS5'],
    price: 1599000,
    originalPrice: null,
    discountPercent: null,
    rating: 9.8,
    reviewCount: 38900,
    isNew: true,
    inStock: true,
    description: 'Baldur\'s Gate 3 là RPG chiến thuật đỉnh cao dựa trên D&D 5e với tự do lựa chọn khổng lồ và cốt truyện phân nhánh sâu.',
    tags: ['D&D', 'Turn-Based', 'Fantasy'],
    releaseYear: 2023,
  },
  {
    id: 9,
    title: 'Sekiro: Shadows Die Twice',
    coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1mha.webp',
    bannerUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/814380/ss_c28bd2c8b94e7cba5d06c91d09f6b71b1b3b4fc6.jpg',
    genre: ['Action', 'Adventure'],
    platforms: ['PC', 'PS5', 'Xbox'],
    price: 899000,
    originalPrice: 1199000,
    discountPercent: 25,
    rating: 9.0,
    reviewCount: 19600,
    isNew: false,
    inStock: true,
    description: 'Sekiro là game hành động phong cách ninja Nhật Bản. Hệ thống chiến đấu độc đáo tập trung vào phản đòn và tư thế.',
    tags: ['Feudal Japan', 'Ninja', 'Souls-like'],
    releaseYear: 2019,
  },
  {
    id: 10,
    title: 'Starfield',
    coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co6mqs.webp',
    bannerUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1716740/ss_1e7a98ba88b9db7aba5b5f7d1b7bdd67a8a2d5f0.jpg',
    genre: ['RPG', 'Adventure'],
    platforms: ['PC', 'Xbox'],
    price: 1299000,
    originalPrice: 1699000,
    discountPercent: 24,
    rating: 7.8,
    reviewCount: 28400,
    isNew: false,
    inStock: true,
    description: 'Starfield là RPG không gian đồ sộ của Bethesda. Khám phá hàng trăm hành tinh trong vũ trụ rộng lớn.',
    tags: ['Space', 'Open World', 'Sci-Fi'],
    releaseYear: 2023,
  },
  {
    id: 11,
    title: 'Monster Hunter: World',
    coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1tmu.webp',
    bannerUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/582010/ss_a8f2c08ef5d4f1dc5e26a2bef13f5a9bf4af2d2f.jpg',
    genre: ['Action', 'RPG'],
    platforms: ['PC', 'PS5', 'Xbox'],
    price: 499000,
    originalPrice: 999000,
    discountPercent: 50,
    rating: 9.0,
    reviewCount: 47300,
    isNew: false,
    inStock: true,
    description: 'Monster Hunter: World là game săn quái vật với thế giới sống động và hệ thống craft vũ khí cực kỳ sâu.',
    tags: ['Co-op', 'Hunting', 'Action-RPG'],
    releaseYear: 2018,
  },
  {
    id: 12,
    title: 'Alan Wake 2',
    coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co7t33.webp',
    bannerUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1574140/ss_2e4e1b2e2b5a0f6c5c1f05a4e3b7c4b2f0a3a1d5.jpg',
    genre: ['Horror', 'Action'],
    platforms: ['PC', 'PS5', 'Xbox'],
    price: 1099000,
    originalPrice: null,
    discountPercent: null,
    rating: 8.9,
    reviewCount: 9800,
    isNew: true,
    inStock: true,
    description: 'Alan Wake 2 là game kinh dị tâm lý đẳng cấp với hình ảnh đỉnh cao và gameplay sáng tạo.',
    tags: ['Horror', 'Thriller', 'Story-Rich'],
    releaseYear: 2023,
  },
  {
    id: 13,
    title: 'Persona 5 Royal',
    coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co3dkw.webp',
    bannerUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1687950/ss_6b0b5a5c3e5a5c5a5a5c5c5c5c5c5c5c5c5c5c5.jpg',
    genre: ['RPG', 'Strategy'],
    platforms: ['PC', 'PS5', 'Xbox', 'Nintendo Switch'],
    price: 799000,
    originalPrice: 1199000,
    discountPercent: 33,
    rating: 9.4,
    reviewCount: 32100,
    isNew: false,
    inStock: true,
    description: 'Persona 5 Royal là JRPG nhập vai đầy phong cách về những tên trộm phantom chiến đấu chống lại sự tham nhũng xã hội.',
    tags: ['JRPG', 'Turn-Based', 'Social Simulation'],
    releaseYear: 2019,
  },
  {
    id: 14,
    title: 'Resident Evil 4 Remake',
    coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co6vul.webp',
    bannerUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2050650/ss_5c5b5a5c5e5a5c5a5a5c5c5c5c5c5c5c5c5c5c5.jpg',
    genre: ['Horror', 'Action'],
    platforms: ['PC', 'PS5', 'Xbox'],
    price: 1099000,
    originalPrice: 1499000,
    discountPercent: 27,
    rating: 9.3,
    reviewCount: 21700,
    isNew: false,
    inStock: true,
    description: 'Resident Evil 4 Remake làm mới hoàn toàn kiệt tác kinh dị hành động cổ điển với đồ họa hiện đại và gameplay nâng cấp.',
    tags: ['Survival Horror', 'Action', 'Remake'],
    releaseYear: 2023,
  },
  {
    id: 15,
    title: 'Lies of P',
    coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co76cr.webp',
    bannerUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1627720/ss_7c5b5a5c5e5a5c5a5a5c5c5c5c5c5c5c5c5c5c5.jpg',
    genre: ['Action', 'RPG'],
    platforms: ['PC', 'PS5', 'Xbox'],
    price: 699000,
    originalPrice: 999000,
    discountPercent: 30,
    rating: 8.5,
    reviewCount: 11200,
    isNew: false,
    inStock: true,
    description: 'Lies of P là Souls-like lấy cảm hứng từ câu chuyện Pinocchio, đặt trong thành phố Belle Époque tối tăm đầy robot phản loạn.',
    tags: ['Souls-like', 'Dark Fantasy', 'Victorian'],
    releaseYear: 2023,
  },
  {
    id: 16,
    title: 'Final Fantasy XVI',
    coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co6qsc.webp',
    bannerUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2515020/ss_8c5b5a5c5e5a5c5a5a5c5c5c5c5c5c5c5c5c5c5.jpg',
    genre: ['Action', 'RPG'],
    platforms: ['PC', 'PS5'],
    price: 1299000,
    originalPrice: 1699000,
    discountPercent: 24,
    rating: 8.7,
    reviewCount: 16400,
    isNew: true,
    inStock: true,
    description: 'Final Fantasy XVI là bước ngoặt của series với gameplay action sôi động và cốt truyện trưởng thành, tối tăm.',
    tags: ['JRPG', 'Action', 'Fantasy'],
    releaseYear: 2023,
  },
  {
    id: 17,
    title: 'Diablo IV',
    coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co6cd7.webp',
    bannerUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2344520/ss_9c5b5a5c5e5a5c5a5a5c5c5c5c5c5c5c5c5c5c5.jpg',
    genre: ['Action', 'RPG'],
    platforms: ['PC', 'PS5', 'Xbox'],
    price: 1199000,
    originalPrice: 1599000,
    discountPercent: 25,
    rating: 8.3,
    reviewCount: 29800,
    isNew: false,
    inStock: true,
    description: 'Diablo IV trở lại với tone tối tăm, thế giới mở và hệ thống loot phong phú trong cuộc chiến chống quỷ dữ.',
    tags: ['Hack and Slash', 'Co-op', 'Dark Fantasy'],
    releaseYear: 2023,
  },
  {
    id: 18,
    title: 'Stardew Valley',
    coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2eh7.webp',
    bannerUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/413150/ss_ac5b5a5c5e5a5c5a5a5c5c5c5c5c5c5c5c5c5c5.jpg',
    genre: ['Simulation', 'RPG'],
    platforms: ['PC', 'PS5', 'Xbox', 'Nintendo Switch'],
    price: 149000,
    originalPrice: null,
    discountPercent: null,
    rating: 9.5,
    reviewCount: 71200,
    isNew: false,
    inStock: true,
    description: 'Stardew Valley là game nông trại indie charm tuyệt vời, nơi bạn xây dựng cuộc sống ở vùng quê thanh bình.',
    tags: ['Farming', 'Indie', 'Cozy'],
    releaseYear: 2016,
  },
  {
    id: 19,
    title: 'Dave the Diver',
    coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co7b5v.webp',
    bannerUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1868140/ss_bc5b5a5c5e5a5c5a5a5c5c5c5c5c5c5c5c5c5c5.jpg',
    genre: ['Adventure', 'Simulation'],
    platforms: ['PC', 'Nintendo Switch'],
    price: 299000,
    originalPrice: null,
    discountPercent: null,
    rating: 9.0,
    reviewCount: 18900,
    isNew: false,
    inStock: true,
    description: 'Dave the Diver là game phiêu lưu lặn biển kết hợp quản lý nhà hàng sushi, đầy sự sáng tạo và bất ngờ.',
    tags: ['Indie', 'Adventure', 'Casual'],
    releaseYear: 2023,
  },
  {
    id: 20,
    title: 'Palworld',
    coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co7jnk.webp',
    bannerUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1623730/ss_cc5b5a5c5e5a5c5a5a5c5c5c5c5c5c5c5c5c5c5.jpg',
    genre: ['Action', 'Simulation'],
    platforms: ['PC', 'Xbox'],
    price: 499000,
    originalPrice: null,
    discountPercent: null,
    rating: 8.1,
    reviewCount: 65400,
    isNew: true,
    inStock: true,
    description: 'Palworld là game sinh tồn thế giới mở nơi bạn bắt và chiến đấu cùng các sinh vật Pal trong thế giới nguy hiểm.',
    tags: ['Survival', 'Open World', 'Co-op'],
    releaseYear: 2024,
  },
];

// ============================================================
//  USER MOCK DATA — simulates logged-in user state
// ============================================================

export const MOCK_USER = {
  id: 'usr_001',
  name: 'Minh Khôi',
  email: 'minhkhoi@example.com',
  avatar: null,
  joinedAt: '2024-01-15',
};

// Games the user has PURCHASED (basis for recommendations)
export const PURCHASED_GAME_IDS = [1, 3, 9]; // Elden Ring, God of War, Sekiro
export const INITIAL_PURCHASED_GAME_IDS = [1, 3, 9];

// Games the user has VIEWED recently (also informs recommendations)
export const VIEWED_GAME_IDS = [2, 7, 15, 8, 5]; // Cyberpunk, Hades II, Lies of P, BG3, Hollow Knight
export const INITIAL_VIEWED_GAME_IDS = [2, 7, 15, 8, 5];

export const PURCHASE_HISTORY = [
  { gameId: 9, purchasedAt: '2024-03-18', price: 899000 },
  { gameId: 3, purchasedAt: '2024-05-22', price: 1299000 },
  { gameId: 1, purchasedAt: '2024-11-07', price: 1499000 },
];
export const INITIAL_PURCHASE_HISTORY = [
  { gameId: 9, purchasedAt: '2024-03-18', price: 899000 },
  { gameId: 3, purchasedAt: '2024-05-22', price: 1299000 },
  { gameId: 1, purchasedAt: '2024-11-07', price: 1499000 },
];

export const VIEW_HISTORY = [
  { gameId: 5,  viewedAt: '2026-07-10T18:30:00' },
  { gameId: 8,  viewedAt: '2026-07-10T19:12:00' },
  { gameId: 15, viewedAt: '2026-07-10T20:45:00' },
  { gameId: 7,  viewedAt: '2026-07-11T08:20:00' },
  { gameId: 2,  viewedAt: '2026-07-11T09:00:00' },
];
export const INITIAL_VIEW_HISTORY = [
  { gameId: 5,  viewedAt: '2026-07-10T18:30:00' },
  { gameId: 8,  viewedAt: '2026-07-10T19:12:00' },
  { gameId: 15, viewedAt: '2026-07-10T20:45:00' },
  { gameId: 7,  viewedAt: '2026-07-11T08:20:00' },
  { gameId: 2,  viewedAt: '2026-07-11T09:00:00' },
];

// ============================================================
//  RECOMMENDATION ENGINE (client-side mock)
//  Real logic: backend calls CF/CBF model
// ============================================================

export function getRecommendations(purchasedIds, viewedIds, count = 8) {
  const purchased = ALL_GAMES.filter(g => purchasedIds.includes(g.id));
  const viewed    = ALL_GAMES.filter(g => viewedIds.includes(g.id));

  // Collect preferred genres from history
  const genreScore = {};
  purchased.forEach(g => g.genre.forEach(gen => {
    genreScore[gen] = (genreScore[gen] || 0) + 2; // purchased weights more
  }));
  viewed.forEach(g => g.genre.forEach(gen => {
    genreScore[gen] = (genreScore[gen] || 0) + 1;
  }));

  const excludeIds = new Set([...purchasedIds, ...viewedIds]);

  return ALL_GAMES
    .filter(g => !excludeIds.has(g.id))
    .map(g => ({
      ...g,
      _score: g.genre.reduce((acc, gen) => acc + (genreScore[gen] || 0), 0),
    }))
    .sort((a, b) => b._score - a._score || b.rating - a.rating)
    .slice(0, count);
}

export const RECOMMENDED_GAMES = getRecommendations(PURCHASED_GAME_IDS, VIEWED_GAME_IDS, 8);

// Top trending (by review count)
export const TRENDING_GAMES = [...ALL_GAMES]
  .sort((a, b) => b.reviewCount - a.reviewCount)
  .slice(0, 8);

// Featured game for hero banner
export const FEATURED_GAME = ALL_GAMES.find(g => g.id === 8); // Baldur's Gate 3

// Helper getters
export function getGameById(id) {
  return ALL_GAMES.find(g => g.id === Number(id)) || null;
}

export function getSimilarGames(game, count = 6) {
  if (!game) return [];
  return ALL_GAMES
    .filter(g => g.id !== game.id && g.genre.some(gen => game.genre.includes(gen)))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, count);
}

export function getPurchasedGames(history = PURCHASE_HISTORY) {
  return history.map(h => {
    const game = getGameById(h.gameId);
    if (!game) return null;
    return {
      ...game,
      purchasedAt: h.purchasedAt,
      pricePaid: h.price,
    };
  }).filter(Boolean);
}

export function getViewedGames(history = VIEW_HISTORY) {
  return history.map(h => {
    const game = getGameById(h.gameId);
    if (!game) return null;
    return {
      ...game,
      viewedAt: h.viewedAt,
    };
  }).filter(Boolean);
}
