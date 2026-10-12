import { motion } from "framer-motion";
import {
  Globe,
  Mail,
  Apple,
} from "lucide-react";
import toast from "react-hot-toast";

function SocialLogin({ onGoogleLogin }) {
  const providers = [
    {
      id: 1,
      name: "Continue with Google",
      icon: Globe,
    },
    {
      id: 2,
      name: "Continue with Apple",
      icon: Apple,
    },
    {
      id: 3,
      name: "Continue with Facebook",
      icon: Mail,
    },
  ];

  return (
    <div className="space-y-4">

      <div className="relative">

        <div className="absolute inset-0 flex items-center">

          <div className="w-full border-t border-pink-200"></div>

        </div>

        <div className="relative flex justify-center">

          <span className="bg-white px-4 text-sm text-gray-500">

            Or continue with

          </span>

        </div>

      </div>

      {providers.map((provider) => {

        const Icon = provider.icon;

        const handleClick = async () => {
          if (provider.name !== "Continue with Google") {
            toast.error("This sign-in provider is not configured.");
            return;
          }
          if (!import.meta.env.VITE_GOOGLE_CLIENT_ID) {
            toast.error("Google login is not configured yet.");
            return;
          }
          if (!window.google?.accounts?.id) {
            await loadGoogleIdentityScript();
          }
          window.google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: (response) => onGoogleLogin?.(response.credential),
          });
          window.google.accounts.id.prompt();
        };

        return (

          <motion.button
            key={provider.id}
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            type="button"
            onClick={handleClick}
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-pink-200 bg-white py-4 font-semibold text-gray-700 shadow-sm transition hover:border-pink-400 hover:bg-pink-50"
          >

            <Icon size={22} />

            {provider.name}

          </motion.button>

        );

      })}

    </div>
  );
}

function loadGoogleIdentityScript() {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector("script[data-google-identity]");
    if (existing) {
      existing.addEventListener("load", resolve, { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.dataset.googleIdentity = "true";
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export default SocialLogin;