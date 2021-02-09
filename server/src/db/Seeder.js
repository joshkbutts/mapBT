import { connection } from "../boot.js";
import MarkerSeeder from "./seeders/MarkerSeeder.js";

class Seeder {
  static async seed() {
    console.log("seeding markers...");
    await MarkerSeeder.seed()

    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder;