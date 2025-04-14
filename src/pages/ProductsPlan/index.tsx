import React, { useEffect, useState } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label,
} from 'recharts';
import DateFilterDropdown from "@/components/layouts/Base/DateFilterDropdown";

interface ChartDataItem {
    item: string;
    plan: number;
    perform: number;
}

const mockData: ChartDataItem[] = [
    { item: 'Áo ba lỗ', plan: 70, perform: 50 },
    { item: 'Áo sơ mi', plan: 100, perform: 70 },
    { item: 'Áo thun polo', plan: 90, perform: 25 },
    { item: 'Quần baggy', plan: 75, perform: 45 },
    { item: 'Quần jogger', plan: 85, perform: 55 },
];

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                padding: '8px 12px',
                borderRadius: '6px',
                boxShadow: '0px 2px 6px rgba(0,0,0,0.1)'
            }}>
                <p style={{ margin: 0 }}>{payload[0].payload.item}</p>
                {payload.map((item: any, index: number) => (
                    <p key={`tooltip-${index}`} style={{ color: item.color, margin: 0 }}>
                        {`${item.name}: ${item.value} cái`}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const ProductsPlan: React.FC = () => {
    const [chartData, setChartData] = useState<ChartDataItem[]>(mockData);
    const [filter, setFilter] = useState('Hôm nay');

    const fetchData = async (filter: string) => {
        try {
            setChartData(mockData);
        } catch (error) {
            console.error('Error fetching data:', error);
            setChartData(mockData);
        }
    };


    useEffect(() => {
        fetchData(filter);
    }, [filter]);

    return (
        <div className="card-chart">
            <div className="section-header">
                <h3 className="section-title">Kế Hoạch Sản Xuất</h3>
                <div className="filter-dropdown-container">
                    <DateFilterDropdown
                        options={['Hôm nay', 'Tuần này', 'Tháng này', 'Qúy này', 'Năm']}
                        onSelect={(value) => setFilter(value)}
                        defaultValue="Qúy này"
                    />
                </div>
            </div>

            <div style={{ width: '100%', height: '250px', position: 'relative' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 0, bottom: 30 }}
                        barCategoryGap="20%"
                    >
                        <CartesianGrid stroke="#E5E5E5" strokeDasharray="3 3" />
                        <XAxis
                            dataKey="item"
                            tick={{
                                fontFamily: 'Lexend Deca',
                                fontWeight: 400,
                                fontSize: 12,
                                fill: '#9295A4',
                            }}
                        />
                        <YAxis
                            ticks={[0, 20, 40, 60, 80, 100]}
                            tick={{
                                fontFamily: 'Lexend Deca',
                                fontWeight: 400,
                                fontSize: 12,
                                fill: '#9295A4',
                            }}
                        >
                            <Label
                                value="Cái"
                                angle={0}
                                position="top"
                                offset={20}
                                style={{ fontSize: 12 }}
                            />
                        </YAxis>

                        <text
                            x={5}
                            y={210}
                            fontFamily="Lexend Deca"
                            fontSize="12px"
                            fill="#9295A4"
                        >
                            Mặt hàng
                        </text>

                        <Tooltip content={<CustomTooltip />} />

                        <Legend
                            verticalAlign="top"
                            align="right"
                            iconType="square"
                            iconSize={13}
                            wrapperStyle={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                gap: '8px',
                                paddingRight: '16px',
                            }}
                            formatter={(value) => (
                                <span style={{
                                    fontFamily: 'Lexend Deca',
                                    fontSize: '14px',
                                    color: '#9295A4'
                                }}>
                  {value}
                </span>
                            )}
                        />

                        {chartData && chartData.length > 0 && (
                            <>
                                <Bar
                                    dataKey="plan"
                                    fill="#3366FF"
                                    name="Kế hoạch"
                                    barSize={20}
                                    radius={[5, 5, 0, 0]}
                                />
                                <Bar
                                    dataKey="perform"
                                    fill="#00CC66"
                                    name="Thực hiện"
                                    barSize={20}
                                    radius={[5, 5, 0, 0]}
                                />
                            </>
                        )}
                    </BarChart>
                </ResponsiveContainer>

                {chartData.length === 0 && (
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: '#999',
                        fontFamily: 'Lexend Deca',
                        fontSize: 14
                    }}>
                        Không có dữ liệu để hiển thị
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductsPlan;
