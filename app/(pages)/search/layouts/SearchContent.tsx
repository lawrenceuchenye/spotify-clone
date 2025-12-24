"use client";

import React from "react";
import { Song } from "../../../types";
import MediaItem from "../../../layouts/MediaItem";
import LikedButton from "../../../layouts/LikedButton";

interface SearchContentProps {
  songs: Song[];
}

const index: React.FC<SearchContentProps> = ({ songs }) => {
  if (songs.length == 0) {
    return (
      <div className="mt-4 flex flex-col gap-y-2 w-full px-6 text-neutral-400 text-2xl">
        No Songs Found.
      </div>
    );
  }
  return (
    <div className="mt-4 flex flex-col gap-y-2 w-full px-6">
      {songs.map((song) => {
        return (
          <div key={song.id} className="flex items-center gap-x-4 w-full">
            <div className="flex-1">
              <MediaItem onClick={() => {}} data={song} />
            </div>
            <LikedButton songId={song.id} />
          </div>
        );
      })}
    </div>
  );
};

export default index;
