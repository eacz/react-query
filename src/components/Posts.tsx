import { useState } from "react";
import { useQuery } from "react-query";
import { Post } from "../interfaces";

import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

async function fetchPosts() {
  const response = await fetch(
    "https://jsosnplaceholder.typicode.com/posts?_limit=10&_page=0"
  );
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedPost, setSelectedPost] = useState<Post>();

  const {data, isError, isLoading, error, /* isFetching */}= useQuery<Post[]>('posts', fetchPosts)
  //the diference between isLoading and isFetching,  is that isFetching is the async query that hasn't been solved yet
  //isLoading is the same, but with the plus that there is no cached data 
  //by default react query tries to run te request 3 times if there is any error
  if(isLoading) return <h2>Loading...</h2>
  if(isError) return <h2>Error</h2> 

  return (
    <>
      <ul>
        {data!.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button disabled onClick={() => {}}>
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled onClick={() => {}}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
