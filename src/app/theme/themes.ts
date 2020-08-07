interface Theme {
    name: string;
    properties: any;
}

export const blue: Theme = {
    name: 'blue',
    properties: {
        '--background': '#F5F7FA',
        '--dark': '#103B66',
        '--primary': '#215C96',
        '--secondary': '#CCE5FF',
        '--accent': '#F2C94C',
    }
};
export const green: Theme = {
    name: 'green',
    properties: {
        '--background': '#F5F7FA',
        '--dark': '#0F6634',
        '--primary': '#219653',
        '--secondary': '#CCFFE2',
        '--accent': '#F2C94C',
    }
};
export const brown: Theme = {
    name: 'brown',
    properties: {
        '--background': '#F5F7FA',
        '--dark': '#340100',
        '--primary': '#7D4106',
        '--secondary': '#FFD6B2',
        '--accent': '#F2C94C',
    }
};
export const red: Theme = {
    name: 'red',
    properties: {
        '--background': '#F5F7FA',
        '--dark': '#7D0C0C',
        '--primary': '#C00000',
        '--secondary': '#FFCCCC',
        '--accent': '#F2C94C',
    }
};
