import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Song } from "../types";
import { cookies } from "next/headers";

const getLikedSongs = async (): Promise<Song[]> => {
  const cookieStore = await cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  console.log(sessionError, "ERROR");

  if (sessionError) {
    console.log(sessionError);
    return [];
  }

  const { data, error } = await supabase
    .from("liked_songs")
    .select("*")
    .eq("user_id", session?.user?.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(sessionError);
    return [];
  }

  const fetchedSongs = await Promise.all(
    data.map(async (like, indx) => {
      const { data: song, error } = await supabase
        .from("songs")
        .select("*")
        .eq("id", like.song_id)
        .single();
      if (error) return null; // skip if song not found
      return song;
    })
  );

  if (error) {
    console.log(error);
    return [];
  }

  if (!fetchedSongs) {
    return [];
  }

  return (fetchedSongs as any) || [];

  /*data.map((item) => ({
    ...item.songs,
  }));*/
};

export default getLikedSongs;
