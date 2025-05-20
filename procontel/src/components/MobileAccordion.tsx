"use client"

import type React from "react"

import { useState, type ReactNode } from "react"
import { FiChevronDown, FiChevronUp } from "react-icons/fi"

interface AccordionItemProps {
  title: string
  children: ReactNode
  isOpen?: boolean
  onToggle?: () => void
  className?: string
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  isOpen = false,
  onToggle,
  className = "",
}) => {
  return (
    <div className={`border-b border-gray-200 ${className}`}>
      <button
        className="flex justify-between items-center w-full py-4 px-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="font-medium text-gray-800">{title}</span>
        <span className="ml-4 flex-shrink-0 text-gray-500">
          {isOpen ? <FiChevronUp className="w-5 h-5" /> : <FiChevronDown className="w-5 h-5" />}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="py-3 px-4 text-gray-600">{children}</div>
      </div>
    </div>
  )
}

interface MobileAccordionProps {
  items: {
    title: string
    content: ReactNode
  }[]
  allowMultiple?: boolean
  defaultOpen?: number[]
  className?: string
}

const MobileAccordion: React.FC<MobileAccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpen = [],
  className = "",
}) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>(defaultOpen)

  const handleToggle = (index: number) => {
    if (allowMultiple) {
      setOpenIndexes((prevIndexes) =>
        prevIndexes.includes(index) ? prevIndexes.filter((i) => i !== index) : [...prevIndexes, index],
      )
    } else {
      setOpenIndexes((prevIndexes) => (prevIndexes.includes(index) ? [] : [index]))
    }
  }

  return (
    <div className={`rounded-lg overflow-hidden ${className}`}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          isOpen={openIndexes.includes(index)}
          onToggle={() => handleToggle(index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  )
}

export default MobileAccordion
