/**
 * Shared TypeScript interfaces for FSM Timetable data structures
 */

export interface TimetableMetadata {
  institution?: string;
  semester_session?: string;
  supported_degrees?: string[];
  allowed_batches?: string[];
  total_classes?: number;
  generated_at?: string;
  last_updated?: string;
}

export interface DegreeInfo {
  name: string;
  code: string;
  batches: string[];
  sections: string[];
}

export interface ScheduleItem {
  id: string;
  day: string;
  category: string;
  room: string;
  time_slot: string;
  start_time: string;
  end_time: string;
  start_minutes?: number;
  end_minutes?: number;
  course_code: string;
  course_title: string;
  is_lab: boolean;
  degree_code: string;
  degree_name: string;
  batch: string;
  semester: number | null;
  section_code: string;
  section_letter: string;
  subgroup?: string | null;
  is_elective: boolean;
  is_merged_slot: boolean;
  raw_text: string;
}

export interface TimetableDataset {
  metadata: TimetableMetadata;
  degrees: Record<string, DegreeInfo>;
  schedule: ScheduleItem[];
}
