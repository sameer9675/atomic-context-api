import { createContext, useContext, useMemo, useState } from "react";
import { faker } from "@faker-js/faker";

//Context api has three thing -> provider, value, consumer
//PostContext -> is a component that why its starting with capital letter

// Step 1- CREATE A CONTEXT
const PostContext = createContext(); // we can pass the default value of context in this createContext fxn -> however we usually we don't do this because this value never change with time, so it is pretty useless -> so we can make it empty or pass null

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

function PostProvider({ children }) {
  //callback inside useState -> run on initial render
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  //this we have done because when App component re render -> PostProvider also get render as its a child component
  //then this value object re created and what ever component uses the context will also get re render
  //to stop that unnecessary rendring we use useMemo to change the reference of object based on dependency matrics
  const value = useMemo(() => {
    return {
      posts: searchedPosts,
      onClearPosts: handleClearPosts,
      onAddPost: handleAddPost,
      searchQuery,
      setSearchQuery,
    };
  }, [searchQuery, searchedPosts]);

  return (
    //STEP 2-> PROVIDE VALUE TO CHILD COMPONENT
    <PostContext.Provider value={value}>{children}</PostContext.Provider>
  );
}

function usePosts() {
  const context = useContext(PostContext);

  if (!context)
    throw new Error("PostContext was used outside of the PostProvider");

  return context;
}

export { PostProvider, usePosts };
