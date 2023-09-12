import {
  PostgrestResponse,
  PostgrestSingleResponse,
} from "@supabase/supabase-js";
import supabase, { supabaseUrl } from "../supaBase";
import { v4 as uuidv4 } from "uuid";

export const getCabins = async (): Promise<ICabinData[]> => {
  const { data, error } = (await supabase
    .from("cabins")
    .select("*")) as PostgrestResponse<ICabinData>;
  if (error) {
    console.log(error);
    throw new Error("Can not get cabins");
  }

  return data;
};

export const createOrUpdateCabin = async (
  cabin: ICabinData,
  updateId: number | null = null
) => {
  // https://tjfplbwsoorynsirqihu.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  const imageName =
    typeof cabin.image === "string"
      ? cabin.image.split("/").pop()
      : // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        `${uuidv4()}-${cabin.image.name.replace("/", "")}`;

  const imagePath =
    typeof cabin.image === "string"
      ? cabin.image
      : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const cabinsTable = supabase.from("cabins");

  let cabinsRow: PostgrestSingleResponse<ICabinData[] | null>;

  if (!updateId) {
    cabinsRow = await cabinsTable
      .insert([
        {
          ...cabin,
          image: imagePath,
        },
      ])
      .select();
  } else {
    cabinsRow = await cabinsTable
      .update({ ...cabin, image: imagePath })
      .eq("id", updateId);
  }

  const { data, error } = cabinsRow;

  if (error) {
    console.log(error);
    throw updateId
      ? new Error(
          "Something went wrong. Cabin can't be edited, data stay the same"
        )
      : new Error("Cabin could not be created");
  }

  if (typeof cabin.image !== "string" && imageName) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, cabin.image);

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
