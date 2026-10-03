import { forwardRef, type HTMLAttributes, type InputHTMLAttributes, type LabelHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";

export function Field({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) { return <div className={`ni-field ${className}`} {...props}/>; }
export function FieldLabel({ required, children, className = "", ...props }: LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }) { return <label className={`ni-field__label ${className}`} {...props}>{children}{required && <span className="ni-field__required" aria-hidden="true"> *</span>}</label>; }
export function FieldHint({ className = "", ...props }: HTMLAttributes<HTMLParagraphElement>) { return <p className={`ni-field__hint ${className}`} {...props}/>; }
export function FieldError({ className = "", ...props }: HTMLAttributes<HTMLParagraphElement>) { return <p className={`ni-field__error ${className}`} role="alert" {...props}/>; }
export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input({ className = "", ...props }, ref) { return <input ref={ref} className={`ni-input ${className}`} {...props}/>; });
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(function Textarea({ className = "", ...props }, ref) { return <textarea ref={ref} className={`ni-textarea ${className}`} {...props}/>; });
export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(function Select({ className = "", ...props }, ref) { return <select ref={ref} className={`ni-select ${className}`} {...props}/>; });
export function Checkbox({ label, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string }) { return <label className="ni-check"><input type="checkbox" {...props}/><span>{label}</span></label>; }
export function Radio({ label, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string }) { return <label className="ni-check"><input type="radio" {...props}/><span>{label}</span></label>; }
