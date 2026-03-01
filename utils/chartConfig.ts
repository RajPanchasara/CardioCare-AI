/**
 * Central chart configuration for HeartSense Analytics
 * Ensures consistent styling across all Chart.js visualizations.
 */

export const CHART_COLORS = {
    primary: '#ef4444',
    primaryLight: '#fca5a5',
    blue: '#3b82f6',
    blueLight: '#93c5fd',
    green: '#22c55e',
    greenLight: '#bbf7d0',
    amber: '#f59e0b',
    amberLight: '#fde68a',
    red: '#ef4444',
    redLight: '#fecaca',
    gray: '#94a3b8',
    grayLight: '#e2e8f0',
    white: '#ffffff',
    dark: '#1e293b',
};

export const SEVERITY = {
    normal: { color: '#22c55e', bg: '#dcfce7', label: 'Normal' },
    warning: { color: '#f59e0b', bg: '#fef3c7', label: 'Warning' },
    critical: { color: '#ef4444', bg: '#fee2e2', label: 'Critical' },
};

export const CHART_FONT = {
    family: "'Inter', sans-serif",
    sizeXS: 9,
    sizeSM: 11,
    sizeMD: 13,
    sizeLG: 16,
};

export const CHART_ANIMATION = {
    duration: 1500,
    easing: 'easeOutQuart' as const,
};

export function getThemeColors(theme: string) {
    const isDark = theme === 'dark';
    return {
        grid: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
        text: isDark ? '#94a3b8' : '#64748b',
        textStrong: isDark ? '#e2e8f0' : '#1e293b',
        angleLines: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
        cardBg: isDark ? '#1e293b' : '#ffffff',
    };
}
