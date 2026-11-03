import express from "express";

const app = express();
const PORT = 4000;

app.use(express.json());

let tasks = [
  { id: 1, taskName: "Develop Login Page", assignedTo: "Rahul Sharma", status: "Pending", priority: "High" },
  { id: 2, taskName: "Prepare Database Design", assignedTo: "Priya Verma", status: "In Progress", priority: "Medium" },
  { id: 3, taskName: "Test Dashboard", assignedTo: "Amit Kumar", status: "Completed", priority: "Low" }
];

function validateTask(body, requireId = false) {
  const fields = ["taskName", "assignedTo", "status", "priority"];
  if (requireId) fields.push("id");
  return fields.filter(field =>
    body[field] === undefined || body[field] === null || String(body[field]).trim() === ""
  );
}

// GET /tasks - retrieve all tasks
app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});

// GET /tasks/:id - retrieve one task
app.get("/tasks/:id", (req, res) => {
  const task = tasks.find(item => String(item.id) === req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found." });
  res.status(200).json(task);
});

// POST /tasks - create a task
app.post("/tasks", (req, res) => {
  if (!req.is("application/json")) {
    return res.status(415).json({ message: "Content-Type must be application/json." });
  }
  const missing = validateTask(req.body, true);
  if (missing.length) {
    return res.status(400).json({ message: "Missing required fields.", missingFields: missing });
  }
  if (tasks.some(item => String(item.id) === String(req.body.id))) {
    return res.status(409).json({ message: "A task with this ID already exists." });
  }

  const task = {
    id: req.body.id,
    taskName: String(req.body.taskName).trim(),
    assignedTo: String(req.body.assignedTo).trim(),
    status: String(req.body.status).trim(),
    priority: String(req.body.priority).trim()
  };
  tasks.push(task);
  res.status(201).json({ message: "Task added successfully", task });
});

// PUT /tasks/:id - update an existing task
app.put("/tasks/:id", (req, res) => {
  const taskIndex = tasks.findIndex(item => String(item.id) === req.params.id);
  if (taskIndex === -1) return res.status(404).json({ message: "Task not found." });
  if (!req.is("application/json")) {
    return res.status(415).json({ message: "Content-Type must be application/json." });
  }

  const allowed = ["taskName", "assignedTo", "status", "priority"];
  const supplied = allowed.filter(field => req.body[field] !== undefined);
  if (!supplied.length) {
    return res.status(400).json({ message: "Provide at least one task field to update." });
  }
  const invalid = supplied.filter(field =>
    req.body[field] === null || String(req.body[field]).trim() === ""
  );
  if (invalid.length) {
    return res.status(400).json({ message: "Task fields cannot be empty.", invalidFields: invalid });
  }

  const updated = { ...tasks[taskIndex] };
  for (const field of supplied) updated[field] = String(req.body[field]).trim();
  tasks[taskIndex] = updated;
  res.status(200).json({ message: "Task updated successfully", task: updated });
});

// DELETE /tasks/:id - delete a task
app.delete("/tasks/:id", (req, res) => {
  const taskIndex = tasks.findIndex(item => String(item.id) === req.params.id);
  if (taskIndex === -1) return res.status(404).json({ message: "Task not found." });
  const [deletedTask] = tasks.splice(taskIndex, 1);
  res.status(200).json({ message: "Task deleted successfully", task: deletedTask });
});

// Invalid JSON handler
app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && "body" in error) {
    return res.status(400).json({ message: "Invalid JSON request body." });
  }
  next(error);
});

// Unknown endpoint handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

app.listen(PORT, () => {
  console.log(`Express Server running at http://localhost:${PORT}`);
});
