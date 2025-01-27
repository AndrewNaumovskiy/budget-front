import Picker from '../Picker/Picker';
import styles from './StatisticsFilters.module.css';
import DateRangePickerComponent from '../DateRangePicker/DateRangePicker';
import Button from '../Button/Button';
import { useStatisticsData } from '../../hooks/useStatisticsData';

const transactionTypes = [
    { label: 'Income', value: 'income' },
    { label: 'Expenses', value: 'expenses' },
];

function StatisticsFilters() {
    const { filters, onFilterChanged, applyFilters } = useStatisticsData();

    return (
        <div className={styles.statisticsFilters}>
            <DateRangePickerComponent
                from={filters.from}
                to={filters.to}
                onFromChange={(e) => {
                    onFilterChanged('from', e.target.value);
                }}
                onToChange={(e) => onFilterChanged('to', e.target.value)}
            />
            <Picker
                label={'Transaction type'}
                data={transactionTypes}
                value={filters.transactionType}
                onChange={(value) => onFilterChanged('transactionType', value)}
            />
            <Button label="Apply" onClick={applyFilters} />
        </div>
    );
}

export default StatisticsFilters;
