import { Post } from "../interfaces";
import { Comment } from '../interfaces/index';
import { useQuery } from 'react-query';

async function fetchComments(postId: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    //{ method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

interface Props {
  post: Post
}
export function PostDetail({ post } : Props) {
  // replace with useQuery
  const { data, isLoading, isError } = useQuery<Comment[]>('comments', () => fetchComments(post.id));

  return (
    <>

      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button>Delete</button> <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {isLoading && <h3 style={{color: 'aquamarine'}}>Loading comments...</h3>}
      {isError && <h3 style={{color: 'red'}} >Error loading comments, please refresh</h3>}
      {data?.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
