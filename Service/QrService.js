import qr from "qrcode";
import {
  creatDatabase,
  createTable,
  pool,
  storeQrToDB,
  useDatabase,
} from "../Database/Controller.js";
import qrController from "../Service/QrService.js";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";
const __dirname=path.dirname(fileURLToPath(import.meta.url));




const qrService = {
  getQr: async (typeObj) => {
    try {
        // Ensure necessary functions are awaited
        // await creatDatabase()
        await useDatabase();
        // await createTable()
      const typeObj={sandart:2,subscribe:1}
        const resultObj = {};

        for (const typeName in typeObj) {
            const resArray = [];

            for (let i = 0; i < typeObj[typeName]; i++) {
                const objByType = {};
                const data = {
                    email: "user@example.com",
                };
                const result = await pool.query(`SELECT * FROM token;`);
                const unique_token = crypto.randomBytes(8).toString("hex").toUpperCase();
                const qr_path = `public/qr_images/${unique_token}.png`;
                const qrfilePath = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "image", `${unique_token}.png`);

                // Check if the unique_token or qr_path already exists in the database
                const find_pathdb = result[0].find((item) => item.unique_token === unique_token);
                const find_uniqueIds = result[0].find((item) => item.qr_path === qr_path);

                // If the token or QR code path doesn't exist, generate QR code and store in database
                if (!find_pathdb && !find_uniqueIds) {
                    const stJson = JSON.stringify(data);
                    objByType.unique_token = unique_token;
                    objByType.qr_path = qr_path;

                    resArray.push(objByType);
                    resultObj[typeName] = resArray;

                    await new Promise((resolve, reject) => {
                        qr.toFile(qrfilePath, stJson, {
                            width: 221,
                            height: 221,
                            color: {
                                dark: "#000000", // Foreground color
                                light: "#FFFFFF", // Background color
                            },
                        }, (err) => {
                            if (err) reject(err);
                            resolve();
                        });
                    });

                    // Store QR code in database
                    await storeQrToDB(qr_path, unique_token);
                } else {
                    // If the token or QR code path already exists, try again
                    return await getQr(typeObj);
                }
            }
        }

        return resultObj;
    } catch (error) {
        console.error(error);
        throw error; // Rethrow the error to handle it elsewhere
    }
}
};

export default qrService;
