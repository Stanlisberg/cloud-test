import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState();

  const fetchUsers = async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    const data = response.data;

    setUsers(data);
    console.log(data);
  };

  return (
    <AppContext.Provider
      value={{
        fetchUsers,
        users,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
