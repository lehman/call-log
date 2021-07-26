export interface User {
    id: string;
    name: string;
    email: string;
}

export interface Job {
    id: string;
    company: string;
    title: string;
    interviewer: string;
    user_id: string;
}

export interface Note {
    id: string;
    text: string;
    date: string;
    job_id: string;
}

export interface CreateJob {
    company: string;
    title: string;
    interviewer: string;
    user_id: string;
}

export interface CreateNote {
    job: string;
    text: string;
}
