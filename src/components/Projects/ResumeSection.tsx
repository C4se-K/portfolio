"use client";


import { useState, useEffect} from "react";

import Image from "next/image";

export default function ResumeSection() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (open) {
        document.body.style.overflow = "hidden";
        } else {
        document.body.style.overflow = "";
        }


        return () => {
        document.body.style.overflow = "";
        };
    }, [open]);



    return (
        <>
            {/* collapsed */}
        
            <section
                onClick={() => setOpen(true)}
                className="border p-1 rounded-xl bg-white/50 backdrop-blur curso-pointer"
            >
                {!open && (
                    <div>
                        <div className="h-40 w-full rounded-lg overflow-hidden border">
                            <Image
                                src="/resume_thumb2.png"
                                alt = "resume preview"
                                width={600}
                                height={800}
                                className="object-cover h-full w-full">

                            </Image>
                        </div>
                    </div>
                )}
            </section>

            {/* popup */}

            {open && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                    onClick={() => setOpen(false)}
                >
                    <div
                        className="bg-white rounded-xl p-6 w-[95%] max-w-5xl h-[90vh] overflow-hidden shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* debated whether note should be above or below. chose below for now */}

                        <iframe
                            src="/resume.pdf"
                            className="w-full h-full">
                        </iframe>

                        <p className="text-center text-neutral-700 font-medium trackin-wide opacity-100 mb-3">
                            Click outside the window to close
                        </p>
                        

                    </div>
                    
                </div>      
            )}
            
        </>
    );

}