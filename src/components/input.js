import React from 'react'

export function InputText({ className, label, value, change, name, placeholder, error, type }) {
    return (
        <div className={`w-full block mb-5 ` + className}>
            <label className="font-bold text-sm block mb-2">{label || "judul"}</label>
            <input placeholder={placeholder} name={name} value={value} onChange={change} type={type || 'text'} className={`outline-none w-full text-sm focus:border-primary px-3 py-2 rounded-lg border border-red-100 ${error ? "border-red-500" : "border-secondary"}`} />
        </div>
    )
}