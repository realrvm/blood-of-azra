interface ContentImage {
  title: string
  image: {
    url: string
  }
}

interface ContentChapter {
  comics: ContentImage[]
  title: string
}

export interface ContentBook {
  chapters: ContentChapter[]
  title: string
}

interface ContentBooks {
  books: {
    book: ContentBook[]
  }
}

export interface Content {
  data: ContentBooks[]
}

export interface CachedImage {
  id: number
  blob: Blob
}

export interface AzraImage {
  id: number
  url: string
}

export interface AzraChapter {
  id: string
  comics: AzraImage[]
}

export interface ChaptersTitleAndId {
  imgId: number
  title: string
}
