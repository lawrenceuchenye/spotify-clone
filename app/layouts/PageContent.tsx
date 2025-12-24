"use client";
import React from "react";
import { Song } from "../types";
import SongItem from "./SongItem";
import useOnPlay from "../hooks/useOnPlay";

interface PageContentProps {
  songs: Song[];
}

const index: React.FC<PageContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return <div>No songs available</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grids-cols-5 2xl:grid-cols-8 gap-4 mt-4">
      {songs.map((song) => {
        return (
          <SongItem
            key={song.id}
            onClick={() => onPlay(song.id)}
            data={song}
          />
        );
      })}
    </div>
  );
};

export default index;
