'use client';

export default function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  name,
  required = false,
  className = '',
  ...props
}) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-xs uppercase tracking-widest text-sisley-gray-600 mb-2">
          {label}
          {required && <span className="text-sisley-accent ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 text-sm bg-sisley-white border border-sisley-gray-300 focus:outline-none focus:border-sisley-black transition-colors"
        {...props}
      />
    </div>
  );
}
