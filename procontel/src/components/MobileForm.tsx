"use client"

import type React from "react"

import { useState, useEffect, type FormEvent } from "react"
import { useIsMobile } from "../hooks/useIsMobile"

interface FormField {
  id: string
  label: string
  type: string
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[]
  rows?: number
  autoComplete?: string
  pattern?: string
  min?: number | string
  max?: number | string
  step?: number | string
  helpText?: string
}

interface MobileFormProps {
  fields: FormField[]
  onSubmit: (data: Record<string, string>) => void
  submitText?: string
  cancelText?: string
  onCancel?: () => void
  className?: string
  loading?: boolean
  initialValues?: Record<string, string>
  successMessage?: string
  errorMessage?: string
}

const MobileForm: React.FC<MobileFormProps> = ({
  fields,
  onSubmit,
  submitText = "Submit",
  cancelText = "Cancel",
  onCancel,
  className = "",
  loading = false,
  initialValues = {},
  successMessage,
  errorMessage,
}) => {
  const [formData, setFormData] = useState<Record<string, string>>(initialValues)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [submitted, setSubmitted] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const { isMobile } = useIsMobile()

  // Initialize form data with initial values
  useEffect(() => {
    setFormData(initialValues)
  }, [initialValues])

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Mark field as touched
    setTouched((prev) => ({ ...prev, [name]: true }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Validate form
    const newErrors: Record<string, string> = {}
    fields.forEach((field) => {
      if (field.required && !formData[field.id]) {
        newErrors[field.id] = `${field.label} is required`
      }

      // Add more validation as needed
      if (field.type === "email" && formData[field.id] && !/\S+@\S+\.\S+/.test(formData[field.id])) {
        newErrors[field.id] = "Please enter a valid email address"
      }

      if (field.pattern && formData[field.id] && !new RegExp(field.pattern).test(formData[field.id])) {
        newErrors[field.id] = `Please enter a valid ${field.label.toLowerCase()}`
      }
    })

    // If there are errors, show them and don't submit
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      // Mark all fields as touched
      const allTouched: Record<string, boolean> = {}
      fields.forEach((field) => {
        allTouched[field.id] = true
      })
      setTouched(allTouched)
      return
    }

    // Submit form
    setSubmitted(true)

    try {
      await onSubmit(formData)
      setSuccess(true)
      setError(false)

      // Reset form after success if needed
      // setFormData({})
    } catch (err) {
      setSuccess(false)
      setError(true)
      console.error("Form submission error:", err)
    } finally {
      setSubmitted(false)
    }
  }

  // Render form field based on type
  const renderField = (field: FormField) => {
    const { id, label, type, placeholder, required, options, rows, autoComplete, pattern, min, max, step, helpText } =
      field
    const hasError = touched[id] && errors[id]

    switch (type) {
      case "text":
      case "email":
      case "password":
      case "tel":
      case "number":
      case "date":
      case "time":
      case "url":
        return (
          <div className="mb-4" key={id}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
              type={type}
              id={id}
              name={id}
              value={formData[id] || ""}
              onChange={handleChange}
              placeholder={placeholder}
              required={required}
              autoComplete={autoComplete}
              pattern={pattern}
              min={min}
              max={max}
              step={step}
              className={`w-full px-3 py-2 border ${
                hasError ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
              aria-invalid={hasError ? "true" : "false"}
              aria-describedby={hasError ? `${id}-error` : helpText ? `${id}-help` : undefined}
            />
            {hasError && (
              <p id={`${id}-error`} className="mt-1 text-sm text-red-500">
                {errors[id]}
              </p>
            )}
            {helpText && !hasError && (
              <p id={`${id}-help`} className="mt-1 text-sm text-gray-500">
                {helpText}
              </p>
            )}
          </div>
        )

      case "textarea":
        return (
          <div className="mb-4" key={id}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <textarea
              id={id}
              name={id}
              value={formData[id] || ""}
              onChange={handleChange}
              placeholder={placeholder}
              required={required}
              rows={rows || 4}
              className={`w-full px-3 py-2 border ${
                hasError ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
              aria-invalid={hasError ? "true" : "false"}
              aria-describedby={hasError ? `${id}-error` : helpText ? `${id}-help` : undefined}
            />
            {hasError && (
              <p id={`${id}-error`} className="mt-1 text-sm text-red-500">
                {errors[id]}
              </p>
            )}
            {helpText && !hasError && (
              <p id={`${id}-help`} className="mt-1 text-sm text-gray-500">
                {helpText}
              </p>
            )}
          </div>
        )

      case "select":
        return (
          <div className="mb-4" key={id}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <select
              id={id}
              name={id}
              value={formData[id] || ""}
              onChange={handleChange}
              required={required}
              className={`w-full px-3 py-2 border ${
                hasError ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white`}
              aria-invalid={hasError ? "true" : "false"}
              aria-describedby={hasError ? `${id}-error` : helpText ? `${id}-help` : undefined}
            >
              <option value="">{placeholder || "Select an option"}</option>
              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {hasError && (
              <p id={`${id}-error`} className="mt-1 text-sm text-red-500">
                {errors[id]}
              </p>
            )}
            {helpText && !hasError && (
              <p id={`${id}-help`} className="mt-1 text-sm text-gray-500">
                {helpText}
              </p>
            )}
          </div>
        )

      case "checkbox":
        return (
          <div className="mb-4" key={id}>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id={id}
                  name={id}
                  checked={formData[id] === "true"}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, [id]: e.target.checked ? "true" : "false" }))
                    setTouched((prev) => ({ ...prev, [id]: true }))
                  }}
                  required={required}
                  className={`h-4 w-4 text-blue-600 border ${
                    hasError ? "border-red-500" : "border-gray-300"
                  } rounded focus:ring-blue-500 transition-colors`}
                  aria-invalid={hasError ? "true" : "false"}
                  aria-describedby={hasError ? `${id}-error` : helpText ? `${id}-help` : undefined}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor={id} className="font-medium text-gray-700">
                  {label} {required && <span className="text-red-500">*</span>}
                </label>
                {helpText && !hasError && (
                  <p id={`${id}-help`} className="text-gray-500">
                    {helpText}
                  </p>
                )}
              </div>
            </div>
            {hasError && (
              <p id={`${id}-error`} className="mt-1 text-sm text-red-500">
                {errors[id]}
              </p>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className={className}>
      {/* Success message */}
      {success && successMessage && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">{successMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Error message */}
      {error && errorMessage && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Form fields */}
        {fields.map((field) => renderField(field))}

        {/* Form actions */}
        <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-4 mt-6">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="mb-3 sm:mb-0 w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              disabled={loading}
            >
              {cancelText}
            </button>
          )}
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              submitText
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default MobileForm
