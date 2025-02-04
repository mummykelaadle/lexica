import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  // Function to toggle theme
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {/* Display Sun when theme is dark, Moon when theme is light */}
      <Sun className={`h-[1.2rem] w-[1.2rem] ${theme === 'dark' ? 'hidden' : 'block'}`} />
      <Moon className={`h-[1.2rem] w-[1.2rem] ${theme === 'light' ? 'hidden' : 'block'}`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
