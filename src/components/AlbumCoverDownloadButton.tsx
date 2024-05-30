interface AlbumCoverDownloadButtonProps {
  selectedAlbumCoverImageURL: string | undefined;
}

export default function AlbumCoverDownloadButton(props: AlbumCoverDownloadButtonProps) {
  if (props.selectedAlbumCoverImageURL !== undefined) {
    return (
      <a href={props.selectedAlbumCoverImageURL} target="_blank" download>
        <button className="m-10 bg-gray-800 text-white p-2">Download Highest Definition Album Cover</button>
      </a>
    );
  }
}
