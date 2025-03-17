import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/steps')({
  component: Steps,
})

function Steps() {
  const [currentStep, setCurrentStep] = useState(0)
  
  return <div>Hello {currentStep}
  <div></div></div>
}
