import { useEffect } from "react";

function PiInit() {
  useEffect(() => {
    if (window.Pi) {
      window.Pi.init({
        version: "2.0",
        sandbox: true // IMPORTANT: enables Pi Testnet sandbox
      });
    }
  }, []);

  return null;
}

export default PiInit;
