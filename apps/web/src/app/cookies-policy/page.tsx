import Link from "next/link";

export const metadata = {
  title: "Cookies Policy - GTA6 Hub",
  description: "Cookies Policy for GTA6 Hub application",
};

export default function CookiesPolicy() {
  return (
    <div className="min-h-screen bg-[#0a0014] text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-pink-400 text-sm hover:text-pink-300 mb-4 inline-block">
            ← Back to GTA6 Hub
          </Link>
          <h1 className="text-4xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Cookies Policy
          </h1>
          <p className="text-gray-500 text-sm mt-2">Last updated: September 13, 2026</p>
        </div>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. What Are Cookies</h2>
            <p className="text-gray-400 text-sm">
              Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. How We Use Cookies</h2>
            <p className="text-gray-400 text-sm">
              GTA6 Hub uses cookies for the following purposes:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400 text-sm">
              <li><strong className="text-white">Essential Cookies:</strong> Required for the website to function properly. These include session cookies for basic functionality.</li>
              <li><strong className="text-white">Functional Cookies:</strong> Remember your preferences and settings (e.g., favorites, display preferences) to enhance your experience.</li>
              <li><strong className="text-white">Analytics Cookies:</strong> Help us understand how visitors interact with our website by collecting anonymous usage data.</li>
              <li><strong className="text-white">Advertising Cookies:</strong> Used by Google AdSense to serve relevant advertisements based on your browsing history and interests.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Third-Party Cookies</h2>
            <p className="text-gray-400 text-sm">
              Some cookies are placed by third-party services that appear on our pages. We use the following third-party services that may set cookies:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400 text-sm">
              <li><strong className="text-white">Google AdSense:</strong> Serves personalized advertisements. Google may use cookies to track your browsing activity across websites to provide relevant ads. You can opt out of personalized advertising at <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300">Google Ad Settings</a>.</li>
              <li><strong className="text-white">Google Analytics:</strong> Collects anonymous usage data to help us improve the service.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Types of Cookies We Use</h2>
            <div className="mt-2 space-y-3">
              <div className="bg-[#110022] rounded-lg p-4 border border-purple-500/10">
                <h3 className="text-white font-bold text-sm mb-1">Session Cookies</h3>
                <p className="text-gray-400 text-xs">These are temporary cookies that expire when you close your browser. They are used to maintain your session while browsing.</p>
              </div>
              <div className="bg-[#110022] rounded-lg p-4 border border-purple-500/10">
                <h3 className="text-white font-bold text-sm mb-1">Persistent Cookies</h3>
                <p className="text-gray-400 text-xs">These remain on your device until they expire or are deleted. They help us remember your preferences for future visits.</p>
              </div>
              <div className="bg-[#110022] rounded-lg p-4 border border-purple-500/10">
                <h3 className="text-white font-bold text-sm mb-1">Local Storage</h3>
                <p className="text-gray-400 text-xs">We use browser local storage to save your favorites and preferences locally on your device. This data is not sent to our servers unless you are authenticated.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Managing Cookies</h2>
            <p className="text-gray-400 text-sm">
              You can control and manage cookies in various ways:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400 text-sm">
              <li><strong className="text-white">Browser Settings:</strong> Most browsers allow you to block or delete cookies. Check your browser&apos;s help section for instructions.</li>
              <li><strong className="text-white">Opt-Out Links:</strong> You can opt out of Google&apos;s use of cookies by visiting Google&apos;s <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300">Ad Settings</a>.</li>
              <li><strong className="text-white">Network Advertising Initiative:</strong> Visit <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300">NAI</a> to opt out of cookies from participating advertising companies.</li>
            </ul>
            <p className="text-gray-400 text-sm mt-2">
              <strong className="text-white">Note:</strong> Disabling certain cookies may affect the functionality of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Your Rights (GDPR)</h2>
            <p className="text-gray-400 text-sm">
              If you are located in the European Economic Area (EEA), you have the following rights regarding your data:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400 text-sm">
              <li>Right to access the personal data we hold about you</li>
              <li>Right to request correction of inaccurate data</li>
              <li>Right to request deletion of your data</li>
              <li>Right to object to processing of your data</li>
              <li>Right to data portability</li>
              <li>Right to withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Children&apos;s Privacy</h2>
            <p className="text-gray-400 text-sm">
              GTA6 Hub is not intended for children under 13 years of age. We do not knowingly collect personal information from children through cookies or any other means.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">8. Changes to This Policy</h2>
            <p className="text-gray-400 text-sm">
              We may update this Cookies Policy from time to time. Any changes will be posted on this page with an updated &quot;Last updated&quot; date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">9. Contact Us</h2>
            <p className="text-gray-400 text-sm">
              If you have any questions about our use of cookies, please contact us at: <span className="text-pink-400">privacy@gta6hub.com</span>
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-purple-500/10 text-center">
          <p className="text-gray-600 text-xs">GTA6 Hub is a fan-made companion app. GTA 6 and Rockstar Games are trademarks of Take-Two Interactive.</p>
        </div>
      </div>
    </div>
  );
}
