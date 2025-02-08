import useSWRMutation from "swr/mutation"
import { API_URLs } from "../constants/API_URLs"
import { putFetcher } from "../api/fetchers"
import { EditTransactionPayload } from "../types/EditTransactionPayload"


export const useEditTransaction = (id: number) => {
    const url = `${API_URLs.GET_TRANSACTION_BY_ID}${id}`

    const { data, isMutating, error, trigger } = useSWRMutation(url,
        (url, { arg }: { arg: EditTransactionPayload }) => putFetcher(url, arg),

    );

    return { data, isMutating, error, trigger }
}