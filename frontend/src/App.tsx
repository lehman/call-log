import './App.css';
import CallLog from './components/CallLog/CallLog';
import { JobManagementProvider } from './api/JobManagementProvider';

function App() {
    return (
        <JobManagementProvider>
            <CallLog></CallLog>
        </JobManagementProvider>
    );
}

export default App;
