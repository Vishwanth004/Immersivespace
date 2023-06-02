export const isYouTubeUrl = (url: string) =>
  url.startsWith("https://youtube.com/watch") ||
  url.startsWith("https://m.youtube.com/watch") ||
  url.startsWith("https://www.youtube.com/watch") ||
  url.startsWith("https://www.youtube.com/embed/") ||
  url.startsWith("https://youtu.be/")

export const isYouTubePlaylistUrl = (url: string) => isYouTubeUrl(url) && url.includes("/playlist")
