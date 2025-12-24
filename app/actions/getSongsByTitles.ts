import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Song } from "../types";
import { cookies } from "next/headers";
import getSongs from "./getSongs";

const getSongsByTitles = async (title: string): Promise<Song[]> => {
  const cookieStore = await cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  if (!title) {
    const allSongs = await getSongs();
    return allSongs;
  }

  const { data, error } = await supabase
    .from("songs")
    .select()
    .ilike("title", `%${title}%`)
    .order("created_at", { ascending: true });

  if (error) {
    console.log(error);
  }

  return (data as any) || [];
};

export default getSongsByTitles;
