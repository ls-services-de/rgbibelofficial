"use client"

import { useState, useEffect } from "react"
import { PlusCircle, Edit, Trash2, Lock } from "lucide-react"
import Header from "../components/Header"

// StyleSheet component remains unchanged
const StyleSheet = () => {
  return (
    <style jsx global>{`
      :root {
        --background: 0 0% 100%;
        --foreground: 222.2 84% 4.9%;
        --card: 0 0% 100%;
        --card-foreground: 222.2 84% 4.9%;
        --popover: 0 0% 100%;
        --popover-foreground: 222.2 84% 4.9%;
        --primary: 186 100% 50%;
        --primary-foreground: 210 40% 98%;
        --secondary: 210 40% 96.1%;
        --secondary-foreground: 222.2 47.4% 11.2%;
        --muted: 210 40% 96.1%;
        --muted-foreground: 215.4 16.3% 46.9%;
        --accent: 210 40% 96.1%;
        --accent-foreground: 222.2 47.4% 11.2%;
        --destructive: 0 84.2% 60.2%;
        --destructive-foreground: 210 40% 98%;
        --border: 214.3 31.8% 91.4%;
        --input: 214.3 31.8% 91.4%;
        --ring: 186 100% 50%;
        --radius: 0.5rem;
      }

      * {
        box-sizing: border-box;
      }

      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        background-color: hsl(var(--background));
        color: hsl(var(--foreground));
        margin: 0;
        padding: 0;
      }

      .container {
        width: 100%;
        margin-right: auto;
        margin-left: auto;
        padding-right: 1rem;
        padding-left: 1rem;
      }

      @media (min-width: 640px) {
        .container {
          max-width: 640px;
        }
      }

      @media (min-width: 768px) {
        .container {
          max-width: 768px;
        }
      }

      @media (min-width: 1024px) {
        .container {
          max-width: 1024px;
        }
      }

      @media (min-width: 1280px) {
        .container {
          max-width: 1280px;
        }
      }

      .mx-auto {
        margin-left: auto;
        margin-right: auto;
      }

      .py-6 {
        padding-top: 1.5rem;
        padding-bottom: 1.5rem;
      }

      .px-4 {
        padding-left: 1rem;
        padding-right: 1rem;
      }

      .text-3xl {
        font-size: 1.875rem;
        line-height: 2.25rem;
      }

      .font-bold {
        font-weight: 700;
      }

      .mb-6 {
        margin-bottom: 1.5rem;
      }

      .text-center {
        text-align: center;
      }

      .grid {
        display: grid;
      }

      .grid-cols-3 {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      .w-full {
        width: 100%;
      }

      .inline-flex {
        display: inline-flex;
      }

      .items-center {
        align-items: center;
      }

      .justify-center {
        justify-content: center;
      }

      .whitespace-nowrap {
        white-space: nowrap;
      }

      .rounded-sm {
        border-radius: 0.125rem;
      }

      .rounded-md {
        border-radius: 0.375rem;
      }

      .rounded-lg {
        border-radius: 0.5rem;
      }

      .px-3 {
        padding-left: 0.75rem;
        padding-right: 0.75rem;
      }

      .py-1\.5 {
        padding-top: 0.375rem;
        padding-bottom: 0.375rem;
      }

      .text-sm {
        font-size: 0.875rem;
        line-height: 1.25rem;
      }

      .font-medium {
        font-weight: 500;
      }

      .bg-background {
        background-color: hsl(var(--background));
      }

      .text-foreground {
        color: hsl(var(--foreground));
      }

      .shadow-sm {
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      }

      .bg-muted {
        background-color: hsl(var(--muted));
      }

      .text-muted-foreground {
        color: hsl(var(--muted-foreground));
      }

      .p-1 {
        padding: 0.25rem;
      }

      .mt-2 {
        margin-top: 0.5rem;
      }

      .space-y-8 > * + * {
        margin-top: 2rem;
      }

      .gap-4 {
        gap: 1rem;
      }

      .p-6 {
        padding: 1.5rem;
      }

      .border {
        border: 1px solid hsl(var(--border));
      }

      .text-xl {
        font-size: 1.25rem;
        line-height: 1.75rem;
      }

      .flex {
        display: flex;
      }

      .gap-2 {
        gap: 0.5rem;
      }

      .flex-1 {
        flex: 1 1 0%;
      }

      .space-y-4 > * + * {
        margin-top: 1rem;
      }

      .h-10 {
        height: 2.5rem;
      }

      .h-4 {
        height: 1rem;
      }

      .w-4 {
        width: 1rem;
      }

      .mr-2 {
        margin-right: 0.5rem;
      }

      .p-8 {
        padding: 2rem;
      }

      .p-4 {
        padding: 1rem;
      }

      .p-2 {
        padding: 0.5rem;
      }

      .justify-between {
        justify-content: space-between;
      }

      .mb-2 {
        margin-bottom: 0.5rem;
      }

      .mr-1 {
        margin-right: 0.25rem;
      }

      .text-lg {
        font-size: 1.125rem;
        line-height: 1.75rem;
      }

      .whitespace-pre-line {
        white-space: pre-line;
      }

      .mb-4 {
        margin-bottom: 1rem;
      }

      .relative {
        position: relative;
      }

      .absolute {
        position: absolute;
      }

      .top-2 {
        top: 0.5rem;
      }

      .right-2 {
        right: 0.5rem;
      }

      .bg-primary {
        background-color: hsl(var(--primary));
      }

      .text-primary-foreground {
        color: hsl(var(--primary-foreground));
      }

      .hover\\:bg-primary\\/90:hover {
        background-color: hsla(var(--primary), 0.9);
      }

      .bg-destructive {
        background-color: hsl(var(--destructive));
      }

      .text-destructive-foreground {
        color: hsl(var(--destructive-foreground));
      }

      .hover\\:bg-destructive\\/90:hover {
        background-color: hsla(var(--destructive), 0.9);
      }

      .border-input {
        border-color: hsl(var(--input));
      }

      .hover\\:bg-accent:hover {
        background-color: hsl(var(--accent));
      }

      .hover\\:text-accent-foreground:hover {
        color: hsl(var(--accent-foreground));
      }

      .overflow-auto {
        overflow: auto;
      }

      .max-h-\\[600px\\] {
        max-height: 600px;
      }

      .fixed {
        position: fixed;
      }

      .inset-0 {
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }

      .z-50 {
        z-index: 50;
      }

      .backdrop-blur-sm {
        backdrop-filter: blur(4px);
      }

      .bg-background\\/80 {
        background-color: hsla(var(--background), 0.8);
      }

      .shadow-lg {
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      }

      .flex-col {
        flex-direction: column;
      }

      .space-y-1\\.5 > * + * {
        margin-top: 0.375rem;
      }

      .text-lg {
        font-size: 1.125rem;
        line-height: 1.75rem;
      }

      .leading-none {
        line-height: 1;
      }

      .tracking-tight {
        letter-spacing: -0.025em;
      }

      .justify-end {
        justify-content: flex-end;
      }

      .bottom-4 {
        bottom: 1rem;
      }

      .right-4 {
        right: 1rem;
      }

      .ml-4 {
        margin-left: 1rem;
      }

      .max-w-2xl {
        max-width: 42rem;
      }

      .max-w-\\[250px\\] {
        max-width: 250px;
      }

      .py-3 {
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
      }

      .my-4 {
        margin-top: 1rem;
        margin-bottom: 1rem;
      }

      .mt-8 {
        margin-top: 2rem;
      }

      .pt-4 {
        padding-top: 1rem;
      }

      .border-t {
        border-top-width: 1px;
      }

      .border-gray-700 {
        border-color: #374151;
      }

      .text-gray-300 {
        color: #d1d5db;
      }

      .mb-1 {
        margin-bottom: 0.25rem;
      }

      .min-h-\\[80px\\] {
        min-height: 80px;
      }

      .text-xs {
        font-size: 0.75rem;
        line-height: 1rem;
      }
      
      /* New styles for password screen */
      .password-screen {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 60vh;
        padding: 2rem;
      }
      
      .password-container {
        width: 100%;
        max-width: 400px;
        padding: 2rem;
        border: 1px solid hsl(var(--border));
        border-radius: 0.5rem;
        background-color: hsl(var(--background));
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }
      
      .password-header {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1.5rem;
      }
      
      .password-icon {
        margin-right: 0.75rem;
        color: hsl(var(--primary));
      }
      
      .shake {
        animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
      }
      
      @keyframes shake {
        10%, 90% {
          transform: translate3d(-1px, 0, 0);
        }
        20%, 80% {
          transform: translate3d(2px, 0, 0);
        }
        30%, 50%, 70% {
          transform: translate3d(-4px, 0, 0);
        }
        40%, 60% {
          transform: translate3d(4px, 0, 0);
        }
      }
    `}</style>
  )
}

