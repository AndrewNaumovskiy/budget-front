import { Account } from "../types/Account";
import MonobankLogo from '../assets/accounts_logos/monobank.png';
import PrivatbankLogo from '../assets/accounts_logos/privatbank.png';
import UkrsibbankLogo from '../assets/accounts_logos/ukrsibbank.png';
import CashLogo from '../assets/accounts_logos/cash.png';

export const ACCOUNT_LOGOS: { [key in Account]: string } = {
    [Account.Monobank]: MonobankLogo,
    [Account.PrivatBank]: PrivatbankLogo,
    [Account.Ukrsibbank]: UkrsibbankLogo,
    [Account.None]: CashLogo,
}