## How Data Fetching Works

The app uses SWR (stale-while-revalidate) for all data operations. Here is how it works:

### Initial Load

- When the app loads, the useUsers hook calls useSWR with the API URL
- SWR checks if there is cached data for this URL
- If no cache exists, it calls the fetcher function to get data from json-server
- The data is stored in SWR's in-memory cache
- The component re-renders with the fetched data

### Caching Behavior

SWR is configured with these options:

- revalidateOnFocus: false - does not refetch when you switch tabs
- revalidateOnReconnect: false - does not refetch when internet comes back
- revalidateIfStale: false - does not automatically refetch stale data
- revalidateOnMount: false - uses cache if available, does not refetch on mount

This means:

- Data is fetched once on first load
- Navigating away and back uses the cached data
- No unnecessary API calls are made
- Data only refreshes when you explicitly trigger it

### Why These Settings

I chose to disable all automatic revalidation because:

- This is a local mock backend, not a real API with other users
- We want full control over when data refreshes
- It makes testing the cache behavior easier
- In a real app you might want some of these enabled

## CRUD Operations

### Read (GET)

- Happens automatically when useUsers hook mounts
- SWR handles the fetch and caching
- Returns users array, loading state, and error state

### Update (PUT)

When you edit a user:

1. EditUserModal collects the form data
2. It calls updateUser(id, userData) from useUsers
3. updateUser sends a PUT request to json-server
4. json-server updates the db.json file
5. After PUT succeeds, we call mutate() to refetch
6. SWR fetches fresh data from the server
7. UI updates with the confirmed data

### Delete (DELETE)

When you delete a user:

1. UsersList shows a confirmation popup
2. On confirm, it calls deleteUser(id) from useUsers
3. deleteUser sends a DELETE request to json-server
4. json-server removes the user from db.json
5. After DELETE succeeds, we call mutate() to refetch
6. SWR fetches fresh data from the server
7. UI updates without the deleted user

## The mutate() Function

This is the key to understanding SWR. mutate() can do two things:

1. Called with no arguments: mutate()
   - Triggers a revalidation
   - Fetches fresh data from the API
   - Updates the cache with new data

2. Called with data: mutate(newData)
   - Updates the cache directly
   - Can skip revalidation with { revalidate: false }
   - Used for optimistic updates

We use the first approach because we want server-confirmed data after each operation.

## Things I Would Change in Production

1. Add error handling for failed API requests
2. Add loading states during mutations
3. Add optimistic updates for better UX
4. Use environment variables for API URL
5. Add proper form validation
6. Add user authentication
7. Use a real database instead of json-server
