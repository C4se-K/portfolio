"use client"

import { AnimatePresence, motion} from "framer-motion";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import NavBar from "@/components/NavBar";

const pageOrder = ["/bio", "/"]

export default function PagesLayout({children}: {children: React.ReactNode}){
    const pathname = usePathname();
    const prevIndex = useRef(pageOrder.indexOf(pathname));

    const currentIndex = pageOrder.indexOf(pathname);
    const direction = currentIndex > prevIndex.current ? 1 : -1;
    prevIndex.current = currentIndex;

    return (
        <div className="relative w-full h-full overflow-hidden">
            <AnimatePresence mode = "wait">
                <motion.div 
                    key = {pathname}
                    initial = {{x:50 * direction, opacity: 0}}
                    animate = {{x:0, opacity:1}}
                    exit={{x:-50 * direction, opacity:0}}
                    transition={{duration:0.35, ease: "easeInOut"}}
                    className="absolute inset-0 w-full h-full"
                >
                    {children}
                </motion.div>
            </AnimatePresence> 

            <NavBar />
        </div>
    );

}