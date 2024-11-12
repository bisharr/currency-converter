import { useEffect, useState } from "react";
import CurrencySelect from "./CurrencySelect";

function ComferterForm() {
  const [amoun, setAmount] = useState(100);
  const [result, setResult] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [fromCurrenct, setToFromCurrenct] = useState("USD");
  const [toCurrency, setToCurrency] = useState("UGX");

  function handleSwapCurrency() {
    setToCurrency(fromCurrenct);
    setToFromCurrenct(toCurrency);
  }

  async function getExchangeRate() {
    const API_KEY = "5890bcc4f56cad2a74fb9f33";
    const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrenct}/${toCurrency}`;
    setIsloading(true);

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("something went wrong");
      const data = await response.json();

      const rate = new Intl.NumberFormat("US").format(
        (data.conversion_rate * amoun).toFixed(2)
      );
      setResult(`${amoun} ${fromCurrenct} =  ${rate} ${toCurrency}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  }

  function handleFormsubmit(e) {
    e.preventDefault();
    getExchangeRate();
  }
  useEffect(() => getExchangeRate, []);
  return (
    <div>
      <form className="converter-from" onSubmit={handleFormsubmit}>
        <div className="form-group">
          <label className="from-label">Enter amoun</label>
          <input
            type="number"
            className="from-input"
            required
            placeholder="100"
            value={amoun}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="form-group form-currency-group">
          <div className="from-section">
            <label className="from-label">from</label>
            <CurrencySelect
              selectedCurrency={fromCurrenct}
              handleCurrency={(e) => setToFromCurrenct(e.target.value)}
            />
          </div>
          <div className="swap-icon" onClick={handleSwapCurrency}>
            <svg
              onClick={handleSwapCurrency}
              width="16"
              viewBox="0 0 20 19"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.13 11.66H.22a.22.22 0 0 0-.22.22v1.62a.22.22 0 0 0 .22.22h16.45l-3.92 4.94a.22.22 0 0 0 .17.35h1.97c.13 0 .25-.06.33-.16l4.59-5.78a.9.9 0 0 0-.7-1.43zM19.78 5.29H3.34L7.26.35A.22.22 0 0 0 7.09 0H5.12a.22.22 0 0 0-.34.16L.19 5.94a.9.9 0 0 0 .68 1.4H19.78a.22.22 0 0 0 .22-.22V5.51a.22.22 0 0 0-.22-.22z"
                fill="#fff"
              />
            </svg>
          </div>
          <div className="from-section">
            <label className="from-label">to</label>

            <CurrencySelect
              selectedCurrency={toCurrency}
              handleCurrency={(e) => setToCurrency(e.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          className={`${isLoading ? "loading" : ""} submit-btn`}
        >
          Get exchang rate
        </button>
        <p className="exchange-rate-result">
          {isLoading ? "Getting exchange rate..." : result}
        </p>
      </form>
    </div>
  );
}

export default ComferterForm;
