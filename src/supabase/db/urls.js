import supabase, { supabaseUrl } from "../supabaseConfig";

export async function createUrl(
    { title, longUrl, customUrl, user_id },
    qrcode
) {
    const short_url = Math.random().toString(36).substring(2, 6);
    const fileName = `qr-${short_url}`;

    const { error: storageError } = await supabase.storage
        .from("qrs")
        .upload(fileName, qrcode);

    if (storageError) throw new Error(storageError.message);

    const qr = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`;

    const { data, error } = await supabase
        .from("urls")
        .insert([
            {
                title,
                user_id,
                original_url: longUrl,
                custom_url: customUrl || "",
                short_url,
                qr,
            },
        ])
        .select();

    if (error) {
        console.error("Supabase service createUrl error :: ", error.message);
        throw new Error("Error creating short URL");
    }

    return data;
}

export async function getUrls(user_id) {
    const { data, error } = await supabase
        .from("urls")
        .select("*")
        .eq("user_id", user_id);

    if (error) {
        console.error("Supabase service getUrls error :: ", error.message);
        throw new Error("Unable to fetch URLs");
    }

    return data;
}

export async function getUrl({ id, user_id }) {
    const { data, error } = await supabase
        .from("urls")
        .select("*")
        .eq("id", id)
        .eq("user_id", user_id)
        .single();

    if (error) {
        console.error("Supabase service getUrl error :: ", error.message);
        throw new Error("Error fetching short URL");
    }

    return data;
}

export async function getLongUrl(id) {
    const { data: shortLinkData, error: shortLinkError } = await supabase
        .from("urls")
        .select("id, original_url")
        .or(`short_url.eq${id}, custom_url.eq${id}`)
        .single();

    if (shortLinkError && shortLinkError.code !== "PGRST116") {
        console.error("Supabase service getLongUrl error :: ", shortLinkError);
        return;
    }

    return shortLinkData;
}

export async function deleteUrl(id) {
    const { data, error } = await supabase.from("urls").delete().eq("id", id);

    if (error) {
        console.error("Supabase service deleteUrl error :: ", error.message);
        throw new Error("Error deleting the URL");
    }

    return data;
}
