import mysql from "mysql2/promise";
// SELECT 예시 with values
// async function getUsersByAge(minAge: number) {
//     const sql = "SELECT * FROM users WHERE age >= ?";
//     const values = [minAge];

//     const users = await queryDatabase(sql, values);
//     console.log("Users:", users);
// }

// INSERT 에시 with values
// async function addUser() {
//   const sql = "INSERT INTO users (name, age, email) VALUES (?, ?, ?)";
//   const values = ["Alice", 25, "alice@example.com"];

//   const result = await queryDatabase(sql, values);
//   console.log("User added:", result);
// }

export async function queryDatabase(
    sql: string,
    values: (string | number | boolean | null)[] = []
) {
    const connection = await mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        port: Number(process.env.DATABASE_PORT),
    });

    try {
        // sql injection 방지
        const [results] = await connection.execute(sql, values);
        return results;
    } finally {
        await connection.end();
    }
}

export interface Book {
    id: number;
    title: string;
    season: string;
    total_num: number;
    composition: string;
    author: string;
    publisher: string;
    comment: string;
    location: number;
}
