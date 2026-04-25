export const localPhotos: string[] = Array.from(
  { length: 48 },
  (_, i) => `/media/photos/photo-${String(i + 1).padStart(2, "0")}.jpeg`,
);

export const localVideos: string[] = [
  "/media/videos/video-1.mp4",
  "/media/videos/video-2.mp4",
  "/media/videos/video-3.mp4",
];
