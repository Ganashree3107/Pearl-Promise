const ingredients = {
  "Vitamin C": {
    name: "Vitamin C",
    icon: "🍊",
    color: "#FFF3EA",
    description:
      "A powerful antioxidant that brightens skin, reduces pigmentation and boosts natural radiance.",
    benefits: [
      "Brightens Skin",
      "Fades Dark Spots",
      "Boosts Glow",
    ],
  },

  "Orange Extract": {
    name: "Orange Extract",
    icon: "🍊",
    color: "#FFF6EC",
    description:
      "Rich in Vitamin C and antioxidants to refresh and energize dull-looking skin.",
    benefits: [
      "Healthy Glow",
      "Refreshes Skin",
      "Antioxidant Care",
    ],
  },

  "Vitamin E": {
    name: "Vitamin E",
    icon: "✨",
    color: "#FFF8EF",
    description:
      "Protects the skin barrier while deeply nourishing and locking in moisture.",
    benefits: [
      "Deep Hydration",
      "Barrier Repair",
      "Soft Skin",
    ],
  },

  "Hyaluronic Acid": {
    name: "Hyaluronic Acid",
    icon: "💧",
    color: "#EAF8FF",
    description:
      "Delivers intense hydration to keep skin plump, smooth and healthy.",
    benefits: [
      "Deep Hydration",
      "Plumps Skin",
      "Smooth Finish",
    ],
  },

  "Aloe Vera": {
    name: "Aloe Vera",
    icon: "🌿",
    color: "#F1FFF4",
    description:
      "Naturally soothes, calms irritation and provides long-lasting hydration.",
    benefits: [
      "Soothes Skin",
      "Hydrates",
      "Reduces Redness",
    ],
  },

  "Niacinamide": {
    name: "Niacinamide",
    icon: "🌱",
    color: "#EEF8EC",
    description:
      "Balances oil production, minimizes pores and strengthens the skin barrier.",
    benefits: [
      "Oil Control",
      "Minimizes Pores",
      "Barrier Support",
    ],
  },

  "Green Tea": {
    name: "Green Tea",
    icon: "🍃",
    color: "#EEF8EC",
    description:
      "Packed with antioxidants that calm the skin and reduce excess oil.",
    benefits: [
      "Calms Skin",
      "Oil Control",
      "Antioxidant Care",
    ],
  },

  "Blueberry Extract": {
    name: "Blueberry Extract",
    icon: "🫐",
    color: "#F3EEFF",
    description:
      "Rich in antioxidants to nourish the skin and protect against environmental stress.",
    benefits: [
      "Healthy Glow",
      "Antioxidant Protection",
      "Nourishes Skin",
    ],
  },

  Ceramides: {
    name: "Ceramides",
    icon: "🧴",
    color: "#FFF8EF",
    description:
      "Essential lipids that repair the skin barrier and lock in moisture.",
    benefits: [
      "Barrier Repair",
      "Locks Moisture",
      "Healthy Skin",
    ],
  },

  Panthenol: {
    name: "Panthenol",
    icon: "💦",
    color: "#EAF8FF",
    description:
      "Also known as Pro-Vitamin B5, it deeply hydrates and softens the skin.",
    benefits: [
      "Hydration",
      "Soft Skin",
      "Skin Repair",
    ],
  },

  Allantoin: {
    name: "Allantoin",
    icon: "🌸",
    color: "#FFF5F8",
    description:
      "A soothing ingredient that helps calm irritation and improve skin texture.",
    benefits: [
      "Soothes Skin",
      "Smooth Texture",
      "Gentle Care",
    ],
  },

  Glycerin: {
    name: "Glycerin",
    icon: "💧",
    color: "#EAF8FF",
    description:
      "A moisture magnet that keeps skin hydrated and soft throughout the day.",
    benefits: [
      "Long-lasting Hydration",
      "Soft Skin",
      "Smooth Finish",
    ],
  },

  "Shea Butter": {
    name: "Shea Butter",
    icon: "🥥",
    color: "#FFF8EF",
    description:
      "Rich natural butter that deeply nourishes and restores dry skin.",
    benefits: [
      "Nourishes",
      "Repairs Dry Skin",
      "Soft Finish",
    ],
  },

  Squalane: {
    name: "Squalane",
    icon: "💧",
    color: "#EEF8FF",
    description:
      "A lightweight moisturizer that improves elasticity and prevents moisture loss.",
    benefits: [
      "Lightweight Hydration",
      "Improves Elasticity",
      "Smooth Skin",
    ],
  },

  Silica: {
    name: "Silica",
    icon: "⚪",
    color: "#F8F8F8",
    description:
      "Absorbs excess oil to provide a long-lasting matte finish.",
    benefits: [
      "Oil Control",
      "Matte Finish",
      "Smooth Texture",
    ],
  },

  "UV Filters": {
    name: "UV Filters",
    icon: "☀️",
    color: "#FFF9E8",
    description:
      "Advanced sun filters that protect skin from harmful UVA and UVB rays.",
    benefits: [
      "SPF Protection",
      "Prevents Sun Damage",
      "Daily Protection",
    ],
  },

  "Activated Charcoal": {
    name: "Activated Charcoal",
    icon: "⚫",
    color: "#F3F3F3",
    description:
      "Draws out impurities, dirt and excess oil for deeply cleansed skin.",
    benefits: [
      "Deep Cleansing",
      "Oil Control",
      "Purifies Skin",
    ],
  },

  "Tea Tree": {
    name: "Tea Tree",
    icon: "🌿",
    color: "#EEF8EC",
    description:
      "Known for its purifying properties to help reduce blemishes and excess oil.",
    benefits: [
      "Purifies Skin",
      "Controls Oil",
      "Fresh Feeling",
    ],
  },

  "Kaolin Clay": {
    name: "Kaolin Clay",
    icon: "🤍",
    color: "#F6F6F6",
    description:
      "A gentle clay that absorbs impurities while keeping skin soft.",
    benefits: [
      "Pore Cleansing",
      "Removes Impurities",
      "Soft Skin",
    ],
  },

  "Rose Extract": {
    name: "Rose Extract",
    icon: "🌹",
    color: "#FFF0F3",
    description:
      "Provides soothing hydration while giving lips a naturally healthy appearance.",
    benefits: [
      "Hydrates",
      "Soft Lips",
      "Natural Care",
    ],
  },

  "Cherry Extract": {
    name: "Cherry Extract",
    icon: "🍒",
    color: "#FFECEF",
    description:
      "Rich in antioxidants that nourish lips and provide vibrant color.",
    benefits: [
      "Healthy Lips",
      "Antioxidant Care",
      "Natural Glow",
    ],
  },

  "Berry Extract": {
    name: "Berry Extract",
    icon: "🍇",
    color: "#F7EEFF",
    description:
      "Loaded with antioxidants that keep lips soft, smooth and healthy.",
    benefits: [
      "Soft Lips",
      "Nourishes",
      "Healthy Shine",
    ],
  },

  "Jojoba Oil": {
    name: "Jojoba Oil",
    icon: "🪔",
    color: "#FFF9EF",
    description:
      "Lightweight botanical oil that deeply nourishes without feeling greasy.",
    benefits: [
      "Locks Moisture",
      "Smooth Lips",
      "Long-lasting Hydration",
    ],
  },
};

export default ingredients;