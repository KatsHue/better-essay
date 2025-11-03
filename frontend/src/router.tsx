import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import ConfirmAccountView from "./views/auth/ConfirmAccountView";
import RequestNewCodeView from "./views/auth/RequestNewCodeView";
import ForgotPasswordView from "./views/auth/ForgotPasswordView";
import NewPasswordView from "./views/auth/NewPasswordView";
import ProfileView from "./views/profile/ProfileView";
import ChangePasswordView from "./views/profile/ChangePasswordView";
import ProfileLayout from "./layouts/ProfileLayout";
import NotFound from "./views/404/NotFound";
import DashboardMainView from "./views/DashboardMainView";
import SendIAView from "./views/writing/SendIAView";
import WritingLayout from "./layouts/WritingLayout";
import WritingView from "./views/writing/WritingView";
import SummaryView from "./views/writing/SummaryView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardMainView />} index />

          <Route element={<ProfileLayout></ProfileLayout>}>
            <Route path="/profile/" element={<ProfileView />} />
            <Route path="/profile/password" element={<ChangePasswordView />} />
          </Route>

          <Route element={<WritingLayout></WritingLayout>}>
            <Route path="/escritura/" element={<WritingView />} />
            <Route path="/escritura/ensayo" element={<SendIAView />} />
            <Route path="/escritura/resumen" element={<SummaryView />} />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
          <Route
            path="/auth/confirm-account"
            element={<ConfirmAccountView />}
          />
          <Route path="/auth/request-code" element={<RequestNewCodeView />} />
          <Route
            path="/auth/forgot-password"
            element={<ForgotPasswordView />}
          />
          <Route path="/auth/new-password" element={<NewPasswordView />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/404" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
