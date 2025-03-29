import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const {accessToken} = useSelector((state) => state.auth);

  console.log("accessToken:", accessToken)

  if (!accessToken) {
    return children;
  }

    return <Navigate to="/dashboard" replace />;
};

export { AuthRoute };
