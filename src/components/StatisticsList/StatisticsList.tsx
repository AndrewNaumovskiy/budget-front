import { Transaction } from '../../types/Transaction';
import StatisticsListItem from './StatisticsListItem/StatisticsListItem';

interface StatisticsListProps {
    data: Transaction[];
}

function StatisticsList({ data }: StatisticsListProps) {
    return (
        <div>
            {data.map((item) => {
                return <StatisticsListItem key={item.id} item={item} />;
            })}
        </div>
    );
}

export default StatisticsList;
