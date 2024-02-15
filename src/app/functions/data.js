'use server'
import { sql } from '@vercel/postgres'

const generateIds = () => {
    const timestamp = new Date().getTime();
    return `task_${timestamp}`;
};

export async function getTasks() {
    const { rows } = await sql`SELECT * FROM todo_list`;

    // Map each row to ensure consistent format
    const tasks = rows.map(row => {
        // If the task type is 'checklist', parse the checklist JSON
        if (row.type === 'checklist') {
            return {
                id: row.id,
                type: row.type,
                date: row.date,
                updated_date: row.updated_date,
                due_date: row.due_date,
                checklist: JSON.parse(row.checklist), // Parse the checklist JSON
                // Add other fields as needed
            };
        } else {
            return {
                id: row.id,
                type: row.type,
                task: row.task,
                date: row.date,
                updated_date: row.updated_date,
                due_date: row.due_date,
                status: row.status,
                // Add other fields as needed
            };
        }
    });

    return tasks;
}

export async function createTask(taskData) {
    const { type, ...rest } = taskData;
    if (type === 'text') {
        const { rows } = await sql`
            INSERT INTO todo_list (type, task, date, due_date, status)
            VALUES (${type}, ${rest.task}, ${rest.date}, ${rest.dueDate}, ${rest.status})
            RETURNING *`;
        return rows;
    } else if (type === 'checklist') {
        const { rows } = await sql`
            INSERT INTO todo_list (type, date, due_date, status, checklist)
            VALUES (${type}, ${rest.date}, ${rest.dueDate}, ${rest.status}, ${rest.checklist})
            RETURNING *`;
        return rows;
    }
}

// export async function editTask(id, newTask, dueDate, status) {
//     const { rows } = await sql`UPDATE todo_list SET task = ${newTask}, due_date = ${dueDate}, status = ${status} WHERE id = ${id} RETURNING *`
//     return rows
// }

// export async function deleteTask(id) {
//     const { rows } = await sql`DELETE FROM todo_list WHERE id = ${id} RETURNING *`
//     return rows
// }

// export async function reCreateTask(id, newTask, dueDate, status) {
//     const { rows } = await sql`UPDATE todo_list SET task = ${newTask}, due_date = ${dueDate}, status = ${status} WHERE id = ${id} RETURNING *`
//     return rows
// }



