"use client";
import { Song } from "../types";
import React from "react";
import useLoadImage from "../hooks/useLoadImage";
import Image from "next/image";

interface MediaItemProps {
	data: Song;
	onClick?: () => void;
}

const index: React.FC<MediaItemProps> = ({ data, onClick }) => {
	const imageUrl = useLoadImage(data);

	const handleClick = () => {
		if (onClick) {
			return onClick(data.id);
		}
	};

	return (
		<div
			onClick={handleClick}
			className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
		>
			<div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
				<Image
					className="object-cover"
					width={56}
					height={48}
					alt="Media Item"
					src={imageUrl || "/images/liked.jpeg"}
				/>
			</div>
			<div className="flex flex-col gap-y-1 overflow-hidden">
				<p className="text-white truncate">{data.title}</p>
				<p className="text-neutral-400 truncate">{data.author}</p>
			</div>
		</div>
	);
};

export default index;
