import { memo } from "react";

function Reactmemo({ count, onIncrease }) {
  console.log("re-render");

  return (
    <>
      <h2>Hello</h2>
      <button onClick={onIncrease}>Click me!</button>
    </>
  );
}
export default memo(Reactmemo);
