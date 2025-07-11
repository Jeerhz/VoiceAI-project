export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      calls: {
        Row: {
          audio_url: string | null;
          call_direction: string | null;
          campaign_id: string | null;
          completed_at: string | null;
          contact_info: Json;
          created_at: string | null;
          duration: number | null;
          id: string;
          pollster_id: string | null;
          satisfaction_score: number | null;
          sentiment_score: number | null;
          started_at: string | null;
          status: string | null;
          transcript: string | null;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          audio_url?: string | null;
          call_direction?: string | null;
          campaign_id?: string | null;
          completed_at?: string | null;
          contact_info: Json;
          created_at?: string | null;
          duration?: number | null;
          id?: string;
          pollster_id?: string | null;
          satisfaction_score?: number | null;
          sentiment_score?: number | null;
          started_at?: string | null;
          status?: string | null;
          transcript?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          audio_url?: string | null;
          call_direction?: string | null;
          campaign_id?: string | null;
          completed_at?: string | null;
          contact_info?: Json;
          created_at?: string | null;
          duration?: number | null;
          id?: string;
          pollster_id?: string | null;
          satisfaction_score?: number | null;
          sentiment_score?: number | null;
          started_at?: string | null;
          status?: string | null;
          transcript?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "calls_campaign_id_fkey";
            columns: ["campaign_id"];
            isOneToOne: false;
            referencedRelation: "campaigns";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "calls_pollster_id_fkey";
            columns: ["pollster_id"];
            isOneToOne: false;
            referencedRelation: "pollsters";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "calls_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      campaigns: {
        Row: {
          batch_client_numbers: string[];
          completed_at: string | null;
          created_at: string | null;
          id: string;
          name: string;
          outbound_number: string;
          pollster_id: string | null;
          status: Database["public"]["Enums"]["campaign_status"];
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          batch_client_numbers?: string[];
          completed_at?: string | null;
          created_at?: string | null;
          id?: string;
          name: string;
          outbound_number: string;
          pollster_id?: string | null;
          status?: Database["public"]["Enums"]["campaign_status"];
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          batch_client_numbers?: string[];
          completed_at?: string | null;
          created_at?: string | null;
          id?: string;
          name?: string;
          outbound_number?: string;
          pollster_id?: string | null;
          status?: Database["public"]["Enums"]["campaign_status"];
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "campaigns_ai_agent_id_fkey";
            columns: ["pollster_id"];
            isOneToOne: false;
            referencedRelation: "pollsters";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "campaigns_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      objections: {
        Row: {
          answer_to_objection: string | null;
          campaign_id: string;
          created_at: string;
          id: string;
          objection_content: string | null;
          user_id: string;
        };
        Insert: {
          answer_to_objection?: string | null;
          campaign_id: string;
          created_at?: string;
          id?: string;
          objection_content?: string | null;
          user_id: string;
        };
        Update: {
          answer_to_objection?: string | null;
          campaign_id?: string;
          created_at?: string;
          id?: string;
          objection_content?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "objections_campaign_id_fkey";
            columns: ["campaign_id"];
            isOneToOne: false;
            referencedRelation: "campaigns";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "objections_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      pollsters: {
        Row: {
          answer_to_objection_ids: string[];
          created_at: string | null;
          final_prompt: string | null;
          id: string;
          name: string;
          objective: string | null;
          question_ids: string[];
          salutation: string | null;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          answer_to_objection_ids?: string[];
          created_at?: string | null;
          final_prompt?: string | null;
          id?: string;
          name: string;
          objective?: string | null;
          question_ids?: string[];
          salutation?: string | null;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          answer_to_objection_ids?: string[];
          created_at?: string | null;
          final_prompt?: string | null;
          id?: string;
          name?: string;
          objective?: string | null;
          question_ids?: string[];
          salutation?: string | null;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ai_agents_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          company_name: string | null;
          created_at: string | null;
          email: string;
          full_name: string | null;
          id: string;
          subscription_tier: string | null;
          updated_at: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          company_name?: string | null;
          created_at?: string | null;
          email: string;
          full_name?: string | null;
          id: string;
          subscription_tier?: string | null;
          updated_at?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          company_name?: string | null;
          created_at?: string | null;
          email?: string;
          full_name?: string | null;
          id?: string;
          subscription_tier?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      questions: {
        Row: {
          answer_choices: string[] | null;
          content: string;
          created_at: string;
          id: number;
          type: Database["public"]["Enums"]["question_type"];
        };
        Insert: {
          answer_choices?: string[] | null;
          content: string;
          created_at?: string;
          id?: number;
          type: Database["public"]["Enums"]["question_type"];
        };
        Update: {
          answer_choices?: string[] | null;
          content?: string;
          created_at?: string;
          id?: number;
          type?: Database["public"]["Enums"]["question_type"];
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      call_direction: "ENTRANT" | "SORTANT";
      campaign_status: "NON DEMARR├ëE" | "EN COURS" | "TERMIN├ëE";
      question_type: "OUVERTE" | "FERM├ëE" | "NOTE" | "CHOIX MULTIPLE";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  public: {
    Enums: {
      call_direction: ["ENTRANT", "SORTANT"],
      campaign_status: ["NON DEMARR├ëE", "EN COURS", "TERMIN├ëE"],
      question_type: ["OUVERTE", "FERM├ëE", "NOTE", "CHOIX MULTIPLE"],
    },
  },
} as const;
