
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
export default function Music() {
  type MusicData = { id: string; track: string; artist: string; album: string };

  const [img, setImg] = useState("");
  const [music, setMusic] = useState<MusicData>({
    id: "0",
    track: "Loading Track",
    artist: "Loading Artist",
    album: "Loading Album",
  });

  useEffect(() => {
    async function getMusic() {
      try {
        const res = await fetch(
          "https://api.listenbrainz.org/1/user/lostglory_/listens",
        );
        const data = await res.json();
        const listen = data.payload.listens[0];
        setMusic({
          id: listen.track_metadata?.mbid_mapping?.release_mbid ?? "0",
          track: listen.track_metadata.track_name,
          artist: listen.track_metadata.artist_name,
          album: listen.track_metadata.release_name,
        });
      } catch (err) {
        console.log("API error occured", err);
      }
    }
    getMusic();
  }, []);
  useEffect(() => {
    async function getMusicImage() {
      try {
        if (music.id === "0") return;
        const response = await fetch(
          `https://archive.org/download/mbid-${music.id}/index.json`,
        );
        const dataget = await response.json();
        const urlGet = dataget.images?.[0]?.thumbnails?.small;
        setImg(urlGet);
      } catch (err) {
        console.log("Get image api error", err);
      }
    }
    getMusicImage();
  }, [music]);
  return (
      <div className="bg-red-600 size-128 flex justify-center items-center flex-col rounded-2xl">
        {img && (
          <Image
            className="rounded-sm"
            src={img}
            alt={music.artist}
            width={250}
            height={250}
            loading="eager"
            priority
          />
        )}
        <h1 className="text-center font-semibold tracking-tight ">
          {music.track}
        </h1>
        <h1 className="text-center">{music.artist} </h1>
      </div>
  );
}
