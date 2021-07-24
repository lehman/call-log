# Call Log Backend

Backend and API for sample job note application

### Prerequisites

* Python 3.7.3+
* Python Package Installer 20.2.3+

## Getting Started

Getting started is as easy as 1-2-3...

### 1. Create a Python virtual environment

```bash
cd backend
python3 -m venv venv
. venv/bin/activate
```

### 2. Install dependencies

```bash
./install.sh
```

### 3. Start the server

```bash
python manage.py runserver
```

The installation script will prompt you to create a super user with the following details:
* Username
* Email address
* Password

The `runserver` command will start the server at `http://127.0.0.1:8000/`.

Navigate to `http://127.0.0.1:8000/admin` and login using the super user credentials you created above.

## Usage

The sample API includes the following resources:
* Users - Create and manage app user accounts
* Jobs - Create and manage jobs
* Notes - Create and manage notes

### Users

#### POST a new user
```bash
curl -X POST -H "Content-Type: application/json" --data '{"name": "Chuck Greb", "email": "chuck@evergreenportal.com"}' http://localhost:8000/user/

{
	"id": 1,
	"name": "Chuck Greb",
	"email": "chuck@evergreenportal.com"
}
```

#### GET user by id
```bash
curl http://localhost:8000/user/1/

{
	"id": 1,
	"name": "Chuck Greb",
	"email": "chuck@evergreenportal.com"
}
```

#### GET all users
```bash
curl http://localhost:8000/user/

[{
	"id": 1,
	"name": "Chuck Greb",
	"email": "chuck@evergreenportal.com"
}, {
	"id": 2,
	"name": "Beau Haugh",
	"email": "beau@evergreenportal.com"
}]
````

### Jobs

#### POST a new job
```bash
curl -X POST -H "Content-Type: application/json" --data '{"title": "Kicker", "company": "Philadelphia Eagles", "interviewer": "Nick Sirianni", "user": 1}' http://localhost:8000/jobs/

{
        "id": 1,
	"company": "Philadelphia Eagles",
	"title": "Kicker",
	"interviewer": "Nick Sirianni",
	"user_id": 1
}
```

#### GET list of jobs for a user
```bash
curl http://localhost:8000/user/1/jobs/

[{
	"id": 1,
	"title": "Kicker",
	"company": "Philadelphia Eagles",
	"interviewer": "Nick Sirianni"
}, {
	"id": 2,
	"title": "Water Boy",
	"company": "New York Giants",
	"interviewer": "Joe Judge"
}]
```

#### DELETE a job
```bash
curl -X DELETE http://localhost:8000/jobs/1/
```

### Notes

#### POST a new note
```bash
curl -X POST -H "Content-Type: application/json" --data '{"text": "This is a note", "job": 1}' http://localhost:8000/note/

{
	"text": "This is a note",
	"date": "2020-09-13T01:58:58.537190Z",
	"job_id": 1
}
```

#### GET notes by job id
```bash
curl http://localhost:8000/jobs/1/notes/

[{
	"id": 1,
	"text": "Great first call with Nick, super casual",
	"date": "2020-09-12T23:36:39.515190Z"
}, {
	"id": 2,
	"text": "Follow up call went well, likes that I am left footed",
	"date": "2020-09-12T23:36:54.821889Z"
}, {
	"id": 3,
	"text": "Offer arriving tomorrow!",
	"date": "2020-09-12T23:37:13.530922Z"
}]
```

#### DELETE a note
```bash
curl -X DELETE http://localhost:8000/note/1/
```