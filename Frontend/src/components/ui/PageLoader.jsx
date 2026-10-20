export default function PageLoader({ message = "Loading page..." }) {
  return (
    <div
      className="flex min-h-[40vh] items-center justify-center gap-3 text-pink-700"
      role="status"
      aria-live="polite"
    >
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-pink-200 border-t-pink-600" />
      <span>{message}</span>
    </div>
  );
}
