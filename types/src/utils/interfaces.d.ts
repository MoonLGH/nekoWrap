export interface download {
    title: string;
    list: Provider[];
}
export interface Provider {
    provider: string;
    link: string;
}
export interface HentaiObject {
    japanese: string;
    jenis: string;
    episode: string;
    status: string;
    tayang: string;
    produser: string;
    genres: string;
    durasi: string;
    skor: string;
    episodeList: eps[];
}
export interface eps {
    title: string;
    url: string;
    date: string;
    id: string;
}
export interface AnimeShort {
    type: string;
    url: string;
    thumb: string;
    id: string;
    title: string;
}
