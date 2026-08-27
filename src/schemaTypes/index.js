
import customImage from "./objects/image";
import link from "./objects/link";
import ctaButton from "./objects/ctaButton";
import media from "./objects/media";
import headline from "./objects/headline";
import availability from "./objects/availability";
import contact from "./objects/contact";
import linkField from "./objects/linkField";
import richText from "./objects/richText";
import logoImage from "./objects/logoImage";
import svgItem from "./objects/svgItem";
import textItem from "./objects/textItem";

import project from "./documents/project";
import header from "./globals/header";
import footer from "./globals/footer";

import homePage from "./pages/HomePage/homePage";
import heroSection from "./pages/HomePage/sections/heroSection";
import cardsSection from "./pages/HomePage/sections/cardsSection";
import featuredWorkSection from "./pages/HomePage/sections/featuredWorkSection";
import animatedListSection from "./pages/HomePage/sections/animatedListSection";
import indexedGridSection from "./pages/HomePage/sections/indexedGridSection";
import accordionSection from "./pages/HomePage/sections/accordionSection";
import contentBlockSection from "./pages/HomePage/sections/contentBlockSection";

// --- About page ---
import aboutPage from "./pages/AboutPage/aboutPage";
import aboutHero from "./pages/AboutPage/sections/aboutHero";
import storySection from "./pages/AboutPage/sections/storySection";

// --- Work page ---
import workHero from "./pages/WorkPage/workHero";
import workSliderSection from "./pages/WorkPage/workSliderSection";
import mediaSection from "./projects/mediaSection";

// --- Pricing page ---
import pricingPage from "./pages/PricingPage/pricingPage";
import pricingHero from "./pages/PricingPage/sections/pricingHero";
import logoSection from "./pages/PricingPage/sections/logoSection";

// --- Contact page ---
import contactPage from "./pages/ContactPage/contactPage";
import contactHero from "./pages/ContactPage/sections/contactHero";

export const schemaTypes = [
  // objects
  customImage,
  link,
  ctaButton,
  media,
  headline,
  availability,
  contact,
  linkField,
  richText,
  logoImage,
  svgItem,
  textItem,

  // site-wide singletons
  project,
  header,
  footer,

  // home page
  homePage,
  heroSection,
  cardsSection,
  featuredWorkSection,
  animatedListSection,
  indexedGridSection,
  accordionSection,
  contentBlockSection,

  // about page
  aboutPage,
  aboutHero,
  storySection,

  // work page
  workHero,
  workSliderSection,
  mediaSection,

  // pricing page
  pricingPage,
  pricingHero,
  logoSection,

  // contact page
  contactPage,
  contactHero,
];
