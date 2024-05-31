import { useEffect, useState } from "react";
import SearchForm from "./components/SearchForm";
import SearchResults from "./components/SearchResults";
import AlbumCover from "./components/AlbumCover";
import { fetchAlbumImages, fetchQueryJSON } from "./api";
import AlbumInfo from "./classes/Album";
import AlbumCoverDownloadButton from "./components/AlbumCoverDownloadButton";

const numAlbumsToFetch = 5;

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [albumsArray, setAlbumsArray] = useState([] as AlbumInfo[]);
  const [selectedAlbumID, setSelectedAlbumID] = useState(-1);
  const [albumCoverURL, setAlbumCoverURL] = useState(('' as string | undefined));

  useEffect(() => {
    setAlbumCoverURL(albumsArray.find(album => album.id === selectedAlbumID)?.coverImageURL);
  }, [selectedAlbumID]);

  async function fetchAlbumInfo() {
    const data = await fetchQueryJSON(searchQuery);
    const newAlbumsArray: Array<AlbumInfo> = [];

    await Promise.all(
      data.releases.slice(0, numAlbumsToFetch).map(async (release: any) => {
        try {
          const matchScore = release.score;
          const mbid = release.id;
          const [albumCoverURL, albumCoverThumbURL] =
            await fetchAlbumImages(mbid);
          const album = new AlbumInfo(
            matchScore,
            albumCoverURL,
            albumCoverThumbURL,
          );
          newAlbumsArray.push(album);
        } catch (error) {
          console.error("Caught error: ", error);
        }
      }),
    );

    newAlbumsArray.sort((a, b) => b.matchScore - a.matchScore);
    setSelectedAlbumID(newAlbumsArray[0].id);
    setAlbumsArray(newAlbumsArray);
  }

  useEffect(() => {
    if (searchQuery !== "") {
      fetchAlbumInfo();
    }
  }, [searchQuery]);

  return (
    <>
      <main className="h-screen">
        <div className="flex flex-col items-center">
          <header className="bg-gray-800 text-white p-4 w-full">
            {" "}
            Album Cover Search{" "}
          </header>
          <SearchForm
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const element = document.getElementById(
                "album-search-input",
              ) as HTMLInputElement;
              const query = element.value;
              setSearchQuery(query);
            }}
          />
          <SearchResults
            albumsArray={albumsArray}
            selectedAlbumID={selectedAlbumID}
            albumCoverThumbOnClick={(albumID: number) =>
              setSelectedAlbumID(albumID)
            }
          />
          <AlbumCover albumCoverImageURL={albumCoverURL} />
          <AlbumCoverDownloadButton
            selectedAlbumCoverImageURL={albumCoverURL}
          />
        </div>
      </main>
    </>
  );
}

export default App;
