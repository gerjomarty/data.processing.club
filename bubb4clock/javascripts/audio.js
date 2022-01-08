export { enableAudio };

function enableAudio(audioSelect, audioCanvas) {
  audioSelect.addEventListener("change", (e) => {
    switch(e.target.value) {
      case "13305":
        audioCanvas.src = "assets/登る小さな幼生.mp3";
        audioCanvas.load();
        audioCanvas.play();
        break;
      case "13798":
        audioCanvas.src = "assets/デートコース.mp3"
        audioCanvas.load();
        audioCanvas.play();
        break;
      case "12459":
        audioCanvas.src = "assets/おもちゃのダンス.mp3";
        audioCanvas.load();
        audioCanvas.play();
        break;
      default:
        audioCanvas.pause();
    }
  });
}