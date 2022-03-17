import "./App.css";
import { useState } from "react";

// useState
function App1() {
  const orders = [100, 200, 300];
  // const total = orders.reduce((total, cur) => total + cur); // Tính toán lại sau mỗi lần re-render
  const [counter, setCounter] = useState(() => {
    const total = orders.reduce((total, cur) => total + cur); // Tính toán một lần
    console.log(total);
    return total;
  });

  // console.log(total);

  const handleIncrease = () => {
    // Chạy 1 lần
    setCounter(counter + 1);
    setCounter(counter + 1);
    // Chạy 2 lần
    // setCounter(prevState =>  prevState + 1);
    // setCounter(prevState =>  prevState + 1);
  };

  console.log("re-render");

  return (
    <div className="App">
      <h1>{counter}</h1>
      <button onClick={handleIncrease}>Increase</button>
    </div>
  );
}
function App2() {
  const [info, setInfo] = useState({
    name: "Le Van Hung",
    age: 24,
  });

  const handleUpdate = () => {
    // setInfo({
    //   ...info,
    //   address: "Da Nang",
    // });
    setInfo((prevState) => {
      // logic...
      return { ...prevState, address: "Da Nang" };
    });
  };

  return (
    <div className="App">
      <h1>{JSON.stringify(info)}</h1>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default App2;
