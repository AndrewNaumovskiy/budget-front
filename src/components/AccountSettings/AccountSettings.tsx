import { useNavigate } from 'react-router';
import Button from '../Button/Button';
import { ROUTES } from '../../constants/routes';

function AccountSettings() {
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        navigate(ROUTES.LOGIN.route);
    };

    return (
        <div className="">
            <Button label="Log out" onClick={handleLogOut} variant={'none'} />
        </div>
    );
}

export default AccountSettings;
