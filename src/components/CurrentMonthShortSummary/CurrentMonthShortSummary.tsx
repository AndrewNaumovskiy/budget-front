import { useNavigate } from 'react-router';
import ShortSummaryRow from '../ShortSummaryRow/ShortSummaryRow';
import styles from './CurrentMonthShortSummary.module.css';
import { ROUTES } from '../../constants/routes';
import useSWR from 'swr';
import { getFetcher } from '../../api/fetchers';
import { API_URLs } from '../../constants/API_URLs';
import { useEffect, useState } from 'react';
import { ShortSummaryData } from '../../types/ShortSummaryData';
import { SHORT_SUMMARY_ITEMS } from '../../constants/shortSummaryItems';
import { SummaryItem } from '../../types';

function CurrentMonthShortSummary() {
    const navigate = useNavigate();

    const [summaryData, setSummaryData] = useState<SummaryItem[]>([]);

    const { data, isLoading, error } = useSWR(
        API_URLs.GET_SHORT_SUMMARY,
        getFetcher,
    );

    const handleNavigateToDetailedSummary = () => {
        navigate(ROUTES.DETAILED_SUMMARY.route);
    };

    const parseDataToSummaryItems = (data: ShortSummaryData) => {
        const updatedData = Object.keys(data).map((key) => ({
            label: SHORT_SUMMARY_ITEMS[key].label,
            value: data[key as keyof ShortSummaryData],
            pointColor: SHORT_SUMMARY_ITEMS[key].pointColor,
        }));

        setSummaryData(updatedData);
    };

    useEffect(() => {
        if (data) {
            parseDataToSummaryItems(data.data);
        }
    }, [data]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error</div>;
    }

    return (
        <div
            className={styles.shortSummary}
            onClick={handleNavigateToDetailedSummary}
        >
            {summaryData.map((item, index) => (
                <ShortSummaryRow key={index} summaryItem={item} />
            ))}
        </div>
    );
}

export default CurrentMonthShortSummary;
