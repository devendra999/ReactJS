export type Priority = 'high' | 'medium' | 'low';

export type NoteType = {
    id: string,
    text: string,
    priority : Priority,
    createdAt : Date,
    updatedAt : Date
}

export enum ColorLight{
    high='#FFAEAE',
    medium='#FFEC94',
    low='#B0E57C'
}

export enum ColorDark{
    high='#D70000',
    medium='#CC9933',
    low='#77A600'
}