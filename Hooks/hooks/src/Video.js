import { useRef, forwardRef, useImperativeHandle } from "react";
import music from "./videos/music.mp4";

function Video(props, ref) {
  console.log('props component con: ', props);
  console.log('ref conponent con: ', ref);
  const videoRef = useRef();

  useImperativeHandle(ref, () => ({
    play() {
      videoRef.current.play();
    },
    pause() {
      videoRef.current.pause();
    },
  }));

  return (
    <video
      ref={videoRef}
      width={400}
      src={music}
      //   controls
    />
  );
}

export default forwardRef(Video);
