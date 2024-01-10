import { PostgrestSingleResponse } from "@supabase/supabase-js";
import supabase from "../supaBase";

export async function getSettings(): Promise<ISettingData> {
  const { data, error }: PostgrestSingleResponse<ISettingData> = await supabase
    .from("settings")
    .select("*")
    .single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }
  return data;
}

export async function updateSetting(newSetting: Partial<ISettingData>) {
  const { data, error } = await supabase.from("settings").update(newSetting).eq("id", 1).single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }

  return data;
}
