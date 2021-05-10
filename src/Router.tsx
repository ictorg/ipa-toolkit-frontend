import { Route, Routes } from 'react-router';
import ProtectedRoute, { ProtectedRouteProps } from './components/ProtectedRoute';
import CONFIGURATION from './configuration';
import SignIn from './views/SignIn';

const defaultProtectedRouteProps: ProtectedRouteProps = {
  isAuthenticated: false,
  authenticationPath: CONFIGURATION.paths.signIn
};

export default function Router() {
  return (
    <Routes>
      <Route path={CONFIGURATION.paths.signIn} element={<SignIn />} />
      <ProtectedRoute {...defaultProtectedRouteProps}>
        <Route path={CONFIGURATION.paths.dashboard} element={<div>Dashboard</div>} />
      </ProtectedRoute>
    </Routes>
  );
}