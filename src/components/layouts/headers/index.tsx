import React, { useState, useRef, useEffect } from 'react';
import logoIcon from '@/assets/icon/logo.png';
import searchIcon from '@/assets/icon/Search.png';
import settingsIcon from '@/assets/icon/setting.png';
import networkIcon from '@/assets/icon/convertshape-2.png';
import chatIcon from '@/assets/icon/message-text.png';
import notificationIcon from '@/assets/icon/notification.png';
import questionIcon from '@/assets/icon/question.png';
import defaultAvatar from '@/assets/icon/User.png';
import { useNavigate } from 'react-router-dom';

interface UserInfo {
  name: string;
  avatarUrl: string;
}

function Header() {
  const navigate = useNavigate();

  const redirectTo404 = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // ngăn reload trang
    navigate('/404');
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  const fetchUserInfo = async () => {
    try {
      // Fake API call
      const data: UserInfo = {
        name: 'Nguyễn Văn A',
        avatarUrl: defaultAvatar
      };
      setUserInfo(data);
    } catch (error) {
      console.error('Failed to fetch user info:', error);
    }
  };

  const handleLogout = () => {
    console.log('Logging out...');
    // Redirect or clear auth here
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
      <div className="header">
        <div className="logo">
          <img src={logoIcon} alt="HRP Logo" className="logo-icon" />
        </div>

        <nav className="navigation">
          <a href="/">Dashboard</a>
          <a href="#"  onClick={redirectTo404}>Mua & Nhập hàng</a>
          <a href="#"  onClick={redirectTo404}>Bán & Xuất hàng</a>
          <a href="#"  onClick={redirectTo404}>Kho & Sản xuất</a>
          <a href="#"  onClick={redirectTo404}>Kế hoạch</a>
          <a href="#"  onClick={redirectTo404}>Báo cáo & Thống kê</a>
          <a href="#"  onClick={redirectTo404}>Tiện ích</a>
        </nav>

        <div className="user-info">
          <div className="search-input-container">
            <img src={searchIcon} alt="Search" className="search-icon" />
            <input type="text" placeholder="Tìm kiếm..." className="search-input" />
          </div>

          <div className="icons">
            <a className="icon-link"><img src={settingsIcon} alt="Cài đặt" className="header-icon"  onClick={redirectTo404} /></a>
            <a className="icon-link"><img src={networkIcon} alt="Mạng" className="header-icon"  onClick={redirectTo404} /></a>
            <a className="icon-link"><img src={chatIcon} alt="Chat" className="header-icon"  onClick={redirectTo404} /></a>
            <a className="icon-link notification"><img src={notificationIcon} alt="Thông báo" className="header-icon"  onClick={redirectTo404} /></a>
            <a className="icon-link"><img src={questionIcon} alt="Trợ giúp" className="header-icon"  onClick={redirectTo404} /></a>

            <div className="user-avatar-dropdown" ref={dropdownRef}>
              <div className="user-avatar" onClick={toggleDropdown}>
                <img
                    src={userInfo?.avatarUrl || defaultAvatar}
                    alt="User Avatar"
                    className="header-avatar"
                />
                <svg viewBox="0 0 24 24" className="dropdown-arrow" style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease-in-out' }}>
                  <path fill="currentColor" d="M7 10l5 5 5-5z" />
                </svg>
              </div>

              <div className={`dropdown-menu ${isDropdownOpen ? 'open' : ''}`}>
                <div className="dropdown-item">{userInfo?.name || 'Loading...'}</div>
                <a className="dropdown-item">Hồ sơ</a>
                <a className="dropdown-item" onClick={handleLogout}>
                  Đăng xuất
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Header;
