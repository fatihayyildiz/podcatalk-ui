import React from "react";
import { CheckIcon } from "@heroicons/react/24/solid";
import ButtonPrimary from "components/Button/ButtonPrimary";
import ButtonSecondary from "components/Button/ButtonSecondary";
import Heading2 from "components/Heading/Heading2";
import Layout from "components/Layout/layout";
import { useNavigate } from "react-router-dom";

export interface PricingItem {
  isPopular: boolean;
  name: string;
  pricing: string;
  desc: string;
  per: string;
  features: string[];
}

const pricings: PricingItem[] = [
  {
    isPopular: true,
    name: "Beta",
    pricing: "$0",
    per: "/∞",
    features: [
        "Podcast Creation with AI (Limited Podcasts to 2)",
        "Text based conversations with AI about your podcast (Limited to 1M tokens)",
        "Publish Podcasts to Spotify only",
        "Podcast Audio Generation with AI (Limited Audio to 1h)",
    ],
    desc: `You will be able to create 2 podcasts and 1h of audio generation with AI. As an early user, you will have access to the beta version of our platform and be able to provide feedback to help us improve the product. We will also provide you with a dedicated support channel to help you with any questions or issues you may have.`,
  },
  {
    isPopular: false,
    name: "Small Business",
    pricing: "$8",
    per: "/mo",
    features: [
      "Everything in Beta, in addition below",
      "Podcast Creation with AI (Limited Podcasts to 50)",
      "Text based conversations with AI about your podcast (Limited to 10M tokens)",
        "Podcast Audio Generation with AI (Limited Audio to 50h)",
      "Publish Podcasts to Spotify, Apple Podcasts, Google Podcasts, and more",
      "Premium Support",      
    ],
    desc: `You will be able to create 50 podcasts and 50h of audio generation with AI. This plan is under development and will be available soon. If you are interested in this plan, please sign up to platform and we will notify you when it becomes available.`,
  },
  {
    isPopular: false,
    name: "Enterprise",
    pricing: "Contact Us",
    per: "",
    features: [
      "Everything in Small Business, in addition below",
      "Podcast Creation with AI (Unlimited Podcasts)",
      "Text based conversations with AI about your podcast (Unlimited tokens)",
      "Podcast Audio Generation with AI (Unlimited Audio)",
      "Publish Podcasts to Spotify, Apple Podcasts, Google Podcasts, and more",
      "1:1 Support",
    ],
    desc: `Please contact us for more information about this plan. We will work with you closely if your needs are more complex and require a custom solution. `,
  },
];

const PagePricing = () => {
  const navigate = useNavigate();
  const renderPricingItem = (pricing: PricingItem, index: number) => {
    return (
      <div
        key={index}
        className={`h-full relative px-6 py-8 rounded-3xl border-2 flex flex-col overflow-hidden ${
          pricing.isPopular
            ? "border-primary-500"
            : "border-neutral-100 dark:border-neutral-700"
        }`}
      >
        {pricing.isPopular && (
          <span className="bg-primary-500 text-white px-3 py-1 tracking-widest text-xs absolute right-3 top-3 rounded-full z-10">
            POPULAR
          </span>
        )}
        <div className="mb-8">
          <h3 className="block text-sm uppercase tracking-widest text-neutral-6000 dark:text-neutral-300 mb-2 font-medium">
            {pricing.name}
          </h3>
          <h2 className="text-5xl leading-none flex items-center text-neutral-700 dark:text-neutral-300">
            <span>{pricing.pricing}</span>
            <span className="text-lg ml-1 font-normal text-neutral-500 dark:text-neutral-300">
              {pricing.per}
            </span>
          </h2>
        </div>
        <nav className="space-y-4 mb-8">
          {pricing.features.map((item, index) => (
            <li className="flex items-center" key={index}>
              <span className="mr-4 inline-flex flex-shrink-0 text-primary-6000">
                <CheckIcon className="w-5 h-5" aria-hidden="true" />
              </span>
              <span className="text-neutral-700 dark:text-neutral-300">
                {item}
              </span>
            </li>
          ))}
        </nav>
        <div className="flex flex-col mt-auto">
          {pricing.isPopular ? (
            <ButtonSecondary onClick={()=> navigate('/signup')}>
              <span className="font-medium">Submit</span>
            </ButtonSecondary>
          ) : (            
            <ButtonPrimary disabled>Coming Soon</ButtonPrimary>
          )}
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-3">
            {pricing.desc}
          </p>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <header className="text-center max-w-2xl mx-auto - mb-14 sm:mb-16 lg:mb-20">
        <Heading2 emoji="💎">Subscription</Heading2>
        <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
          Pricing to fit the needs of any company size.
        </span>
      </header>

      <section className="text-neutral-600 text-sm md:text-base overflow-hidden">
        <div className="grid lg:grid-cols-3 gap-5 xl:gap-8">
          {pricings.map(renderPricingItem)}
        </div>
      </section>
    </Layout>
  );
};

export default PagePricing;
