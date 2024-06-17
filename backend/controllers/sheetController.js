import { Info } from '../models/InfoModel.js';
import { google } from 'googleapis';

const postToSheet = async (req, res) => {
    try {
    
        const allInfos = await Info.find();

        const values = allInfos.map(info => [info.type, info.name, info.code, info.number]);

        const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
        const sheets = google.sheets({ version: "v4", auth });

        const SHEET_ID = process.env.SHEET_ID;
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SHEET_ID,
            range: "Sheet1!A:D", 
        });

        const existingValues = response.data.values || [];

        const existingInfoSet = new Set();
        existingValues.forEach(row => {
            const key = `${row[0]}-${row[1]}-${row[2]}-${row[3]}`;
            existingInfoSet.add(key);
        });

        const newValues = [];
        allInfos.forEach(info => {
            const key = `${info.type}-${info.name}-${info.code}-${info.number}`;
            if (!existingInfoSet.has(key)) {
                newValues.push([info.type, info.name, info.code, info.number]);
            }
        });

        if (newValues.length > 0) {
            await sheets.spreadsheets.values.append({
                spreadsheetId: SHEET_ID,
                range: "Sheet1!A:D", 
                valueInputOption:"RAW",
                resource: {
                    values: newValues,
                },
            });
            res.json({ message: "New data successfully appended to Google Sheet" });
        } else {
            res.json({ message: "No new data to append to Google Sheet" });
        }

    } catch (error) {
        console.error("Error in postToSheet controller: ", error);
        res.status(500).json({ error: "Failed to post data to Google Sheet" });
    }
};

export { postToSheet };
