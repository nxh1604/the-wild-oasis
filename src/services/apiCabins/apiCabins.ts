import supabase from "../supaBase";

export interface ICabinData {
  id: number;
  created_at: Date;
  name: string;
  regularPrice: number;
  maxCapacity: number;
  discount?: number;
  description?: string;
  image?: string;
}

export const getCabins = async (): Promise<ICabinData[]> => {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Can not get cabins");
  }

  return data as ICabinData[];
};

export const deleteCabin = async (id: number) => {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
};
