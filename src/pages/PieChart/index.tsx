import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import DateFilterDropdown from "@/components/layouts/Base/DateFilterDropdown";
import RoundedSector from "@/components/layouts/Base/RoundedSector";

interface PieChartData {
    value: number;
    color: string;
    label: string;
}

interface PieChartProps {
    data: PieChartData[];
    centerText?: string;
    centerSubText?: string;
    cornerRadius?: number;
}

const RADIAN = Math.PI / 180;

const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const CustomPieChart: React.FC<PieChartProps> = ({ data, centerText, centerSubText, cornerRadius = 0 }) => {
    const hasData = data && data.length > 0 && data.some(d => d.value > 0);
    const totalValue = hasData ? data.reduce((sum, entry) => sum + entry.value, 0) : 0;
    const displayCenterText = hasData && centerText !== undefined ? centerText : 0;
    const displayCenterSubText = centerSubText !== undefined ? centerSubText : 'Lệnh sản xuất';

    console.log('centerText', centerText)
    console.log('hasData', hasData)
    console.log('totalValue', totalValue)


    const fallbackData: PieChartData[] = [
        { value: 100, color: '#e0e0e0', label: 'Không có dữ liệu' }
    ];

    const chartData = hasData ? data : fallbackData;

    const renderSector = (props: any) => {
        return <RoundedSector {...props} cornerRadius={cornerRadius} />;
    };

    return (
        <div className="pie-chart-container">
            <div className="section-header">
                <h3 className="section-title">Tình Hình Sản Xuất</h3>
                <div className="filter-dropdown-container">
                    <DateFilterDropdown
                        options={['Hôm nay', 'Tuần này', 'Tháng này', 'Qúy này', 'Năm']}
                        onSelect={(value) => console.log('Selected:', value)}
                        defaultValue="Hôm nay"
                    />
                </div>
            </div>
            <div className="pie-chart-wrapper">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            innerRadius={60}
                            dataKey="value"
                            sector={renderSector}
                            startAngle={0}
                            endAngle={360}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" className="center-text">
                            {displayCenterText}
                        </text>
                        <text x="50%" y="50%" dy={20} textAnchor="middle" dominantBaseline="central" className="center-sub-text">
                            {displayCenterSubText}
                        </text>
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="pie-chart-summary">
                {(hasData ? data : [
                    { value: 0, color: '#FFA500', label: 'Chưa hoàn thành' },
                    { value: 0, color: '#3366FF', label: 'Đang sản xuất' },
                    { value: 0, color: '#00C49F', label: 'Hoàn thành' }
                ]).map((entry, index) => (
                    <div key={`card-${index}`} className="status-card">
                        <div className={`value ${entry.value === 0 ? 'value-zero' : ''}`} style={{ color: entry.color }}>
                            {entry.value}
                        </div>
                        <div className="label">{entry.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default CustomPieChart;
