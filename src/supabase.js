//COPY PASTE FROM SUPABASE WEBSITE
import { createClient } from '@supabase/supabase-js'

const { VITE_SUPABASE_URL, VITE_SUPABASE_KEY } = import.meta.env

const supabaseUrl = VITE_SUPABASE_URL
const supabaseKey = VITE_SUPABASE_KEY

// create supabase 
// will use this vaariable to make auth, storage, and database calls
// for using it we have to add export
 export const supabase = createClient(supabaseUrl, supabaseKey)