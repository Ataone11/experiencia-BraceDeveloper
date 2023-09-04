import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Eye from "../assets/Eye";
import { LoginProps } from "../interfaces";
import { signInWithAmazon } from "../src/redux/actions/authActions";
import colores from "../src/utils/colores";
import { toast } from "react-toastify";
import ButtonPage from "../components/ButtonPage";
import { BeatLoader } from "react-spinners";
import BrandBlue from "../assets/BrandBlue";
import ChangePassword from "../components/changePassword/changePassword";
import RecoveryPassword from "../components/recoverPassword/recoveryPassword";

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["login"])),
    },
  };
}

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const redirect = useRouter();
  const [statePass, setStatePass] = useState(false);
  const [login, setLogin] = useState<LoginProps>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);
  const [showSubmitPass, setShowSubmitPass] = useState(false);

  const onChange = async (e: any) => {
    e.preventDefault();

    if (!e) {
      return
    }

    if (e.target.name === "email") {
      setLogin({
        ...login,
        [e.target.id]: (e.target.value as string).toLocaleLowerCase(),
      });
    } else {
      setLogin({
        ...login,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleOnSubmit = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    const res = await signInWithAmazon(dispatch, login);
    setLoading(false);

    if (res.error === "Incorrect username or password.") {
      toast.error(t("login:errors.NotAuthorizedException"));
    } else if (res.error === "Password attempts exceeded") {
      toast.error(t("login:errors.PasswordAttemptsExceeded"));
    } else if (res.error === "No admin role") {
      toast.error(t("login:errors.y"));
    }
  };

  return (
    <section className="bg-backgroundPage w-screen px-8 md:px-0 h-screen grid place-content-center">
      <form
        onSubmit={(e: any) => handleOnSubmit(e)}
        onChange={onChange}
        className="bg-white w-full md:min-w-[426px] min-h[500px] p-5 md:p-14 rounded-lg grid place-content-center gap-y-5 md:gap-y-14"
      >
        <div className="w-fit mx-auto">
          <BrandBlue />
        </div>
        <h1 className="text-2xl font-bold text-Principal w-fit mx-auto text-center">
          {t("login:login.title")}
        </h1>
        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-2">
            <label htmlFor="email" className="font-normal text-sm w-fit">
              {t("login:login.email")}
            </label>
            <input
              value={login.email}
              type="email"
              name="email"
              id="email"
              placeholder="email@email.com"
              required
              className="border-[1px] border-backgroundPage rounded-sm w-full md:w-[300px] h-[36px] px-2 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="password" className="font-normal text-sm w-fit">
              {t("login:login.password")}
            </label>
            <div className="flex items-center border-[1px] border-backgroundPage rounded-sm w-full md:w-[300px]  h-[36px]">
              <input
                type={statePass ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                required
                className="h-full w-[88%] px-2 focus:outline-none"
              />
              <span
                onClick={() => setStatePass(!statePass)}
                className="p-2 cursor-pointer"
              >
                <Eye color={statePass ? colores.Principal : "#868686"} />
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-5">
          <div className="w-fit mx-auto">
            <span onClick={() => setShowChangePass(true)} className="font-normal cursor-pointer text-sm">
              ¿{t("login:login.forgottenPass")}?
            </span>
          </div>
          <ButtonPage type="submit">
            {loading ? (
              <BeatLoader color={colores.Active} size={10} />
            ) : (
              <span>{t("login:login.button")}</span>
            )}
          </ButtonPage>
          {
            showChangePass ?
                <ChangePassword
                    setRecovey={setShowSubmitPass}
                    setChange={setShowChangePass}
                    setCredentials={setLogin}
                />
                :null
          }
          {
            showSubmitPass ?
                <RecoveryPassword
                    setRecovey={setShowSubmitPass}
                    mail={setLogin}
                />
                :null
          }
        </div>
      </form>
    </section>
  );
};

export default Home;
