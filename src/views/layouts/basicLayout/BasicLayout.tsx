import { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import UserContext from "context/user/UserContext";
import SearchContext from "context/search/SearchContext";
import { Avatar, FloatButton, Layout, Popover, Input } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import './basicLayout.scss'
const { Header, Footer, Content } = Layout;
const { Search } = Input;

export default function BasicLayout() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0()
  const { dbUser } = useContext(UserContext)
  const location = useLocation()
  const navigate = useNavigate()
  const { setQueryAction } = useContext(SearchContext)
  const popoverContent = (
    <div className="basic-layout__popover">
      <div style={{ cursor: 'pointer' }} onClick={() => isAuthenticated ? logout() : loginWithRedirect()}>
        {isAuthenticated ? 'Logout' : 'Login'}
      </div>
    </div>
  )
  const handleSearch = (e: string) => {
    setQueryAction(e)
    if (location.pathname !== '/search') {
      return navigate("/search");
    }
  }
  return (
    <>

      <Layout className="basic-layout">
        <Header className="basic-layout__header">
          <h1 className="basic-layout__header--logo">DaGif</h1>
          <ul className="basic-layout__header--menu">
            <li className={location.pathname === '/' ? 'active' : ''}>
              <Link to={'/'}>Home</Link>
            </li>
            <li className={location.pathname === '/categories' ? 'active' : ''}>
              <Link to={'/categories'}>Categories</Link>
            </li>
            {isAuthenticated && (
              <li className={location.pathname === '/profile' ? 'active' : ''}>
                <Link to={'/profile'}>Profile</Link>
              </li>
            )}
          </ul>
          <Popover placement="bottomRight" content={popoverContent} trigger="click">
            <Avatar className="basic-layout__header--avatar" icon={dbUser.avatar ? <img src={dbUser.avatar} /> : <UserOutlined />} />
          </Popover>
        </Header>
        <Content className='basic-layout__content'>
          <div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
            <Search
              placeholder="Search gif's in DaGif"
              allowClear
              enterButton="Search"
              size="large"
              style={{ maxWidth: 500, display: 'flex', justifyContent: 'center' }}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <Outlet />
        </Content>
        <Footer className="basic-layout__footer">
          DaGif ©2023 Created by DTPF
        </Footer>
      </Layout>
      <FloatButton
        shape="square"
        type="primary"
        style={{ right: 24 }}
        icon={<PlusOutlined />}
        onClick={() => isAuthenticated ? navigate('/gif-form') : loginWithRedirect()}
      />
    </>
  )
}