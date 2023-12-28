import styled from "styled-components";
import { useUser } from "../../features/authentication/hooks/useUser";
import { Spinner } from "..";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Component kiem tra xem client da~ dang nhap. chua, local storage co' chua data user khong!
const ProtectedRoute = ({ children }: React.PropsWithChildren) => {
  const navigate = useNavigate();
  // get current user
  const { isAuthenticated, isLoading } = useUser();

  useEffect(() => {
    // neu khong chua data user se quay tro lai trang login
    if (!isLoading && !isAuthenticated) navigate("/login");
  });
  // show loading when get current user
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // no authenticated redirect to login

  // show applayout when user is authenticated
  if (isAuthenticated) return children;
};

export default ProtectedRoute;
