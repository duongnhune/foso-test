import React from 'react';
import DateFilterDropdown from "@/components/layouts/Base/DateFilterDropdown";
import arrowDownBoldDuotone from "@/assets/icon/ic-solar_double-alt-arrow-down-bold-duotone.png"
import arrowUpBoldDuotone from "@/assets/icon/ic-solar_double-alt-arrow-up-bold-duotone.png"

interface TopProductItemProps {
    value: number;
    label: string;
    percentage: number;
    isPlaceholder?: boolean;
}


const TopProductItem: React.FC<TopProductItemProps> = ({ value, label, percentage, isPlaceholder }) => {
    const isPositive = percentage >= 0;
    const iconSrc = isPositive ? arrowUpBoldDuotone : arrowDownBoldDuotone;

    return (
        <div className={`top-product-item`}>
            <div className="value-percentage">
                <div className="value">{value}</div>
                {!isPlaceholder && (
                    <div className={`percentage ${isPositive ? 'positive' : 'negative'}`}>
                        <img src={iconSrc} alt="trend-icon" className="trend-icon" />
                        <span>{Math.abs(percentage)}%</span>
                    </div>
                )}
            </div>
            <div className="label">{label}</div>
        </div>
    );
};



interface TopProductsSectionProps {
    data: TopProductItemProps[];
}

const TopProductsSection: React.FC<TopProductsSectionProps> = ({ data }) => {
    const [sortBy, setSortBy] = React.useState('month');

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(event.target.value);
        console.log('Sorting by:', event.target.value);
    };

    return (
        <div className="top-products-section">
            <div className="section-header">
                <span className="section-title">Top Sản Phẩm Sản Xuất Nhiều Nhất</span>
                <div className="filter-dropdown-container">
                    <DateFilterDropdown
                        options={['Hôm nay', 'Tuần này', 'Tháng này', 'Năm']}
                        onSelect={(value) => console.log('Selected:', value)}
                    />
                </div>
            </div>
            <div className="top-products-grid">
                {(data.length > 0 ? data : new Array(5).fill(null)).map((item, index) => (
                    <TopProductItem
                        key={index}
                        value={item ? item.value : 0}
                        label={item ? item.label : 'Chưa có mặt hàng'}
                        percentage={item ? item.percentage : 0}
                        isPlaceholder={!item}
                    />
                ))}
            </div>
        </div>
    );
};

export default TopProductsSection;