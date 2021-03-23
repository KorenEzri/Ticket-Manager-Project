# ![Scale-Up Velocity](./readme-files/logo-main.png) Final 2/5 - Tickets Manager

This project will include most of the topics we have learnt so far.
This repository includes a basic skeleton with automated tests, use it for you submissions.
In this project you will create a Ticket Manager Web Application, with the [MERN stack](https://www.educative.io/edpresso/what-is-mern-stack)

## Setup & Instructions

1. [Import](https://github.com/new/import) this repository into your account. Make sure to select the _private_ option
1. Clone your new repository to your computer
1. Install the project dependencies by running `npm install` from the client folder _and_ the server folder
1. Create a new branch `dev`
1. Create 2 new databases in your [mongoDB Atlas](https://www.mongodb.com/cloud/atlas) account: `TicketManager` and `TicketManagerTest`. Create a collection `tickets` in each
1. Edit `example.env` - Rename it to [`.env`](https://www.freecodecamp.org/news/nodejs-custom-env-files-in-your-apps-fa7b3e67abe1/) and paste your Mongo connection strings. Should be similar to this:

   `mongodb+srv://fullstacknitzo:<password>@cluster0.f8jpd.mongodb.net/<DatabaseName>?retryWrites=true&w=majority`

1. Add a [github secret](https://docs.github.com/en/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository) to your repo. Name it `ENV_FILE` and paste in it the content of the `.env` file you created in the previous step
1. `Seeding` - Run the command `npm run seed` from your `server` directory to [seed](https://en.wikipedia.org/wiki/Database_seeding) your DB. It will populate it with a pre made data which is located in `seeds/tickets/tickets.json`

   Ps. **Please**, do _not_ change any of the data in `tickets.JSON` (except for the labels). The tests rely on this data.

1. Change the project to meet the requirements, commit only to your work branch (`dev`)
1. [Commit Early, Push Often](https://www.worklytics.co/commit-early-push-often/), your work might be evaluated by your push history
1. Once you are done and want to submit, follow the [Submitting](#Submitting) section
1. Good Luck!

## Running tests

We have created automated tests for your convenience, use it to check your progression.

Note that the automated tests rely on your code having the exact class names and Ids as specified in the [Client requirements sechtion](#Requirements Client).
We encourage you to add your own tests.

- To run the _server tests_ simply run `npm run test` on server folder
- To run the _client tests_ make sure your development server (the React app) is running on port 3000 (via the `npm start` script) and then run `npm run test` from client folder

## Backend Requirements

The Express app should be located under the path `server/app.js` and export the `app` object (`module.exports = app;`).

- The server should run on port `8080` serve the react app on `http://localhost:8080/` and expose those API endpoints:
  - [GET] api/tickets - returns an array of all tickets in the collection `tickets` in your mongoDB atlas database. If called with [query param](https://en.wikipedia.org/wiki/Query_string) `searchText` the API will filter only tickets that have a title including a [case-insensitive](https://en.wikipedia.org/wiki/Case_sensitivity) version of the `searchText` param
  - [POST] api/tickets/[:ticketId](https://stackoverflow.com/a/20089634/10839175)/done - Sets `done` property to `true` for the given ticketId
  - [POST] api/tickets/[:ticketId](https://stackoverflow.com/a/20089634/10839175)/undone - Sets `done` property to `false` for the given ticketId

## Requirements Client

- The app title should be `Tickets Manager` with a custom [favicon](https://en.wikipedia.org/wiki/Favicon). You can create one [here](https://favicon.io/)
- The app should load (from backend) and show all Tickets.
- The Ticket component should have className `ticket` and should match this appearance: ![ticketcomponent](./readme-files/ticketcomponent.png)
- App ticket data (received from the server) might contain `label` property (an array of strings). add those tags to the UI using elements having the `label` class. Use the following style as an example: ![tags](./readme-files/tags.png)
  PS: feel free to add more label strings to the data (`seeds/tickets/tickets.json`) if you need. (Remember to re-seed!)
- The app should have input with id `searchInput`. This input should request the server on `onChange` with relevant `searchText` param and update the list accordingly
- Add a hide button with className `hideTicketButton` that will hide the tickets from view. Add a counter of number of hiding tickets, this counter should have a `hideTicketsCounter` className.
- Add a button to restore the hidden ticket list on click with the id `restoreHideTickets` ![hide](./readme-files/hideit.gif)

## Bonus

1. New feature - add any cool functionality you want to the app
2. Testing that feature - add a test to that new feature
3. Add an explanation for this new feature in the readme

## Submitting

1. Deploy your app to heroku:

   - Open the terminal and type `heroku create YOUR_APP_NAME --buildpack heroku/nodejs` (If the name is taken, try another...)
   - When the app is created type `heroku git:remote -a YOUR_APP_NAME`
   - Go to your [heroku dashboard](https://dashboard.heroku.com/apps) and click your new app. Go to `settings` > `Reveal Config Vars` > add your `MONGO_URI` like you did in `.env`
   - Make sure all your work is committed and pushed to origin
   - Run `git push heroku dev:main`
   - That's it 🥳

   Whenever you want to re-deploy, run `git push heroku dev:main` again

1. Add a link to your deployed app to `README.md`
1. Open a PR from your work branch to the unchanged main branch
1. Invite `Cyber4sPopo` as a [collaborator](https://docs.github.com/en/github/setting-up-and-managing-your-github-user-account/inviting-collaborators-to-a-personal-repository) to your repo 👮
1. Make sure [Issues](https://www.youtube.com/watch?v=vTULg-7xycs) are enabled in your repo
1. Create a Pull Request from the new brunch into `main` in your duplicated repository

## Grading policy

- Your project will be graded by the number of automatic tests you pass
- Visual creativity, use css to make this app look awesome 💅🏿
- Code quality: Variable naming, meaningful comments, logic separation into functions
- Git usage: commit messages, and overall git usage flow
