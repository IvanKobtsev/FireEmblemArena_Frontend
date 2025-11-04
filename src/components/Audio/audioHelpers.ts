const audioContext = new AudioContext();

export function playSound(src: string, volume: number = 1) {
  fetch(src)
    .then((response) => response.arrayBuffer())
    .then((data) => audioContext.decodeAudioData(data))
    .then((buffer) => {
      const source = audioContext.createBufferSource();
      const gainNode = audioContext.createGain();

      source.buffer = buffer;
      source.connect(gainNode);
      gainNode.connect(audioContext.destination);

      gainNode.gain.value = volume;
      source.start();
    })
    .catch(console.error);
}
