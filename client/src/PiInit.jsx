import { useEffect } from "react";

function PiInit() {
  useEffect(() => {
    if (window.Pi) {
      window.Pi.init({
        version: "2.0",
        sandbox: true, // enables Pi Testnet
        appId: process.env.REACT_APP_PI_API_KEY // your Pi API key from Vercel env
      });
    }
  }, []);

  return null;
}

export default PiInit;
