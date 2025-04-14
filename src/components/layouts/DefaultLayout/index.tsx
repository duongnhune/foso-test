import { Outlet } from 'react-router-dom';
import Header from '@/components/layouts/headers';

const DefaultLayout = () => {
    return (
        <div className="app-container">
            <Header />
            <div className="main-content">
                <Outlet />
            </div>
        </div>
    );
};

export default DefaultLayout;
