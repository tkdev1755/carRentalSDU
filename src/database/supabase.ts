import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://aktrguqxeqouvarlyssz.supabase.co"
const supabasePublishableKey = "sb_publishable_1yjlCI5aqAyFPpuMFBewkw_AjHEWH9o"

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
