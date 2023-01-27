import { useState } from "react";
import axios from "axios";
import Success from "./status/Success";
import ErrorMessage from "./status/ErrorMessage";

declare var process: {
  env: {
    REACT_APP_API_CREATE_USER: string;
    REACT_APP_API_AUTH_EMAIL: string;
  };
};

const checkPasswords = (password: string, password2: string) => {
  return password === password2;
};

const emailAlreadyExists = async (email: string) => {
  const payload = { email };
  const res = await axios.post(process.env.REACT_APP_API_AUTH_EMAIL, payload);
  return res.data.length > 0;
};

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [terms, setTerms] = useState(false);
  const [buttonText, setButtonText] = useState("Send Message");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const resetForm = () => {
    setEmail("");
    setPassword1("");
    setPassword2("");
    setTerms(false);
    setButtonText("Message Sent");
    setTimeout(() => {
      setButtonText("Send Message");
    }, 3000);
  };

  const throwSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  const throwError = () => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 3000);
  };

  const formSubmit = async (e: any) => {
    e.preventDefault();
    const payload = { email, password };
    setButtonText("...sending");
    setTimeout(async () => {
      try {
        if (!checkPasswords(password, password2)) throw Error;
        if (await emailAlreadyExists(email)) {
          throw new Error("That email already exists..");
        }
        setButtonText("Sent!");
        await axios.post(process.env.REACT_APP_API_CREATE_USER, payload);
        throwSuccess();
        resetForm();
      } catch (error) {
        console.log(error);
        throwError();
        setButtonText("There was an error...");
      }
    }, 3000);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      {success ? (
        <Success
          title={"Registration Successful"}
          secondary={"Welcome to Receipt Tracker.."}
        />
      ) : (
        ""
      )}
      {error ? (
        <ErrorMessage
          title={"That email already exists.."}
          secondary={"Please try another.."}
        />
      ) : (
        ""
      )}
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create and account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={(e) => formSubmit(e)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required={true}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => setPassword1(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="confirm-password"
                  name="confirm-password"
                  id="confirm-password"
                  onChange={(e) => setPassword2(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    onChange={() => setTerms(!terms)}
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required={true}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-gray-400 bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {buttonText}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="/"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
