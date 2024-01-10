import supabase, { supabaseUrl } from "../supaBase";
import { v4 as uuidv4 } from "uuid";
export const signUp = async ({
  fullName,
  email,
  password,
}: {
  fullName: string;
  email: string;
  password: string;
}) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) throw new Error(error.message);

  return data;
};

export const login = async ({ email, password }: { email: string; password: string }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
};

export const getCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error("can not log user out");

  return null;
};

export const updateUser = async ({
  password,
  fullName,
  avatar,
}: {
  password?: string;
  fullName?: string;
  avatar?: File;
}) => {
  const updateObj = password ? { password } : fullName ? { data: { fullName } } : {};
  const { data, error } = await supabase.auth.updateUser({
    ...updateObj,
  });

  if (error) throw new Error(error.message);

  if (!avatar) return data;
  const fileName = `${uuidv4()}-${avatar.name}`;

  const filePath = `${supabaseUrl}/storage/v1/object/public/avatars/`;
  const [{ error: storageError }, { error: removeError }] = await Promise.all([
    supabase.storage.from("avatars").upload(fileName, avatar),
    data &&
      supabase.storage
        .from("avatars")
        .remove([data.user.user_metadata.avatar.slice(filePath.length)]),
  ]);
  if (removeError) console.log("can not remove previous user avatar");
  if (storageError) throw new Error(storageError.message);

  const { data: userData, error: updateError } = await supabase.auth.updateUser({
    data: {
      avatar: filePath + fileName,
    },
  });

  if (updateError) throw new Error(updateError.message);

  return userData;
};
