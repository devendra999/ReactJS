export type Priority = 'high' | 'medium' | 'low';

export type NoteType = {
    id: string,
    text: string,
    priority : Priority,
    createdAt : Date,
    updatedAt : Date
}

export enum ColorLight{
     high='rgb(246, 100, 92)',
     medium='rgb(244, 158, 127)',
     low='rgb(248, 249, 175)'
}

export enum ColorDark{
    high='rgb(143, 66, 61)',
    medium='rgb(190, 131, 79)',
    low='rgb(151, 151, 98)'
}