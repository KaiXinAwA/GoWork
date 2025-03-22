const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://jyaexxilyoxtcnoohznr.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5YWV4eGlseW94dGNub29oem5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2MjMxNzEsImV4cCI6MjA1ODE5OTE3MX0.QtcbwybdsrNwO38TsPdyAoH5VAhJ6SPYx7Mac_Ez02I";

const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchData() {
    try {
        const { data, error } = await supabase.from("User").select("*");
        
        if (error) {
            console.error("Error fetching data:", error.message);
            return;
        }
        
        console.log("Data:", data);
    } catch (err) {
        console.error("Unexpected error:", err.message);
    }
}

fetchData(); 