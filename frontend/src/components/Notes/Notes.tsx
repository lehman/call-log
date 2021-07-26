import { Card } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useContext, useEffect } from 'react';
import UserContext from '../../api/JobManagementProvider';
import { Job } from '../../api/models';
import AddNote from '../AddNote/AddNote';
import './Notes.css';

export interface INoteProps {
    job: Job;
}

const Notes = (props: INoteProps) => {
    const { job } = props;
    const userContext = useContext(UserContext);

    useEffect(() => {
        if (userContext) {
            userContext.getNotes(job.id);
        }
    }, []);

    if (!userContext) {
        return null;
    }
    const { currentUser, notes, deleteNote } = userContext;

    let jobNotes = notes.filter((note) => note.job_id === job.id);

    return (
        <>
            {currentUser !== undefined ? (
                <>
                    <div className="all-notes">
                        {jobNotes.length !== 0 ? (
                            jobNotes.map((note) => (
                                <Card
                                    title={`${note.date}`}
                                    key={`${note.id}`}
                                    size="small"
                                    type="inner"
                                    className="note"
                                    hoverable={true}
                                    actions={[<DeleteOutlined key="delete" onClick={() => deleteNote(note.id)} />]}
                                >
                                    <p>{`Date: ${note.date}`}</p>
                                    <p>{`Notes: ${note.text}`}</p>
                                </Card>
                            ))
                        ) : (
                            <p>
                                Add notes when doing research on the company or job description, prepping for
                                interviews, or during or after interviews.
                            </p>
                        )}
                        <AddNote jobId={job.id} className="add-note-button"></AddNote>
                    </div>
                </>
            ) : (
                <p>To manage your Notes, please log in.</p>
            )}
        </>
    );
};

export default Notes;
