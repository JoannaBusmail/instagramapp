//COPY PASTE FROM SUPABASE WEBSITE
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zhuhwuzspupuabhbbfhu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpodWh3dXpzcHVwdWFiaGJiZmh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQyODM5NTcsImV4cCI6MjAxOTg1OTk1N30.7FsavXIHQcIZVQ-QwCY9cVSJk8d8nuE1uIm3CcT2iXg'

// create supabase 
// will use this vaariable to make auth, storage, and database calls
// for using it we have to add export
 export const supabase = createClient(supabaseUrl, supabaseKey)