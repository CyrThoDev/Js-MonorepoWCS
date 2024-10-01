import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

interface Candidate {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

class CandidateRepository {
  // The C of CRUD - Create operation

  async create(candidate: Omit<Candidate, "id">) {
    // Execute the SQL INSERT query to add a new candidate to the "candidate" table
    const [result] = await databaseClient.query<Result>(
      "insert into candidate (firstname, lastname, email, password ) values (?, ?,?,?)",
      [
        candidate.firstname,
        candidate.lastname,
        candidate.email,
        candidate.password,
      ],
    );
    // Return the ID of the newly inserted candidate
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific candidate by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from candidate where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the candidate
    return rows[0] as Candidate;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all candidates from the "candidate" table
    const [rows] = await databaseClient.query<Rows>("select * from candidate");

    // Return the array of candidates
    return rows as Candidate[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing ad

  async update(candidate: Candidate) {
    const [result] = await databaseClient.query<Result>(
      "update candidate set firstname = ?, , lastname = ? , email = ?, password = ?",
      [
        candidate.firstname,
        candidate.lastname,
        candidate.email,
        candidate.password,
      ],
    );
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove a candidate by its ID

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from candidate where id = ? ",
      [id],
    );
    return result.affectedRows;
  }
}

export default new CandidateRepository();
