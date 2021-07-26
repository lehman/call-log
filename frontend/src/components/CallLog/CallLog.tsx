import Jobs from '../Jobs/Jobs';
import UserManagement from '../UserManagement/UserManagement';
import './CallLog.css';

function CallLog() {
    return (
        <div className="call-log">
            <UserManagement />
            <Jobs />
        </div>
    );
}

export default CallLog;
