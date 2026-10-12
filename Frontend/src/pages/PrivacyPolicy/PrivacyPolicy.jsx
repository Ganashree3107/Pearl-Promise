import PolicyHeader from "../../components/policy/PolicyHeader";
import PolicySection from "../../components/policy/PolicySection";

export default function PrivacyPolicy() {
  return (
    <main className="bg-rose-50">

      <PolicyHeader
        title="Privacy Policy"
        subtitle="Your privacy matters to us. Learn how Pearl Promise collects, uses, and protects your personal information."
      />

      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-16">

        <PolicySection title="Introduction">
          <p>
            Welcome to Pearl Promise. We value your trust and are committed to
            protecting your personal information. This Privacy Policy
            explains how we collect, use, and safeguard your data while
            you use our website and services.
          </p>
        </PolicySection>

        <PolicySection title="Information We Collect">
          <ul className="list-disc space-y-2 pl-6">
            <li>Name and contact details</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Shipping and billing address</li>
            <li>Order history</li>
            <li>Payment information (processed securely)</li>
            <li>Device and browser information</li>
          </ul>
        </PolicySection>

        <PolicySection title="How We Use Your Information">
          <ul className="list-disc space-y-2 pl-6">
            <li>Process and deliver your orders</li>
            <li>Provide customer support</li>
            <li>Improve your shopping experience</li>
            <li>Recommend relevant skincare products</li>
            <li>Send order updates and important notifications</li>
            <li>Maintain website security and prevent fraud</li>
          </ul>
        </PolicySection>

        <PolicySection title="Cookies">
          <p>
            Pearl Promise uses cookies and similar technologies to remember your
            preferences, improve website performance, analyze traffic, and
            provide a better shopping experience.
          </p>
        </PolicySection>

        <PolicySection title="Data Security">
          <p>
            We use appropriate technical and organizational security
            measures to protect your personal information. While we strive
            to secure your data, no online platform can guarantee complete
            security.
          </p>
        </PolicySection>

        <PolicySection title="Your Rights">
          <ul className="list-disc space-y-2 pl-6">
            <li>Access your personal information</li>
            <li>Update your profile details</li>
            <li>Request deletion of your account</li>
            <li>Opt out of marketing emails</li>
            <li>Request a copy of your stored data</li>
          </ul>
        </PolicySection>

        <PolicySection title="Third-Party Services">
          <p>
            Pearl Promise may work with trusted third-party providers for payment
            processing, shipping, analytics, authentication, and other
            essential services. These providers have their own privacy
            policies governing the use of your information.
          </p>
        </PolicySection>

        <PolicySection title="Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. Any
            changes will be posted on this page along with the updated
            revision date.
          </p>
        </PolicySection>

        <PolicySection title="Contact Us">
          <p>Email: support@Pearl Promise.com</p>
          <p>Phone: +91 XXXXX XXXXX</p>
        </PolicySection>

        <PolicySection title="Last Updated">
          <p>July 2026</p>
        </PolicySection>

      </div>

    </main>
  );
}