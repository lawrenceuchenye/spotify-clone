// Source - https://stackoverflow.com/a/67090871
// Posted by ehab
// Retrieved 2026-02-01, License - CC BY-SA 4.0

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

"use client";

import { Database } from "@/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

import React, { useState } from "react";

interface SupabaseProviderProps {
	children: React.ReactNode;
}

const index: React.FC<SupabaseProviderProps> = ({ children }) => {
	const [supabaseClient] = useState(() =>
		createClientComponentClient<Database>(),
	);
	return (
		/* @ts-ignore */
		<SessionContextProvider supabaseClient={supabaseClient}>
			{children}
		</SessionContextProvider>
	);
};

export default index;
