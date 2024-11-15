import { GetStaticPropsContext, InferGetStaticPropsType } from "next";

type Post = {
  id: number;
  title: string;
  body: string;
};
const HomePage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      All posts goes here
      <div>here</div>
      {posts.map((post) => (
        <>
          <p>{post.id}</p>
          <p>{post.title}</p>
          <p>{post.body}</p>
        </>
      ))}
    </>
  );
};

//- fetch the data and statically generate the page with data
export const getStaticProps = async (context: GetStaticPropsContext) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts: Post[] = await response.json();

  return {
    props: {
      posts: posts,
    },
  };
};

export default HomePage;
