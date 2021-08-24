import Main from "./main/Main";
import SideBar from "./sidebar/SideBar";

const UserPage = () => {
    return (
        <>
            <SideBar />
            <div id="page">
                <div className="content">
                    <Main />
                </div>
            </div>
        </>
    );
};

export default UserPage;
