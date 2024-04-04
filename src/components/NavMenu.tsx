"use client"

import * as React from "react"
import Link from "next/link"

import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";

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
  const { data: session } = useSession()

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
      {(session) ? <UserIcon session={session} /> : <Button onClick={() => signIn("discord")}>Sign in with Discord</Button>}
    </div>
  </div>);
}

function UserIcon(session) {
  return (
    <><a href="/user-profile" className="flex">
      <p className="font-bold text-slate-600 h-20 pr-2 pt-1">{session.user?.name}</p>
      <img src={session.user?.image} alt="User Icon" className="w-8 h-8 rounded-md" />
    </a><button onClick={() => signOut()}>Sign out</button></>
  );
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