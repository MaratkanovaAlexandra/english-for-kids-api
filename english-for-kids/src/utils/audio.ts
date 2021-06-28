function playAudio(src: string): void {
  const audio = new Audio(`data:audio/wav;base64,${src}`);
  audio.currentTime = 0;
  audio.play();
}

export default playAudio;
