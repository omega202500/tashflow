"use client";

// import Wrapper from "./components/wrapper";
import Wrapper from "./components/wrapper";
import { useEffect, useState } from "react";
import { FolderGit2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";
import { createProject, getUserProjects } from "./actions";
import { Project } from "@/type";
import ProjectComponent from "./components/ProjectComponent";

export default function Home() {
  const { user } = useUser();

  const email = user?.primaryEmailAddress?.emailAddress as string;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const fetchProjects = async (email: string) => {
    try {
       const  myProject = await getUserProjects(email);
       console.log( myProject);
        setProjects(myProject)

    } catch (error) {
      console.error("Error fetching projects", error);
    }
  }

  useEffect(() => {
    if (email) {
      fetchProjects(email);
    }
  }, [email]);


 const handleSubmit = async () => {
    try {
      if (!email) {
        toast.error("Utilisateur non connecté");
        console.log("Email undefined, user:", user); // ← pour débugger
        return;
      }

      const modal = document.getElementById("my_modal_3") as HTMLDialogElement;

      await createProject(name, description, email);

      if (modal) {
        modal.close();
      }

      setName("");
      setDescription("");
      await fetchProjects(email);

      toast.success("Projet créé");
    } catch (error) {
      console.error("Error creating project", error);
      toast.error("Erreur lors de la création");
    }
  };

  return (
    <Wrapper>
      <div>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button
          className="btn"
          onClick={() =>
            (
              document.getElementById("my_modal_3") as HTMLDialogElement
            ).showModal()
          }
        >
          open modal
        </button>

        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>

            <h3 className="font-bold text-lg">Nouveau Projet</h3>

            <p className="py-4">
              Decrivez votre projet simplement grace a la description
            </p>

            <div>
              <input
                placeholder="Nom du Projet"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-base-300 input input-bordered w-full mb-4 placeholder:text-sm"
                required
              />

              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mb-2 textarea-bordered border border-base-300 w-full resize-none textarea-md placeholder:text-sm"
                required
              ></textarea>

              <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                Nouveau Projet <FolderGit2 />
              </button>
            </div>
          </div>
        </dialog>
        <div className="w-full"> 
          {projects.length > 0 ? (
            <ul className="w-full grid md:grid-cols-3 gap-6">
              {projects.map((project) => (
                <li key={project.id} >
                 <ProjectComponent project={project} admin={1}></ProjectComponent>
                </li>
              ))}
            </ul>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </Wrapper>
  );
}




function getProjectsCreatedByUser(email: string) {
  throw new Error("Function not implemented.");
}
// function createProject(
//   name: string,
//   description: string,
//   email: string
// ) {
//   throw new Error("Function not implemented.");
// }