import supabase from "../supabaseConfig";

export async function getClicks(urlIds) {
    const { data, error } = await supabase
        .from("clicks")
        .select("*")
        .in("url_id", urlIds);

    if (error) {
        console.error("Supabase service getClicks error :: ", error.message);
        return null;
    }

    return data;
}
