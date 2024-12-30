import { Form, useActionData } from "react-router-dom";

import { BaseButton } from "../../components/button";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { InputWithIcon } from "../../components/forms";
import { RequestFormError } from "../../types";
import { ShowRequestErrors } from "../../components/ShowRequestError";
import { useState } from "react";

export const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const data = useActionData() as RequestFormError | null;

  return (
    <>
      <div className="fixed top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(176,225,255,.5)_100%)]"></div>

      <div className="flex flex-col items-center justify-center min-h-dvh">
        <div className="rounded shadow p-6 w-full max-w-md bg-white">
          <h1 className="font-bold text-lg">Inicio de sesión</h1>
          {data ? (
            <ShowRequestErrors errors={data} className="mt-1 mb-2" fieldErrors />
          ) : null}
          <Form method="POST" id="login-form">
            <label className="block text-sm text-neutral-500 mb-4">
              Nombre de Usuario:
              <InputWithIcon
                icon="material-symbols:person"
                required
                type="text"
                name="username"
                className="w-full py-1.5 px-2 bg-transparent"
                placeholder="user.name"
              />
              <span className="text-xs text-neutral-400">
                Si, el de Intranet (ㆆ _ ㆆ)
              </span>
            </label>

            <label className="block text-sm text-neutral-500 mb-5">
              Contraseña:
              <InputWithIcon
                required
                onIconClick={() => setShowPassword(!showPassword)}
                iconClassName={`cursor-pointer transition-transform ${
                  showPassword ? "rotate-45" : ""
                }`}
                icon="material-symbols:lock"
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full py-1.5 px-2 bg-transparent"
                placeholder="********"
              />
              <div className="flex items-center">
                <Icon
                  icon="lets-icons:up"
                  className="text-neutral-400 block px-1.5"
                />
                <span className="text-xs text-neutral-400">
                  Clic para ver constraseña.
                </span>
              </div>
            </label>
            <BaseButton type="submit" className="w-full">
              Iniciar sesión
            </BaseButton>
          </Form>
        </div>
      </div>
    </>
  );
};
