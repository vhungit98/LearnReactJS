import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import "./App.css";
import Content from "./Content";
import Content2 from "./Content2";
import Reactmemo from "./Reactmemo";
import { ThemeContext } from "./ThemeContext";
import ToDo from "./Todo";
import { useStore, actions } from "./store";
import Video from "./Video";

// ********** useState hook **********
function AppUseState1() {
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
    <div style={{ padding: 30 }}>
      <h1>{counter}</h1>
      <button onClick={handleIncrease}>Increase</button>
    </div>
  );
}
//
function AppUseState2() {
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
    <div style={{ padding: 30 }}>
      <h1>{JSON.stringify(info)}</h1>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}
//
function AppUseState3() {
  const gifts = ["Gift 1", "Gift 2", "Gift 3"];
  const [gift, setGift] = useState();

  const randomGift = () => {
    const index = Math.floor(Math.random() * gifts.length);
    setGift(gifts[index]);
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>{gift || "Chưa có phần thưởng"}</h1>
      <button onClick={randomGift}>Lấy thưởng</button>
    </div>
  );
}
//
function AppUseState4() {
  const [job, setJob] = useState("");
  const [jobs, setJobs] = useState(() => {
    const storageJobs = JSON.parse(localStorage.getItem("jobs"));
    return storageJobs ?? [];
  }); // ??: null or undefined thì bỏ qua

  const handleSubmit = () => {
    setJobs((prev) => {
      const newJobs = [...prev, job];
      const jsonJobs = JSON.stringify(newJobs);
      localStorage.setItem("jobs", jsonJobs);
      return newJobs;
    });
    setJob("");
  };

  return (
    <div style={{ padding: 30 }}>
      <input value={job} onChange={(e) => setJob(e.target.value)} />
      <button onClick={handleSubmit}>Add</button>
      <ul>
        {jobs.map((job, index) => (
          <li key={index}>{job}</li>
        ))}
      </ul>
    </div>
  );
}
//
// ********** Two-way binding **********
function AppTwoWayBinding1() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    // Call API
    console.log({
      name,
      email,
    });
  };

  console.log("re-render");

  return (
    <div style={{ padding: 30 }}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}
