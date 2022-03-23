import { useRef, forwardRef, useImperativeHandle } from "react";
import music from "./videos/music.mp4";

function Video(props, ref) {
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
