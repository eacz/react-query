import { Post } from "../interfaces";
import { Comment } from '../interfaces/index';
import { useMutation, useQuery } from 'react-query';

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
    { method: "PATCH", body: JSON.stringify({ title: "This wouldn't work :/"}) }
  );
  return response.json();
}

interface Props {
  post: Post
}
export function PostDetail({ post } : Props) {
  //the first argument of useQuery can be an array of dependencies, if these dependencies changes, there'll be a refetch
  const { data, isLoading, isError } = useQuery<Comment[]>(['comments', post.id], () => fetchComments(post.id));
  const deleteMutation = useMutation((PostId: number) =>  deletePost(PostId) )
  const updateMutation = useMutation((postId: number) => updatePost(postId))
  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      
      <button onClick={() => deleteMutation.mutate(post.id)} >Delete</button> 
      <button onClick={() => updateMutation.mutate(post.id)} >Update title</button>

      {deleteMutation.error && <p style={{color: 'red'}}> Error deleting the post</p> }
      {deleteMutation.isLoading && <p style={{color: 'purple'}}> deleting the post...</p> }
      {deleteMutation.isSuccess && <p style={{color: 'green'}}> successfully deleted the post...</p> }

      {updateMutation.error && <p style={{color: 'red'}} >Error updating the post</p>}
      {updateMutation.isLoading && <p style={{color: 'purple'}} >updating the post...</p>}
      {updateMutation.isSuccess && <p style={{color: 'green'}} >successfully updated the post</p>}
      
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
