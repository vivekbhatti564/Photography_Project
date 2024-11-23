export class Category {
    id?: string | undefined | null
    categoryName?: string | undefined | null
    fileName?: File | undefined
    imageUrl?: string | undefined | null
    status?: boolean
    created_at?: Date

    constructor(file: File, categoryName: string, status: boolean) {
        this.fileName = file;
        this.categoryName = categoryName;
        this.status = status;
    }
}
