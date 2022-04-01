export interface Project {
    title: string;
    description: string;
    link?: string;
    github?: string;
}
export interface IProject extends Project{
    tags?: string;
    password: string;
    new_password?: string;
    previews: FileList;
}

export interface IProjects extends Project {
    createdAt: string;
    id: number;
    images?: [string];
    updatedAt: string;
    Tags?: Array<{id: number, title: string}>
}
export interface IMessage{
    data: {msg: string};
    status: number;
}


//TODO https://habr.com/ru/post/576874/
//toast
//TODO titles?
//TODO lazy components
// https://habr.com/ru/company/timeweb/blog/588498/#%D0%BA%D0%B5%D1%88%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5

// sudo lsof -PiTCP -sTCP:LISTEN
// kill -9 3409
