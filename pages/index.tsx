import {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
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
      {posts.map((post) => (
        <>
          <h1>{post.id}</h1>
          <h1>{post.title}</h1>
          <h2>{post.body}</h2>
          <div>===============</div>
        </>
      ))}
      <h1>From Blogs</h1>
      <h1>==================</h1>
    </>
  );
};

//-Get Static Side Rendering must be exported
//- Site is generated at build time
//- As the site is pre rendered it is more SEO friendly
//- It is called the static site generation or SSG

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { id } = context.params!;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const posts: Post[] = await res.json();

  return { props: { posts: posts } };
};

export default HomePage;
