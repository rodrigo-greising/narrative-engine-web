"use client"

import * as React from "react"
import Link from "next/link"
import { UserButton } from "@clerk/nextjs";


import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";

import { Button } from "./ui/button";
import { cn } from "@/lib/utils";


export function NavMenu() {
  return (
      <NavMenuContent />
  )
}

function NavMenuContent() {

  return (<div className="sticky w-full bg-slate-50 top-0 py-2 shadow-md">
    <NavigationMenu >
      <NavigationMenuItem className="pr-4">
        <Link href="/" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            <h1 className="text-xl text-blue-violet-500 font-bold">Narrative Engine</h1>
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Features</NavigationMenuTrigger>
          <NavigationMenuContent className="bg-slate-50">
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
    <div className="absolute right-2 top-3">
      <UserButton />
    </div>
  </div>);
}



const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Sourcebooks",
    href: "/source-books",
    description:
      "Rules and content reference for your game system, in PDFs.",
  },
  {
    title: "Game Records",
    href: "/game-records",
    description:
      "Audio, transcription and summary of your game sessions.",
  },
];


export default NavMenu;