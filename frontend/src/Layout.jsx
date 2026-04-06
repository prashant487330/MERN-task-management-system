import { Outlet } from "react-router-dom"
const Layout = () => {
    return (
        <>
            <div id="home-content">
                <Outlet />
            </div>
        </>
    )
}
export default Layout;