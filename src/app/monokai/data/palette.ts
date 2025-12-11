import colorDefault from './default.json';
import colorBright from './bright.json';
import colorNeo from './neo.json';

export interface ColorPalette {
  name: string;
  color: string;
}

export interface ColorScheme {
  name: string;
  colors: ColorPalette[];
}

const monokaiColorSchemes: ColorScheme[] = [
  {
    name: colorDefault.name,
    colors: colorDefault.colors as ColorPalette[],
  },
  {
    name: colorBright.name,
    colors: colorBright.colors as ColorPalette[],
  },
  {
    name: colorNeo.name,
    colors: colorNeo.colors as ColorPalette[],
  },
];

export default monokaiColorSchemes;
