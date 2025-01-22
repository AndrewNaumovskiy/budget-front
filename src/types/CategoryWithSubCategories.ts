import { SubCategory } from "./SubCategory";

export interface CategoryWithSubCategories {
    id: number,
    name: string,
    subCategories: SubCategory[]
}