import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogin = () => {

    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext()

    // const login = async (email, password) => {
    //     const success = handleInputErrors({
    //         email,
    //         password
    //       });
    //       //console.log(email,password)
    //       if (!success) return;
    //       setLoading(true);

    //     try {
		// 	const res = await fetch("/api/auth/login", {
		// 		method: "POST",
		// 		headers: { "Content-Type": "application/json" },
		// 		body: JSON.stringify({ email, password }),
		// 	});

		// 	const data = await res.json();
		// 	if (data.error) {
		// 		throw new Error(data.error);
		// 	}

		// 	localStorage.setItem("chat-user", JSON.stringify(data));
		// 	setAuthUser(data);
		// } catch (error) {
		// 	toast.error(error.message);
		// } finally {
		// 	setLoading(false);
		// }

    // }
    const login = async (email, password) => {
      const success = handleInputErrors(email, password);
      if (!success) return;
      setLoading(true);
  
      try {
          console.log("Sending request with:", { email, password });
          const res = await fetch("/api/auth/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
          });
  
          const data = await res.json();
          if (data.error) {
              throw new Error(data.error);
          }
  
          localStorage.setItem("chat-user", JSON.stringify(data));
          setAuthUser(data);
      } catch (error) {
          toast.error(error.message);
      } finally {
          setLoading(false);
      }
  };

  return { loading, login };

}

export default useLogin;

//VALIDATIONS

function handleInputErrors(email, password) {
    if (!email || !password) {
      toast.error("Please fill in all theh fields");
      return false;
    }
  
    // if (password.length < 6) {
    //   toast.error("Password must be at least 6 characters long");
    //   return false;
    // }
  
    return true;
  }
  