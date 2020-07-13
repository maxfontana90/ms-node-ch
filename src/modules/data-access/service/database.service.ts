import { Inject, Injectable } from '@nestjs/common';
import { Connection } from "typeorm";

@Injectable()
export class DatabaseService {
  constructor(
    @Inject('DB_CONNECTION') private DatabaseConnection: Connection
  ) {}

  getConnection() {
    return this.DatabaseConnection;
  }
}
