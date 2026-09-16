import Link from "next/link";

export const metadata = {
  title: "Privacy Policy - GTA6 Hub",
  description: "Privacy Policy for GTA6 Hub application",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0a0014] text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-pink-400 text-sm hover:text-pink-300 mb-4 inline-block">
            ← Back to GTA6 Hub
          </Link>
          <h1 className="text-4xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-gray-500 text-sm mt-2">Last updated: September 13, 2026</p>
        </div>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <p className="text-gray-400 text-sm">
              GTA6 Hub (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the GTA6 Hub application. This page informs you of our policies regarding the collection, use, and disclosure of personal information when you use our Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Information We Collect</h2>
            <p className="text-gray-400 text-sm">
              We collect minimal information to provide and improve our Service:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400 text-sm">
              <li><strong className="text-white">Usage Data:</strong> We collect anonymous analytics data including page views, feature usage, and interaction patterns to improve the app experience.</li>
              <li><strong className="text-white">Favorites:</strong> Your saved favorites are stored locally in your browser using local storage.</li>
              <li><strong className="text-white">Device Information:</strong> Browser type, operating system, and device type for compatibility purposes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-400 text-sm">
              <li>To provide and maintain the GTA6 Hub Service</li>
              <li>To personalize your experience with favorites and progress tracking</li>
              <li>To send push notifications (only if you opt-in)</li>
              <li>To improve our application through anonymous analytics</li>
              <li>To detect and prevent abuse or technical issues</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Data Storage & Security</h2>
            <p className="text-gray-400 text-sm">
              Your data is stored securely using industry-standard encryption and security measures. We use PostgreSQL for server-side data storage. Your local favorites and preferences are stored in your browser&apos;s local storage.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Third-Party Services</h2>
            <p className="text-gray-400 text-sm">
              We use the following third-party services that may collect information:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400 text-sm">
              <li><strong className="text-white">Google AdSense:</strong> Advertising service that may use cookies to serve relevant ads. Google&apos;s privacy policy: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300">policies.google.com/privacy</a></li>
              <li><strong className="text-white">Vercel:</strong> Hosting and deployment platform</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Cookies</h2>
            <p className="text-gray-400 text-sm">
              GTA6 Hub uses cookies for essential functionality and third-party advertisers may use cookies for personalized advertising. For detailed information about our use of cookies, please see our <Link href="/cookies-policy" className="text-pink-400 hover:text-pink-300">Cookies Policy</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Data Retention</h2>
            <p className="text-gray-400 text-sm">
              We retain your personal information only for as long as necessary to provide the Service and fulfill the purposes described in this policy. When you delete your account, we will remove your personal data from our servers within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Your Rights (GDPR)</h2>
            <p className="text-gray-400 text-sm">
              If you are located in the European Economic Area (EEA), you have the following rights under data protection law:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400 text-sm">
              <li><strong className="text-white">Right of Access:</strong> You can request a copy of the personal data we hold about you.</li>
              <li><strong className="text-white">Right to Rectification:</strong> You can request correction of inaccurate or incomplete data.</li>
              <li><strong className="text-white">Right to Erasure:</strong> You can request deletion of your personal data (&quot;right to be forgotten&quot;).</li>
              <li><strong className="text-white">Right to Restrict Processing:</strong> You can request restriction of processing of your data.</li>
              <li><strong className="text-white">Right to Data Portability:</strong> You can request transfer of your data in a structured, machine-readable format.</li>
              <li><strong className="text-white">Right to Object:</strong> You can object to processing of your personal data.</li>
              <li><strong className="text-white">Right to Withdraw Consent:</strong> You can withdraw consent at any time where we rely on consent to process your data.</li>
            </ul>
            <p className="text-gray-400 text-sm mt-2">
              To exercise any of these rights, please contact us at <span className="text-pink-400">privacy@gta6hub.com</span>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">8. California Privacy Rights (CCPA)</h2>
            <p className="text-gray-400 text-sm">
              If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400 text-sm">
              <li>Right to know what personal information is collected</li>
              <li>Right to delete personal information</li>
              <li>Right to opt-out of the sale of personal information</li>
              <li>Right to non-discrimination for exercising your rights</li>
            </ul>
            <p className="text-gray-400 text-sm mt-2">
              We do not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">9. Children&apos;s Privacy</h2>
            <p className="text-gray-400 text-sm">
              GTA6 Hub is not intended for users under 13 years of age. We do not knowingly collect personal information from children. If we become aware that we have collected personal data from a child without parental consent, we will take steps to delete that information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">10. International Data Transfers</h2>
            <p className="text-gray-400 text-sm">
              Your information may be transferred to and maintained on servers located outside of your country. By using the Service, you consent to such transfers. We ensure appropriate safeguards are in place for international data transfers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">11. Changes to This Policy</h2>
            <p className="text-gray-400 text-sm">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated &quot;Last updated&quot; date. For material changes, we will provide a more prominent notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">12. Contact Us</h2>
            <p className="text-gray-400 text-sm">
              If you have any questions about this Privacy Policy or wish to exercise your data rights, please contact us at:
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Email: <span className="text-pink-400">privacy@gta6hub.com</span>
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
