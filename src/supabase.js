//COPY PASTE FROM SUPABASE WEBSITE
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zhuhwuzspupuabhbbfhu.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY

// create supabase 
// will use this vaariable to make auth, storage, and database calls
// for using it we have to add export
 export const supabase = createClient(supabaseUrl, supabaseKey)