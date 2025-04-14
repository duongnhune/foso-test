import React, { useEffect, useState } from 'react';
import TopProductsSection from '../TopProductsSection';
import { DataItemProps } from 'types/DataItems';
import { PieChartData } from '/types/PieChartData';
import ProductsPlan from '../ProductsPlan';
import TopCustomersChart from '../TopCustomersChart';
import ProductionProgress from "../ProductionProgress";
import CustomPieChart from '../PieChart';

import MaterialTable from "@/pages/MaterialTable";

const Dashboard: React.FC = () => {
    const [topProductsData, setTopProductsData] = useState<DataItemProps[]>([]);
    const [productionStatusData, setProductionStatusData] = useState<PieChartData[]>([]);
    const [productionProgressData, setProductionProgressData] = useState<any[]>([]);
    const [customerData, setCustomerData] = useState<any[]>([]);
    const [materialData, setMaterialData] = useState<any[]>([]);

    // Mock data
    const mockTopProductsData: DataItemProps[] = [
        { value: 48, label: 'Áo sơ mi dài tay', percentage: 8.2 },
        { value: 18, label: 'Quần tây', percentage: 5 },
        { value: 40, label: 'Áo hoodie', percentage: 12 },
        { value: 23, label: 'Đầm maxi', percentage: 3.5 },
        { value: 48, label: 'Áo thun cổ tròn', percentage: 4.7 },
    ];

    const mockProductionStatusData: PieChartData[] = [
        { value: 35, color: '#FF8F0D', label: 'Chưa hoàn thành' },
        { value: 40, color: '#0375F3', label: 'Đang sản xuất' },
        { value: 25, color: '#1FC583', label: 'Hoàn thành' },
    ];

    const mockProductionProgressData = [
        { name: 'Áo sơ mi dài tay', completed: 123, percentage: 50 },
        { name: 'Áo sơ mi cộc tay', completed: 321, percentage: 75 },
        { name: 'Quần baggy', completed: 231, percentage: 45 },
        { name: 'Quần tây', completed: 999, percentage: 60 },
        { name: 'Đầm maxi', completed: 876, percentage: 90 },
        { name: 'Áo hoodie', completed: 765, percentage: 15 },
        { name: 'Áo khoác bomber', completed: 543, percentage: 24 },
    ];

    const mockCustomerData = [
        { customer: 'Công ty Dệt may Happy Polo', quantity: 3000 },
        { customer: 'Công ty May mặc Saigon Trendy', quantity: 2800 },
        { customer: 'Outlet Lemon squeeze', quantity: 2900 },
        { customer: 'Shop quần áo streetwear Neo', quantity: 2700 },
        { customer: 'Shop thời trang công sở Basic Office', quantity: 2600 }
    ];

    const mockMaterialData = [
        { id: 1, name: 'Chỉ cotton', unit: 'Cuộn', quantity: 8, image: '', code: 'NVL_000014' },
        { id: 2, name: 'Vải lụa', unit: 'Mét', quantity: 8, image: '', code: 'NVL_000024' },
        { id: 3, name: 'Vải lót', unit: 'Mét', quantity: 8, image: '', code: 'NVL_000024' },
        { id: 4, name: 'Vải chống thấm', unit: 'Mét', quantity: 8, image: '', code: 'NVL_000024' },
        { id: 5, name: 'Vải ni', unit: 'Mét', quantity: 8, image: '', code: 'NVL_000024' },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiResponse = {
                    topProducts: mockTopProductsData,
                    productionStatus: mockProductionStatusData,
                    productionProgress: mockProductionProgressData,
                    customers: mockCustomerData,
                    materials: mockMaterialData
                };

                setTopProductsData(apiResponse.topProducts);
                setProductionStatusData(apiResponse.productionStatus);
                setProductionProgressData(apiResponse.productionProgress);
                setCustomerData(apiResponse.customers);
                setMaterialData(apiResponse.materials);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="dashboard-container">
            <div className="top-section">
                <div className="top-products-section-wrapper">
                    <TopProductsSection data={topProductsData.length > 0 ? topProductsData : mockTopProductsData} />
                </div>
            </div>

            <div className="parent-container">
                <div className="base-grid">
                    <ProductsPlan />
                </div>

                <div className="base-grid">
                    <TopCustomersChart data={customerData.length > 0 ? customerData : mockCustomerData} />
                </div>
            </div>

            <div className="parent-container">
                <div className="base-grid">
                    <CustomPieChart
                        data={productionStatusData.length > 0 ? productionStatusData : mockProductionStatusData}
                        centerText="16"
                        centerSubText="Lệnh sản xuất"
                        cornerRadius={10}
                    />
                </div>

                <div className="base-grid">
                    <ProductionProgress data={productionProgressData.length > 0 ? productionProgressData : mockProductionProgressData} />
                </div>
                <div className="base-grid">
                    <MaterialTable data={materialData.length > 0 ? materialData : mockMaterialData} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