// UI components remain unchanged
const Button = ({ children, variant = "default", size = "default", className = "", ...props }) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"

  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  }

  const sizeClasses = {
    default: "h-10 px-4 py-2 text-sm",
    sm: "h-9 rounded-md px-3 text-xs",
    lg: "h-11 rounded-md px-8 text-base",
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

const Input = ({ className = "", ...props }) => {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
}

const Textarea = ({ className = "", ...props }) => {
  return (
    <textarea
      className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
}

const Label = ({ className = "", ...props }) => {
  return (
    <label
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
      {...props}
    />
  )
}

const Tabs = ({ children }) => {
  return <div>{children}</div>
}

const TabsList = ({ className = "", children }) => {
  return (
    <div
      className={`inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ${className}`}
    >
      {children}
    </div>
  )
}

const TabsTrigger = ({ value, activeTab, setActiveTab, className = "", children }) => {
  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
        activeTab === value ? "bg-background text-foreground shadow-sm" : "hover:bg-background/50 hover:text-foreground"
      } ${className}`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  )
}

const TabsContent = ({ value, activeTab, className = "", children }) => {
  if (activeTab !== value) return null
  return (
    <div
      className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
    >
      {children}
    </div>
  )
}

const Dialog = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="z-50 grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg sm:rounded-lg">{children}</div>
    </div>
  )
}

const DialogHeader = ({ children }) => {
  return <div className="flex flex-col space-y-1.5 text-center sm:text-left">{children}</div>
}

const DialogTitle = ({ children }) => {
  return <h3 className="text-lg font-semibold leading-none tracking-tight">{children}</h3>
}

// Toast component
const Toast = ({ message, type = "default", onClose }) => {
  return (
    <div
      className={`fixed bottom-4 right-4 z-50 rounded-md border px-4 py-3 shadow-md ${
        type === "destructive" ? "bg-destructive text-destructive-foreground" : "bg-background"
      }`}
    >
      <div className="flex justify-between items-center">
        <p>{message}</p>
        <button onClick={onClose} className="ml-4 text-sm">
          ×
        </button>
      </div>
    </div>
  )
}

// Email preview component
const EmailPreview = ({ blocks }) => {
  return (
    <div className="max-w-2xl mx-auto bg-[#121212] text-white p-6 rounded-lg">
      <div className="text-center py-6">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_hd_1-Zdp9Tb4bpx1qm5YFXezxcjozHhvuwr.png"
          alt="RGBibelOfficial Logo"
          className="max-w-[250px] mx-auto"
        />
      </div>

      <div className="bg-[#1e1e1e] p-6 rounded-lg mb-6">
        {blocks.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <p>Keine Inhalte vorhanden. Fügen Sie im Editor Blöcke hinzu.</p>
          </div>
        ) : (
          <>
            {blocks.map((block) => {
              switch (block.type) {
                case "header":
                  return (
                    <h1 key={block.id} className="text-2xl font-bold text-center mb-4">
                      {block.content}
                    </h1>
                  )

                case "text":
                  return (
                    <div key={block.id} className="mb-4 whitespace-pre-line">
                      {block.content.split("\n").map((line, i) => (
                        <p key={i} className={line.trim() ? "mb-2" : "mb-4"}>
                          {line}
                        </p>
                      ))}
                    </div>
                  )

                case "button":
                  return (
                    <a
                      key={block.id}
                      href={block.url}
                      className="block bg-[#00c8ff] text-white text-center py-3 px-4 rounded-lg my-4 font-bold"
                    >
                      {block.content}
                    </a>
                  )

                default:
                  return null
              }
            })}

            {/* Footer is always displayed */}
            <div className="mt-8 pt-4 border-t border-gray-700 text-center text-gray-300 text-sm">
              <p className="mb-1">Wir danken dir nochmals für dein Vertrauen und freuen uns,</p>
              <p className="mb-1">dich als unseren Kunden begrüßen zu dürfen!</p>
              <p className="mb-1">Mit freundlichen Grüßen,</p>
              <p className="mb-1">Das RGBibelOfficial-Team</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// Password screen component
const PasswordScreen = ({ onPasswordVerified }) => {
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  const [lockTime, setLockTime] = useState(0)

  // Correct password - in a real application, this would be stored securely on the server
  const correctPassword = process.env.NEXT_PUBLIC_PASSWORD
  const maxAttempts = 5
  const lockDuration = 30 // seconds

  useEffect(() => {
    let timer
    if (isLocked && lockTime > 0) {
      timer = setTimeout(() => {
        setLockTime(lockTime - 1)
      }, 1000)
    } else if (isLocked && lockTime === 0) {
      setIsLocked(false)
      setAttempts(0)
    }

    return () => clearTimeout(timer)
  }, [isLocked, lockTime])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isLocked) return

    if (password === correctPassword) {
      // Store in session storage that the user is authenticated
      sessionStorage.setItem("emailBuilderAuthenticated", "true")
      onPasswordVerified()
    } else {
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      setError(true)

      // Reset the error shake animation after a short delay
      setTimeout(() => setError(false), 500)

      // Lock the form after max attempts
      if (newAttempts >= maxAttempts) {
        setIsLocked(true)
        setLockTime(lockDuration)
      }
    }
  }

  return (
    <div className="password-screen">
      <div className={`password-container ${error ? "shake" : ""}`}>
        <div className="password-header">
          <Lock className="password-icon h-6 w-6" />
          <h2 className="text-xl font-bold text-black">Zugriff beschränkt</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="password">Passwort</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Bitte Passwort eingeben"
                disabled={isLocked}
              />
            </div>

            {error && (
              <p className="text-destructive text-sm">
                Falsches Passwort. Verbleibende Versuche: {maxAttempts - attempts}
              </p>
            )}

            {isLocked && (
              <p className="text-destructive text-sm">
                Zu viele fehlgeschlagene Versuche. Bitte warten Sie {lockTime} Sekunden.
              </p>
            )}

            <Button type="submit" className="w-full" disabled={isLocked || !password.trim()}>
              Zugriff erhalten
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Main component
export default function EmailBuilder() {
  // State for password protection
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Email builder states
  const [emailBlocks, setEmailBlocks] = useState([])
  const [newBlockType, setNewBlockType] = useState("text")
  const [newBlockContent, setNewBlockContent] = useState("")
  const [newButtonUrl, setNewButtonUrl] = useState("https://rgbibeloffical.com/")

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingBlock, setEditingBlock] = useState(null)
  const [editingBlockId, setEditingBlockId] = useState(null)
  const [editButtonUrl, setEditButtonUrl] = useState("")

  const [activeTab, setActiveTab] = useState("editor")
  const [htmlOutput, setHtmlOutput] = useState("")

  const [toast, setToast] = useState(null)

  // Check if user is already authenticated
  useEffect(() => {
    const authenticated = sessionStorage.getItem("emailBuilderAuthenticated") === "true"
    setIsAuthenticated(authenticated)
  }, [])

  const showToast = (message, type = "default") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const addNewBlock = () => {
    if (!newBlockContent) {
      showToast("Bitte geben Sie einen Inhalt für den Block ein.", "destructive")
      return
    }

    const newBlock = {
      id: Date.now().toString(),
      type: newBlockType,
      content: newBlockContent,
    }

    if (newBlockType === "button") {
      newBlock.url = newButtonUrl
    }

    setEmailBlocks([...emailBlocks, newBlock])
    setNewBlockContent("")
    if (newBlockType === "button") {
      setNewButtonUrl("https://rgbibeloffical.com/")
    }

    showToast(
      `${newBlockType === "header" ? "Überschrift" : newBlockType === "text" ? "Text" : "Button"} wurde hinzugefügt.`,
    )
  }

  const startEditBlock = (block) => {
    setEditingBlock({ ...block })
    setEditingBlockId(block.id)

    if (block.type === "button" && block.url) {
      setEditButtonUrl(block.url)
    }

    setIsEditDialogOpen(true)
  }

  const saveEditedBlock = () => {
    if (!editingBlock || !editingBlockId) return

    const updatedBlocks = emailBlocks.map((block) =>
      block.id === editingBlockId
        ? { ...editingBlock, ...(editingBlock.type === "button" && { url: editButtonUrl }) }
        : block,
    )

    setEmailBlocks(updatedBlocks)
    setIsEditDialogOpen(false)
    setEditingBlock(null)
    setEditingBlockId(null)

    showToast("Die Änderungen wurden gespeichert.")
  }

  const deleteBlock = (id) => {
    setEmailBlocks(emailBlocks.filter((block) => block.id !== id))
    showToast("Der Block wurde erfolgreich entfernt.")
  }

  const generateHtml = () => {
    // Logo URL
    const logoUrl =
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_hd_1-Zdp9Tb4bpx1qm5YFXezxcjozHhvuwr.png"

    let html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RGBibelOfficial</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #121212; color: #ffffff;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="text-align: center; padding: 20px 0;">
      <img src="${logoUrl}" alt="RGBibelOfficial Logo" style="max-width: 250px; height: auto;">
    </div>
    <div style="background-color: #1e1e1e; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
`

    // Add all blocks to the HTML
    emailBlocks.forEach((block) => {
      switch (block.type) {
        case "header":
          html += `      <h1 style="text-align: center; color: #ffffff;">${block.content}</h1>\n`
          break
        case "text":
          // Split by newlines and wrap each in a paragraph
          const paragraphs = block.content.split("\n").filter((p) => p.trim())
          paragraphs.forEach((p) => {
            html += `      <p style="margin: 10px 0; color: #ffffff;">${p}</p>\n`
          })
          break
        case "button":
          html += `      <a href="${block.url}" style="display: block; background-color: #00c8ff; color: #ffffff; text-align: center; padding: 12px 20px; text-decoration: none; border-radius: 5px; margin: 15px 0; font-weight: bold;">${block.content}</a>\n`
          break
      }
    })

    // Add footer
    html += `
      <div style="text-align: center; color: #cccccc; font-size: 14px; margin-top: 20px; padding-top: 20px; border-top: 1px solid #333333;">
        <p style="margin: 10px 0;">Wir danken dir nochmals für dein Vertrauen und freuen uns,</p>
        <p style="margin: 10px 0;">dich als unseren Kunden begrüßen zu dürfen!</p>
        <p style="margin: 10px 0;">Mit freundlichen Grüßen,</p>
        <p style="margin: 10px 0;">Das RGBibelOfficial-Team</p>
      </div>
    </div>
  </div>
</body>
</html>`

    setHtmlOutput(html)
    showToast("Der HTML-Code wurde erfolgreich erstellt und kann jetzt kopiert werden.")
  }

  // If not authenticated, show password screen
  if (!isAuthenticated) {
    return (
      <main className="container mx-auto py-6 px-4">
        <StyleSheet />
        <Header />
        <PasswordScreen onPasswordVerified={() => setIsAuthenticated(true)} />
      </main>
    )
  }

  // Main application when authenticated
  return (
    <main className="container mx-auto py-6 px-4">
      <StyleSheet />
      <Header />
      <h1 className="text-3xl font-bold mb-6 text-center">RGBibelOfficial Email-Baukasten</h1>

      <Tabs>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="editor" activeTab={activeTab} setActiveTab={setActiveTab}>
            Editor
          </TabsTrigger>
          <TabsTrigger value="preview" activeTab={activeTab} setActiveTab={setActiveTab}>
            Vorschau
          </TabsTrigger>
          <TabsTrigger value="html" activeTab={activeTab} setActiveTab={setActiveTab}>
            HTML-Code
          </TabsTrigger>
        </TabsList>

        <TabsContent value="editor" activeTab={activeTab}>
          <div className="space-y-8">
            <div className="grid gap-4 p-6 border rounded-lg">
              <h2 className="text-xl font-bold">Neuen Block hinzufügen</h2>

              <div className="flex gap-2">
                <Button
                  variant={newBlockType === "header" ? "default" : "outline"}
                  onClick={() => setNewBlockType("header")}
                  className="flex-1"
                >
                  Überschrift
                </Button>
                <Button
                  variant={newBlockType === "text" ? "default" : "outline"}
                  onClick={() => setNewBlockType("text")}
                  className="flex-1"
                >
                  Text
                </Button>
                <Button
                  variant={newBlockType === "button" ? "default" : "outline"}
                  onClick={() => setNewBlockType("button")}
                  className="flex-1"
                >
                  Button
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="blockContent">
                    {newBlockType === "header"
                      ? "Überschrift"
                      : newBlockType === "text"
                        ? "Text Inhalt"
                        : "Button Text"}
                  </Label>
                  {newBlockType === "text" ? (
                    <Textarea
                      id="blockContent"
                      placeholder="Geben Sie hier Ihren Text ein..."
                      value={newBlockContent}
                      onChange={(e) => setNewBlockContent(e.target.value)}
                      rows={5}
                    />
                  ) : (
                    <Input
                      id="blockContent"
                      placeholder={newBlockType === "header" ? "Überschrift eingeben..." : "Button Text"}
                      value={newBlockContent}
                      onChange={(e) => setNewBlockContent(e.target.value)}
                    />
                  )}
                </div>

                {newBlockType === "button" && (
                  <div>
                    <Label htmlFor="buttonUrl">Button URL</Label>
                    <Input
                      id="buttonUrl"
                      placeholder="https://..."
                      value={newButtonUrl}
                      onChange={(e) => setNewButtonUrl(e.target.value)}
                    />
                  </div>
                )}

                <Button onClick={addNewBlock} className="w-full">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Block hinzufügen
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold">Aktuelle Email-Blöcke</h2>

              {emailBlocks.length === 0 ? (
                <div className="p-8 text-center border rounded-lg text-muted-foreground">
                  Keine Blöcke vorhanden. Fügen Sie oben neue Blöcke hinzu.
                </div>
              ) : (
                emailBlocks.map((block, index) => (
                  <div key={block.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold">
                        {index + 1}.{" "}
                        {block.type === "header" ? " Überschrift" : block.type === "text" ? " Text" : " Button"}
                      </span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => startEditBlock(block)}>
                          <Edit className="h-4 w-4 mr-1" /> Bearbeiten
                        </Button>

                        <Button variant="destructive" size="sm" onClick={() => deleteBlock(block.id)}>
                          <Trash2 className="h-4 w-4 mr-1" /> Löschen
                        </Button>
                      </div>
                    </div>

                    <div className="p-2 bg-muted rounded-md">
                      {block.type === "button" ? (
                        <div>
                          <p className="mb-1">{block.content}</p>
                          <p className="text-xs text-muted-foreground">URL: {block.url}</p>
                        </div>
                      ) : block.type === "header" ? (
                        <h3 className="text-lg font-bold">{block.content}</h3>
                      ) : (
                        <p className="whitespace-pre-line">{block.content}</p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preview" activeTab={activeTab}>
          <EmailPreview blocks={emailBlocks} />
        </TabsContent>

        <TabsContent value="html" activeTab={activeTab}>
          <div className="mb-4">
            <Button onClick={generateHtml} className="mb-4">
              HTML generieren
            </Button>
            {htmlOutput && (
              <div className="relative">
                <Button
                  variant="outline"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    navigator.clipboard.writeText(htmlOutput)
                    showToast("HTML-Code wurde in die Zwischenablage kopiert.")
                  }}
                >
                  Kopieren
                </Button>
                <pre className="bg-muted p-4 rounded-md overflow-auto max-h-[600px] text-sm">{htmlOutput}</pre>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Dialog */}
      <Dialog isOpen={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
        <DialogHeader>
          <DialogTitle>Block bearbeiten</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {editingBlock && (
            <>
              <div>
                <Label htmlFor="editContent">
                  {editingBlock.type === "header"
                    ? "Überschrift"
                    : editingBlock.type === "text"
                      ? "Text Inhalt"
                      : "Button Text"}
                </Label>
                {editingBlock.type === "text" ? (
                  <Textarea
                    id="editContent"
                    value={editingBlock.content || ""}
                    onChange={(e) => setEditingBlock({ ...editingBlock, content: e.target.value })}
                    rows={5}
                  />
                ) : (
                  <Input
                    id="editContent"
                    value={editingBlock.content || ""}
                    onChange={(e) => setEditingBlock({ ...editingBlock, content: e.target.value })}
                  />
                )}
              </div>

              {editingBlock.type === "button" && (
                <div>
                  <Label htmlFor="editButtonUrl">Button URL</Label>
                  <Input id="editButtonUrl" value={editButtonUrl} onChange={(e) => setEditButtonUrl(e.target.value)} />
                </div>
              )}
            </>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Abbrechen
            </Button>
            <Button onClick={saveEditedBlock}>Änderungen speichern</Button>
          </div>
        </div>
      </Dialog>

      {/* Toast notification */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </main>
  )
}

