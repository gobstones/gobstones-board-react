export type ThemeStringType =
  | "classic"
  | "deuteranope"
  | "protanope"
  | "tritanope"
  | "flat"
  | "high-contrast"
  | "lines"
  | "modern"
  | "shapes";

export class Theme {
  getThemeFor(themeName: string) {
    const themes = [
      new ClassicTheme(),
      new DeuteranopeTheme(),
      new FlatTheme(),
      new HighContrastTheme(),
      new LinesTheme(),
      new ModernTheme(),
      new ProtanopeTheme(),
      new ShapesTheme(),
      new TritanopeTheme(),
    ];

    const result = themes.find((e) => e.canHandleName(themeName));

    this.changeVariablesIfWasFound(result);

    return result as AbstractTheme;
  }

  changeVariablesIfWasFound(result: AbstractTheme | undefined) {
    if (result) result.changeCSSVariables();
  }
}

export abstract class AbstractTheme {
  abstract changeCSSVariables(): void;
  abstract canHandleName(name: string): boolean;

  setHeaderToDaltonism() {
    this.setHeaderColors("#dddd53a2", "#5e5c15");
  }

  setAmountColorTo(color: string) {
    document.documentElement.style.setProperty("--amount-color", color);
  }

  setStonesColorTo(theme: string) {
    document.documentElement.style.setProperty(
      "--black-stone-img",
      `var(--black-stone-img-${theme})`
    );
    document.documentElement.style.setProperty(
      "--blue-stone-img",
      `var(--blue-stone-img-${theme})`
    );
    document.documentElement.style.setProperty(
      "--red-stone-img",
      `var(--red-stone-img-${theme})`
    );
    document.documentElement.style.setProperty(
      "--green-stone-img",
      `var(--green-stone-img-${theme})`
    );
  }

  setCellBackgroundColor(color: string) {
    document.documentElement.style.setProperty(
      "--cell-background-color",
      color
    );
  }

  setHeaderColors(headerBackground: string, headerOutline: string) {
    document.documentElement.style.setProperty(
      "--header-background-color",
      headerBackground
    );
    document.documentElement.style.setProperty(
      "--header-outline-color",
      headerOutline
    );
  }

  setBorderColors(borderBackground: string, borderNumbersColor: string) {
    document.documentElement.style.setProperty(
      "--border-color",
      borderBackground
    );
    document.documentElement.style.setProperty(
      "--border-number-color",
      borderNumbersColor
    );
  }

  setDefaultHeader() {
    document.documentElement.style.setProperty(
      "--header-background-color",
      "rgba(221, 221, 136, 0.7)"
    );
    document.documentElement.style.setProperty(
      "--header-outline-color",
      "#0A9500"
    );
  }
}

export class ClassicTheme extends AbstractTheme {
  canHandleName(name: string) {
    return name === "classic";
  }

  changeCSSVariables() {
    this.setStonesColorTo("classic");
    this.setAmountColorTo("#FFF");
    this.setCellBackgroundColor("#FFF");
    this.setDefaultHeader();
  }
}

export class DeuteranopeTheme extends AbstractTheme {
  canHandleName(name: string) {
    return name === "deuteranope";
  }

  changeCSSVariables() {
    this.setStonesColorTo("deuteranope");
    this.setAmountColorTo("#FFF");
    this.setHeaderToDaltonism();
    this.setCellBackgroundColor("#FFF");
  }
}

export class FlatTheme extends AbstractTheme {
  canHandleName(name: string) {
    return name === "flat";
  }

  changeCSSVariables() {
    this.setStonesColorTo("flat");
    this.setAmountColorTo("#FFF");
    this.setCellBackgroundColor("#FFF");
    this.setDefaultHeader();
  }
}

export class HighContrastTheme extends AbstractTheme {
  canHandleName(name: string) {
    return name === "high-contrast";
  }

  changeCSSVariables() {
    this.setStonesColorTo("high-contrast");
    this.setCellBackgroundColor("black");
    this.setHeaderColors("rgba( 234, 229, 194 ,.3)", "#f3ebb8");
    this.setBorderColors("#34495e", "#FFF");
    this.setAmountColorTo("black");
  }
}

export class LinesTheme extends AbstractTheme {
  canHandleName(name: string) {
    return name === "lines";
  }

  changeCSSVariables() {
    this.setStonesColorTo("lines");
    this.setAmountColorTo("black");
    this.setCellBackgroundColor("#FFF");
    this.setDefaultHeader();
  }
}

export class ModernTheme extends AbstractTheme {
  canHandleName(name: string) {
    return name === "modern";
  }

  changeCSSVariables() {
    this.setStonesColorTo("modern");
    this.setAmountColorTo("#FFF");
    this.setCellBackgroundColor("#FFF");
    this.setDefaultHeader();
  }
}

export class ProtanopeTheme extends AbstractTheme {
  canHandleName(name: string) {
    return name === "protanope";
  }

  changeCSSVariables() {
    this.setStonesColorTo("protanope");
    this.setHeaderToDaltonism();
    this.setAmountColorTo("#FFF");
    this.setCellBackgroundColor("#FFF");
  }
}

export class ShapesTheme extends AbstractTheme {
  canHandleName(name: string) {
    return name === "shapes";
  }

  changeCSSVariables() {
    this.setStonesColorTo("shapes");
    this.setAmountColorTo("#FFF");
    this.setCellBackgroundColor("#FFF");
    this.setDefaultHeader();
  }
}

export class TritanopeTheme extends AbstractTheme {
  canHandleName(name: string) {
    return name === "tritanope";
  }

  changeCSSVariables() {
    this.setStonesColorTo("tritanope");
    this.setHeaderToDaltonism();
    this.setAmountColorTo("#FFF");
    this.setCellBackgroundColor("#FFF");
  }
}
