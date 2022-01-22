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

export interface IProjects {
    createdAt: string;
    description: string;
    github: string;
    id: number;
    images: [string];
    link: string;
    title: string;
    updatedAt: string;
}