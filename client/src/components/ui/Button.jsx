import React from "react";

export function Button({
  variant = "default",
  size = "default",
  className = "",
  children,
  ...props
}) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none  disabled:opacity-50 disabled:pointer-events-none";

  const variantClasses = {
    default: "bg-brand-600 text-white hover:bg-brand-700",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-50",
    ghost: "bg-transparent hover:bg-gray-100",
  };

  const sizeClasses = {
    sm: "text-sm px-3 py-1.5 h-8",
    default: "text-sm px-4 py-2 h-10",
    lg: "text-base px-6 py-3 h-12",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
