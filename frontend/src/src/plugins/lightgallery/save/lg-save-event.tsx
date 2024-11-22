import React from 'react';

export interface LgSaveClickEvent<T = HTMLButtonElement> extends React.MouseEvent<T> {
    keyword?: string;
    src: string;
}

export interface LgSaveClickEventHandler<T = HTMLButtonElement> {
    (event: LgSaveClickEvent<T>): void;
}
