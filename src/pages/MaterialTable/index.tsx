import React, { useEffect, useState } from 'react';
import avatarEmpty from '@/assets/images/avatar-empty.png';
import DateFilterDropdown from "@/components/layouts/Base/DateFilterDropdown";

interface Material {
    id: number;
    name: string;
    unit: string;
    quantity: number;
    image?: string;
    code?: string;
    link?: string;
}

interface MaterialTableProps {
    data?: Material[];
    apiUrl?: string;
}

const MaterialTable: React.FC<MaterialTableProps> = ({ data, apiUrl }) => {
    const [materials, setMaterials] = useState<Material[]>([]);
    const [filter, setFilter] = useState<string>('Tuần này');

    useEffect(() => {
        if (data) {
            setMaterials(data);
        } else if (apiUrl) {
            fetch(apiUrl)
                .then(res => res.json())
                .then((apiData) => {
                    setMaterials(apiData);
                })
                .catch(err => {
                    console.error('Api error', err);
                });
        }
    }, [data, apiUrl]);

    const handleCodeClick = (link: string | undefined) => {
        if (link) {
            window.open(link, '_blank');
        }
    };

    return (
        <div className="material-table-container">
            <div className="section-header">
                <h3 className="section-title">Nguyên Vật Liệu Cần Mua</h3>
                <div className="filter-dropdown-container">
                    <DateFilterDropdown
                        options={['Hôm nay', 'Tuần này', 'Tháng này', 'Qúy này', 'Năm']}
                        onSelect={(value) => setFilter(value)}
                        defaultValue="Tuần này"
                    />
                </div>
            </div>

            <table>
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Nguyên vật liệu</th>
                    <th>Đơn vị tính</th>
                    <th>Số lượng</th>
                </tr>
                </thead>
                <tbody>
                {materials.length > 0 ? (
                    materials.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>
                                <div className="material-item">
                                    <img
                                        src={item.image || avatarEmpty}
                                        alt={item.name}
                                        className="material-icon"
                                    />
                                    <div className="material-info">
                                        <div className="material-name">{item.name}</div>
                                        {!item.image && <div className="none-text">(none)</div>}
                                        {item.code && (
                                            <div
                                                className="material-code"
                                                onClick={() => handleCodeClick(item.link)}
                                            >
                                                {item.code}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </td>
                            <td>{item.unit}</td>
                            <td>{item.quantity}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={4}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '24px',
                                padding: '20px',
                                color: '#999',
                                fontSize: '16px',
                            }}>
                                <img src="/src/assets/images/ic-content.png" alt="No data" style={{ width: '250px', height: '250px' }} />
                                <span>Không có dữ liệu</span>
                            </div>
                        </td>
                    </tr>

                )}
                </tbody>
            </table>
        </div>
    );
};

export default MaterialTable;
