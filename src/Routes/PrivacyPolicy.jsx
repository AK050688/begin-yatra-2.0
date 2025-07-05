import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-6">
        Privacy Policy
      </h1>

      <p className="text-sm text-center text-gray-600 mb-10">
        At <strong>BeginYatra</strong>, we prioritize the privacy and security of our users' information,
        including both travelers and travel agents. This Privacy Policy outlines our practices regarding the collection,
        use, and protection of data provided to us through our website,&nbsp;
        <a
          href="https://www.beginyatra.com"
          className="text-blue-500 underline"
          target="_blank"
          rel="noreferrer"
        >
          www.beginyatra.com
        </a>{" "}
        and our services.
      </p>

      <section className="space-y-8 text-sm md:text-base leading-relaxed">
        {/* Section 1 */}
        <div>
          <h2 className="text-xl font-semibold text-blue-500 mb-2">
            1. Information We Collect
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              <strong>Personal Data:</strong> We collect personal data, such as name, email address,
              phone number, and company information (for travel agents), when you register for our services
              or purchase a subscription.
            </li>
            <li>
              <strong>Usage Data:</strong> We collect information about your interactions with our Website and Services,
              including IP addresses, browser types, and pages visited.
            </li>
            <li>
              <strong>Travel Preferences:</strong> For travelers, we may collect information about your travel preferences,
              such as destinations and interests, to facilitate better services.
            </li>
          </ul>
        </div>

        {/* Section 2 */}
        <div>
          <h2 className="text-xl font-semibold text-blue-500 mb-2">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              <strong>Service Provision:</strong> We use your information to provide our Services,
              including delivering travel leads to travel agents and connecting travelers with suitable travel options.
            </li>
            <li>
              <strong>Communication:</strong> We may contact you with updates, promotions, or important information related to our Services.
            </li>
            <li>
              <strong>Lead Generation:</strong> For travel agents, we use your information to deliver high-quality leads generated through our platform.
            </li>
          </ul>
        </div>

        {/* Section 3 */}
        <div>
          <h2 className="text-xl font-semibold text-blue-500 mb-2">3. Data Sharing</h2>
          <p className="text-gray-700">
            We may share your data with third-party service providers who assist us in providing our Services,
            such as lead delivery and customer support. We ensure these providers adhere to strict confidentiality and security standards.
          </p>
        </div>

        {/* Section 4 */}
        <div>
          <h2 className="text-xl font-semibold text-blue-500 mb-2">4. Data Security</h2>
          <p className="text-gray-700">
            We implement robust security measures to protect your data from unauthorized access, disclosure, or alteration.
          </p>
        </div>

        {/* Section 5 */}
        <div>
          <h2 className="text-xl font-semibold text-blue-500 mb-2">5. Your Rights</h2>
          <p className="text-gray-700">
            You have the right to access, modify, or delete your personal data. Please contact us at{" "}
            <a href="mailto:info@beginyatra.com" className="text-blue-600 underline">
              info@beginyatra.com
            </a>{" "}
            to exercise these rights.
          </p>
        </div>

        {/* Section 6 */}
        <div>
          <h2 className="text-xl font-semibold text-blue-500 mb-2">
            6. Changes to this Policy
          </h2>
          <p className="text-gray-700">
            We may update this Privacy Policy to reflect changes in our practices or legal requirements.
          </p>
        </div>

        {/* Section 7 */}
        <div>
          <h2 className="text-xl font-semibold text-blue-500 mb-2">7. Contact Us</h2>
          <p className="text-gray-700">
            If you have questions or concerns about this Privacy Policy, please contact us at:
          </p>
          <p className="mt-2 text-gray-700">
            <strong>BeginYatra</strong> <br />
            <a href="mailto:info@beginyatra.com" className="text-blue-600 underline">
              info@beginyatra.com
            </a>{" "}
            <br />
            Mandar Hill, Banka, Bihar, India 813104
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;