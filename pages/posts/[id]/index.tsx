import {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPaths,
} from "next";
import { ParsedUrlQuery } from "querystring";

type Post = {
  id: number;
  title?: string;
  body?: string;
};

interface Params extends ParsedUrlQuery {
  id: string;
}



// This is your page component
const PostPage = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <h1>{post.id}</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>======================</p>
    </>
  );
};

//Get static path
export const getStaticPaths: GetStaticPaths = async () => {
  const result = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data: Post[] = await result.json();

  const ids = await data.map((m: Post) => {
    return { params: { id: m.id.toString() } };
  });

  return {
    paths: ids,
    fallback: false,
  };
};

//- Fetch data at build time for the dynamic route
export const getStaticProps = async (context: GetStaticPropsContext) => {
  //- Use context.params to get the dynamic route parameter (id)
  const { id } = context.params as Params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post: Post = await res.json();

  return {
    props: { post },
  };
};


export default PostPage;
