import { SWRConfig } from 'swr';
import { getFetcher } from '../api/fetchers';

export function SwrProvider({ children }: { children: React.ReactNode }) {
    return (
        <SWRConfig
            value={{
                fetcher: getFetcher,
                revalidateOnFocus: false,
                shouldRetryOnError: false,
            }}
        >
            {children}
        </SWRConfig>
    );
}
