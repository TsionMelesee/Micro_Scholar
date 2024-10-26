// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD

import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState("0"); // Default value
  const [to, setTo] = useState("USD"); // Default value
  const [from, setFrom] = useState("EUR");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  function handleValue(e) {
    setAmount(e.target.value);
  }
  function handleTo(e) {
    setTo(e.target.value);
  }
  function handleFrom(e) {
    setFrom(e.target.value);
  }
  useEffect(
    function () {
      async function currencyConvertFetcher() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
        );
        const data = await res.json();
        setOutput(data.rates[to]);
        setIsLoading(false);
      }
      if (from === to) return setOutput(amount);
      currencyConvertFetcher();
    },
    [amount, from, to]
  );
  function Loader() {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={handleValue}
        disabled={isLoading}
      />
      <select value={from} onChange={handleFrom}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={to} onChange={handleTo}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {output} {to}
          </>
        )}
      </p>
    </div>
  );
}
