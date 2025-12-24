import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Song } from "../types";
import { cookies } from "next/headers";

const getSongsByUserId = async (): Promise<Song[]> => {
  const cookieStore = await cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data:sessionData,error:sessionError}=await supabase.auth.getSession();

  if(sessionError){
    console.log(sessionError);
    return [];
  }

  const { data, error } = await supabase
    .from("songs")
    .select("*").eq("user_id",sessionData.session?.user.id)
    .order("created_at", { ascending: true });

  if (error) {
    console.log(error);
  }

 
  return (data as any) || [];
};

export default getSongsByUserId;
