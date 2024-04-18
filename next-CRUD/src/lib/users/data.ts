type UserTypes = {
    id: string;
    title: string;
    desc: string;
    date: Date;
}

let users: UserTypes[];

// handlers

export const getUsers = () => {
    return users;
}


export const addUser = (user: UserTypes) => {
    users.push(user);
}


export const getUser = (id: string) => {
    return users.find((user) => user.id === id);
}


export const removeUser = (id: string) => {
    return users = users.filter((user) => user.id !== id)
}



export const updateUser = (id: string, title: string, desc: string) => {
    const user = users.find((user) => user.id === id);
    if(user) {
        user.title = title;
        user.desc = desc;
    } else {
        throw new Error("No post found");
    }
}