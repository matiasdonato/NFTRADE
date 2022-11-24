import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jrgivjodpnydgnfmeelp.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpyZ2l2am9kcG55ZGduZm1lZWxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyMTkzMDksImV4cCI6MTk4Mzc5NTMwOX0.e0l1zWX1U5CE4e6wPDD8jeCF7AO0hmXRQbhrm44teXI'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
