# MT1-LABEXAM — Employee Task Management Web Application

This project follows the supplied Full Stack Development lab-exam instructions. It contains two independent applications:
- **Part A:** Node.js built-in `http` and `fs` modules on port **3000**.
- **Part B:** Express.js REST API on port **4000**.

No database is used. Task data is stored in JavaScript arrays and resets whenever the relevant server is restarted.

## 1. Requirements

Install Node.js (LTS recommended) and npm. Verify in the VS Code terminal:

```bash
node -v
npm -v
```

## 2. Install dependencies

Open this project folder in VS Code, then run:

```bash
npm install
```

## 3. Run Part A — HTTP + FS server

In terminal 1:

```bash
node httpServer.js
```

Expected message:

```text
HTTP Server running at http://localhost:3000
```

Open these URLs in your browser:

| URL | Expected result |
|---|---|
| `http://localhost:3000/` | Welcome page in HTML |
| `http://localhost:3000/tasks` | Employee task array in JSON |
| `http://localhost:3000/about` | Application information |
| `http://localhost:3000/home` | `public/index.html`, read using the FS module |

To test `POST /add-task`, use EchoAPI (or another API client):
- Method: `POST`
- URL: `http://localhost:3000/add-task`
- Body: raw JSON
- Header: `Content-Type: application/json`

```json
{
  "id": 4,
  "taskName": "Prepare Project Report",
  "assignedTo": "Neha Singh",
  "status": "Pending"
}
```

A successful request returns status `201` and a success message. Then call `GET http://localhost:3000/tasks` to see the added task.

## 4. Run Part B — Express REST API

Keep Part A running. Open a **second VS Code terminal** (Terminal → New Terminal) and run:

```bash
node expressApp.js
```

Expected message:

```text
Express Server running at http://localhost:4000
```

### API endpoints

| Method | URL | Purpose |
|---|---|---|
| GET | `http://localhost:4000/tasks` | Get all tasks |
| GET | `http://localhost:4000/tasks/1` | Get task with ID 1 |
| POST | `http://localhost:4000/tasks` | Add a task |
| PUT | `http://localhost:4000/tasks/1` | Update task with ID 1 |
| DELETE | `http://localhost:4000/tasks/1` | Delete task with ID 1 |

For POST and PUT, choose **Body → raw → JSON** in EchoAPI and ensure the `Content-Type: application/json` header is set.

### POST example

```json
{
  "id": 4,
  "taskName": "Develop REST API",
  "assignedTo": "Amit Kumar",
  "status": "Pending",
  "priority": "Medium"
}
```

Expected: status `201`, message `Task added successfully`, and the created task.

### PUT example

```json
{
  "taskName": "Develop Login Page",
  "assignedTo": "Rahul Sharma",
  "status": "Completed",
  "priority": "High"
}
```

Expected: status `200` and `Task updated successfully`.

### DELETE example

No request body is required. Send `DELETE http://localhost:4000/tasks/1`. Expected: status `200` and `Task deleted successfully`.

**Testing tip:** POST, PUT, and DELETE change the in-memory array. If you want to repeat the tests from a clean state, stop and restart `expressApp.js` with `Ctrl+C` and `node expressApp.js`.

## 5. Screenshots to save

Save screenshots inside the `screenshots/` folder. Capture your own actual running output; do not use sample/fake screenshots.

Suggested filenames:
1. `01-http-server-terminal.png` — Part A terminal showing server started.
2. `02-http-root.png` — browser at `/`.
3. `03-http-tasks.png` — browser at `/tasks`.
4. `04-http-about.png` — browser at `/about`.
5. `05-fs-home.png` — browser at `/home`, showing the served HTML page.
6. `06-express-server-terminal.png` — Part B terminal showing server started.
7. `07-api-get-all.png` — EchoAPI GET `/tasks`.
8. `08-api-get-one.png` — EchoAPI GET `/tasks/1`.
9. `09-api-post.png` — EchoAPI POST `/tasks` with success response.
10. `10-api-put.png` — EchoAPI PUT `/tasks/1` with success response.
11. `11-api-delete.png` — EchoAPI DELETE `/tasks/1` with success response.
12. `12-github-commits.png` — GitHub repository showing commit history.

## 6. GitHub submission

Create a **public or instructor-approved** GitHub repository named exactly `MT1-LABEXAM`.

Open the VS Code terminal in the project root (the folder containing `package.json`) and run these commands. Replace `YOUR-USERNAME` with your GitHub username.

```bash
git init
git add .
git commit -m "Initial project setup"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/MT1-LABEXAM.git
git push -u origin main
```

After completing and testing Part A, save your screenshots and commit:

```bash
git add .
git commit -m "Implement Node.js HTTP and FS server"
git push
```

After completing and testing Part B, save your screenshots and commit:

```bash
git add .
git commit -m "Implement Express task management REST API"
git push
```

When screenshots are added later, commit them too:

```bash
git add screenshots/
git commit -m "Add practical execution and API screenshots"
git push
```

If Git says `remote origin already exists`, use:

```bash
git remote set-url origin https://github.com/YOUR-USERNAME/MT1-LABEXAM.git
```

## 7. Important notes

- Part A does **not** use Express. It uses `node:http` and `node:fs`.
- Part B uses Express and `express.json()`.
- Both servers run independently. Keep them in separate terminals.
- No database or external storage is used.
- The project source code is provided as a working reference. Read and understand each route so you can explain it during your practical examination.
