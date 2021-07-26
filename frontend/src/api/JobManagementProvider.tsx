import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { User, Job, CreateJob, CreateNote, Note } from './models';

interface IUserState {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    currentUser?: User;
    setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
    jobs: Job[];
    setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
    getUsers: () => Promise<void>;
    getJobs: () => Promise<Job[]>;
    addJob: (job: CreateJob) => Promise<void>;
    notes: Note[];
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
    getNotes: (jobId: string) => Promise<void>;
    addNote: (note: CreateNote) => Promise<void>;
    deleteNote: (noteId: string) => Promise<void>;
}

interface IProviderProps {
    children: React.ReactElement;
}

// const initialState = {
//     users: [],
//     setUsers: null,
//     currentUser?: undefined;
//     setCurrentUser: null,
//     jobs: [],
//     setJobs: null,
//     getUsers: null,
//     getJobs: null,
//     addJob: null,
// }

const UserContext = createContext<IUserState | null>(null);

export const JobManagementProvider: React.FC<IProviderProps> = (props) => {
    const [users, setUsers] = useState<User[]>([]);
    const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [notes, setNotes] = useState<Note[]>([]);

    const getUsers = async () => {
        try {
            const response = await fetch('http://localhost:8000/user/');
            const users = await response.json();
            setUsers(users);
            setCurrentUser(users[0]);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const getJobs = async () => {
        try {
            if (currentUser !== undefined) {
                const response = await fetch(`http://localhost:8000/user/${currentUser?.id}/jobs/`);
                const jobs = await response.json();
                setJobs(jobs);
                return jobs;
            }
        } catch (e) {
            console.log(e);
        }
    };

    const addJob = async (job: CreateJob) => {
        try {
            const response = await axios.post(`http://localhost:8000/jobs/`, job);
            const createdJob = await response.data;
            setJobs([...jobs, createdJob]);
        } catch (e) {
            console.log(e);
        }
    };

    const getNotes = async (jobId: string) => {
        try {
            const response = await fetch(`http://localhost:8000/jobs/${jobId}/notes/`);
            const retrievedNotes = await response.json();
            let newNotes = notes.filter((note) => note.job_id !== jobId);
            newNotes = newNotes.concat(retrievedNotes);
            setNotes(newNotes);
        } catch (e) {
            console.log(e);
        }
    };

    const addNote = async (note: CreateNote) => {
        try {
            const response = await axios.post(`http://localhost:8000/note/`, note);
            const createdNote = await response.data;
            setNotes([...notes, createdNote]);
        } catch (e) {
            console.log(e);
        }
    };

    const deleteNote = async (noteId: string) => {
        try {
            const response = await axios.delete(`http://localhost:8000/note/${noteId}/`);
            if (response.status === 204) {
                let updatedNotes = notes.filter((note) => note.id !== noteId);
                setNotes(updatedNotes);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const value = {
        users,
        setUsers,
        getUsers,
        currentUser,
        setCurrentUser,
        jobs,
        setJobs,
        getJobs,
        addJob,
        notes,
        setNotes,
        getNotes,
        addNote,
        deleteNote,
    };
    return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>;
};

export default UserContext;
