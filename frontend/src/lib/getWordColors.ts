function getColorForDifficulty(score:number) {
    // Define colors for the gradient
    const colors1 = [
        { score: 0, color: '#00FFFF' }, // Neon Blue
        { score: 1, color: '#FF00FF' } // Neon Pink
    ];

    const colors2=[
        { score: 0, color: '#A200FF' }, // Neon Blue
        { score: 1, color: '#FF5F00' } // Neon Pink
    ];

    const randomNumber=Math.floor(Math.random()*10);
    const colors= randomNumber%2==0?colors1:colors2;

    // Find the two colors to interpolate between
    let lower = colors[0];
    let upper = colors[0];

    for (let i = 1; i < colors.length; i++) {
        if (score >= colors[i].score) {
            lower = colors[i];
        } else {
            upper = colors[i];
            break;
        }
    }

    // Calculate the interpolation factor
    const factor = (score - lower.score) / (upper.score - lower.score);

    // Interpolate between the two colors
    const color = interpolateColor(lower.color, upper.color, factor);
    return color;
}

function interpolateColor(color1:string, color2:string, factor:number) {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    const result = {
        r: Math.round(rgb1.r + (rgb2.r - rgb1.r) * factor),
        g: Math.round(rgb1.g + (rgb2.g - rgb1.g) * factor),
        b: Math.round(rgb1.b + (rgb2.b - rgb1.b) * factor),
    };
    return rgbToHex(result.r, result.g, result.b);
}

function hexToRgb(hex:string) {
    const bigint = parseInt(hex.slice(1), 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255,
    };
}

function rgbToHex(r:number, g:number, b:number) {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}

export {getColorForDifficulty};