import { api } from "~/trpc/server";
import { redirect } from "next/navigation";
import CategoryList from "./_components/category-list";

export default async function Home() {
  const session = await api.auth.me();
  const categories = await api.category.list();

  if (session.user === null) {
    redirect(`/login`);
  }
  return (
    <>
      <div>
        <h2 className="text-center text-2xl font-semibold">
          Please mark your interests!
        </h2>
        <h2 className="mb-5 mt-3 text-center text-sm">
          We will keep you notified.
        </h2>
        <CategoryList categories={categories} />
      </div>
    </>
  );
}
