import { createBrowserRouter, Navigate } from "react-router";
import { LoginScreen } from "./screens/LoginScreen";
import { RegisterScreen } from "./screens/RegisterScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { SearchScreen } from "./screens/SearchScreen";
import { ResultsScreen } from "./screens/ResultsScreen";
import { EmptyStateScreen } from "./screens/EmptyStateScreen";
import { DishDetailScreen } from "./screens/DishDetailScreen";
import { SavedDishesScreen } from "./screens/SavedDishesScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { AdminDashboardScreen } from "./screens/AdminDashboardScreen";
import { PriceRegistryScreen } from "./screens/PriceRegistryScreen";
import { FeedbackScreen } from "./screens/FeedbackScreen";

export const router = createBrowserRouter([
  { path: "/", element: <LoginScreen /> },
  { path: "/login", element: <LoginScreen /> },
  { path: "/register", element: <RegisterScreen /> },
  { path: "/home", element: <HomeScreen /> },
  { path: "/search", element: <SearchScreen /> },
  { path: "/results", element: <ResultsScreen /> },
  { path: "/no-results", element: <EmptyStateScreen /> },
  { path: "/dish/:id", element: <DishDetailScreen /> },
  { path: "/saved", element: <SavedDishesScreen /> },
  { path: "/profile", element: <ProfileScreen /> },
  { path: "/admin", element: <AdminDashboardScreen /> },
  { path: "/price-registry", element: <PriceRegistryScreen /> },
  { path: "/feedback/:id", element: <FeedbackScreen /> },
  { path: "*", element: <Navigate to="/login" replace /> },
]);
