import { LogOut } from "lucide-react";

export default function LogoutButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-6 py-4 font-semibold text-red-600 transition-all duration-300 hover:bg-red-100 hover:border-red-300"
    >
      <LogOut size={20} />
      Logout
    </button>
  );
}