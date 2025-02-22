import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "../constants/routes";

interface AuthState {
    isAuthorized: boolean | null;
    isLoading: boolean;
}

export const useIsAuthorized = () => {
    const [authState, setAuthState] = useState<AuthState>({
        isAuthorized: null,
        isLoading: true,
    });

    const navigate = useNavigate();
    const refreshToken = localStorage.getItem('refreshToken');

    useEffect(() => {
        if (!refreshToken) {
            setAuthState({
                isAuthorized: false,
                isLoading: false,
            });
            navigate(ROUTES.LOGIN.route);
            return;
        }

        setAuthState({
            isAuthorized: true,
            isLoading: false,
        });
    }, [refreshToken, navigate]);

    const setUnauthorized = () => {
        setAuthState({
            isAuthorized: false,
            isLoading: false,
        });

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate(ROUTES.LOGIN.route);
    };

    return {
        isAuthorized: authState.isAuthorized,
        isLoading: authState.isLoading,
        setUnauthorized,
    };
};