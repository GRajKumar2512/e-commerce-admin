"use client";

import { SessionProvider } from "next-auth/react";

export default function Provider({ children, session }) {
  // being a client side component wraps the children components and provides session to all of them
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
