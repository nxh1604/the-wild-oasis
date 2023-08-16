import { PostgrestSingleResponse } from "@supabase/supabase-js";
import supabase, { supabaseUrl } from "../supaBase";
import { v4 as uuidv4 } from "uuid";
export interface ICabinData {
  id?: number;
  created_at?: Date;
  name: string;
  regularPrice: number | "";
  maxCapacity: number | "";
  discount: number | "";
  description: string;
  image: string | File;
}

export const getCabins = async (): Promise<ICabinData[]> => {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Can not get cabins");
  }

  return data as ICabinData[];
};

export const cabinCreateOrEdit = async (
  newCabin: ICabinData,
  editId: number | null = null
) => {
  // https://tjfplbwsoorynsirqihu.supabase.co/storage/v1/object/public/Cabins/cabin-001.jpg

  console.log(newCabin);

  const imageName =
    typeof newCabin.image === "string"
      ? newCabin.image.split("/").pop()
      : // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        `${uuidv4()}-${newCabin.image.name.replace("/", "")}`;

  const imagePath =
    typeof newCabin.image === "string"
      ? newCabin.image
      : `${supabaseUrl}/storage/v1/object/public/Cabins/${imageName}`;

  const cabinsTable = supabase.from("cabins");

  let cabinsRow: PostgrestSingleResponse<ICabinData[] | null>;

  if (!editId) {
    cabinsRow = await cabinsTable
      .insert([
        {
          ...newCabin,
          image: imagePath,
        },
      ])
      .select();
  } else {
    cabinsRow = await cabinsTable
      .update({ ...newCabin, image: imagePath })
      .eq("id", editId);
  }

  const { data, error } = cabinsRow;

  if (error) {
    console.log(error);
    throw editId
      ? new Error(
          "Something went wrong. Cabin can't be edited, data stay the same"
        )
      : new Error("Cabin could not be created");
  }

  if (typeof newCabin.image !== "string" && imageName) {
    const { error: storageError } = await supabase.storage
      .from("Cabins")
      .upload(imageName, newCabin.image);

    if (storageError) {
      alert("Can not upload image and cabin will not be created");
      if (data) await supabase.from("cabins").delete().eq("id", data[0].id);
      throw new Error("Can not upload image and cabin will not be created");
    }
  }

  return data;
};

export const deleteCabin = async (id: number) => {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
};
