interface AlbumCoverProps {
  albumCoverImageURL: string | undefined;
}

export default function AlbumCover(props: AlbumCoverProps) {
  if (props.albumCoverImageURL !== undefined) {
    return (
      <img
        id="album-cover"
        className="mt-10 w-96 border-solid border border-black"
        src={props.albumCoverImageURL}
        alt="album cover"
      />
    );
  }
}
