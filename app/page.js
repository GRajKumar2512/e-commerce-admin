"use client";

import SectionWrapper from "@/components/SectionWrapper";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();

  return (
    <SectionWrapper>
      <div className="flex justify-between px-4 py-2">
        <h2 className="text-2xl font-bold text-blue-600">
          Hello! {session?.user?.name}
        </h2>
        <div>
          <Image
            src={session?.user?.image}
            alt="image"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
