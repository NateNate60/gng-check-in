import mysql from  'mysql2/promise';
import { AccessCredentials } from "@/types/Access"
import { QueryResult } from '@/types/Query';
import { NextRequest } from 'next/server';

export async function GET (request: NextRequest) {
    const connection = await mysql.createConnection(AccessCredentials)
    
    let query = request.nextUrl.searchParams.get("query")

    if (!query) {
        return new Response(JSON.stringify([]))
    }

    let results = await connection.query<any>("SELECT pid, fname, lname, phone FROM Players WHERE CONCAT(fname, lname) LIKE CONCAT('%', ?, '%')", query)
    let rows: Array<QueryResult> = []
    for (let result of results[0]) {
        if ('pid' in result) {
            rows.push({
                pid: result["pid"],
                givenName: result["fname"],
                surname: result["lname"],
                phoneLastFour: result["phone"].slice(result["phone"].length - 4, result["phone"].length)
            })
        }
        
    }
    connection.end()
    return new Response(JSON.stringify(rows))
}