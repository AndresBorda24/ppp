import { ActionFunctionArgs, json } from "react-router-dom";

import { appFetch } from "../../AppFetch";

export const loginAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const { error, data } = await appFetch<{token: string}>("POST", {
    url: "/login",
    body: { username, password },
  });

  if (error) return json(error);
  return json({ data });
};
