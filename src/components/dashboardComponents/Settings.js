import { Tabs, Tab } from "../../components/Tabs";
import Integration from "./Integrations";

const Settings = () => {
  console.log('this is settings')
  return(
    <div>
      <Tabs>
        <Tab component={<Integration />} active>Profile</Tab>
        <Tab component="content of tab 2"> Permissions</Tab>
        <Tab component="content of tab 3">3rd Party Integration</Tab>
        <p>fgsdgs</p>
      </Tabs>
    </div>
  );
}

export default Settings;