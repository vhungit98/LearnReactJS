import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export default function Content3() {
  const context = useContext(ThemeContext);
  return (
    <p className={context.theme}>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </p>
  );
}
