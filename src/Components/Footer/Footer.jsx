import amazonLogo from "../../assets/images/amazon-pay.webp";
import AmericanExpresssLogo from "../../assets/images/American-Express-Color.webp";
import MasterCardLogo from "../../assets/images/mastercard.webp";
import payPalLogo from "../../assets/images/paypal.webp";
import GoogleStoreLogo from "../../assets/images/get-google-play.webp";
import AppStoreLogo from "../../assets/images/get-apple-store.webp";

export default function Footer() {
  return (
    <footer
      className="bg-slate-100 py-8"
      style={{ fontSize: "clamp(0.95rem, 1vw + 1rem, 1.15rem)" }}
    >
      <div
        className="container space-y-6 px-2 sm:px-4"
        style={{
          paddingLeft: "max(1rem, 2vw)",
          paddingRight: "max(1rem, 2vw)",
        }}
      >
        {/* Header  */}
        <header>
          <h2
            className="text-xl sm:text-2xl mb-2 text-center md:text-left"
            style={{ fontWeight: 600 }}
          >
            Get The FreshCart App
          </h2>
          <p
            className="text-gray-500 text-center md:text-left"
            style={{ fontSize: "clamp(0.9rem, 1vw + 0.9rem, 1.1rem)" }}
          >
            We Will Send You a Link, open It on Your Phone To Download The App.
          </p>
        </header>

        {/* Input & Button */}
        <div className="flex flex-col md:flex-row gap-2 sm:gap-3">
          <input
            type="email"
            placeholder="Email .."
            name="email"
            className="form-control flex-1 border border-slate-300 rounded px-2 py-2 text-base"
            style={{
              minWidth: "120px",
              fontSize: "clamp(0.95rem, 1vw + 1rem, 1.1rem)",
            }}
          />
          <button
            type="submit"
            className="btn bg-primary-600 text-white px-4 sm:px-6 py-2 rounded text-base"
            style={{ fontSize: "clamp(0.95rem, 1vw + 1rem, 1.1rem)" }}
          >
            Share App Link
          </button>
        </div>

        {/* Payment & Downloads */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 sm:gap-6 py-4 border-y-2 border-slate-200">
          {/* Payment partners */}
          <div className="payment-partners flex flex-wrap items-center gap-2 sm:gap-3 justify-center lg:justify-start">
            <h3
              className="w-full lg:w-auto text-center lg:text-left font-medium text-base sm:text-lg"
              style={{ fontWeight: 500 }}
            >
              Payment Partners :
            </h3>
            <img className="w-12 sm:w-16" src={amazonLogo} alt="Amazon Logo" />
            <img
              className="w-12 sm:w-16"
              src={AmericanExpresssLogo}
              alt="American Express Logo"
            />
            <img
              className="w-10 sm:w-12"
              src={MasterCardLogo}
              alt="MasterCard Logo"
            />
            <img className="w-12 sm:w-16" src={payPalLogo} alt="PayPal Logo" />
          </div>

          {/* Download links */}
          <div className="download flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
            <h3
              className="font-medium text-center sm:text-left text-base sm:text-lg"
              style={{ fontWeight: 500 }}
            >
              Get deliveries With FreshCart
            </h3>
            <div className="flex gap-2 sm:gap-3 flex-wrap justify-center">
              <img
                className="w-24 sm:w-36"
                src={GoogleStoreLogo}
                alt="Google Play Logo"
              />
              <img
                className="w-20 sm:w-32"
                src={AppStoreLogo}
                alt="App Store Logo"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
