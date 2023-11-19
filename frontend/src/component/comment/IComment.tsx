interface IComment {
  avatar: any;
  fullName: any;
  createdBy: any;
  createdAt: any;
  content: any;
  deletedAt: any;
  id: any;
  parentId: any;
  childrenComment: null | IComment[];
}

// interface ICommentX {
//     comment: ICommentBaseX
// }
