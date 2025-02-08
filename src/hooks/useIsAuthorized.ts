import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "../constants/routes";
import { API_URLs } from "../constants/API_URLs";
import { postFetcher } from "../api/fetchers";
import useSWRMutation from "swr/mutation";
import { RefreshPayload } from "../types/RefreshPayload";

interface AuthState {
    isAuthorized: boolean | null;
    isLoading: boolean;
    error: Error | null;
}

export const useIsAuthorized = () => {
    const [authState, setAuthState] = useState<AuthState>({
        isAuthorized: null,
        isLoading: true,
        error: null,
    });

    const navigate = useNavigate();
    const refreshToken = localStorage.getItem('refreshToken');

    const { trigger, isMutating } = useSWRMutation(
        API_URLs.REFRESH,
        (url, { arg }: { arg: RefreshPayload }) => postFetcher(url, arg),
        {
            onSuccess: () => {
                setAuthState({
                    isAuthorized: true,
                    isLoading: false,
                    error: null,
                });
            },

            onError: (error) => {
                setAuthState({
                    isAuthorized: false,
                    isLoading: false,
                    error,
                });

                localStorage.removeItem('token');

                navigate(ROUTES.LOGIN.route);
            },
        }
    );

    useEffect(() => {
        let mounted = true;

        const checkAuth = async () => {
            if (!refreshToken) {
                if (mounted) {
                    setAuthState({
                        isAuthorized: false,
                        isLoading: false,
                        error: new Error('No refresh token found'),
                    });
                }
                navigate(ROUTES.LOGIN.route);
                return;
            }

            await trigger({ refreshToken });
        };

        checkAuth();

        return () => {
            mounted = false;
        };
    }, [refreshToken, trigger, navigate]);

    useEffect(() => {
        if (authState.isAuthorized === false && !authState.isLoading) {
            navigate(ROUTES.LOGIN.route);
        }
    }, [authState.isAuthorized, authState.isLoading, navigate]);

    return {
        isAuthorized: authState.isAuthorized,
        isLoading: authState.isLoading || isMutating,
        error: authState.error,
    };
};