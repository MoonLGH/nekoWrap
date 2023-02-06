import { genrelist } from "./constants";

export interface Download {
    title:string,
    list:Provider[],
}

export type genrelistType = typeof genrelist[number]

export interface DownloadOption {
    fileName:string
}

export interface Provider {
    provider:string,
    link:string,
}


export interface Mirror {
    host:string,
    url:string,
    status:string,
}

export interface HentaiObject {
    thumb:string,
    japanese: string;
    jenis: string;
    episode: string;
    status: string;
    tayang: string;
    produser: string;
    genres: string;
    durasi: string;
    skor: string;
    episodeList: eps[]
  }
  
  export interface eps {
      title: string;
      url: string;
      date: string;
      id: string;
  }

  
export interface AnimeShort {
    type:string,
    url:string,
    thumb:string,
    id:string,
    title:string
}
  
  
  