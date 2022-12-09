import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  USER_NOT_FOUND,
  WRONG_PASSWORD,
  loginWithEmailAndPassword,
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
            }
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <div className="w-4/5 max-w-xs">
            <Form className="bg-white border shadow-lg rounded px-8 pt-6 pb-8">
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
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
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
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
              <div className="flex items-center justify-between">
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
        )}
      </Formik>
    </div>
  );
}
