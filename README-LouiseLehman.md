# Call Log

As a submission for the take-home coding assignment from Therefore, this is a "Call Log" for individuals to keep record of companies they would be interviewing with, and notes relating to those interview processes.

## Overview

I worked on getting through the basic implementation and a basic UI using a design library.

-   [x] List jobs
-   [x] Add a new job
-   [x] View notes for jobs
-   [x] Take a note for a job
-   [x] Remove a note
-   [~] Works in latest versions of Chrome, Firefox, Safari and Internet Explorer. No need to support anything older than that.

### Time Spent

I spent much more than 3-4 hours on this. Probably around 15.

## Libraries Used

This repo was built using `create-react-app --template typescript`. In addition to the libraries that are built in with using `create-react-app`, this repo uses:

-   [Prettier](https://prettier.io/): code formatter
-   [Ant Design](https://ant.design/docs/react/use-with-create-react-app): UI component library
-   [Axios](https://www.npmjs.com/package/axios): Promise based HTTP client for the browser and node.js
    -   I started using this part way through, and didn't get around to updating all API calls to use it.

## Testing

I tested on Chrome, Firefox, and Microsoft Edge, but am on a Windows machine, so haven't tested Safari. Internet Explorer seemed to think I didn't have scripting enabled, but my settings showed that I did, so I didn't end up having time to figure that out and test there.

I also minimally used the Chrome DevTools to verify that the layout was responsive.

I didn't have time to write any automated tests, though I know they're important. :(

### Bugs / Issues

There are some bugs right now.

-   One noticeable one is when adding a new job, you are not able to go to its Notes tab without refreshing the page.
-   There's also currently a [bug with the antd modal](https://github.com/ant-design/ant-design/issues/27921) I'm using, that causes a `findDOMNode is deprecated in StrictMode` warning in the console.
-   The usages of context and `useEffect` need some cleaning up as well, as I think I'd prefer to not have the context be nullable, and for the dependency arrays in my `useEffect` usages to be more precise without getting caught up on the nullable context.

## Running Locally

In the `frontend/` directory, you can run the following to start running the frontend app in development mode.

```
yarn install
yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Backend Setup Notes

I'm on a Windows machine, and I'm not sure if that's the reason some of these commands were slightly different, or if my `PATH` wasn't set up enough. Here's the slight modifications I made in order to get the backend set up:

```
python -m venv venv
.\venv\Scripts\activate
```

instead of

```
python3 -m venv venv
. venv/bin/activate
```

I also installed CORS headers

```
pip install django-cors-headers
```

and added the following to `backend/settings.py`

```

INSTALLED_APPS = [
    ...
    'corsheaders',
    ...
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    ...
]
CORS_ORIGIN_WHITELIST = [
    'http://localhost:3000',
]
```
