export const buttonStyles = {
  base: 'rounded-md font-medium transition-colors duration-200',
  primary: 'bg-blue-600 text-white hover:bg-accent-hover',
  secondary: 'bg-white text-primary border border-border-default hover:bg-secondary',
  outline: 'border border-border-default text-text-secondary hover:bg-secondary',
  sizes: {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  },
} as const;

export const inputStyles = {
  base: 'w-full rounded-md border-border-default focus:border-border-focus focus:ring-1 focus:ring-border-focus transition-colors duration-200',
  sizes: {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-4 py-3 text-lg',
  },
  states: {
    error: 'border-red-500 focus:border-red-500 focus:ring-red-500',
    success: 'border-green-500 focus:border-green-500 focus:ring-green-500',
  },
} as const;

export const cardStyles = {
  base: 'bg-white rounded-lg shadow-md overflow-hidden',
  padding: {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  },
  hover: 'hover:shadow-lg transition-shadow duration-200',
} as const;

export const textStyles = {
  heading: {
    h1: 'text-4xl font-bold text-text-primary',
    h2: 'text-3xl font-bold text-text-primary',
    h3: 'text-2xl font-semibold text-text-primary',
    h4: 'text-xl font-semibold text-text-primary',
  },
  body: {
    large: 'text-lg text-text-primary',
    base: 'text-base text-text-primary',
    small: 'text-sm text-text-secondary',
  },
  label: 'text-sm font-medium text-text-primary',
  helper: 'text-xs text-text-secondary',
} as const;
