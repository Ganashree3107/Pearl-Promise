import PageHeader from "../../components/about/PageHeader";
import Story from "../../components/about/Story";
import WhyChooseUs from "../../components/about/WhyChooseUs";
import Mission from "../../components/about/Mission";
import Values from "../../components/about/Values";
import Statistics from "../../components/about/Statistics";
import CTA from "../../components/about/CTA";
import WaveDivider from "../../components/common/WaveDivider";

export default function About() {
  return (
    <>
      <PageHeader />
        <WaveDivider fill="#FFF5F8"/>
      <Story />
      <WaveDivider fill="#F8FAFC"/>
      <WhyChooseUs />
      <WaveDivider fill="#F8FAFC"/>
      <Mission />
      <WaveDivider fill="#FFF5F8"/>
      <Values />
      <WaveDivider fill="#F8FAFC"/>
      <Statistics />
      <WaveDivider fill="#EC4899"/>
      <CTA />
    </>
  );
}