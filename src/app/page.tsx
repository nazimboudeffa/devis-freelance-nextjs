"use client"
import Link from "next/link"
import { XCircle, CheckCircle2 } from 'lucide-react';
import NavBar from "@/components/NavBar";

function Solutions () {

    const solutions = [
        {
            id: "0",
            name: "Estimation",
            description:
                "Estimez votre projet freelance.",
            icon: <CheckCircle2 />,
            color: "green",
            link: "/estimation",
        },
        {
            id: "1",
            name: "TJM",
            description:
                "Estimez votre TJM.",
            icon: <CheckCircle2 />,
            color: "green",
            link: "/tjm",
        },
        {
            id: "2",
            name: "Devis",
            description:
                "Crééz votre Devis à la main.",
            icon: <XCircle />,
            color: "red",
            link: "/",
        },
    ]
    
    return (
        <>
        <NavBar />
        <section className="flex flex-col items-center gap-10 mt-5">
        <div className="ml-5 mr-5 mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
            {solutions.map((service) => (
                <div
                    key={service.id}
                    className="p-5 shadow rounded-[12px] dark:shadow-slate-900"
                >
                    <Link
                        href={service.link}
                        className="flex flex-row items-center gap-2 text-2xl font-bold tracking-tight"
                    >
                        <span className={`text-${service.color}-500 dark:text-${service.color}-700`}>
                            {service.icon}
                        </span>
                        <div className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100">
                            {service.name}
                        </div>
                    </Link>
                    <p className="ml-8 mt-2 text-muted-foreground">
                        {service.description}
                    </p>
                </div>
            ))}
        </div>
        </section>
        </>
    )
}

export default Solutions