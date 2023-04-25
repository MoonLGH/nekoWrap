import axios from "axios";
export async function generateConfig() {
    const { data } = await axios.get("https://raw.githubusercontent.com/MoonLGH/nekoWrap/main/data/StaticConstant.json");
    return data
}
