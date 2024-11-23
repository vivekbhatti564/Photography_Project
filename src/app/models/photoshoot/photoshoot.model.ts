export class Photoshoot {
    id?: string | undefined | null
    title?: string | undefined | null
    categoryName?: string | undefined | null
    fileName?: File | undefined
    imageUrl?: string | undefined | null
    status?: boolean
    created_at?: Date

    constructor(file: File, categoryName: string, status: boolean,title : string) {
        this.fileName = file;
        this.categoryName = categoryName;
        this.status = status;
        this.title = title;
    }

}
