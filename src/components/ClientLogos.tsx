import Image from "next/image";
import { clients } from "@/lib/clients";
import { Eyebrow } from "@/components/ui";

// Logos sit on light tiles because most of the artwork is dark-on-transparent.
export function ClientLogos({ heading = "Companies I've worked with" }: { heading?: string }) {
  return (
    <div>
      <Eyebrow>{heading}</Eyebrow>
      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {clients.map((c) => (
          <li key={c.name} className="grid h-24 place-items-center rounded-2xl bg-white p-4">
            <Image
              src={c.logo}
              alt={c.name}
              width={c.width}
              height={c.height}
              className="max-h-14 w-auto max-w-full object-contain"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
