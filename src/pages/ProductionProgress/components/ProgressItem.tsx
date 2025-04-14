import React from 'react';

interface ProgressItemProps {
    label: string;
    completed: number;
    total?: number;
    percentage: number;
}

const ProgressItem: React.FC<ProgressItemProps> = ({ label, completed, total, percentage }) => {
    const isEmpty = !label || completed === 0;

    return (
        <div className="progress-item">
            <div className="progress-label">
                <span className="label-text">
                    {isEmpty ? 'Chưa có mặt hàng' : label}
                </span>
                {isEmpty}
                <span className="progress-value">
                    {isEmpty ? '-' : `${completed}${total !== undefined ? `/${total} ` : ''}(${percentage}%)`}
                </span>
            </div>
            <div className="progress-bar">
                <div
                    className="progress-fill"
                    style={{
                        width: isEmpty ? '100%' : `${percentage}%`,
                        backgroundColor: isEmpty ? '#e0e0e0' : '#4caf50'
                    }}
                >

                </div>
            </div>
        </div>
    );
};

export default ProgressItem;
