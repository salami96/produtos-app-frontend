interface Theme {
    name: string;
    properties: any;
}

export const blue: Theme = {
    name: 'blue',
    properties: {
        '--background': '#E6EBF2',
        '--dark': '#103B66',
        '--primary': '#215C96',
        '--secondary': '#CCE5FF',
        '--accent': '#61E786',
    }
};
export const green: Theme = {
    name: 'green',
    properties: {
        '--background': '#E6EBF2',
        '--dark': '#0F6634',
        '--primary': '#219653',
        '--secondary': '#CCFFE2',
        '--accent': '#EEC6CA',
    }
};
export const brown: Theme = {
    name: 'brown',
    properties: {
        '--background': '#E6EBF2',
        '--dark': '#340100',
        '--primary': '#7D4106',
        '--secondary': '#FFD6B2',
        '--accent': '#77BFA3',
    }
};
export const red: Theme = {
    name: 'red',
    properties: {
        '--background': '#E6EBF2',
        '--dark': '#7D0C0C',
        '--primary': '#A50104',
        '--secondary': '#FFCCCC',
        '--accent': '#FFF05A',
    }
};
export const pink: Theme = {
    name: 'pink',
    properties: {
        '--background': '#E6EBF2',
        '--dark': '#744E6D',
        '--primary': '#B26BA5',
        '--secondary': '#E8C2E1',
        '--accent': '#9CE8D0',
    }
};
