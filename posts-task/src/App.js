import { useEffect, useState } from "react";
import PostDetails from "./PostDetails";
import PostErrorBoundary from "./postErrorBoundary";

function App() {
  const [posts, setPosts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  const handleRetryPost = (postId) => {
    console.log(`Retrying post ${postId}`);
    // Force re-render by resetting and setting selectedId
    setSelectedId(null);
    setTimeout(() => setSelectedId(postId), 0);
  };

  const handleDismissError = (postId) => {
    console.log(`Dismissing error for post ${postId}`);
    setSelectedId(null);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Posts List</h2>
      {posts.map(p => (
        <p key={p.id} onClick={() => setSelectedId(p.id)} style={{ cursor: "pointer" }}>
          {p.title}
        </p>
      ))}

      <hr />

      {selectedId && (
        <PostErrorBoundary
          postId={selectedId}
          onRetry={handleRetryPost}
          onDismiss={handleDismissError}
          key={selectedId} //forces remount on ID change
        >
          <PostDetails id={selectedId} />
        </PostErrorBoundary>
      )}
    </div>
  );
}

export default App;