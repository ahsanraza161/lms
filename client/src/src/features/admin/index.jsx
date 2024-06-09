import Sidebar from './components/common/sidebar';
import Topbar from './components/common/topbar';
import { Outlet } from 'react-router-dom';


function Admin() {
 
  return (
    <div className="admin">
      <Sidebar>
        <Topbar />
        <Outlet />
      </Sidebar>
    </div>
  );
}
export default Admin;
