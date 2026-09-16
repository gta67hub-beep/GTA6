import Link from "next/link";

export const metadata = {
  title: "Terms of Service - GTA6 Hub",
  description: "Terms of Service for GTA6 Hub application",
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#0a0014] text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-pink-400 text-sm hover:text-pink-300 mb-4 inline-block">
            ← Back to GTA6 Hub
          </Link>
          <h1 className="text-4xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-gray-500 text-sm mt-2">Last updated: September 13, 2026</p>
        </div>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <p className="text-gray-400 text-sm">
              Welcome to GTA6 Hub. These Terms of Service (&quot;Terms&quot;) govern your use of the GTA6 Hub application and website (the &quot;Service&quot;) operated by GTA6 Hub (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;).
            </p>
            <p className="text-gray-400 text-sm mt-2">
              By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, you may not access the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-400 text-sm">
              By accessing or using GTA6 Hub, you agree to be bound by these Terms of Service and our <Link href="/privacy-policy" className="text-pink-400 hover:text-pink-300">Privacy Policy</Link>. If you do not agree to these terms, do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Description of Service</h2>
            <p className="text-gray-400 text-sm">
              GTA6 Hub is a fan-made companion application for Grand Theft Auto VI. We provide news aggregation, game information, interactive maps, favorites, and progress tracking features.
            </p>
            <div className="mt-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <p className="text-yellow-200 text-sm font-medium">
                <strong>Disclaimer:</strong> This service is not affiliated with, endorsed by, or connected to Rockstar Games, Take-Two Interactive, or any of their subsidiaries or affiliates. GTA 6, Grand Theft Auto, Rockstar Games, and all related trademarks are property of Take-Two Interactive Software, Inc.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. User Accounts</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-400 text-sm">
              <li>You must be at least 13 years old to create an account</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials</li>
              <li>You are responsible for all activities that occur under your account</li>
              <li>One person may not maintain more than one account</li>
              <li>You must notify us immediately of any unauthorized use of your account</li>
              <li>We reserve the right to suspend or terminate accounts that violate these terms</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Acceptable Use</h2>
            <p className="text-gray-400 text-sm">You agree not to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400 text-sm">
              <li>Use the Service for any unlawful purpose or in violation of any local, national, or international law</li>
              <li>Attempt to gain unauthorized access to any part of the Service or its related systems</li>
              <li>Interfere with, disrupt, or attempt to gain unauthorized access to the Service or servers</li>
              <li>Scrape, crawl, or use automated tools to access or collect data from the Service</li>
              <li>Impersonate another user, person, or entity</li>
              <li>Upload or transmit malicious code, viruses, or harmful content</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Collect or store personal data about other users without their consent</li>
              <li>Use the Service to send spam or unsolicited communications</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Intellectual Property</h2>
            <p className="text-gray-400 text-sm">
              The Service and its original content, features, and functionality are owned by GTA6 Hub and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              GTA 6, Grand Theft Auto, Rockstar Games, and all related trademarks, logos, and imagery are the property of Take-Two Interactive Software, Inc. We claim no ownership over any intellectual property belonging to Take-Two Interactive or Rockstar Games.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              All game screenshots and images used on this platform are property of Take-Two Interactive Software, Inc. and are used here for informational and commentary purposes under fair use.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. User-Generated Content</h2>
            <p className="text-gray-400 text-sm">
              If you submit content (comments, feedback, suggestions, or other materials), you grant GTA6 Hub a non-exclusive, royalty-free, perpetual, and worldwide license to use, modify, and display such content in connection with the Service. You retain ownership of your original content.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              You represent and warrant that you own or have the necessary rights to any content you submit, and that such content does not violate the rights of any third party.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Advertising</h2>
            <p className="text-gray-400 text-sm">
              GTA6 Hub may display advertisements through third-party services (Google AdSense). You agree to the presence of advertisements as part of the Service. Ad content is determined by third-party ad networks and not by GTA6 Hub. We are not responsible for the content of third-party advertisements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">8. Links to Other Websites</h2>
            <p className="text-gray-400 text-sm">
              Our Service may contain links to third-party websites or services that are not owned or controlled by GTA6 Hub. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party sites or services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">9. Disclaimer of Warranties</h2>
            <p className="text-gray-400 text-sm">
              THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              GTA6 HUB DOES NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE. WE DO NOT GUARANTEE THE ACCURACY, COMPLETENESS, OR RELIABILITY OF ANY INFORMATION PROVIDED THROUGH THE SERVICE.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">10. Limitation of Liability</h2>
            <p className="text-gray-400 text-sm">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL GTA6 HUB BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF OR INABILITY TO USE THE SERVICE.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US (IF ANY) IN THE PAST 12 MONTHS FOR THE SERVICE GIVING RISE TO THE CLAIM.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">11. Indemnification</h2>
            <p className="text-gray-400 text-sm">
              You agree to defend, indemnify, and hold harmless GTA6 Hub, its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses arising from your use of the Service or violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">12. Termination</h2>
            <p className="text-gray-400 text-sm">
              We may terminate or suspend your account and access to the Service at our sole discretion, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Upon termination, your right to use the Service will cease immediately. You may terminate your account at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">13. Governing Law</h2>
            <p className="text-gray-400 text-sm">
              These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles. Any disputes arising under these Terms shall be resolved in the appropriate courts of the applicable jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">14. Changes to Terms</h2>
            <p className="text-gray-400 text-sm">
              We reserve the right to modify these Terms at any time. We will notify users of material changes by posting the updated Terms on this page with an updated &quot;Last updated&quot; date. Your continued use of the Service after changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">15. Severability</h2>
            <p className="text-gray-400 text-sm">
              If any provision of these Terms is held to be unenforceable or invalid, such provision will be modified to the minimum extent necessary to make it enforceable, and the remaining provisions shall remain in full force and effect.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">16. Contact</h2>
            <p className="text-gray-400 text-sm">
              For questions about these Terms, please contact us at:
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Email: <span className="text-pink-400">legal@gta6hub.com</span>
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
