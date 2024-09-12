"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export default function ModeToggle({ className }: any) {
  const { theme, setTheme } = useTheme()

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className={className}>
      <Button variant="outline" size="icon" onClick={toggleTheme}>
        {theme === "dark" ? (
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        ) : (
          <Moon className="h-[1.2rem] w-[1.2rem]" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  )
}
