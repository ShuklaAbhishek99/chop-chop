import supabase, { supabaseUrl } from "../supabaseConfig";

export async function signUp({ name, email, password, profile_avatar }) {
    const fileName = `AVATAR_IMG-${name.split().join("-")}-${Math.random()}`;

    const { error: storageError } = await supabase.storage
        .from("profile_avatar")
        .upload(fileName, profile_avatar);

    if (storageError) throw new Error(storageError.message);

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name,
                profile_avatar: `${supabaseUrl}/storage/v1/object/public/profile_avatar/${fileName}`,
            },
        },
    });

    if (error) throw new Error(error.message);

    return data;
}

export async function login({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw new Error(error.message);

    return data;
}

export async function getCurrentUser() {
    const { data: session, error } = await supabase.auth.getSession();

    if (!session.session) return null;

    if (error) return new Error(error.message);

    return session.session?.user;
}

export async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) throw new Error(error.message);
}
