"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Filter, X } from "lucide-react"

interface ProjectFilterProps {
  categories: string[]
  technologies: string[]
  onCategoryFilter: (category: string) => void
  onTechnologyFilter: (technology: string) => void
  onClearFilters: () => void
  activeCategory: string
  activeTechnologies: string[]
}

export function ProjectFilter({
  categories,
  technologies,
  onCategoryFilter,
  onTechnologyFilter,
  onClearFilters,
  activeCategory,
  activeTechnologies,
}: ProjectFilterProps) {
  const [showTechFilters, setShowTechFilters] = useState(false)

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex justify-center">
        <Card className="bg-card border-border shadow-lg">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium text-muted-foreground mr-2">Category:</span>
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => onCategoryFilter(category)}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  className={`rounded-full transition-all duration-300 ${
                    activeCategory === category
                      ? "gradient-primary text-primary-foreground shadow-lg scale-105"
                      : "border-border hover:border-primary hover:text-primary bg-transparent"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Technology Filter Toggle */}
      <div className="flex justify-center">
        <Button
          onClick={() => setShowTechFilters(!showTechFilters)}
          variant="outline"
          className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground rounded-full bg-transparent group"
        >
          <Filter className="w-4 h-4 mr-2 group-hover:animate-pulse" />
          {showTechFilters ? "Hide" : "Show"} Technology Filters
        </Button>
      </div>

      {/* Technology Filter */}
      {showTechFilters && (
        <div className="flex justify-center animate-fade-in-up">
          <Card className="bg-card border-border shadow-lg max-w-4xl">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Filter by Technology:</span>
                  {activeTechnologies.length > 0 && (
                    <Button
                      onClick={onClearFilters}
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Clear All
                    </Button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <Badge
                      key={tech}
                      onClick={() => onTechnologyFilter(tech)}
                      className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                        activeTechnologies.includes(tech)
                          ? "bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground shadow-lg"
                          : "bg-muted text-muted-foreground hover:bg-secondary/20 hover:text-secondary"
                      }`}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Active Filters Display */}
      {(activeCategory !== "All" || activeTechnologies.length > 0) && (
        <div className="flex justify-center animate-fade-in-up">
          <Card className="bg-muted/50 border-border">
            <CardContent className="p-3">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm font-medium text-muted-foreground">Active Filters:</span>
                {activeCategory !== "All" && (
                  <Badge className="bg-primary text-primary-foreground">Category: {activeCategory}</Badge>
                )}
                {activeTechnologies.map((tech) => (
                  <Badge key={tech} className="bg-secondary text-secondary-foreground">
                    {tech}
                    <X
                      className="w-3 h-3 ml-1 cursor-pointer hover:bg-secondary-foreground/20 rounded-full"
                      onClick={() => onTechnologyFilter(tech)}
                    />
                  </Badge>
                ))}
                <Button
                  onClick={onClearFilters}
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear All
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
