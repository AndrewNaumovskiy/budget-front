import { useNavigate } from 'react-router';
import ShortSummaryRow from '../ShortSummaryRow/ShortSummaryRow';
import styles from './CurrentMonthShortSummary.module.css';
import { ROUTES } from '../../constants/routes';

function CurrentMonthShortSummary() {
    const navigate = useNavigate();

    const SUMMARY_ITEMS = [
        { label: 'Income', value: '$6,000.00', pointColor: '#00bd00' },
        { label: 'Expenses', value: '$2,000.00', pointColor: '#e30000' },
        { label: 'Savings', value: '$3,000.00', pointColor: '#7d7e77' },
        { label: 'Unspecified', value: '$1,000.00', pointColor: '#bea100' },
    ];

    const handleNavigateToDetailedSummary = () => {
        navigate(ROUTES.DETAILED_SUMMARY.route);
    };
    return (
        <div
            className={styles.shortSummary}
            onClick={handleNavigateToDetailedSummary}
        >
            {SUMMARY_ITEMS.map((item, index) => (
                <ShortSummaryRow key={index} summaryItem={item} />
            ))}
        </div>
    );
}

export default CurrentMonthShortSummary;
