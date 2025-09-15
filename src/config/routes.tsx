import type { RouteObject } from "react-router";
import { Navigate } from "react-router"; // Добавьте импорт
import App from "../App";
import Recipes from "../App/pages/Recipes";
import Recipe from "../App/pages/Recipe";

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true, 
        element: <Navigate to="/recipes" replace /> // Перенаправление
      },
      {
        path: 'recipes', 
        element: <Recipes />
      },
      {
        path: 'recipes/:id',
        element: <Recipe />
      }
    ]
  }
];