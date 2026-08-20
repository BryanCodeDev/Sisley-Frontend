'use client';

export default function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  name,
  required = false,
  error = '',
  success = '',
  disabled = false,
  className = '',
  ...props
}) {
  const hasError = Boolean(error);
  const hasSuccess = Boolean(success) && !hasError;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-[11px] uppercase tracking-widest text-sisley-text-secondary mb-2">
          {label}
          {required && <span className="text-sisley-muted ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`
          w-full px-4 py-3 text-sm bg-sisley-white border font-sans
          transition-colors duration-200 ease-out
          focus:outline-none focus:border-sisley-black focus:ring-1 focus:ring-sisley-black
          disabled:bg-sisley-bg disabled:cursor-not-allowed
          ${hasError ? 'border-red-600 focus:border-red-600 focus:ring-red-600' : 'border-sisley-border'}
          ${hasSuccess ? 'border-green-700 focus:border-green-700 focus:ring-green-700' : ''}
          ${!hasError && !hasSuccess ? 'hover:border-sisley-border-strong' : ''}
        `}
        {...props}
      />
      {hasError && (
        <p className="mt-1.5 text-xs text-red-600">{error}</p>
      )}
      {hasSuccess && (
        <p className="mt-1.5 text-xs text-green-700">{success}</p>
      )}
    </div>
  );
}
