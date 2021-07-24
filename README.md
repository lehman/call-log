Thanks for taking the time to work on this take-home challenge! We're excited to see what you put together.

—Team Evergreen


# Process

 * Create a repository and commit your work to it
 * Document any requirements or assumptions about your code with inline comments
 * Create a new file, `README-YourName.md`, add it to the root directory, and provide any additional commentary there
 * To submit, zip the repository and email it to us. We will confirm receipt when we get it — if we don't, please ask again!
 * Any questions, email us!

## Evaluation

Aim for basics; skip the sticky parts. You are not being evaluated on the number of lines of code you write, but on the quality and economy of what you write to satisfy the challenge.

Key criteria:

 * Code completeness
 * Style
 * Economy
 * It runs!

When you submit your project, we will review and schedule a 30-minute call to go over your work. On that call, be prepared to talk about

 * Design decisions
 * Trade-offs
 * Possible places to expand
 * Cool things you're proud of

# The Task

Create a basic "Call Log" app to track notes you'd take while talking to interviewers. We need a backend to store and serve notes, and we need a frontend for users to view and make notes.

The user is a job applicant who is engaged with multiple companies and trying to determine which one they want to work at. A company may be represented by multiple people, and the applicant may be interested in multiple jobs at that one company, but _assume for the sake of the exercise that each company has **one open job** and the user is only talking to **one point of contact**_.

The backend of the app is a **Django project**; code and documentation is provided in `/backend`.

The frontend of the app should be a **React app**; put your code in `/frontend`.

Design and implementation are up to you, but strive for simplicity in both.

The use of external frameworks and packages is totally acceptable and even encouraged when they are industry standard/best practice.

## Data

Check out [backend/README.md](backend/README.md) for a description of the data model and API endpoints currently available.

## Authentication

Track who your user is, but skip authentication! Call that one a "gimme" for future expansion.

## User Interface

Again, skip login. But provide an experience to:

 * Add jobs
 * View jobs you're tracking
 * Take a note while on a call
 * Remove a note

## Frontend

Your frontend should be a React web app. If you use a module loader, precompiler, or other packaging tools, please make sure you include un-minified sources.

Don't worry too much about how it looks ... but don't worry too little!

### Requirements

 - [ ] List jobs
 - [ ] Add a new job
 - [ ] View notes for jobs
 - [ ] Take a note for a job
 - [ ] Works in latest versions of Chrome, Firefox, Safari and Internet Explorer. No need to support anything older than that.

# Thanks!

Looking forward to checking it out!
