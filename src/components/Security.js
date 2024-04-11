import securityIcon from '../images/logo/security.svg';
import PrivacyIcon from '../images/logo/privacy.svg';

const Security = () => {
  return (
    <section id="security-privacy" className="py-12 bg-white scroll-mt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">Security and Privacy</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Security */}
          <div>
            <img src={securityIcon} alt="Budget Tracking" className="svg-icon max-w-16 mx-auto my-8" />
            <h3 className="text-xl font-semibold mb-4 text-center">Data Security</h3>
            <p className="text-gray-700">We take data security seriously. Your information is encrypted and securely stored on our servers. Our robust security measures ensure that your data remains safe and protected from unauthorized access.</p>
          </div>
          
          {/* Privacy */}
          <div>
          <img src={PrivacyIcon} alt="Budget Tracking" className="svg-icon max-w-16 mx-auto my-8" />
            <h3 className="text-xl font-semibold mb-4 text-center">Privacy Protection</h3>
            <p className="text-gray-700">Your privacy is our priority. We do not sell or share your personal information with third parties. Our privacy policy outlines how we collect, use, and protect your data. You have full control over your data and can request its deletion at any time.</p>
          </div>
        </div>
      </div>
    </section>

  )
}

export default Security;