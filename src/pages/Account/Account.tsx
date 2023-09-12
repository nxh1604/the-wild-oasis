// import Heading from "../ui/Heading";
// import Row from "../ui/Row";

import UpdatePasswordForm from "../../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../../features/authentication/UpdateUserDataForm";
import { Heading } from "../../ui";

function Account() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <div>
        <Heading as="h3">Update user data</Heading>
        <UpdateUserDataForm />
      </div>

      <div>
        <Heading as="h3">Update password</Heading>
        <UpdatePasswordForm />
      </div>
    </>
  );
}

export default Account;
