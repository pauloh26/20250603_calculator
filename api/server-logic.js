import { supabase } from './supabaseClient.js';

// This function format is the standard Vercel function signature.
// "export default" means: “this is the main function this file exports.”
export default async function handler(req, res) {

    // Validate that the request is the correct, a POST one.
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' }); }

    // Below is the step 3 of (1. Browser sends JSON, 2. Vercel parses it, 3. Makes it available as req.body)
    // We use the variables from this step in the step where we call supabase below.
    const { user_id, name, investment, ret, roi } = req.body;

    // Validate user input, I already did the same in the browser facing JS, but adding here just in case (I think)
    if (!user_id || !name || isNaN(investment) || isNaN(ret)) {
      return res.status(400).json({ error: 'Missing or invalid fields' }); }


    try { 
        const { data, error } = await supabase
          .from("calculations")
          .insert([{ user_id: user_id, name: name, investment: investment, ret: ret, roi: roi }])
          .select();

        // Not sure about the syntaxis or the intention with this line 
        // I guess res.json would turn any response into json. But what is status(500) doing?
        // Why do we assign into "error" the "error.message"?   
        if (error) { return res.status(500).json({ error: error.message }); }
        return res.status(200).json(data);

    // To catch unexpected exceptions (network/runtime), I think..
    } catch (err) {
        return res.status(500).json({ error: err.message || String(err) });
    }
}