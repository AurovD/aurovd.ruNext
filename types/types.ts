export interface IProject {
    title: string;
    description: string;
    link?: string;
    github?: string;
    tags?: string;
    password: string;
    new_password?: string;
    previews: FileList;
}