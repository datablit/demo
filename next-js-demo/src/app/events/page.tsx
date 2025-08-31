"use client";
import React, { useEffect, useState } from "react";
import datablit from "@datablit/datablit-js";

export default function Page() {
  const [identifyPayload, setIdentifyPayload] = useState<Record<string, any>>({
    name: "Deepak",
    email: "deepak12@gmail.com",
  });
  const [trackPayload, setTrackPayload] = useState<Record<string, any>>({
    orderId: "order_1",
    amount: "$1500",
  });
  const [userId, setUserId] = useState<string>("1234");
  const [event, setEvent] = useState<string>("order placed");

  useEffect(() => {
    datablit.init({
      apiKey: process.env.NEXT_PUBLIC_DATABLIT_API_KEY || "",
      // endpoint: "https://staging-event.datablit.com/v1/batch",
      batchSize: 1,
      flushInterval: 2000,
    });
  }, []);

  return (
    <div className="m-10 flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="flex flex-col gap-4">
          <div className=" flex gap-4">
            <div>userId:</div>
            <input
              type="text"
              defaultValue={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <textarea
            className="p-2 w-96 h-96 border border-white"
            name="identify_payload"
            defaultValue={JSON.stringify(identifyPayload)}
            onChange={(e) => setIdentifyPayload(JSON.parse(e.target.value))}
          ></textarea>
          <button
            className="cursor-pointer p-1 border border-white"
            onClick={() => {
              datablit.identify(userId, identifyPayload);
            }}
          >
            Identify
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <div className=" flex gap-4">
            <div>event:</div>
            <input
              type="text"
              defaultValue={event}
              onChange={(e) => setEvent(e.target.value)}
            />
          </div>
          <textarea
            className="p-2 w-96 h-96 border border-white"
            name="track_payload"
            defaultValue={JSON.stringify(trackPayload)}
            onChange={(e) => setTrackPayload(JSON.parse(e.target.value))}
          ></textarea>
          <button
            className="cursor-pointer p-1 border border-white"
            onClick={() => {
              datablit.track(event, trackPayload);
            }}
          >
            Track
          </button>
        </div>
      </div>
    </div>
  );
}
