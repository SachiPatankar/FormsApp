export async function postToSheet(req, res) {

    
    
    try {
        const newInfo =  await Info.create({
            name,
            code,
            number
          });
          res.json(newInfo);
    } catch (e) {
        console.error("Error in /handlePostInfo controller: ", e);
        res.status(422).json({ error: e.message });

    }
}
