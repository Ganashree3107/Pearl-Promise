export default function WaveDivider({
  fill = "#ffffff",
  flip = false,
}) {
  return (
    <div
      className={`w-full overflow-hidden leading-none ${
        flip ? "rotate-180" : ""
      }`}
    >
      <svg
        viewBox="0 0 1440 120"
        xmlns="http://www.w3.org/2000/svg"
        className="block h-20 w-full"
        preserveAspectRatio="none"
      >
        <path
          fill={fill}
          d="M0,64L80,74.7C160,85,320,107,480,101.3C640,96,800,64,960,53.3C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
        />
      </svg>
    </div>
  );
}