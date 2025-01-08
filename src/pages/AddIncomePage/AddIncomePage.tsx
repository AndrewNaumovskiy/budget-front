import { useState } from "react";
import { useSnackbar } from "notistack";

import { api, IError } from "../../utils";

import Header from "../../components/Header";

interface AddIncomeRequestModel {
    date: string;
    account: string;
    amount: number;
    description: string;
}

interface AddIncomeResponseModel {
    data: AddIncomeResponseDataModel;
    error: IError;
}

interface AddIncomeResponseDataModel {
    status: string;
}

const defaultAccounts: string[] = [
    "UkrSib",
    "Privat",
    "Cash",
];

function AddIncomePage() {
    const { enqueueSnackbar } = useSnackbar();

    const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0]);
    const [account, setAccount] = useState<string>("UkrSib");
    const [amount, setAmount] = useState<string>("");
    const [note, setNote] = useState<string>("");

    const [noteVisible, setNoteVisible] = useState<boolean>(false);

    function ChangeAmount(event: React.ChangeEvent<HTMLInputElement>) {
        var value = event.target.value;
        setAmount(value);
    }

    function ChangeAccount(event: React.ChangeEvent<HTMLSelectElement>) {
        var value = event.target.value;

        if (value === "Cash")
            setNoteVisible(true);
        else
            setNoteVisible(false);

        setAccount(value);
    }

    const AddIncome = async () => {
        var request: AddIncomeRequestModel = {
            date: new Date(date).toISOString(),
            account: account,
            amount: parseFloat(amount),
            description: note,
        }

        try {
            const response: AddIncomeResponseModel = await api.post('budget/income', {
                json: request,
            }).json();

            if (response.error == null) {
                enqueueSnackbar("Ok!", { variant: "success" });
            }
            else {
                enqueueSnackbar(response.error.description, { variant: "error" });
            }
        }
        catch (error) {
            enqueueSnackbar((error as Error).message, { variant: "error" });
        }
    }

    return (
        <>
            <Header />

            <h1>Add Income Page</h1>

            <h2>Date</h2>

            <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)} />

            <h2>Account</h2>
            <select value={account}
                onChange={ChangeAccount}>
                {defaultAccounts.map((account) => (
                    <option key={account}>{account}</option>
                ))}
            </select>

            <h2>Amout</h2>
            <input
                type="number"
                value={amount}
                onChange={ChangeAmount} />

            {noteVisible === true ?
                <>
                    <h2>Note</h2>
                    <input
                        value={note}
                        onChange={(event) => setNote(event.target.value)} />
                </>
                :
                null}
            <br />

            <button onClick={AddIncome}>Add Income</button>
        </>
    );
}

export default AddIncomePage;