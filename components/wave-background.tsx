"use client";

import Image from "next/image";

export default function WaveBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <Image
        src="/vecteezy_abstract-warped-diagonal-striped-background-vector-curved_13006949.svg"
        alt="Abstract Warped Diagonal Striped Background"
        fill
        className="object-cover animate-pan-horizontal"
      />
    </div>
  );
}
