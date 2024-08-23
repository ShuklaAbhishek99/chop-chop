import supabase from "../supabaseConfig";

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
