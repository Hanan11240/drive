export type FolderModel={
    _id:string,
    folderName: string,
    userId: string,
}


export type ShareFolderModel={
    ownerId:string,
    folderId:string,
    sharedWith:string[]
}