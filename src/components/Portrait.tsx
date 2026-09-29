import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { site } from "@/lib/site";

// Daniel's headshot. Falls back to a monogram until public/images/daniel-schley.jpg exists.
export function Portrait({ size = 320, className = "" }: { size?: number; className?: string }) {
  const hasPhoto = fs.existsSync(path.join(process.cwd(), "public", site.photo));
  if (hasPhoto) {
    return (
      <Image
        src={site.photo}
        alt={`${site.owner}, founder of ${site.name}`}
        width={size}
        height={size}
        className={`aspect-square rounded-2xl object-cover ${className}`}
        priority
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={site.owner}
      style={{ width: size, maxWidth: "100%" }}
      className={`grid aspect-square place-items-center rounded-2xl bg-navy text-5xl font-bold text-white ${className}`}
    >
      DS
    </div>
  );
}
