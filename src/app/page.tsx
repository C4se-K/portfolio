import Scroll from "@/components/Scroll";

const projects = [
    {id : 1, title: "project 1 ", text: "description about project n. what happened here?description about project n. what happened here?description about project n. what happened here?"},
    {id : 2, title: "project 2 ", text: "description about project n. what happened here?description about project n. what happened here?description about project n. what happened here?"},
    {id : 3, title: "project 3 ", text: "description about project n. what happened here?description about project n. what happened here?description about project n. what happened here?"},
];


export default function Home() {
  return (
    <div className="h-screen w-full flex justify-center hide-scrollbar">
      <div className="h-full w-full max-w-[80%] mx-auto flex flex-col overflow-y-scroll snap-y snap-proximity">



      

      {/* welcome */}
      <section id="greeting" className="snap-start autoHide min-h-screen p-8 flex flex-col justify-center p-8 border-b border-neutral-200">
        <div className="w-full max-2-6xl mx-auto flex flex-row items-center justify-between gap-12">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4 text-neutral-600">Hello, I’m A</h1>
            <p className="text-lg text-neutral-600 max-w-prose">
              Welcome to my personal site. I'm a CS/SE student focused on building clean,
              thoughtful systems and tools.
            </p>

            <div className="flex gap-2"> 
              

              <a
                href="https://example.com"
                target="blank"
                rel="noopener noreferrer"
              >
                <button className="h-10 w-30 px-4 py-2 bg-blue-600 text-white rounded">
                  Resume
                </button>
              </a>
            </div>
            
          </div>
          <div className="flex-1 flex justify-end">
            <img
              src="/your-image.png"
              alt="Profile"
              className="w-128 h-128 p-4 object-cover rounded-xl shadow-xl"
            />
          </div>

        </div>
       
        
      </section>

      {/* projects */}
      <section id="projects" className="snap-start autoShow autoHide min-h-screen p-8 border-b border-neutral-200">
        <h2 className="autoShow text-neutral-600 text-3xl font-semibold mb-6">Projects</h2>

        <section className="grid grid-cols-3 gap-4">
            {projects.map((p) => (
                <div 
                  key={p.id}
                  className="p-6 rounded-xl min-h-[600px] min-w-[300px] flex flex-col gap-4 project-card shadow-xl"
                >
                  {/* image */}
                  <img 
                    src="/images/project1.png" 
                    alt="Project" 
                    className="w-full h-64 object-cover rounded-lg"
                  />

                  {/* title */}
                  <h3 className="text-xl font-semibold text-center">
                    {p.title}
                  </h3>

                  {/* description */}
                  <p className="text-lg text-center text-neutral-700 flex-1">
                    {p.text}
                  </p>
                </div>
            ))}
        </section>

        <footer className="mt-12 text-center text-sm text-neutral-500">
          <a
            href="https://github.com/C4se-K?tab=repositories"
            target="github"
            rel="noopener noreferrer"
          >
            <button className="px-4 py-2 bg-blue-600 text-white rounded">
              More projects coming...
            </button>
          </a>
        </footer>
      </section>

      {/* contact */}
      
      <section id="contacts" className="snap-start autoShow min-h-screen flex flex-col justify-center p-8">
        <div className="justify-center">
          <h2 className="text-neutral-600 text-3xl font-semibold mb-4">Contact</h2>
          <p className="text-neutral-600 mb-4">Email: you@example.com</p>
          <p className="text-neutral-600">GitHub / LinkedIn links here</p>
          <div className="flex gap-2"> 
              <a
                href="https://example.com"
                target="blank"
                rel="noopener noreferrer"
              >
                <button className="h-10 w-30 px-4 py-2 bg-blue-600 text-white rounded">
                  linkdin
                </button>
              </a>

              <a
                href="https://example.com"
                target="blank"
                rel="noopener noreferrer"
              >
                <button className="h-10 w-30 px-4 py-2 bg-blue-600 text-white rounded">
                  github
                </button>
              </a>
            </div>
        </div>
        


      </section>

    </div>
    </div>
  );
}
