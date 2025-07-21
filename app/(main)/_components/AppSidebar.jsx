"use client"
export default AppSidebar
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button";

import Image from "next/image"
import {Plus} from "lucide-react"
import Link from 'next/link';

import { SidebarOptions } from "@/services/Constants";
import { usePathname } from "next/navigation";

export function AppSidebar() {

  const path = usePathname();
  console.log(path)
  return (
    <Sidebar>
      <SidebarHeader className= "flex items-center mt-5">
        <Image src = {'/logo.png'} alt = "logo" width={400} height = {200}
        className =" w-[150px]"/>
        <Button className = 'w-full mt-5'> <Plus /> Create New Interview</Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
           <SidebarContent>
            <SidebarMenu>
                {SidebarOptions.map((option, index) => (
                    <SidebarMenuItem key = {index} className = 'p-1'>
                        <SidebarMenuButton asChild className= {`'p-5' ${path == option.path}`}>
                            <Link href = {option.path}>
                                <option.icon className={` ${path == option.path && 'text-primary'}`} />
                                <span className={`text-[16px] font-meduim ${path == option.path && 'text-primary'}`}>{option.name}</span>
                            </Link>
                        </SidebarMenuButton>

                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
           </SidebarContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}