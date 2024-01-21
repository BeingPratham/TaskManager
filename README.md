<h1>Tasks Manager 🚀</h1>
<h3>Overview</h3>
<p>This is an task manager build with NODE.JS, EXPRESS.JS, MONGODB. In this User have to create their Id and they will get their JWT auth token, With that token they can create multiple tasks and subtasks in this.
All the task is priortized and when the due data gets near the user can get the call about informing them for the pending task.</p>
<hr>
<p>This is just a backend as if you have to run this then you need to run the apis on Postman.</p>
<hr>
<h3>Features ✨</h3>

- **Create Tasks:**
  - Input title, description, and due date.
  - Securely authenticated with JWT tokens.

- **Create Subtasks:**
  - Easily associate subtasks with tasks using task IDs.

- **Filter and Sort:**
  - Get all user tasks with filters like priority, due date.

- **Manage Subtasks:**
  - Retrieve all user subtasks and filter them based on the associated task ID.

- **Task Updates:**
  - Seamlessly update task details, including due date and status (TODO, DONE or IN-PROGRESS).

- **Subtask Status Updates:**
  - Update subtask statuses (0 for incomplete, 1 for complete) with ease.

- **Soft Deletion:**
  - Implement soft deletion for tasks and subtasks, preserving historical data.

- **Automated Priority Adjustment:**
  - Utilize cron jobs to automatically adjust task priority based on due dates.

- **Twilio Integration:**
  - Schedule automated voice calls via Twilio for overdue tasks, prioritized by user.
<hr>
<h3>APIs 🚀</h3>

1. **Create Task:**
   - `POST /task/createTask`

2. **Create Subtask:**
   - `POST /task/createSubTask`

3. **Get All User Tasks:**
   - `GET /task/getAllUserTasks`

4. **Get All User Subtasks:**
   - `GET /task/getAllUserSubTasks`

5. **Update Task:**
   - `PUT /task/updateTask/:task_id`

6. **Update Subtask:**
   - `PUT /task/updateSubTask/:subtask_id`

7. **Delete Task (Soft Deletion):**
   - `DELETE /task/deleteTask/:task_id`

8. **Delete Subtask (Soft Deletion):**
   - `DELETE /task/deleteSubTask/:subtask_id`
<hr>
<h3>Tech Stack 🛠️</h3>

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB with Mongoose

- **Authentication:**
  - JSON Web Tokens (JWT)

- **External Services:**
  - Twilio for voice call reminders

<hr>
<h3>How to Run 🚦</h3>

```bash
   git clone https://github.com/your-username/task-commander.git
```
1) Install Dependencies
```bash
   cd task-commander
   npm install
```
2) Configure environment variables:
   - Create a .env file in the root directory.
   - Add necessary environment variables (e.g., MongoDB connection string, Twilio credentials).
3) Run the application:
```bash
    npm start
```
<hr>
<h1>Thank You🙌</h1>
