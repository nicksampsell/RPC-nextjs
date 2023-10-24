import DepartmentSelector from '../../../components/DepartmentSelector';
import EditorToolbar from '../../../components/EditorToolbar';
import EmployeeInformation from '../../../components/EmployeeInformation';
import PositionInformation from '../../../components/PositionInformation';
import RequirementsArea from '../../../components/RequirementsArea';

export default function Page()
{
    return (
        <>
        <EmployeeInformation isNewEmployee={true} />        
        <DepartmentSelector isNewEmployee={true} />
        <PositionInformation isNewEmployee={true} />
        <RequirementsArea isNewEmployee={true}/>
        <EditorToolbar isNewEmployee={true}/>
       	</>
    )
}