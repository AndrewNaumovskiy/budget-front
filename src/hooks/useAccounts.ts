import { useEffect } from 'react';
import useSWR from 'swr';
import { API_URLs } from '../constants/API_URLs';
import { getFetcher } from '../api/fetchers';
import useAddExpensesStore from '../state/stores/addExpensesStore';
import { Option } from '../types';
import { AccountResponse } from '../types/AccountResponse';

export const useAccounts = () => {
    const { data: fetchedAccounts, error, isLoading } = useSWR(API_URLs.GET_ACCOUNTS, getFetcher);
    const { setAccounts, accounts } = useAddExpensesStore();

    useEffect(() => {
        if (fetchedAccounts) {
            const updatedAccounts: Option[] = fetchedAccounts.data.accounts.map(
                (account: AccountResponse) => ({
                    label: account.name,
                    value: account.id,
                }),
            );
            setAccounts(updatedAccounts);
        }
    }, [fetchedAccounts, setAccounts]);

    return { accounts, isLoading, error };
};
