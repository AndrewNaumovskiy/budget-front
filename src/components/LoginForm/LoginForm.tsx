import { FormEvent, useState } from 'react';
import Input from '../Input/Input';
import styles from './LoginForm.module.css';
import Button from '../Button/Button';
import useSWRMutation from 'swr/mutation';
import { API_URLs } from '../../constants/API_URLs';
import { postFetcher } from '../../api/fetchers';
import { LoginPayload } from '../../types/LoginPayload';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../constants/routes';

function LoginForm() {
    const navigate = useNavigate();
    const { trigger, isMutating } = useSWRMutation(
        API_URLs.LOG_IN,
        (url, { arg }: { arg: LoginPayload }) => postFetcher(url, arg),
    );
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await trigger({ username, password });
            enqueueSnackbar('Login successful!', { variant: 'success' });

            // TODO: Store tokens on BE side using httpOnly cookies.
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);

            setTimeout(() => {
                navigate(ROUTES.DASHBOARD.route);
            }, 1000);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            enqueueSnackbar(
                err?.response?.data?.error?.description || 'Failed to log in',
                { variant: 'error' },
            );
        }
    };

    return (
        <form className={styles.form} onSubmit={handleLogin}>
            <Input
                value={username}
                onChange={handleChangeEmail}
                label="Username"
                placeholder="Enter your username"
                disabled={isMutating}
            />
            <Input
                value={password}
                onChange={handleChangePassword}
                label="Password"
                placeholder="Enter your password"
                type="password"
                disabled={isMutating}
            />
            <Button label="Submit" disabled={isMutating} onClick={() => {}} />
        </form>
    );
}

export default LoginForm;
