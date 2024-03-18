import { api } from "~/trpc/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await api.auth.me();

  if (session.user === null) {
    redirect(`/login`);
  }
  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <h6 className="text-2xl">{session.user.name}</h6>
        <h6 className="text-2xl">{session.user.email}</h6>
      </div>
    </>
  );
}
