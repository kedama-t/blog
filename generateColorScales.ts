import { getColors } from 'theme-colors';
const PREFIX_COLORS_ON = 'on-';

// 各色を背景としたときの前景色を決める
const generateOnColors = (colors: Record<string, string>) => {
  return Object.keys(colors).reduce((prev, cur) => {
    const onColor = colors[cur]
      .substring(1)
      .match(/.{2}/g)
      ?.map((hex) => parseInt(hex, 16));
    const blightness = onColor
      ? (Math.max(...onColor) + Math.min(...onColor)) / 2 / 255
      : 0;
    // NOTE: 閾値は感覚で決めている
    const onColorBlightness =
      blightness > 0.8
        ? '900'
        : blightness > 0.7
        ? '800'
        : blightness > 0.6
        ? '700'
        : blightness > 0.5
        ? '300'
        : blightness > 0.2
        ? '200'
        : '100';
    return { ...prev, [cur]: colors[onColorBlightness] };
  }, {} as Record<string, string>);
};

// カラースケールを逆転(50⇔950)する
const reverseColorScale = (colors: Record<string, string>) => {
  return Object.keys(colors).reduce((prev, cur) => {
    return { ...prev, [cur]: colors[Math.abs(parseInt(cur) - 1000)] };
  }, {} as Record<string, string>);
};

export default function (
  colors: { [colorName: string]: string },
  isDark = false
) {
  return Object.keys(colors).reduce((prev, cur) => {
    // シードから11段階のカラースケールを作る
    const colorScale = getColors(colors[cur]);
    // 各色の前景色を決める
    const onColors = generateOnColors(colorScale);
    return {
      ...prev,
      [cur]: {
        // 数値のpostfixを略した場合は、シードに使った色が出る
        DEFAULT: colors[cur],
        // ダークモード用に色を作るときはスケールを逆転する
        ...(isDark ? reverseColorScale(colorScale) : colorScale),
      },
      // 前景色
      [`${PREFIX_COLORS_ON}${cur}`]: {
        DEFAULT: onColors[500],
        ...(isDark ? reverseColorScale(onColors) : onColors),
      },
    };
  }, {});
}
