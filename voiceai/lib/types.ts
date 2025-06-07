export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  company_name?: string;
  avatar_url?: string;
  subscription_tier: "free" | "pro" | "enterprise";
  created_at: string;
  updated_at: string;
}

export interface AIAgent {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  voice_settings: Record<string, any>;
  personality_traits: Record<string, any>;
  language: string;
  created_at: string;
  updated_at: string;
}

export interface Campaign {
  id: string;
  user_id: string;
  ai_agent_id?: string;
  name: string;
  description?: string;
  status: "draft" | "active" | "paused" | "completed";
  prompts: any[];
  questions: any[];
  target_contacts: any[];
  voice_settings: Record<string, any>;
  scheduled_at?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
  ai_agent?: AIAgent;
}

export interface KPI {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  calculation_method: string;
  parameters: Record<string, any>;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface Call {
  id: string;
  campaign_id: string;
  contact_info: Record<string, any>;
  status: "pending" | "in_progress" | "completed" | "failed";
  duration?: number;
  transcript?: string;
  audio_url?: string;
  sentiment_score?: number;
  satisfaction_score?: number;
  started_at?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface CallResult {
  id: string;
  call_id: string;
  kpi_id: string;
  value: number;
  metadata: Record<string, any>;
  created_at: string;
}
