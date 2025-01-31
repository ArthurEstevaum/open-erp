import { createContext } from 'react';

export const AuthContext = createContext<null | {
    login: (token: string, permissions: string[]) => void;
    logout: () => void;
    isAuthenticated: boolean;
    permissions: string;
}>(null)