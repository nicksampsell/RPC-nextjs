import DepartmentSelector from '../../../components/DepartmentSelector';
import EditorToolbar from '@/components/EditorToolbar';
import EmployeeInformation from '@/components/EmployeeInformation';
import PositionInformation from '@/components/PositionInformation';
import RequirementsArea from '@/components/RequirementsArea';
import DateSelector from '@/components/DateSelector';

export default function Page()
{
    return (
        <div className="grid grid-cols-6 gap-4 basis-full items-stretch">
            <div className="col-span-6">
                <DateSelector isBulk={true} />
            </div>            
            <div className="col-span-4 row-span-2">
                <EmployeeInformation isNewEmployee={true} />
            </div>
            <div className="col-span-2">
                <DepartmentSelector isNewEmployee={true} />
            </div>
            <div className="col-span-2">
                <PositionInformation isNewEmployee={true} />
            </div>
            <div className="col-span-6">
                <RequirementsArea isNewEmployee={true}/>
            </div>
            <div className="col-span-6">
                <EditorToolbar isNewEmployee={true}/>
            </div>
        
       
       	</div>
    )
}