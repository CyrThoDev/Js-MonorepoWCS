import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

interface Ad {
  id: number;
  title: string;
  picture: string;
  description: string;
  location: string;
  company_id: number;
  contract_id: number;
  remote_id: number;
}

class AdRepository {
  // The C of CRUD - Create operation

  async create(ad: Omit<Ad, "id">) {
    console.info("dans le create : ", ad);
    // Execute the SQL INSERT query to add a new ad to the "ad" table
    const [result] = await databaseClient.query<Result>(
      "insert into ad (title, picture, description, location , company_id, contract_id, remote_id ) values (?, ?,?,?,?,?,?)",
      [
        ad.title,
        ad.picture,
        ad.description,
        ad.location,
        ad.company_id,
        ad.contract_id,
        ad.remote_id,
      ],
    );
    // Return the ID of the newly inserted ad
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific ad by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from ad where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the ad
    return rows[0] as Ad;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all ads from the "ad" table
    const [rows] = await databaseClient.query<Rows>("select * from ad");

    // Return the array of ads
    return rows as Ad[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing ad

  async update(ad: Ad) {
    const [result] = await databaseClient.query<Result>(
      "update ad set title=?, picture=?, description=?, location=? , company_id=?, contract_id=?, remote_id=?",
      [
        ad.title,
        ad.picture,
        ad.description,
        ad.location,
        ad.company_id,
        ad.contract_id,
        ad.remote_id,
      ],
    );
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an ad by its ID

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from ad where id = ? ",
      [id],
    );
    return result.affectedRows;
  }
}

export default new AdRepository();
