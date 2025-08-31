"use client";
import React, { useEffect, useState } from "react";
import datablit from "@datablit/datablit-js";

function Page() {
  const [key, setKey] = useState<string>("fer");
  const [userId, setUserId] = useState<string>("1");
  const [params, setParams] = useState<string>('{"os_name": "android"}');
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    datablit.init({
      apiKey: process.env.NEXT_PUBLIC_DATABLIT_API_KEY || "",
      endpoint: "https://staging-event.datablit.com/v1/batch",
      batchSize: 1,
      flushInterval: 2000,
      apiBaseURL: "https://staging-console.datablit.com",
    });
  }, []);

  const evalRule = async () => {
    setLoading(true);
    setError("");
    setResult("");

    try {
      // Parse JSON params
      const parsedParams = JSON.parse(params);

      // Call datablit.rule.evalRule() directly
      const ruleResult = await datablit.rule.evalRule({
        key,
        userId,
        params: parsedParams,
      });

      if (ruleResult.result) {
        setResult("Rule evaluated to true");
      } else {
        setResult("Rule evaluated to false");
      }
    } catch (err) {
      if (err instanceof SyntaxError) {
        setError("Invalid JSON format in params");
      } else {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Rule Evaluation Demo</h1>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="key"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Rule Key
          </label>
          <input
            id="key"
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter rule key"
          />
        </div>

        <div>
          <label
            htmlFor="userId"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            User ID
          </label>
          <input
            id="userId"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter user ID"
          />
        </div>

        <div>
          <label
            htmlFor="params"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Params (JSON)
          </label>
          <textarea
            id="params"
            value={params}
            onChange={(e) => setParams(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder='Enter JSON params (e.g., {"os_name": "android"})'
            rows={4}
          />
        </div>

        <button
          onClick={evalRule}
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          {loading ? "Evaluating..." : "Evaluate Rule"}
        </button>

        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {result && (
          <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
            <strong>Rule Result:</strong>
            <pre className="mt-2 text-sm whitespace-pre-wrap">{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
