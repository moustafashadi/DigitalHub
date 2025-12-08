import { useEffect, useState } from "react";

export default function PostDetails({ id }) {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts/" + id)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to fetch post details");
                }
                return res.json();
            })
            .then(data => {
                setPost(data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err.message);
                setError(err.message);
                setLoading(false);
            })
    }, [id]);

    if (loading) {
        return <p>Loading post details...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>Error: {error}</p>;
    }

    return (
        <div style={{ marginTop: 20 }}>
            <h3>{post.title.toUpperCase()}</h3>
            <p>{post.body}</p>
        </div>
    );
}