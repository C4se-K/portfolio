
import ResumeSection from "@/components/Projects/ResumeSection";
import NavBar from "@/components/NavBar";

const projects = [
    {id : 1, title: "project 1 "},
    {id : 2, title: "project 2 "},
    {id : 3, title: "project 3 "},
    {id : 4, title: "project 4 "},
    {id : 5, title: "project 5 "},
];


export default function ProjectsPage() {
  return (
    <div className = "p-8 flex flex-col gap-16 w-full max-w-6xl mx-auto">


        {/* resume section */}
        <section>
            <ResumeSection />
        </section>

        {/*projects sectiohn */}
        <section className="grid grid-cols-2 gap-16">
            {projects.map((p) => (
                <div key = {p.id} className="border p-4 rounded-xl min-h-[200px] flex flex-col justify-between ">
                    {p.title}
                </div>
            ))}

        </section>

        <footer className="text-center text-sm text-neutral-500">
            More Projects Coming...
        </footer>

        {/* footer  */}
        <footer className="text-center text-sm text-neutral-500">
            Contact info here
        </footer>
    </div>


    );
}