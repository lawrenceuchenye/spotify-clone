"use client";

import React from "react";
import { Song } from "../types";
import MediaItem from "./MediaItem";
import LikedButton from "./LikedButton";
import { useUser } from "../hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface PageContentProps {
	songs: Song[];
}

const index: React.FC<PageContentProps> = ({ songs }) => {
	const { user, isLoading } = useUser();
	const router = useRouter();

	useEffect(() => {
		if (!user && !isLoading) {
			router.replace("/");
		}
	}, [isLoading, user, router]);

	if (songs.length === 0) {
		return <div className="p-4">No songs available</div>;
	}

	return (
		<div className="w-[92%] mx-auto ">
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
