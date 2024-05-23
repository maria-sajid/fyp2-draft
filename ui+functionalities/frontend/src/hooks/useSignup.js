import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthUser} = useAuthContext()

  const signup = async ({ username, email, password, confirmPassword }) => {
    const success = handleInputErrors({
      username,
      email,
      password,
      confirmPassword
    });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, confirmPassword }),
      });

      const data = await res.json();
      if(data.error){
        throw new Error(data.error)
      }
      console.log(data);

      //local storage
      localStorage.setItem("chat-user", JSON.stringify(data))

      //contextapi
      setAuthUser(data)

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
    return false;
  };

  return { loading, signup };
};

export default useSignup;

//VALIDATIONS

function handleInputErrors({ username, email, password, confirmPassword }) {
  if (!username || !email || !password || !confirmPassword) {
    toast.error("Please fill in all theh fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters long");
    return false;
  }

  return true;
}
