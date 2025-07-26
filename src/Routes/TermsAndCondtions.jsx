import React from "react";
import BackgroundImg from "../components/BackgroundImg";

const TermsAndConditions = () => {
  const terms = [
    {
      title: "1. Definitions",
      content: [
        {
          type: "li",
          text: (
            <>
              <strong>Traveler:</strong> refers to an individual or group
              seeking travel services.
            </>
          ),
        },
        {
          type: "li",
          text: (
            <>
              <strong>Travel Agent:</strong> refers to a business or individual
              providing travel services.
            </>
          ),
        },
        {
          type: "li",
          text: (
            <>
              <strong>Subscription:</strong> refers to the payment plan chosen
              by Travel Agents to access our leads.
            </>
          ),
        },
      ],
    },
    {
      title: "2. Use of Services",
      content: [
        {
          type: "li",
          text: (
            <>
              <strong>Traveler:</strong>By using our Website, you agree to
              provide accurate information and comply with these Terms.
            </>
          ),
        },
        {
          type: "li",
          text: (
            <>
              <strong>Travel Agents:</strong> By purchasing a subscription, you
              agree to use our leads for legitimate business purposes and comply
              with these Terms.
            </>
          ),
        },
      ],
    },
    {
      title: "3. Subscription and Payment",
      content: [
        {
          type: "li",
          text: (
            <>
              <strong>Travel Agents:</strong> Subscriptions are non-refundable
              and non-transferable. Payment terms are outlined during the
              purchase process.
            </>
          ),
        },
        {
          type: "li",
          text: (
            <>
              <strong>Renewal:</strong> - Subscriptions will automatically renew
              unless canceled prior to the end of the subscription period.
            </>
          ),
        },
      ],
    },

    {
      title: "4. Lead Generation and Delivery",
      content: [
        {
          type: "li",
          text: (
            <>
              <strong>Quality:</strong> : We strive to provide high-quality
              leads, but cannot guarantee conversion or accuracy.
            </>
          ),
        },
        {
          type: "li",
          text: (
            <>
              <strong>Delivery: </strong> Leads will be delivered through our
              platform or via email/WhatsApp as chosen during subscription
              purchase.
            </>
          ),
        },
      ],
    },
    {
      title: "5. Replacement Policy ",
      content: [
        {
          type: "p",
          text: " We offer a replacement policy for leads that do not meet your expectations.",
        },
        {
          type: "li",
          text: (
            <>
              <strong>Condition:</strong> : To be eligible for replacement,
              Travel Agents must highlight the leads on the same day they are
              provided or purchased.
            </>
          ),
        },
        {
          type: "li",
          text: (
            <>
              <strong>Process: </strong> Please contact our support team with
              details of the issues, and we will provide replacement leads
              subject to verification.
            </>
          ),
        },
        {
          type: "li",
          text: (
            <>
              <strong>Post-Plan Expiration </strong> We provide replacement
              leads after plan expiration at our discretion.
            </>
          ),
        },
      ],
    },
    {
      title: "6. Travel Agent Responsibilities",
      content: [
        {
          type: "li",
          text: (
            <>
              <strong>Respect Travelers:</strong> Travel Agents must treat
              travelers with respect and professionalism, providing best rates,
              services, and hospitality.
            </>
          ),
        },
        {
          type: "li",
          text: (
            <>
              <strong>No Argument: </strong> Travel Agents must not engage in
              arguments with travelers.
            </>
          ),
        },
        {
          type: "li",
          text: (
            <>
              <strong>Accurate Information: </strong> Travel Agents must provide
              accurate and transparent information to travelers.
            </>
          ),
        },
        {
          type: "li",
          text: (
            <>
              <strong>Customer Privacy:</strong> Travel Agents must respect
              customers' privacy and data.
            </>
          ),
        },
      ],
    },
    {
      title: "7. Lead Confidentiality",
      content: [
        {
          type: "p",
          text: "Travel Agents have no right to share or distribute our leads to any third party or other travel agency.",
        },
      ],
    },
    {
      title: "8. Non-Interference in Bookings",
      content: [
        {
          type: "p",
          text: "We act solely as a lead generation platform and do not interfere in any bookings, transactions, or interactions between Travelers and Travel Agents.",
        },
        {
          type: "p",
          text: "Both parties are responsible for their own agreements, terms, and conditions.",
        },
      ],
    },
    {
      title: "9. Lead Modification or Cancellation",
      content: [
        {
          type: "p",
          text: "BeginYatra reserves the right to modify or cancel leads due to unforeseen circumstances.",
        },
      ],
    },
    {
      title: "10. Intellectual Property",
      content: [
        {
          type: "p",
          text: "Our Website and Services are protected by intellectual property laws. You agree not to reproduce, modify, or distribute our content without prior written consent.",
        },
      ],
    },
    {
      title: "11. Liability",
      content: [
        {
          type: "p",
          text: "We are not liable for any losses or damages resulting from the use of our Services, including but not limited to lead quality or conversion.",
        },
      ],
    },
    {
      title: "12. Termination",
      content: [
        {
          type: "p",
          text: "We reserve the right to terminate or suspend your access to our Services for breach of these Terms or payment failure.",
        },
      ],
    },
    {
      title: "13. Changes to Terms",
      content: [
        {
          type: "p",
          text: "We may update these Terms to reflect changes in our practices or legal requirements.",
        },
      ],
    },
    {
      title: "14. Governing Law",
      content: [
        {
          type: "p",
          text: "- These Terms are governed by the laws of India. Any disputes will be resolved through arbitration in accordance with Indian law.",
        },
      ],
    },
    {
      title: "15. Contact Us",
      content: [
        {
          type: "p",
          text: "If you have questions or concerns about these Terms, please contact us at:",
        },
      ],
    },
  ];

  return (
    <>
      <BackgroundImg
        contact={{
          title: "Term & Conditions",
          dis: "Resume your travel journey — we're crafting your next adventure and delightful vacation with family & friends. Have a question or need inspiration? We're here to help.",
        }}
      />

      <div className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-6">
          Terms and Conditions
        </h1>

        <p className="text-sm text-center text-gray-500 mb-10">
          Welcome to BeginYatra! These Terms and Conditions govern your use of
          our website,{" "}
          <a
            href="https://www.beginyatra.com/"
            className="text-blue-500 underline"
          >
            www.beginyatra.com
          </a>{" "}
          and our services, including lead generation and delivery for travel
          agents and travel planning facilitation for travelers.
        </p>

        <section className="space-y-8">
          {terms.map((term, idx) => (
            <div key={idx}>
              <h2 className="text-xl font-semibold text-blue-500 mb-2">
                {term.title}
              </h2>
              <ul className="space-y-2 list-disc pl-5">
                {term.content.map((item, i) => {
                  if (item.type === "li") {
                    return (
                      <li key={i} className="text-gray-700 text-sm">
                        {item.text}
                      </li>
                    );
                  } else {
                    return (
                      <p key={i} className="text-gray-600 text-sm mb-2">
                        {item.text}
                      </p>
                    );
                  }
                })}
              </ul>
            </div>
          ))}
        </section>
        <p className="mt-10 text-gray-700">
          <strong>BeginYatra</strong> <br />
          <a
            href="mailto:info@beginyatra.com"
            className="text-blue-600 underline"
          >
            info@beginyatra.com
          </a>{", " + " "}
          <a
            href="mailto:service.beginyatra@gmail.com "
            className="text-blue-600 underline"
          >
            service.beginyatra@gmail.com 
          </a>{" "}
          <br />
          Mandar Hill, Banka, Bihar, India 813104
        </p>
      </div>
    </>
  );
};

export default TermsAndConditions;
