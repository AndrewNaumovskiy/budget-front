import { Transaction } from '../../../types/Transaction';

interface StatisticsListItemProps {
    item: Transaction;
}
function StatisticsListItem({ item }: StatisticsListItemProps) {
    return <div>StatisticsListItem</div>;
}

export default StatisticsListItem;
