import React, { useState } from "react";
import "./App.css";

const App = () => {
  const options = [
    { value: "Sum", type: "function" },
    { value: "Payment Processing fees", type: "calculation" },
    { value: "Bonus Payout Month", type: "number" },
    { value: "Payroll Bonus", type: "currency" },
  ];
  const [inputValue, setInputValue] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);
  console.log("selectedValues", selectedValues);

  const handleInputChange = (event) => {
    const containsWhitespace = /\s/.test(event.target.value);
    if (containsWhitespace) {
      setSelectedValues((prevSelected) => [...prevSelected, { value: event.target.value, type: "staticString" }]);
      setInputValue("");
    } else {
      setInputValue(event.target.value);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setSelectedValues((prevSelected) => [...prevSelected, { value: event.target.value, type: "staticString" }]);
      setInputValue("");
    }
    if (event.key === "Backspace") {
      let selectedValuesTemp = [...selectedValues];
      selectedValuesTemp.pop();
      setSelectedValues(selectedValuesTemp);
      setInputValue("");
    }
  };
  const handleSelectOption = (option) => {
    setSelectedValues((prevSelected) => [...prevSelected, option]);
    setInputValue("");
  };

  const handleRemoveValue = (value) => {
    setSelectedValues((prevSelected) => prevSelected.filter((v) => v.value !== value));
  };

  const filteredOptions = options.filter((option) => {
    return inputValue.length > 0 && !selectedValues.includes(option) && option.value.toLowerCase().includes(inputValue.toLowerCase());
  });

  return (
    <div>
      <h1>Multiple Value Autocomplete</h1>
      <div>
        <div className="tag-input-container">
          <div className="tags-container">
            {selectedValues.map((option) =>
              option.type === "staticString" ? (
                <div key={option.value} className="static-tag">
                  {option.value}
                </div>
              ) : (
                <div key={option.value} className="tag">
                  {option.value}
                  {option.type !== "function" && (
                    <button className="tag-remove" onClick={() => handleRemoveValue(option.value)}>
                      &times;
                    </button>
                  )}
                </div>
              )
            )}
          </div>
          <input type="text" value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown} />
        </div>
        {filteredOptions.length > 0 && (
          <ul>
            {filteredOptions.map((option) => (
              <li key={option.value} onClick={() => handleSelectOption(option)}>
                {option.value}
              </li>
            ))}
          </ul>
        )}
      </div>{" "}
    </div>
  );
};

export default App;
