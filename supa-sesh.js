// script that abstract globally the job of checking for the user session

//initializes an object ("Object Namespace Pattern") to be used globally, so I can refer to the variable inside in other files
const globalSeshObject = {
   globalSeshUser: null
};

// Function that fetches user session if authenticated, if not, redirect to loging page
async function getUserSession() {
      // try...catch is commonly used in JS to safely run code that might throw an error. 
      // If it does, the program doesn't crash — it jumps to the catch block.
      // If you didn’t use try...catch, the browser would crash or stop execution on error.
      // Common when dealing with async/await operations (like fetch, Supabase, Firebase, etc.), APIs, etc
      // The try block contains code that might throw an error.
      // If an error occurs inside the try block, execution jumps to the catch block.
      // The error object is automatically passed to the catch block as the variable err.
      try{
         const { data, error } = await supabase.auth.getSession();
         // Check for expected errors returned by Supabase, which I guess means the request went through at least, but something
         // went wrong (e.g., network error, invalid API key, table name is wrong, validation errors, permission issues).
         // Good practice to check for "error" first, then check if data.session exists (means user is loged in)... 
         // if none of those is true, means either user must sign in or there is other weird error (handled in the catch part below)
         if (error) {
         console.error("Session error:", error);
            alert("There was a supabase related error fetching your session" + error + " ...Redirecting to login...");
            window.location.href = "login.html"; 
            return; }
         else if (data.session && data.session.user) {
            globalSeshObject.globalSeshUser = data.session.user.id
            alert("You are logged in as: "+ JSON.stringify(data, null, 2) + "with user id: " + data.session.user.id); }
         else if (window.location.pathname.endsWith("login.html")) {
            return; }   
         // No session found → redirect to login   
         // For example, if there is simply no active session (user not logged in), Supabase returns
         // error: null.....data: { session: null }
         else {
            alert("You are not logged in. Redirecting you to login page");
            window.location.href = "login.html"; } }
      
      // err is a variable automatically provided by JavaScript in the catch block to represent the error..
      // that was thrown in the try block. You do not need to define it elsewhere.
      // This catches unexpected errors—JavaScript exceptions that occur anywhere in the try block.
      // Example: A typo in your code (e.g., referencing an undefined variable),
      // and any other runtime error not handled by Supabase's error property.
      catch (err) {
        console.error("Unexpected error fetching session:", err);
        alert("Unexpected error. Redirecting to login..." + err);
        window.location.href = "login.html"; }
    }

// Call function described above
getUserSession();