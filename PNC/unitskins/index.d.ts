interface BannerData {
    name: string,
    type: string
}

type SkinTags = "Chibi" | "Animated" | "Live2D" | "Live2D (U)" | "Voice" | "Ultimate";

interface SkinData {
    name: string,
    unit: string,
    banner: string,
    cost: string,
    tags: SkinTags[]
}