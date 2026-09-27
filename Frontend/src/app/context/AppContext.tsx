import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Dish {
  id: string;
  name: string;
  price: number;
  image: string;
  tags: string[];
  ingredients: string[];
  calories: number;
  ironRich: boolean;
  description: string;
}

export interface UserProfile {
  name: string;
  email: string;
  allergies: string[];
  conditions: string[];
}

interface AppContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  savedDishes: Dish[];
  saveDish: (dish: Dish) => void;
  removeDish: (id: string) => void;
  isDishSaved: (id: string) => boolean;
  lastBudget: number;
  setLastBudget: (b: number) => void;
  lastIngredients: string;
  setLastIngredients: (s: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const SAMPLE_DISHES: Dish[] = [
  {
    id: "1",
    name: "Sopa de Lentejas con Espinacas",
    price: 4.5,
    image: "https://images.unsplash.com/photo-1714062105923-5cb2a3a07499?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZW50aWwlMjBzb3VwJTIwaGVhbHRoeSUyMGJvd2x8ZW58MXx8fHwxNzc4MTY4MTc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["Rico en hierro", "Sin gluten", "Alto en fibra"],
    ingredients: ["Lentejas (100g)", "Espinacas (80g)", "Zanahoria (1 unid.)", "Cebolla (½ unid.)", "Ajo (2 dientes)", "Caldo de verduras", "Sal y pimienta"],
    calories: 280,
    ironRich: true,
    description: "Sopa nutritiva y reconfortante, ideal para combatir la anemia. Rica en hierro no hemínico y vitamina C.",
  },
  {
    id: "2",
    name: "Bowl de Quinua con Pollo",
    price: 6.0,
    image: "https://images.unsplash.com/photo-1594782855419-e646186ad78f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWlub2ElMjBjaGlja2VuJTIwaGVhbHRoeSUyMG1lYWx8ZW58MXx8fHwxNzc4MTY4MTc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["Alto en proteína", "Sin lactosa", "Energizante"],
    ingredients: ["Quinua (80g)", "Pechuga de pollo (120g)", "Palta (½ unid.)", "Tomate (1 unid.)", "Limón (1 unid.)", "Aceite de oliva", "Sal y especias"],
    calories: 420,
    ironRich: false,
    description: "Bowl completo y balanceado con la proteína completa de la quinua andina y el pollo.",
  },
  {
    id: "3",
    name: "Ensalada de Espinaca y Betarraga",
    price: 3.5,
    image: "https://images.unsplash.com/photo-1634731201932-9bd92839bea2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGluYWNoJTIwc2FsYWQlMjBncmVlbnMlMjBoZWFsdGh5JTIwaXJvbnxlbnwxfHx8fDE3NzgxNjgxODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["Rico en hierro", "Vegano", "Bajo en calorías"],
    ingredients: ["Espinacas frescas (100g)", "Betarraga (1 unid.)", "Nueces (20g)", "Limón (1 unid.)", "Aceite de oliva (1 cda.)", "Sal al gusto"],
    calories: 180,
    ironRich: true,
    description: "Ensalada fresca y llena de hierro. La betarraga potencia la absorción de nutrientes.",
  },
  {
    id: "4",
    name: "Guiso de Frejoles con Arroz",
    price: 3.0,
    image: "https://images.unsplash.com/photo-1602873520153-ec56ca3c205b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFuJTIwc3RldyUyMGxlZ3VtZXMlMjBoZWFsdGh5fGVufDF8fHx8MTc3ODE2ODE3N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["Económico", "Alto en fibra", "Proteína vegetal"],
    ingredients: ["Frejoles (150g)", "Arroz blanco (80g)", "Cebolla (½ unid.)", "Tomate (1 unid.)", "Ajo (2 dientes)", "Aceite vegetal", "Sal y comino"],
    calories: 350,
    ironRich: false,
    description: "Combinación clásica y nutritiva. Los frejoles aportan proteína vegetal y fibra esencial.",
  },
  {
    id: "5",
    name: "Saltado de Verduras al Wok",
    price: 5.0,
    image: "https://images.unsplash.com/photo-1587996552544-3e908482da64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFibGUlMjBzdGlyJTIwZnJ5JTIwY29sb3JmdWx8ZW58MXx8fHwxNzc4MTY4MTc3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["Vegano", "Sin gluten", "Bajo en grasa"],
    ingredients: ["Brócoli (100g)", "Zanahoria (1 unid.)", "Pimiento (½ unid.)", "Cebolla china (2 tallos)", "Salsa de soya (2 cdas.)", "Jengibre fresco", "Aceite de sésamo"],
    calories: 220,
    ironRich: false,
    description: "Colorido y crujiente saltado de verduras frescas. Listo en 15 minutos.",
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [savedDishes, setSavedDishes] = useState<Dish[]>([]);
  const [lastBudget, setLastBudget] = useState<number>(0);
  const [lastIngredients, setLastIngredients] = useState<string>("");

  const saveDish = (dish: Dish) => {
    setSavedDishes((prev) => (prev.find((d) => d.id === dish.id) ? prev : [...prev, dish]));
  };

  const removeDish = (id: string) => {
    setSavedDishes((prev) => prev.filter((d) => d.id !== id));
  };

  const isDishSaved = (id: string) => savedDishes.some((d) => d.id === id);

  return (
    <AppContext.Provider value={{ user, setUser, savedDishes, saveDish, removeDish, isDishSaved, lastBudget, setLastBudget, lastIngredients, setLastIngredients }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
