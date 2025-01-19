import { Option } from "./Option";

export interface SubCategory {
    [categoryName: string]: {
        subCategories: Option[]
    }
}