import DepartmentSelector from '../../../components/DepartmentSelector';
import EditorToolbar from '@/components/EditorToolbar';
import EmployeeInformation from '@/components/EmployeeInformation';
import PositionInformation from '@/components/PositionInformation';
import RequirementsArea from '@/components/RequirementsArea';
import DateSelector from '@/components/DateSelector';

export default function Page()
{
    return (
        <div className="grid grid-cols-3 gap-4 basis-full items-stretch">
            <div className="col-span-3 row-start-1">
                <DateSelector isBulk={true} />
            </div>            
            <div className="col-span-2  row-start-2 row-span-2">
                <EmployeeInformation isNewEmployee={true} />
            </div>
            <div className="row-start-2">
                <DepartmentSelector isNewEmployee={true} />
            </div>
            <div className="row-start-3">
                <PositionInformation isNewEmployee={true} />
            </div>
            <div className="row-start-4 col-span-3">
                <RequirementsArea isNewEmployee={true}/>
            </div>
            <div className="row-start-5 col-span-3">
                <EditorToolbar isNewEmployee={true}/>
            </div>
        
       
       	</div>
    )
}