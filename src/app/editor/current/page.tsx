import DepartmentSelector from '../../../components/DepartmentSelector';
import EditorToolbar from '../../../components/EditorToolbar';
import EmployeeInformation from '../../../components/EmployeeInformation';
import PositionInformation from '../../../components/PositionInformation';
import RequirementsArea from '../../../components/RequirementsArea';
import SelectEmployee from '../../../components/SelectEmployee';

export default function Page()
{
    return (
    	<>
        <DepartmentSelector />
        <SelectEmployee />
        <EmployeeInformation />
        <PositionInformation />
        <RequirementsArea />
        <EditorToolbar />
       	</>
    )
}