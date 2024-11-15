import {
  NextPage,
  GetStaticPropsContext,
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPaths,
} from "next";
import { ParsedUrlQuery } from "querystring";

type Post = {
  id: number;
  title: string;
  body: string;
};

interface Params extends ParsedUrlQuery {
  postId: string;
}

const PostDetail: NextPage<{
  post: InferGetStaticPropsType<typeof getStaticProps>;
}> = ({ post }) => {
  return (
    <>
      <p>{post.id}</p>
      <p>{post.title}</p>
      <p>{post.body}</p>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const posts: Post[] = await response.json();

  const allPostIds = posts.map((post) => ({
    params: {
      postId: post.id.toString(),
    },
  }));

  return {
    paths: allPostIds,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { postId } = context.params as Params;
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    const post: Post = await response.json();
    if (!post) {
      return { notFound: true };
    }
    return {
      props: {
        post: post,
      },
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return {
      notFound: true, // Return 404 if fetch fails
    };
  }
};

export default PostDetail;
