import { Sparkles, Flame, BadgePlus } from "lucide-react";

const badgeStyles = {
  "Best Seller": {
    bg: "bg-pink-100",
    text: "text-pink-700",
    icon: <Sparkles size={14} />,
  },

  Trending: {
    bg: "bg-orange-100",
    text: "text-orange-700",
    icon: <Flame size={14} />,
  },

  New: {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    icon: <BadgePlus size={14} />,
  },
};

function ProductBadge({ badge }) {
  if (!badge) return null;

  const style = badgeStyles[badge];

  if (!style) return null;

  return (
    <div
      className={`absolute left-4 top-4 z-20 flex items-center gap-1 rounded-full ${style.bg} ${style.text} px-3 py-1 text-xs font-semibold shadow-sm`}
    >
      {style.icon}
      <span>{badge}</span>
    </div>
  );
}

export default ProductBadge;