import {
  PackageSearch,
  CircleHelp,
  Sparkles,
  Headset,
  Package,
  Truck,
  CreditCard,
  RefreshCcw,
  User,
  ShieldCheck,
} from "lucide-react";

// ===============================
// Quick Actions
// ===============================

export const quickActions = [
  {
    id: 1,
    title: "Track Order",
    description: "Track your order using your Order ID.",
    icon: PackageSearch,
    target: "track-order",
    color: "#EC4899",
  },
  {
    id: 2,
    title: "FAQs",
    description: "Browse frequently asked questions.",
    icon: CircleHelp,
    target: "faq",
    color: "#8B5CF6",
  },
  {
    id: 3,
    title: "Product Help",
    description: "Need help choosing the right product?",
    icon: Sparkles,
    target: "help-topics",
    color: "#F59E0B",
  },
  {
    id: 4,
    title: "Contact Support",
    description: "Reach our support team quickly.",
    icon: Headset,
    target: "contact-support",
    color: "#14B8A6",
  },
];

// ===============================
// Help Topics
// ===============================

export const helpTopics = [
  {
    id: 1,
    title: "Orders & Tracking",
    description: "Track, update and manage your orders.",
    icon: Package,
  },
  {
    id: 2,
    title: "Shipping",
    description: "Delivery timelines and shipping details.",
    icon: Truck,
  },
  {
    id: 3,
    title: "Payments",
    description: "Payment methods and billing support.",
    icon: CreditCard,
  },
  {
    id: 4,
    title: "Returns & Refunds",
    description: "Easy returns and refund information.",
    icon: RefreshCcw,
  },
  {
    id: 5,
    title: "Account",
    description: "Login, password and profile settings.",
    icon: User,
  },
  {
    id: 6,
    title: "Product Help",
    description: "Find skincare products for your skin.",
    icon: ShieldCheck,
  },
];

// ===============================
// FAQs
// ===============================

export const faqs = [
  {
    id: 1,
    question: "How can I track my order?",
    answer:
      "Enter your Order ID in the Track Order section to check your latest order status.",
  },
  {
    id: 2,
    question: "How long does shipping take?",
    answer:
      "Orders are usually delivered within 3–7 business days.",
  },
  {
    id: 3,
    question: "Can I cancel my order?",
    answer:
      "Yes, you can cancel your order before it is shipped.",
  },
  {
    id: 4,
    question: "How do I request a refund?",
    answer:
      "Refunds are processed after the returned product passes quality inspection.",
  },
  {
    id: 5,
    question: "Which skincare products are suitable for oily skin?",
    answer:
      "You can explore our Product Help section or contact our support team for recommendations.",
  },
  {
    id: 6,
    question: "How can I contact Pearl Promise?",
    answer:
      "You can reach us via phone or email listed in the Contact Support section.",
  },
];

// ===============================
// Contact Information
// ===============================

export const supportInfo = {
  phone: "+91 98765 43210",
  email: "support@Pearl Promise.com",
  hours: "Mon - Sat • 9:00 AM - 7:00 PM",
};