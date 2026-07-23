const pool = require("./db");

const command = process.argv[2];
const argument = process.argv[3];

async function addTask(task) {
    if (!task) {
        console.log("Please provide a task.");
        return;
    }

    try {
        const result = await pool.query(
            "INSERT INTO tasks(task) VALUES($1) RETURNING *",
            [task]
        );

        console.log(`"${result.rows[0].task}" added successfully.`);
    } catch (err) {
        console.error(err.message);
    }
}

async function listTasks() {
    try {
        const result = await pool.query(
            "SELECT * FROM tasks ORDER BY id"
        );

        if (result.rows.length === 0) {
            console.log("No tasks.");
            return;
        }

        console.log("\n===== TODO LIST =====\n");

        result.rows.forEach(task => {
            console.log(`${task.id}. ${task.task}`);
        });

        console.log(`\nTotal Tasks: ${result.rows.length}`);

    } catch (err) {
        console.error(err.message);
    }
}

async function deleteTask(id) {

    if (!id) {
        console.log("Please provide a task ID.");
        return;
    }

    try {
        const result = await pool.query(
            "DELETE FROM tasks WHERE id=$1 RETURNING *",
            [id]
        );

        if (result.rowCount === 0) {
            console.log("Task not found.");
            return;
        }

        console.log(`Task ${id} deleted successfully.`);

    } catch (err) {
        console.error(err.message);
    }
}

async function main() {

    if (command === "add") {
        await addTask(argument);
    }

    else if (command === "list") {
        await listTasks();
    }

    else if (command === "delete") {
        await deleteTask(argument);
    }

    else {
        console.log(`
Usage:
node index.js add "Task name"
node index.js list
node index.js delete 1
`);
    }

    await pool.end();
}

main();