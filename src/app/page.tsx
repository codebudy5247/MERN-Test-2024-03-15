import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "world" });
  // const hello = await api.auth.hello({text:"auth route works....."})

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <p className="text-2xl">
          {hello ? hello.greeting : "Loading tRPC query..."}
        </p>
      </div>

      <CrudShowcase />
    </>
  );
}

async function CrudShowcase() {
  const latestPost = await api.post.getLatest();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <>
          {latestPost &&
            latestPost.map((post) => (
              <div key={post.id}>
                <p className="mb-5 truncate">{post.name}</p>
              </div>
            ))}
        </>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
