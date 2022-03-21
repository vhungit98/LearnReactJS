import { useEffect, useState } from "react";

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

const tabs = ["posts", "comments", "albums"];
export default function Content() {
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
