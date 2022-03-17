import { useState } from "react";

// ********** useState **********
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
    return storageJobs;
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

export default AppUseState4;
