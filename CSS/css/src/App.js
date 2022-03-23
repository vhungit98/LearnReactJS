import "./App.css";
import Button from "./components/Button";
import GlobalStyles from "./components/GlobalStyles";
import Heading from "./components/Heading";
import Paragraph from "./components/Paragraph";

function AppCSS1() {
  return (
    <GlobalStyles>
      <div style={{ padding: "30px" }}>
        <p>Learn ReactJS</p>
        <Heading />
        <Paragraph />
      </div>
    </GlobalStyles>
  );
}
function AppCSS2() {
  return (
    <GlobalStyles>
      <div style={{ padding: "30px" }}>
        <Button primary disabled />
        <Button primary />
        <Button />
      </div>
    </GlobalStyles>
  );
}

export default AppCSS2;

// Development: npm start / yarn start -> CSS internal
// Production: npm run build / yarn build -> CSS external
