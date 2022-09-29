// import React from "react";
// import { useEffect } from "react";
// import { useRef } from "react";
// import * as faceapi from "face-api.js";

// export default function MeetClass() {
//   const vdo = useRef();

//   console.log(faceapi);

//   const startVideo = () => {
//     setCaptureVideo(true);
//     navigator.mediaDevices
//       .getUserMedia({ video: { width: 300 } })
//       .then((stream) => {
//         let video = vdo.current;
//         video.srcObject = stream;
//         video.play();
//       })
//       .catch((err) => {
//         console.error("error:", err);
//       });
//   };

//   const closeWebcam = () => {
//     videoRef.current.pause();
//     videoRef.current.srcObject.getTracks()[0].stop();
//     setCaptureVideo(false);
//   };

//   useEffect(() => {
//     Promise.all([faceapi.nets.faceExpressionNet.loadFromUri("/models")]).then(
//       startVideo
//     );

//     startVideo();
//   }, []);

//   return (
//     <div className="text-white flex justify-center items-center">
//       <video
//         ref={videoRef}
//         height={videoHeight}
//         width={videoWidth}
//         onPlay={handleVideoOnPlay}
//         style={{ borderRadius: "10px" }}
//       />
//       <canvas ref={canvasRef} style={{ position: "absolute" }} />
//     </div>
//   );
// }
import React from "react";

export default function MeetClass() {
  return <div>MeetClass</div>;
}
