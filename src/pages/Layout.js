import AuthLayout from "@/utility/AuthLayout";
import React from "react";
import StoreProvider from "./StoreProvider";
import ViewTransitionWrapper from "@/utility/ViewTransitionWrapper";

function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <ViewTransitionWrapper>
            <AuthLayout>{children}</AuthLayout>
          </ViewTransitionWrapper>
        </StoreProvider>
      </body>
    </html>
  );
}

export default Layout;
