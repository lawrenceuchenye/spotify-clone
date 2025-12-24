"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import useAuthModal from "../hooks/useAuthModal";
import { useRouter } from "next/navigation";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import toast from "react-hot-toast";

interface LikedButtonProps {
  songId: string;
}

const index: React.FC<LikedButtonProps> = ({ songId }) => {
  const { user } = useUser();
  const { supabaseClient } = useSessionContext();

  const authModal = useAuthModal();
  const router = useRouter();

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songId)
        .single();

      if (!error && data) {
        setIsLiked(true);
      }
    };

    fetchData();
  }, [songId, supabaseClient, user?.id]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleClick = async () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (isLiked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", songId);

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(false);
      }
    } else {
      const { error } = await supabaseClient.from("liked_songs").insert({
        song_id: songId,
        user_id: user.id,
      });

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(true);
        toast.success("Liked");
      }
    }

    router.refresh();
  };

  return (
    <button
      onClick={handleClick}
      className="cursor-pointer text-2xl hover:opacity-75 transition"
    >
      <Icon color={isLiked ? "#22c55e" : "white"} />
    </button>
  );
};

export default index;