//
function AppTwoWayBinding2() {
  const courses = [
    {
      id: 1,
      name: "HTML-CSS",
    },
    {
      id: 2,
      name: "Javascript",
    },
    {
      id: 3,
      name: "ReactJS",
    },
  ];
  const [checked, setChecked] = useState(1); // Set Initialize State nếu muốn checked mặc định

  const handleSubmit = () => {
    // Call API
    console.log({ id: checked });
  };

  return (
    <div style={{ padding: 30 }}>
      {courses.map((course) => (
        <div key={course.id}>
          <input
            type={"radio"}
            checked={checked === course.id}
            onChange={() => setChecked(course.id)}
          />
          {course.name}
        </div>
      ))}
      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}
//
function AppTwoWayBinding3() {
  const courses = [
    {
      id: 1,
      name: "HTML-CSS",
    },
    {
      id: 2,
      name: "Javascript",
    },
    {
      id: 3,
      name: "ReactJS",
    },
  ];
  const [checked, setChecked] = useState([]);

  const handleCheck = (id) => {
    setChecked((prevState) => {
      const isChecked = checked.includes(id);
      if (isChecked) return checked.filter((item) => item !== id);
      else return [...prevState, id];
    });
  };
  const handleSubmit = () => {
    // Call API
    console.log({ ids: checked });
  };

  return (
    <div style={{ padding: 30 }}>
      {courses.map((course) => (
        <div key={course.id}>
          <input
            type="checkbox"
            checked={checked.includes(course.id)}
            onChange={() => handleCheck(course.id)}
          />
          {course.name}
        </div>
      ))}
      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}
//
// ********** Mounted - Unmounted binding **********
function AppMountedUnmounted1() {
  const [show, setShow] = useState(false);
  return (
    <div style={{ padding: 30 }}>
      <button onClick={() => setShow(!show)}>Toggle</button>
      {show && <Content />}
    </div>
  );
}
//
// ********** useEffect, useLayoutEffect hook **********
function AppUseEffectuseLayOutEffect() {
  const [show, setShow] = useState(false);
  return (
    <div style={{ padding: 30 }}>
      <button onClick={() => setShow(!show)}>Toggle</button>
      {show && <Content />}
    </div>
  );
}
//
// ********** useRef hook **********
// Lưu các giá trị qua một tham chiếu bên ngoài function component
function AppUseRef1() {
  const [count, setCount] = useState(60);
  const timeId = useRef();
  const prevCount = useRef();
  const h1Ref = useRef();

  useEffect(() => {
    prevCount.current = count;
  }, [count]);

  useEffect(() => {
    const rect = h1Ref.current.getBoundingClientRect();
    console.log(rect);
  });

  const handleStart = () => {
    timeId.current = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);
    console.log("Start -> ", timeId.current);
  };

  const handleStop = () => {
    clearInterval(timeId.current);
    console.log("Stop -> ", timeId.current);
  };

  console.log(count, prevCount.current);

  return (
    <div style={{ padding: 30 }}>
      <h1 ref={h1Ref}>{count}</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
    </div>
  );
}
//
// ********** React.memo HOC, useCallback hook **********
// memo() -> Higher Order Component (HOC)
// Tránh component con re-reder khi không cần thiết (component cha bị re-render)
// memo() nhận vào 1 component, sau đó check các props của component có bị thay đổi hay không, nếu có ít nhất 1 props bị thay đổi thì sẽ re-render
// useCallback sử dụng cho callback, sau khi đã sử dụng React.memo
function AppReactmemo1() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  const handleIncrease = useCallback(() => {
    setCount((count) => count + 1);
  }, []); // Nếu có deps và deps thay đổi thì useCallback sẽ callback vào một tham chiếu mới và return tham chiếu đó

  const handleIncrease2 = () => {
    setCount2((count2) => count2 + 1);
  };
  console.log("re-render component cha ...");
  return (
    <div style={{ padding: 30 }}>
      <Reactmemo onIncrease={handleIncrease} count={count} />
      <h1>{count}</h1>
      <h1>{count2}</h1>
      <button onClick={handleIncrease}>Click me re-render!</button>
      <button onClick={handleIncrease2}>Click me not re-render 2!</button>
    </div>
  );
}
//
// ********** useMemo hook **********
function AppUseMemo1() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [products, setProducts] = useState([]);
  const nameRef = useRef();

  const handleSubmit = () => {
    setProducts([
      ...products,
      {
        name,
        price: +price,
      },
    ]);
    setName("");
    setPrice("");
    nameRef.current.focus();
  };

  const total = useMemo(() => {
    const result = products.reduce((result, product) => {
      console.log("Tính toán lại ...");

      return result + product.price;
    }, 0);
    return result;
  }, [products]);

  console.log("re-render");

  return (
    <div style={{ padding: 30 }}>
      <input
        ref={nameRef}
        value={name}
        placeholder="Enter name..."
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <input
        value={price}
        placeholder="Enter price..."
        onChange={(e) => setPrice(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Add</button>
      <br />
      Total: {total}
      <ul>
        {products.map((product, index) => {
          return (
            <li key={index}>
              {product.name} - {product.price}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
//
// ********** useReducer hook **********
// useState:
// 1. Init state: 0
// 2. Actions: Up (state + 1) / Down (state - 1)
//----------
// useReducer:
// 1. Init state: 0
// 2. Actions: Up (state + 1) / Down (state - 1)
// 3. Create reducer
// 4. Dispatch

function AppUseReducer1() {
  // Init state:
  const initState = 0;

  // Actions:
  const UP_ACTION = "up";
  const DOWN_ACTION = "up";

  // Create reducer
  const reducer = (state, action) => {
    console.log("Reducer running ...");
    switch (action) {
      case UP_ACTION:
        return state + 1;
      case DOWN_ACTION:
        return state - 1;
      default:
        throw new Error("Invalid action");
    }
  };
  const [count, dispatch] = useReducer(reducer, initState);

  return (
    <div style={{ padding: 30 }}>
      <h1>{count}</h1>
      <button onClick={() => dispatch(DOWN_ACTION)}>Down</button>
      <button onClick={() => dispatch(UP_ACTION)}>Up</button>
    </div>
  );
}
//
function AppUseReducer2() {
  return (
    <div style={{ padding: 30 }}>
      <ToDo />
    </div>
  );
}
//
// ********** useContext hook **********
// Truyền dữ liệu từ component cha tới component con mà không cần thông qua bước trung gian
// CompA => CompB => CompC
// => CompA => CompC
// 1. Create context
// 2. Provider
// 3. Consumer
function AppUseContext1() {
  const context = useContext(ThemeContext);
  return (
    <div style={{ padding: 30 }}>
      <button onClick={context.toggleTheme}>Toggle theme</button>
      <Content2 />
    </div>
  );
}
//
function AppUseContext2() {
  const [state, dispatch] = useStore();
  const { todos, todoInput } = state;

  const handleAdd = () => {
    dispatch(actions.addTodo(todoInput));
  };

  return (
    <div style={{ padding: 30 }}>
      <input
        value={todoInput}
        placeholder="Enter todo ..."
        onChange={(e) => {
          dispatch(actions.setTodoInout(e.target.value));
        }}
      />
      <button onClick={handleAdd}>Add</button>
      {todos.map((todo, index) => (
        <li key={index}>{todo}</li>
      ))}
    </div>
  );
}
//
// ********** useImperativeHandle hook **********
export default function AppUseImperativeHandle1() {
  const videoRef = useRef();

  useEffect(() => {
    console.log(videoRef.current);
  });

  const handlePlay = () => {
    videoRef.current.play();
  };

  const handlePause = () => {
    videoRef.current.pause();
  };

  return (
    <div style={{ padding: 30 }}>
      <Video ref={videoRef} />
      <div>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
      </div>
    </div>
  );
}
//