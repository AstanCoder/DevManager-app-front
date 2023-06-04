import { useEffect } from "react";
import PropTypes from "prop-types";

import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./Provider";
import { Spinner } from "@chakra-ui/react";

const Authenticated = ({ children, homePath, loginPath }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isValidating, user: authenticatedUser, currentPass } = useAuth();

  const isAuthenticated = !!authenticatedUser;
  const pathIsProtected =
    location.pathname !== "/signup" && location.pathname !== "/signin";

  useEffect(() => {
    // Redirects to login if user is not authenticated and the route is protected
    if (!isAuthenticated && pathIsProtected) {
      navigate(loginPath);
    }

    // Redirects to home path if user is authenticated and the route is not protected
    if (isAuthenticated) {
      navigate(homePath);
    }
  }, [isAuthenticated]);

  if (isValidating) {
    return <Spinner />;
  }

  return children;
};

Authenticated.propTypes = {
  children: PropTypes.any.isRequired,
  homePath: PropTypes.string.isRequired,
  loginPath: PropTypes.string.isRequired,
};

Authenticated.defaultProps = {
  homePath: "/",
  loginPath: "/signin",
};

export default Authenticated;
