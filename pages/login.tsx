import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  USER_NOT_FOUND,
  WRONG_PASSWORD,
  loginWithEmailAndPassword,
  loginWithGooglePopup,
  useUser,
} from "../utils/auth";

interface LoginData {
  email: string;
  password: string;
}

function validateEmail(email: string) {
  const re = /\S+@\S+\.\S+/;
  if (!email) {
    return "Required";
  } else if (!re.test(email)) {
    return "Invalid email";
  }
}

function validatePassword(password: string) {
  if (!password) {
    return "Required";
  } else if (password.length < 6) {
    return "Must be 6 characters or more";
  }
}

export default function Login() {
  const router = useRouter();
  const { loading, user, error } = useUser();

  if (loading) {
    return <div className="m-4">Loading...</div>;
  } else if (error) {
    return <div className="m-4">{error.message}</div>;
  } else {
    if (!user) {
      const initialValues: LoginData = { email: "", password: "" };
      return (
        <div className="h-full flex items-center justify-center">
          <Formik
            initialValues={initialValues}
            onSubmit={async (values, { setSubmitting, setFieldError }) => {
              try {
                await loginWithEmailAndPassword(values.email, values.password);
              } catch (err) {
                if (err === USER_NOT_FOUND) {
                  setFieldError("email", "Email not registered");
                } else if (err === WRONG_PASSWORD) {
                  setFieldError("password", "Wrong password");
                } else {
                  console.error(err);
                }
              }
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <div className="mx-2 w-9/10 max-w-xs">
                <div className="bg-white border shadow-lg rounded px-8 pt-6 pb-8">
                  <p
                    tabIndex={0}
                    aria-label="Login to your account"
                    className="text-xl font-extrabold leading-6 text-gray-800"
                  >
                    Login to your account
                  </p>
                  <p className="text-sm mt-4 font-medium leading-none text-gray-500">
                    Dont have account?{" "}
                    <span
                      tabIndex={0}
                      role="link"
                      aria-label="Sign up here"
                      className="text-sm font-medium leading-none underline text-gray-800 cursor-pointer"
                    >
                      {" "}
                      <Link href="/signup">Sign up here</Link>
                    </span>
                  </p>
                  <button
                    aria-label="Continue with google"
                    role="button"
                    className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-6"
                    onClick={async () => {
                      try {
                        await loginWithGooglePopup();
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  >
                    <svg
                      width={19}
                      height={20}
                      viewBox="0 0 19 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z"
                        fill="#34A853"
                      />
                      <path
                        d="M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z"
                        fill="#EB4335"
                      />
                    </svg>
                    <p className="text-base font-medium ml-4 text-gray-700">
                      Continue with Google
                    </p>
                  </button>
                  <div className="w-full flex items-center justify-between py-5">
                    <hr className="w-full bg-gray-400" />
                    <p className="text-base font-medium leading-4 px-2.5 text-gray-400">
                      OR
                    </p>
                    <hr className="w-full bg-gray-400  " />
                  </div>
                  <Form>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <Field
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        name="email"
                        type="text"
                        validate={validateEmail}
                      />
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="absolute text-red-500 text-xs italic"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <Field
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        name="password"
                        type="password"
                        validate={validatePassword}
                      />
                      <ErrorMessage
                        name="password"
                        component="p"
                        className="absolute text-red-500 text-xs italic"
                      />
                    </div>
                    <div className="flex items-center justify-between mt-6">
                      <button
                        className="mx-auto mt-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Login
                      </button>
                    </div>
                  </Form>
                </div>
              </div>
            )}
          </Formik>
        </div>
      );
    } else {
      router.push("/");
    }
  }
}
