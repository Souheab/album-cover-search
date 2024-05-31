import AlbumInfo from "../classes/Album";

interface SearchResultsProps {
  albumsArray: Array<AlbumInfo>;
  selectedAlbumID: number;
  albumCoverThumbOnClick: (albumID: number) => void;
}

export default function SearchResults(props: SearchResultsProps) {
  return (
    <div className="flex">
      {props.albumsArray.map((album) => {
        return (
          <img
            onClick={
              () => {
                props.albumCoverThumbOnClick(album.id);
              }
            }
            className={`w-32 h-32 m-1 rounded-none cursor-pointer ${props.selectedAlbumID === album.id ? "outline outline-blue-500" : ""}`}
            key={album.id}
            src={album.coverImageThumbURL}
          />
        );
      })}
    </div>
  );
}
