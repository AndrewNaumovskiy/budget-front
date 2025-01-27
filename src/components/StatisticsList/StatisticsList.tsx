import { Transaction } from '../../types/Transaction';
import styles from './StatisticsList.module.css';
import TransactionItem from '../TransactionItem/TransactionItem';

interface StatisticsListProps {
    data: Transaction[];
}

function StatisticsList({ data }: StatisticsListProps) {
    return (
        <div className={styles.statisticsList}>
            {data.map((item) => {
                return <TransactionItem key={item.id} transaction={item} />;
            })}
        </div>
    );
}

export default StatisticsList;
