import { Route, Routes } from "react-router-dom";
import NewProject from "./NewProject";
import AllProjects from "./AllProjects";

const SidebarBody = () => {
  return(
    <>
        <Routes>
          <Route path="new-project" element={<NewProject />} />
          <Route path="all-projects" element={<AllProjects />} />
        </Routes>
    </>
  )
}

export default SidebarBody;