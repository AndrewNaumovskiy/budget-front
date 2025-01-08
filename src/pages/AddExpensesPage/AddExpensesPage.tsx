import { useState } from "react";
import { useSnackbar } from "notistack";

import { api, IError } from "../../utils";

import Header from "../../components/Header";

interface AddExpensesRequestModel {
    date: string;
    category: string;
    amount: number;
    description: string;
}

interface AddExpensesResponseModel {
    data: AddExpensesResponseDataModel;
    error: IError;
}

interface AddExpensesResponseDataModel {
    status: string;
}

const defaultCategories: string[] = [
    "транспорт",
    "їжа",
    "ресторани/кафе",
    "інші",
    "сервіси",
    "донати",
    "дозвілля",
    "допомога сім'ї",
    "шоколадки/чіпсікі",
    "интернет и связь",
    "здоровье и красота",
    "житло",
    "цифровые покупки",
    "хоз. продукти",
    "подорожі",
    "доставка їжі",
    "подарунки",
    "одежда, товары",
    "освіта",
    "крупные траты",
    "чрезмерное потребление",
];

function ExpensesPage() {
    const { enqueueSnackbar } = useSnackbar();

    const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0]);
    const [category, setCategory] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [note, setNote] = useState<string>("");

    function ChangeAmount(event: React.ChangeEvent<HTMLInputElement>) {
        var value = event.target.value;
        setAmount(value);
    }

    const AddExpenses = async () => {
        var request: AddExpensesRequestModel = {
            date: new Date(date).toISOString(),
            category: category,
            amount: parseFloat(amount),
            description: note,
        }

        try {
            const response: AddExpensesResponseModel = await api.post('budget/expenses', {
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

            <h1>Add Expenses Page</h1>

            <h2>Date</h2>

            <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)} />

            <h2>Categories</h2>
            <select value={category}
                onChange={(event) => setCategory(event.target.value)}>
                {defaultCategories.map((category) => (
                    <option key={category}>{category}</option>
                ))}
            </select>

            <h2>Amout</h2>
            <input
                type="number"
                value={amount}
                onChange={ChangeAmount} />

            <h2>Note</h2>
            <input
                value={note}
                onChange={(event) => setNote(event.target.value)} />

            <br />

            <button onClick={AddExpenses}>Add Expenses</button>
        </>
    );
}

export default ExpensesPage;