export default class AlbumInfo {
  private static idCounter: number = 0;
  id: number;
  matchScore: number;
  coverImageURL: string;
  coverImageThumbURL: string;

  constructor(matchScore: number, coverImageURL: string, coverImageThumbURL: string) {
    this.id = AlbumInfo.idCounter++;
    this.matchScore = matchScore;
    this.coverImageURL = coverImageURL;
    this.coverImageThumbURL = coverImageThumbURL;
  }

}
