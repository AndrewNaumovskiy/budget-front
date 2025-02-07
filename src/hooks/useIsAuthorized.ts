import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "../constants/routes";
import { API_URLs } from "../constants/API_URLs";
import { postFetcher } from "../api/fetchers";
import useSWR from "swr";

export const useIsAuthorized = () => {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
    const navigate = useNavigate();

    const { data, error } = useSWR(API_URLs.REFRESH, postFetcher, { shouldRetryOnError: false });

    useEffect(() => {
        if (data) {
            setIsAuthorized(true);
        }
        if (error) {
            setIsAuthorized(false);
            navigate(ROUTES.LOGIN.route);
        }
    }, [data, error, navigate]);

    return isAuthorized;
};
