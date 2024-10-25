import { useContext } from "react";
import { AuthProvider } from "../../context/auth.provider";

function ProfleUser() {
  // const { isToken } = useContext(AuthProvider);
  return (
    <div className="">
      <h1>Profile</h1>
      <p>Your secret token is: </p>
    </div>
   );
}

export default ProfleUser;
