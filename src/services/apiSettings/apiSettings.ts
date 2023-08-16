import { PostgrestSingleResponse } from "@supabase/supabase-js";
import supabase from "../supaBase";

export interface ISettingsData {
  id?: number;
  created_at?: Date;
  minBookLength?: number;
  maxBookLength?: number;
  maxGuestsPerBooking?: number;
  breakfastPrice?: number;
}

export async function getSettings(): Promise<ISettingsData> {
  const { data, error }: PostgrestSingleResponse<ISettingsData> = await supabase
    .from("settings")
    .select("*")
    .single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }
  return data;
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting: ISettingsData) {
  console.log(newSetting);
  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
    .eq("id", 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }

  return data;
}
