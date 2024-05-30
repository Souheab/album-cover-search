export async function fetchQueryJSON(albumSearchQuery: string) {
  const response = await fetch(`https://musicbrainz.org/ws/2/release/?query=${albumSearchQuery}&fmt=json`);
  if (!response.ok) throw new Error(`Bad HTTP Response, status: ${response.status}`);
  const data = await response.json();
  return data;
}

export async function fetchAlbumImages(mbid: string): Promise<Array<string>> {
  const response = await fetch(`https://coverartarchive.org/release/${mbid}`);
  if (!response.ok) throw new Error(`Bad HTTP Response, status: ${response.status}`);
  const data = await response.json();
  return [data.images[0].image, data.images[0].thumbnails["250"]];
}

