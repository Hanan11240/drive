export type FileModel={
    fileId:string,
    fileName:string,
    isParent?:boolean
}

export type ShareFileModel={
   file:{fileId:string,fileName:string}
    ownerId:string,
    sharedWith:string[]
}