import { ActionFunctionArgs, json, redirect } from "react-router-dom";

import { appFetch } from "../../AppFetch";
import { useAuthStore } from "../../stores/Auth";

export const loginAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const { error, data } = await appFetch<{token: string}>("POST", {
    url: "/login",
    body: { username, password },
  });

  if (error) return json(error);
  if (! data?.token) return json({ error: "Fallo al iniciar sesión" });

  const authStore = useAuthStore.getState();
  authStore.login(data.token);
  return redirect("/");
};
