"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex gap-4 m-10">
      <button
        className="p-2 border border-white cursor-pointer"
        onClick={() => router.push("/events")}
      >
        Event demo
      </button>
      <button
        className="p-2 border border-white cursor-pointer"
        onClick={() => router.push("/experiments")}
      >
        Experiment demo
      </button>
      <button
        className="p-2 border border-white cursor-pointer"
        onClick={() => router.push("/rules")}
      >
        Rule demo
      </button>
    </div>
  );
}
