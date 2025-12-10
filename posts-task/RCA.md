## Error #1: Cannot read properties of null (reading 'title') {#error-2}

### Error Message
```
Uncaught TypeError: Cannot read properties of null (reading 'title')
    at PostDetails (PostDetails.js:45)
```

Root Cause Analysis

#### What Happened
The component tried to access `post.title` before the data was fetched, when `post` was still `null`.

#### Why It Happened
Race Condition between Rendering and Data Fetching:

```
Timeline:
Time 0ms:   Component mounts → post = null
Time 0ms:   JSX renders → tries to access post.title
Time 5ms:   useEffect runs
Time 200ms: fetch() completes → setPost(data)
```

React's rendering is synchronous, but `useEffect` runs after the initial render.

#### Code Before (Broken)
```javascript
export default function PostDetails({ id }) {
    const [post, setPost] = useState(null);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts/" + id)
            .then(res => res.json())
            .then(data => setPost(data));
    }, [id]);

    // This runs BEFORE data arrives!
    return (
        <div>
            <h3>{post.title.toUpperCase()}</h3> {/* post is null! */}
            <p>{post.body}</p>
        </div>
    );
}
```

#### Code After (Fixed)
```javascript
export default function PostDetails({ id }) {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        
        fetch("https://jsonplaceholder.typicode.com/posts/" + id)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch');
                return res.json();
            })
            .then(data => {
                setPost(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    // Guard clauses prevent accessing null data
    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
    if (!post) return <p>No data available</p>;

    return (
        <div>
            <h3>{post.title.toUpperCase()}</h3>
            <p>{post.body}</p>
        </div>
    );
}
```

### Learning Points
- **Always handle async data with loading states**
- React renders before useEffect runs
- Guard clauses are essential for null safety
- Three states pattern: loading, error, success


## Error #2: Post Details Not Rendering After Click {#error-4}

### Error Message
```
Console: "post set to X"
UI: Nothing renders, blank screen below <hr/>
```

#### What Happened
When clicking on different posts, the component would log "post set to X" but not display the post content.

#### Why It Happened
State Not Resetting Between Post Changes:

When the `id` changed (user clicks different post), the `loading` state wasn't reset to `true`.


#### Code Before (Broken)
```javascript
useEffect(() => {
    // ❌ Doesn't reset loading state!
    fetch("https://jsonplaceholder.typicode.com/posts/" + id)
        .then(res => res.json())
        .then(data => {
            setPost(data);
            setLoading(false);
        });
}, [id]);
```

#### Code After (Fixed)
```javascript
useEffect(() => {
    // Reset all states when id changes
    setLoading(true);
    setError(null);
    setPost(null);

    fetch("https://jsonplaceholder.typicode.com/posts/" + id)
        .then(res => {
            if (!res.ok) throw new Error(`Failed to fetch post ${id}`);
            return res.json();
        })
        .then(data => {
            setPost(data);
            setLoading(false);
        })
        .catch(err => {
            setError(err.message);
            setLoading(false);
        });
}, [id]);
```

### Learning Points
- Always reset state when dependencies change in useEffect
- State from previous renders can cause bugs
- Clean state transitions improve UX
- Loading states should be reset before new operations

### Visual State Flow (Fixed)

```
User clicks Post #1:
  setLoading(true)  → Render: "Loading post 1..."
  setError(null)
  setPost(null)
  fetch...
  setPost(data)     → Render: Post #1 content ✓
  setLoading(false)

User clicks Post #2:
  setLoading(true)  → Render: "Loading post 2..." ✓
  setError(null)    → Clear any old errors ✓
  setPost(null)     → Clear old post data ✓
  fetch...
  setPost(data)     → Render: Post #2 content ✓
  setLoading(false)
```

### Pattern: State Reset in useEffect

**Best Practice:**
```javascript
useEffect(() => {
    //reset relevant states at the start of a useEffect
    setLoading(true);
    setError(null);
    setData(null);
    
    // Then perform your async operation
    fetchData();
}, [dependency]);
```

This pattern ensures:
- No stale data
- Proper loading indicators
- Clear error states
- Predictable behavior
