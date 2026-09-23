import { redirect } from "next/navigation";
import { getAuthUser, requireUser } from "@/lib/auth";
import { homePath } from "@/lib/journey";
import LoginView from "./login-view";

export default async function LoginPage() {
  if (await getAuthUser()) {
    redirect(homePath(await requireUser()));
  }
  return <LoginView />;
}
