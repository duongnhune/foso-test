import React from 'react';
import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import DateFilterDropdown from "@/components/layouts/Base/DateFilterDropdown";

interface CustomerData {
    customer: string;
    quantity: number;
}

interface TopCustomersChartProps {
    data: CustomerData[];
}

const TopCustomersChart: React.FC<TopCustomersChartProps> = ({ data }) => {
    const displayData = data.length > 0 ? data : [{ customer: '', quantity: 0 }];

    return (
        <div className="top-customers-chart">
            <div className="section-header">
                <h3 className="section-title">Top 5 Khách Hàng Có Sản Lượng Nhiều Nhất</h3>
                <div className="filter-dropdown-container">
                    <DateFilterDropdown
                        options={['Hôm nay', 'Tuần này', 'Tháng này','Qúy này', 'Năm nay']}
                        onSelect={(value) => console.log('Selected:', value)}
                        defaultValue="Năm nay"
                    />
                </div>
            </div>
            <div style={{ width: '100%', height: '250px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        layout="vertical"
                        data={displayData}
                        margin={{ top: 20, bottom: 10 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis
                            type="number"
                            domain={[0, 3200]}
                            tickCount={5}
                            tick={{
                                fontFamily: 'Lexend Deca',
                                fontWeight: 400,
                                fontSize: 12,
                                fill: '#9295A4',
                            }}
                            label={{
                                value: 'Sản lượng',
                                position: 'insideLeft',
                                dx: -80,
                                dy: -10,
                                style: {
                                    fontFamily: 'Lexend Deca',
                                    fontWeight: 500,
                                    fontSize: 14,
                                    fill: '#000',
                                },
                            }}
                        />

                        <YAxis
                            type="category"
                            dataKey="customer"
                            width={150}
                            tick={
                                data.length
                                    ? {
                                        fontFamily: 'Lexend Deca',
                                        fontWeight: 400,
                                        fontSize: 12,
                                        letterSpacing: '0%',
                                        textAlign: 'right',
                                        fill: '#9295A4',
                                    }
                                    : false
                            }
                            label={{
                                value: 'Khách Hàng',
                                position: 'insideTopLeft',
                                offset: -20,
                                dx: 100,
                                style: {
                                    fontFamily: 'Lexend Deca',
                                    fontWeight: 500,
                                    fontSize: 14,
                                    fill: '#000',
                                },
                            }}
                        />

                        <Tooltip />

                        {data.length > 0 && (
                            <Bar
                                dataKey="quantity"
                                fill="#3366FF"
                                name="Sản lượng"
                                barSize={8}
                                radius={[0, 25, 25, 0]}
                            />
                        )}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TopCustomersChart;
