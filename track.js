// Reusable event tracking script for all pages

// Grab the filename from the URL
const pageName = window.location.pathname.split("/").pop().replace(".html", "");

// Make sure pageName is set in the HTML page
if (typeof pageName === "undefined") {
  console.warn("pageName is not defined! Please set it in the page");
  alert("pageName is not defined! Please set it in the page"); }

// Detect if mobile or desktop
// navigator.userAgent: a browser-provided string that describes the browser and (roughly) the device.
// /Mobi|Android/i: a regular expression literal that means match the substring “Mobi” OR “Android”
// The trailing i flag means case-insensitive matching (so "mobi", "MOBI", etc., also match)
// .test() runs the regex against the userAgent string and returns true if it finds a match, false otherwise.
// Result: if the UA string contains “Mobi” (common in many mobile UAs) or “Android”, isMobile becomes true; otherwise false.
// Watch out! UA strings can be spoofed and are being reduced (privacy/client hints). iPadOS sometimes pretends to be desktop. Some desktop Android devices exist, etc.
const isMobile = /Mobi|Android/i.test(navigator.userAgent);

// Record start time when page loads
const sessionStart = Date.now();

// Event listening function, running when user leaves the page
window.addEventListener("beforeunload", async () => {
  // Calculate difference between time when page first loaded vs when user left page
  let duration = Math.floor((Date.now() - sessionStart) / 1000);
  // Insert event info into supabase event table

  try {
                // Save to Supabase
                const { data, error } = await supabase
                   .from("page_events")
                   // globalSeshObject.globalSeshUser comes from supa-sesh.js file, it's a global object/variable
                   .insert([
                       { 
                        user_id: globalSeshObject.globalSeshUser,
                        page_name: pageName,
                        event_type: "leave",
                        device_type: isMobile ? "mobile" : "desktop",
                        country: "unknown", // later replace with real geo
                        duration_seconds: duration
                      }
                    ])
                   .select();
                //This checks for errors returned by Supabase (e.g., table name is wrong, validation errors, permission issues).
               if (error) {
                   alert(`Failed to save, supabase returned an error: ${error.message}`);
                   return; } 
              else {
                   console.log("Saved:", data); 
                   alert(`Saved: ${JSON.stringify(data, null, 2)}`);}} 
        
  catch (err) {
                    console.error("Unexpected error:", err);
                    alert(`Unexpected error: ${err.message || err}`);
                    return; };
});