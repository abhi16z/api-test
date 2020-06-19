import React, { useState } from "react";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/adventure_time.css";

import "./styles.css";

export default function App() {
  const [isFetching, toggleFetching] = useState(false);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState({});
  const [url, setUrl] = useState("https://test.unajs.org/api.php");

  const makeApiCall = async () => {
    try {
      setError(false);
      toggleFetching(true);
      const respons = await fetch(url, {
        method: "GET"
      });
      const responseJson = await respons.json();
      setResponse(responseJson);
      console.log(responseJson);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      toggleFetching(false);
    }
  };

  return (
    <div className="App">
      <h1>Test Api</h1>
      <div style={{ display: 'flex' }}>
        <input
          type="url"
          id="url"
          placeholder="Enter Url to make get call"
          autoComplete={false}
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
        <button onClick={() => makeApiCall()}>
          {isFetching ? "Calling..." : "Call"}
        </button>
      </div>
      {!error && (
        <JSONPretty id="json-pretty" data={response} />
      )}
      {error && (
        <p style={{ color: "red", backgroundColor: "pink", padding: 20 }}>
          Something went wrong
        </p>
      )}
    </div>
  );
}
