import LoginForm from "../../_components/login-form";
import { redirect } from "next/navigation";
import { api } from "~/trpc/server";

const LoginPage = async() => {
  const session = await api.auth.me();
  if (session.user !== null) {
    redirect(`/`);
  }
  return (
    <div>
      <h2 className="text-center text-3xl font-semibold">Login</h2>

      <h2 className="mt-4 mb-2 text-center text-2xl font-semibold">
        Welcome back to ECOMMERCE
      </h2>

      <h6 className="mb-4 text-center text-sm">The next gen business marketplace</h6>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
