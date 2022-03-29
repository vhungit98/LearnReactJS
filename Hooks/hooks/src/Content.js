import { useEffect, useLayoutEffect, useState } from "react";

// 1. useEffect(callback)
// - Gọi callback mỗi khi component re-reder
// - Gọi callback sau khi component thêm element vào DOM
// 2. useEffect(callback, [])
// - Chỉ gọi callback 1 lần sau khi component mounted
// 3. useEffect(callback, [deps])
// - Callback sẽ được gọi lại mỗi khi deps thay đổi
///////////////////////////////// Điểm chung:
// 1. Callback luôn được gọi sau khi component mounted
// 2. Cleanup function luôn được gọi trước khi component unmounted
// 3. Cleanup function luôn được gọi trước khi callback được gọi lại (trừ lần mounted)

function UseEffect1() {
  const tabs = ["posts", "comments", "albums"];
  const [title, setTitle] = useState("");
  const [posts, setPosts] = useState([]);
  const [type, setType] = useState("posts");
  const [showGoToTop, setShowGoToTop] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  // console.log(type);

  // useEffect(() => {
  //   console.log("Mounted", title);
  //   document.title = title; // Set title page website
  // });

  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/posts")
  //     .then((res) => res.json())
  //     .then((posts) => {
  //       console.log(posts);
  //       setPosts(posts);
  //     });
  // }, []);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then((res) => res.json())
      .then((posts) => {
        // console.log(posts);
        setPosts(posts);
      });
  }, [type]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 200) {
        //show
        setShowGoToTop(true);
        console.log("Set state"); // set state được gọi nhưng component sẽ không render vì không thỏa oldState !== newState
      } else {
        // hide
        setShowGoToTop(false);
      }
      // setShowGoToTop(window.scrollY >= 200);
    };
    window.addEventListener("scroll", handleScroll); // Gọi tạo mới mỗi khi component mounted
    console.log("addEventListener ...");

    // Cleanup fuction (hàm dọn dẹp)
    return () => {
      console.log("removeEventListener ...");
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log("re-render");

  return (
    <div>
      <h1>Width screen: {width}</h1>
      {tabs.map((tab) => {
        return (
          <button
            key={tab}
            onClick={() => setType(tab)}
            style={
              type === tab
                ? {
                    color: "#fff",
                    backgroundColor: "#333",
                  }
                : {}
            }
          >
            {tab}
          </button>
        );
      })}
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <ul>
        {posts.map((post) => {
          return <li key={post.id}>{post.title || post.name}</li>;
        })}
      </ul>
      {showGoToTop && (
        <button
          style={{
            position: "fixed",
            right: 20,
            bottom: 20,
          }}
        >
          Go to top
        </button>
      )}
    </div>
  );
}

function UseEffect2() {
  const [countDown, setCountDown] = useState(180);

  useEffect(() => {
    const timeId = setInterval(() => {
      setCountDown((prevState) => prevState - 1);
    }, 1000);
    return () => clearInterval(timeId);
  }, []);
  // useEffect(() => {
  //   const timeId = setTimeout(() => {
  //     setCountDown(countDown - 1);
  //   }, 1000);
  //   return () => clearTimeout(timeId);
  // }, [countDown]);

  return (
    <div>
      <h1>{countDown}</h1>
    </div>
  );
}

function UseEffect3() {
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    // Delete img after unmounted
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview);
    };
  }, [avatar]);

  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0]; // Lấy ra file từ list file của input
    file.preview = URL.createObjectURL(file);
    console.log(file);
    setAvatar(file);

    e.target.value = null; // Xử lý chọn nhiều lần trên cùng một ảnh
    console.log(123);
  };

  return (
    <div>
      <input type="file" onChange={handlePreviewAvatar} />
      {avatar && <img src={avatar.preview} alt="img" width="50%" />}
    </div>
  );
}

function UseEffect4() {
  const lessons = [
    {
      id: 1,
      name: "ReactJS là gì? Tại sao nên học ReactJS",
    },
    {
      id: 2,
      name: "SPA/MPA là gì?",
    },
    {
      id: 3,
      name: "Arrow function là gì?",
    },
  ];
  const [lessonId, setLesonId] = useState(1);

  useEffect(() => {
    const handleComment = ({ detail }) => {
      console.log(detail);
    };
    window.addEventListener(`lesson-${lessonId}`, handleComment);

    return () => {
      window.removeEventListener(`lesson-${lessonId}`, handleComment);
    };
  }, [lessonId]);

  return (
    <div>
      <ul>
        {lessons.map((lesson) => (
          <li
            key={lesson.id}
            style={{
              color: lessonId === lesson.id ? "red" : "#333",
              cursor: "pointer",
            }}
            onClick={() => setLesonId(lesson.id)}
          >
            {lesson.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

// useEffect:
// 1: Cập nhật lại state
// 2. Cập nhật lại DOM (mutated)
// 3. Render lại UI
// 4. Gọi cleanup nếu deps thay đổi
// 5. Gọi useEffect callback

// useLayoutEffect:
// 1: Cập nhật lại state
// 2. Cập nhật lại DOM (mutated)
// 4. Gọi cleanup nếu deps thay đổi (sync)
// 5. Gọi useLayoutEffect callback (sync)
// 3. Render lại UI
export default function UseLayoutEffect1() {
  const [count, setCount] = useState(0);

  // useEffect(() => {
  //   if (count > 3) setCount(0);
  // }, [count]);

  useLayoutEffect(() => {
    console.log('Callback ...');
    if (count > 3) setCount(0);
    return () => {
      console.log('Cleanup ...');
    };
  }, [count]);

  const handleRun = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={handleRun}>Run</button>
    </div>
  );
}
