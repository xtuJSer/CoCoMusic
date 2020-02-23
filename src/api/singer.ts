import { baseRequest, parseParams } from './base-request'

interface Singer {
  country: string;
  singerId: number;
  singerMid: string;
  singerName: string;
  singerPic: string;
}

interface TagItem{
  id: number;
  name: string;
}

interface Tag {
  area: Array<TagItem>;
  genre: Array<TagItem>;
  index: Array<TagItem>;
  sex: Array<TagItem>;
}

interface SingerList {
  singerlist: Array<Singer>;
  area: number;
  genre: number;
  index: number;
  sex: number;
  tags: Array<Tag>;
  total: number;
}

interface SongInfo {
  id: number;
  type: number;
  mid: string;
  name: string;
  title: string;
  subtitle: string;
  singer: [
    {
      id: number;
      mid: string;
      name: string;
      title: string;
      type: number;
      uin: number;
    }
  ];
  album: {
    id: number;
    mid: string;
    name: string;
    title: string;
    subtitle: string;
  };
  mv: {
    id: number;
    vid: string;
    name: string;
    title: string;
  };
}

interface SingerSongList {
  singerMid: string;
  totalNum: number;
  songList: [{
    songInfo: Array<SongInfo>;
  }];
}

interface AlbumList {
  singerMid: string;
  albumList: [
    {
      albumMid: string;
      albumName: string;
      albumTranName: string;
      publishDate: string;
      totalNum: number;
      albumType: string;
      pmid: string;
      albumID: number;
      singerName: string;
    }
  ];
  total: number;
}
// eslint-disable-next-line @typescript-eslint/camelcase
export async function getSingerList (area = -100, sex = -100, index = -100, genre = -100, cur_page = 1, sin = 0) {
  const requestParams = parseParams({
    singerList: {
      module: 'Music.SingerListServer',
      method: 'get_singer_list',
      param: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        area, sex, index, genre, cur_page, sin
      }
    }
  })

  const { singerList: { data } }: {
    singerList: {
      data: SingerList;
    };
  } = (await baseRequest({
    params: {
      data: requestParams
    }
  })).data

  return data
}

export async function getSingerMusicList (singerMid: string, order = 1, begin = 0, num = 10) {
  const requestParams = parseParams({
    singerSongList: {
      module: 'musichall.song_list_server',
      method: 'GetSingerSongList',
      param: {
        order, singerMid, begin, num
      }
    }
  })
  const { singerSongList: { data } }: {
    singerSongList: {
      data: SingerSongList;
    };
  } = (await baseRequest({
    params: {
      data: requestParams
    }
  })).data

  return data
}

export async function getSingerAlbumList (singerMid: string, order = 1, begin = 0, num = 10, songNumTag = 0, singerID = 0) {
  const requestParams = parseParams({
    getAlbumList: {
      module: 'music.musichallAlbum.AlbumListServer',
      method: 'GetAlbumList',
      param: {
        order, singerMid, begin, num, songNumTag, singerID
      }
    }
  })
  const { getAlbumList: { data } }: {
    getAlbumList: {
      data: AlbumList;
    };
  } = (await baseRequest({
    params: {
      data: requestParams
    }
  })).data

  return data
}
