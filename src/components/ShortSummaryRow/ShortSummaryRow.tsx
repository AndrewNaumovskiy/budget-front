import { SummeryItem } from '../../types';
import styles from './ShortSummaryRow.module.css';
import { IoIosArrowForward } from 'react-icons/io';

interface ShortSummaryRowProps {
    summaryItem: SummeryItem;
}

function ShortSummaryRow({ summaryItem }: ShortSummaryRowProps) {
    return (
        <div className={styles.shortSummaryRow}>
            <div className={styles.shortSummaryRowItemLabel}>
                <div
                    className={styles.shortSummaryRowItemPoint}
                    style={{ backgroundColor: summaryItem.pointColor }}
                ></div>
                {summaryItem.label}
            </div>
            <div className={styles.shortSummaryRowItemValue}>
                {summaryItem.value}
            </div>
            <IoIosArrowForward />
        </div>
    );
}

export default ShortSummaryRow;
