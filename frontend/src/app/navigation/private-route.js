import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
  const {accessToken, user} = useSelector((state) => state.auth);

  console.log("accessToken:", accessToken)

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export { PrivateRoute };
