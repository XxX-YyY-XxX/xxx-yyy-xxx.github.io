type SkinTag = "Chibi" | "Animated" | "Live2D" | "Live2D (U)" | "Voice" | "Ultimate";

interface SkinData {
    name: string,
    unit: string,
    banner: string,
    cost: string,
    tags: SkinTag[],
    notes: string[]
}