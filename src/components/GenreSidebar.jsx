"use client";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useGenres } from "@/hooks/useGenres";

export const GenreSidebar = () => {
  const { genres, isLoading } = useGenres();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const mainId = params.id ? String(params.id) : null;
  const extraIds = searchParams.get("extra")?.split(",").filter(Boolean) || [];
  const selectedIds = mainId ? [mainId, ...extraIds] : extraIds;

  const toggleGenre = (id) => {
    const idStr = String(id);
    const updated = selectedIds.includes(idStr)
      ? selectedIds.filter((g) => g !== idStr)
      : [...selectedIds, idStr];

    if (updated.length === 0) {
      router.push("/genre");
      return;
    }

    const [newMain, ...newExtra] = updated;
    const params = new URLSearchParams();
    if (newExtra.length > 0) params.set("extra", newExtra.join(","));
    params.set("page", "1");

    router.push(`/genre/${newMain}?${params.toString()}`);
  };

  if (isLoading) return <div>Loading genres...</div>;

  return (
    <div className="flex-col items-start w-[600] h-[333] p-5">
      <h1 className="font-semibold">Genres</h1>
      <h2>See lists of movies by genre</h2>
      <div className="grid grid-cols-3 gap-2 p-2 ">
        {genres.map((genre) => {
          const isSelected = selectedIds.includes(String(genre.id));
          return (
            <button
              key={genre.id}
              onClick={() => toggleGenre(genre.id)}
              className={`flex items-center rounded-4xl border gap-2 px-2 py-1 font-bold text-8${
                isSelected ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              {genre.name} &gt; {isSelected && "✕"}
            </button>
          );
        })}
      </div>
    </div>
  );
};
