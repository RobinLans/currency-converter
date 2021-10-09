import React, { useState, useEffect } from "react";
import { MdCached } from "react-icons/md";
import { Select, MenuItem, FormControl } from "@material-ui/core";
import useDebounce from "../hooks/useDebounce";

function Converter() {
  const [amount, setAmount] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);
  const [newAmount, setNewAmount] = useState(0);
  const [currencyToConvertFrom, setCurrencyToConvertFrom] = useState("SEK");
  const [currencyToConvertTo, setCurrencyToConvertTo] = useState("");
  const [currenciesList, setCurrenciesList] = useState([]);
  const [switchClicked, setSwitchClicked] = useState(false);

  useDebounce(
    () => {
      setNewAmount(Math.round(amount * conversionRate * 100) / 100);
    },
    500,
    [amount, currencyToConvertFrom, currencyToConvertTo]
  );

  async function fetchExchangeRate() {
    // if (!switchClicked) {
    //   const response = await fetch(
    //     `https://v6.exchangerate-api.com/v6/6d5af6167114a86e899922df/latest/${currencyToConvertFrom}`
    //   );
    //   const data = await response.json();

    //   setCurrenciesList(data.conversion_rates);
    // } else if (switchClicked) {
    //   const response = await fetch(
    //     `https://v6.exchangerate-api.com/v6/6d5af6167114a86e899922df/latest/${currencyToConvertFrom}`
    //   );
    //   const data = await response.json();

    //   setCurrenciesList(data.conversion_rates);
    //   setConversionRate(data.conversion_rates[currencyToConvertTo]);
    // }

    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/6d5af6167114a86e899922df/latest/${currencyToConvertFrom}`
    );
    const data = await response.json();

    if (switchClicked)
      setConversionRate(data.conversion_rates[currencyToConvertTo]);

    setCurrenciesList(data.conversion_rates);
  }

  useEffect(() => {
    fetchExchangeRate();
  }, [currencyToConvertFrom]);

  function handleInputChange(e) {
    setAmount(Number(e.target.value));
  }

  function handleSwitch() {
    setSwitchClicked(true);
    setAmount(newAmount);
    setCurrencyToConvertFrom(currencyToConvertTo);
    setCurrencyToConvertTo(currencyToConvertFrom);
    setCurrenciesList([]);

    fetchExchangeRate();
  }

  return (
    <div className="container">
      <FormControl variant="outlined" size="medium">
        <Select
          id="select"
          value={currencyToConvertFrom}
          onChange={(e) => {
            setCurrencyToConvertFrom(e.target.value);
          }}
        >
          {Object.keys(currenciesList).map((key, id) => (
            <MenuItem value={key} key={id}>
              {key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <input
        type="number"
        placeholder={currencyToConvertFrom}
        onChange={handleInputChange}
        value={!amount ? "" : amount}
      />
      <button onClick={handleSwitch}>
        <MdCached />
      </button>
      <input type="text" value={newAmount.toFixed(2)} disabled="disabled" />
      <FormControl variant="outlined" size="medium">
        <Select
          id="select"
          value={currencyToConvertTo}
          onChange={(e) => {
            setCurrencyToConvertTo(e.target.value);
            setConversionRate(currenciesList[e.target.value]);
          }}
        >
          {Object.keys(currenciesList).map((key, id) => (
            <MenuItem value={key} key={id}>
              {key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default Converter;
