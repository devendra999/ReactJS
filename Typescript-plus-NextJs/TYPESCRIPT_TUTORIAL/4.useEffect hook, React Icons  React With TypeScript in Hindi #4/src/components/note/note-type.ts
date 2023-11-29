export type Priority = 'high' | 'medium' | 'low';

export type NoteType = {
    id: string,
    text: string,
    priority : Priority
}

export enum Color{
     high='rgb(246, 100, 92)',
     medium='rgb(244, 158, 127)',
     low='rgb(248, 249, 175)'
}