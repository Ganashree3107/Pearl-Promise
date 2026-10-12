import PageHeader from "../../components/contact/PageHeader";
import QuickActions from "../../components/contact/QuickActions";
import HelpTopics from "../../components/contact/HelpTopics";
import FAQ from "../../components/contact/FAQ";
import ContactSupport from "../../components/contact/ContactSupport";

export default function Contact() {
  return (
    <main className="bg-white">

      <PageHeader />

      <QuickActions />

      <HelpTopics />

      <FAQ />

      <ContactSupport />

    </main>
  );
}