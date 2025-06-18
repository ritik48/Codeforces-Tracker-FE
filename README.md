## Codeforces Tracker Frontend

Codeforces Tracker is a web-application that allows an admin to track students' progress on Codeforces. It provides a an option to add students, sync their data from codeforces and then display insights on their progress.

### Features

- Add students
- Sync students' data from codeforces
- Display insights like:
  - Most difficult problems solved
  - Total solved problems
  - Average rating of solved problems
  - Average problem per day
  - Rating bucket data
  - Heatmap of submissions
- Cron job to sync students' data every day
- Update cron time
- Allow email reminders for students in case of inactivity
- Download CSV of all students

## Setting up the project locally

To get started with the project, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/ritik48/Codeforces-Tracker-FE.git
```

2. Navigate to the project directory:

```bash
cd Codeforces-Tracker-FE
```

3. Install the dependencies:

```bash
npm install
```

4. Make sure you have started the backend server.
   - If you haven't, follow the instructions in the [backend README](https://github.com/ritik48/Codeforces-Tracker-BE/README.md) to start the server.

5. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173/`.
