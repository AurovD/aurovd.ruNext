export interface User {
    login: string;
    password: string;
    new_password?: string;
}
export interface Project {
    title: string;
    task: string;
    description: string;
    link?: string;
    github?: string;
}
export interface IProject extends Project{
    tags?: string;
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
export interface ProjectReq {
  count: number, projects: IProjects[]
}
export interface Password{
  password: string;
  new_password: string;
}
// sudo lsof -PiTCP -sTCP:LISTEN
// kill -9 3409
