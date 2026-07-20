const fs = require("fs");

const command = process.argv[2];
const argument = process.argv[3];

function loadTasks() {
    const data = fs.readFileSync("tasks.json", "utf8");
    return JSON.parse(data);
}
function saveTasks(tasks) {
    fs.writeFileSync(
        "tasks.json",
        JSON.stringify(tasks, null, 2)
    );
}

if (command === "add") {

    if (!argument) {
        console.log("name of project");
        process.exit();
    }

    const tasks = loadTasks();
    const nextId =
        tasks.length === 0
            ? 1
            : Math.max(...tasks.map(task => task.id)) + 1;

    const newTask = {
        id: nextId,
        task: argument
    };

    tasks.push(newTask);

    saveTasks(tasks);

    console.log(`"${argument}" added successfully.`);
}
else if (command === "list") {

    const tasks = loadTasks();

    if (tasks.length === 0) {
        console.log("No tasks");
        process.exit();
    }

    console.log("\n===== TODO LIST =====\n");

    for (const task of tasks) {
        console.log(`${task.id}. ${task.task}`);
    }

    console.log(`\nTotal Tasks: ${tasks.length}`);
}
else if (command === "delete") {

    if (!argument) {
        console.log("Please provide a task ID.");
        process.exit();
    }

    const tasks = loadTasks();

    const id = Number(argument);

    const updatedTasks = tasks.filter(task => task.id !== id);

    if (tasks.length === updatedTasks.length) {
        console.log("Task not found.");
        process.exit();
    }

    saveTasks(updatedTasks);

    console.log(`Task ${id} deleted successfully.`);
}
else {

    console.log(`
Usage:
invalid command
`);
}