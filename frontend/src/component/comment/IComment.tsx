interface IComment {
    avatarSrc: any,
    authorName: any,
    questionDate: any,
    questionTitle: any,
    id: any
    parentId: any
    replies: null | IComment[],
}

// interface ICommentX {
//     comment: ICommentBaseX
// }