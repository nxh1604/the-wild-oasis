import supabase from "../supaBase";

export interface ICabinsData {
  id: number;
  created_at: Date;
  regularPrice: number;
  maxCapacity: number;
  discount?: number;
  decription?: string;
  image?: string;
}

export const getCabins = async (): Promise<ICabinsData[]> => {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Can not get cabins");
  }

  return data as ICabinsData[];
};
