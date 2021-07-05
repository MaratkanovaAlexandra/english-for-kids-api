function playAudio(src: string): void {
  const audio = new Audio(`${src}`);
  audio.currentTime = 0;
  audio.play();
}

export default playAudio;
