"use client";
import React, { useEffect, useState } from "react";
import datablit from "@datablit/datablit-js";

function Page() {
  const [expId, setExpId] = useState<string>("01K2JKVXR0J0ZWPX40XY8CAWBS");
  const [entityId, setEntityId] = useState<string>("1234");
  const [variant, setVariant] = useState<string>("");
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

  const checkVariant = async () => {
    setLoading(true);
    setError("");
    setVariant("");

    try {
      // Call datablit.experiment.getVariant() directly
      const res = await datablit.experiment.getVariant({ expId, entityId });
      setVariant(res.variant);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Experiment Variant Checker</h1>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="expId"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Experiment ID
          </label>
          <input
            id="expId"
            type="text"
            value={expId}
            onChange={(e) => setExpId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter experiment ID"
          />
        </div>

        <div>
          <label
            htmlFor="entityId"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Entity ID
          </label>
          <input
            id="entityId"
            type="text"
            value={entityId}
            onChange={(e) => setEntityId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter entity ID"
          />
        </div>

        <button
          onClick={checkVariant}
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          {loading ? "Checking..." : "Check Variant"}
        </button>

        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {variant && (
          <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
            <strong>Variant Result:</strong> {variant}
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
