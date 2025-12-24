"use client";

import React from "react";
import usePlayer from "../hooks/usePlayer";
import useGetSongById from "../hooks/useGetSongById";
import useLoadSong from "../hooks/useLoadSong";
import PlayerContent from "./PlayerContent";

const index: React.FC = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);

  const songUrl = useLoadSong(song!);

  if (!song || !songUrl || !player.activeId) {
    return null;
  }

  return (
    <div className="fixed bottom-0 bg-black text-white w-full h-[max-content] px-4 py-2">
      <PlayerContent id={songUrl} song={song} songUrl={songUrl} />
    </div>
  );
};

export default index;
