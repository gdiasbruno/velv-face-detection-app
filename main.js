import '@mediapipe/face_detection';
import '@tensorflow/tfjs-core';
// Register WebGL backend.
import '@tensorflow/tfjs-backend-webgl';
import * as faceDetection from '@tensorflow-models/face-detection';

let video = document.getElementById('video');
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let detector;

const funnyEndings = [
  "the free snacks and Wi-Fi password",
  "the inevitable robot uprising",
  "the chance to spot real-life '404 - Not Found' moments",
  "the rare opportunity to wear a shirt without a logo",
  "the ultimate battle: coders vs. caffeine",
  "the epic quest to find a power outlet",
  "the impressive spectacle of developers in their natural habitat",
  "the excuse to replace social skills with API calls",
  "the virtual reality of avoiding small talk",
  "the unspoken challenge of deciphering tech buzzwords",
  "the glory of outsmarting autocorrect for once",
  "the search for the mythical 'Bug-Free Code' presentation",
  "the hope of finding a charger cable that isn't mysteriously frayed",
  "the endless debate: tabs vs. spaces",
  "the spectacle of programmers attempting the 'dab' dance move",
  "the thrilling quest for the last available chair",
  "the dream of witnessing a live demo without technical difficulties",
  "the opportunity to showcase your mastery of meme references",
  "the eternal mystery of why your code works at 2 AM but not at 2 PM",
  "the chance to witness programmers socializing like penguins in tuxedos"
];

const setUpCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 600, height: 400 },
        audio: false
    })
    
    video.srcObject = stream;
    
};

const loadDetector = async () => {
  const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
  const detectorConfig = {
    runtime: 'mediapipe',
    solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_detection',
                  // or 'base/node_modules/@mediapipe/face_detection' in npm.
  };
  detector = await faceDetection.createDetector(model, detectorConfig);
};

const detectFaces = async () => {
  const predictions = await detector.estimateFaces(video)

  ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

  predictions.forEach((prediction, index) => {
    ctx.beginPath();
    ctx.lineWidth = "4";
    ctx.strokeStyle = "blue";
    // console.log("prediction", prediction.box.xMin);
    ctx.rect(
      prediction.box.xMin,
      prediction.box.yMin,
      prediction.box.width,
      prediction.box.height
    );
    ctx.stroke();
    ctx.font = '15px bold sans-serif';
    ctx.fillText(funnyEndings[index], prediction.box.xMin, (prediction.box.yMax + 30)); 
  });
};

(async () => {
    await setUpCamera();
    await loadDetector();

    setInterval(detectFaces,30);
})();    
