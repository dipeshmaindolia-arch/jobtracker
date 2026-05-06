import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <SignUp />
      </div>
    </div>
  );
}
