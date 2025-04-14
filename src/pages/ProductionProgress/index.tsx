import DateFilterDropdown from "@/components/layouts/Base/DateFilterDropdown";
import React, { useEffect, useState } from 'react';
import ProgressItem from "@/pages/ProductionProgress/components/ProgressItem";

interface ProgressData {
    name: string;
    completed: number;
    total?: number;
    percentage: number;
}

interface ProductionProgressProps {
    data?: ProgressData[];
    apiUrl?: string;
}

const ProductionProgress: React.FC<ProductionProgressProps> = ({ data, apiUrl }) => {
    const [progressData, setProgressData] = useState<ProgressData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<string>('Hoàn thành');

    useEffect(() => {
        if (data && data.length > 0) {
            setProgressData(data);
        } else if (apiUrl) {
            fetchData();
        }
    }, [data, apiUrl]);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(apiUrl!);
            if (!response.ok) throw new Error('Fetch failed');
            const json = await response.json();
            setProgressData(json);
        } catch (err: any) {
            setError(err.message || 'Có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="production-progress">
            <div className="section-header">
                <h3 className="section-title">Tiến Độ Sản Xuất Theo Nhóm</h3>
                <div className="filter-dropdown-container">
                    <DateFilterDropdown
                        options={['Chưa hoàn thành', 'Đang sản xuất', 'Hoàn thành']}
                        onSelect={(value) => setFilter(value)}
                        defaultValue="Hoàn thành"
                    />
                </div>
            </div>

            {loading && <p>Đang tải dữ liệu...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && (
                (progressData.length > 0
                        ? progressData
                        : Array.from({ length: 7 }, () => ({
                            name: '',
                            completed: 0,
                            total: 0,
                            percentage: 0
                        }))
                ).map((item, index) => (
                    <ProgressItem
                        key={item.name || `empty-${index}`}
                        label={item.name}
                        completed={item.completed}
                        total={item.total}
                        percentage={item.percentage}
                    />
                ))
            )}

        </div>
    );
};

export default ProductionProgress;
