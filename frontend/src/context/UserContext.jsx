import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { backend_url } from "../App";
import { toast } from "react-toastify";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(backend_url + "/api/user/", {
          headers: { token },
        });

        if (response.data.success) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, token }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
