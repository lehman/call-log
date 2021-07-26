import { Descriptions } from 'antd';
import { useContext } from 'react';
import UserContext from '../../api/JobManagementProvider';
import AddUser from '../AddUser/AddUser';
import Jobs from '../Jobs/Jobs';
import './UserManagement.css';

const UserManagement = () => {
    const userContext = useContext(UserContext);
    if (!userContext) {
        return null;
    }
    const { users, currentUser } = userContext;

    return (
        <div className="user-info">
            {currentUser !== undefined ? (
                <>
                    <h1>{`Welcome ${users.find((user) => user.id === currentUser?.id)?.name}! Let's get crackin'.`}</h1>

                    <Descriptions title="User Info">
                        <Descriptions.Item label="Name">{currentUser.name}</Descriptions.Item>
                        <Descriptions.Item label="Email">{currentUser.email}</Descriptions.Item>
                    </Descriptions>

                    <Jobs />
                </>
            ) : (
                <AddUser></AddUser>
            )}
        </div>
    );
};

export default UserManagement;
