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
