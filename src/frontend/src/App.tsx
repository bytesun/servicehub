import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import Layout from "./components/Layout";
import LoadingSpinner from "./components/LoadingSpinner";

const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const ProviderDashboard = lazy(() => import("./pages/ProviderDashboard"));
const ClientDashboard = lazy(() => import("./pages/ClientDashboard"));
const QuoteDetail = lazy(() => import("./pages/QuoteDetail"));
const BookingDetail = lazy(() => import("./pages/BookingDetail"));
const Invoices = lazy(() => import("./pages/Invoices"));
const InvoiceDetail = lazy(() => import("./pages/InvoiceDetail"));
const UserProfile = lazy(() => import("./pages/UserProfilePage"));
const Register = lazy(() => import("./pages/Register"));
const Notifications = lazy(() => import("./pages/Notifications"));

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense
        fallback={
          <div className="flex justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services",
  component: Services,
});
const serviceDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services/$id",
  component: ServiceDetail,
});
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: ProviderDashboard,
});
const clientDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/client-dashboard",
  component: ClientDashboard,
});
const quoteDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/quotes/$id",
  component: QuoteDetail,
});
const bookingDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/bookings/$id",
  component: BookingDetail,
});
const invoicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/invoices",
  component: Invoices,
});
const invoiceDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/invoices/$id",
  component: InvoiceDetail,
});
const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile/$userId",
  component: UserProfile,
});
const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth/register",
  component: Register,
});
const notificationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/notifications",
  component: Notifications,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  servicesRoute,
  serviceDetailRoute,
  dashboardRoute,
  clientDashboardRoute,
  quoteDetailRoute,
  bookingDetailRoute,
  invoicesRoute,
  invoiceDetailRoute,
  profileRoute,
  registerRoute,
  notificationsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
