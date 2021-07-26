import { Card } from 'antd';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../api/JobManagementProvider';
import AddJob from '../AddJob/AddJob';
import Notes from '../Notes/Notes';
import './Jobs.css';

const tabList = [
    {
        key: 'details',
        tab: 'Details',
    },
    {
        key: 'notes',
        tab: 'Notes',
    },
];

const Jobs = () => {
    const userContext = useContext(UserContext);
    const [activeTabs, setActiveTabs] = useState<{ jobId: string; activeTab: string }[]>([]);

    useEffect(() => {
        const getJobs = async () => {
            if (userContext) {
                let jobs = await userContext.getJobs();
                let activeTabs: { jobId: string; activeTab: string }[] = [];
                jobs?.forEach((job) => {
                    activeTabs.push({
                        jobId: job.id,
                        activeTab: tabList[0].key,
                    });
                });
                setActiveTabs(activeTabs);
            }
        };
        getJobs();
    }, [userContext?.currentUser]);

    if (!userContext) {
        return null;
    }
    const { currentUser, jobs } = userContext;

    const onTabChange = (jobId: string, tabKey: string) => {
        let index = activeTabs.findIndex((card) => card.jobId === jobId);
        if (index > -1) {
            var clonedTabs = JSON.parse(JSON.stringify(activeTabs));
            clonedTabs[index].activeTab = tabKey;
            setActiveTabs(clonedTabs);
        }
    };

    return (
        <>
            {currentUser !== undefined ? (
                <>
                    <div className="jobs-header">
                        <h2>{`Jobs`}</h2>
                        <AddJob userId={currentUser.id}></AddJob>
                    </div>
                    {jobs.length !== 0 && jobs !== undefined ? (
                        jobs.map((item) => {
                            let tabKey = 'details';
                            if (activeTabs[activeTabs.findIndex((card) => card.jobId === item.id)] !== undefined) {
                                tabKey = activeTabs[activeTabs.findIndex((card) => card.jobId === item.id)].activeTab;
                            }
                            let contents: JSX.Element = <></>;
                            switch (tabKey) {
                                case 'details':
                                    contents = (
                                        <div key={`${item.id}`}>
                                            <p>{`Company: ${item.company}`}</p>
                                            <p>{`Title: ${item.title}`}</p>
                                            <p>{`Interviewer: ${item.interviewer}`}</p>
                                        </div>
                                    );
                                    break;
                                case 'notes':
                                    contents = <Notes job={item} />;
                                    break;
                                default:
                                    break;
                            }

                            return (
                                <Card
                                    title={`${item.company} - ${item.title}`}
                                    tabList={tabList}
                                    activeTabKey={tabKey}
                                    onTabChange={(key) => {
                                        onTabChange(item.id, key);
                                    }}
                                    key={`${item.id}`}
                                    className="job-card"
                                >
                                    {contents}
                                    {/* <div key={`${item.id}`}>
                                    <p>{`Company: ${item.company}`}</p>
                                    <p>{`Title: ${item.title}`}</p>
                                    <p>{`Interviewer: ${item.interviewer}`}</p>
                                </div>

                                <Notes job={item} /> */}
                                </Card>
                            );
                        })
                    ) : (
                        <p>No jobs yet, but if this is what you'd like to work on, we can help you get there!</p>
                    )}
                </>
            ) : (
                <p>No User</p>
            )}
        </>
    );
};

export default Jobs;
