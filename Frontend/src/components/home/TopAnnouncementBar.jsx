//creating react component named TopAnnouncementBar
const announcements = [
  "✨ SUMMER GLOW SALE • FLAT 50% OFF SITEWIDE",
  "🚚 FREE SHIPPING ON ORDERS ABOVE ₹499",
  "🌿 100% CRUELTY FREE & DERMATOLOGIST TESTED",
  "💖 BUY 2 GET 1 FREE ON SELECTED PRODUCTS",
];

const TopAnnouncementBar = () => {
  return (
    <div className="w-full overflow-hidden bg-[#F8C8D8] border-b border-pink-200">
      <div className="marquee py-2">
        <div className="marquee-track">
          {[...announcements, ...announcements].map((text, index) => (
            <span
              key={index}
              className="mx-10 whitespace-nowrap text-xs md:text-sm font-medium tracking-wider text-white"
            >
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopAnnouncementBar;