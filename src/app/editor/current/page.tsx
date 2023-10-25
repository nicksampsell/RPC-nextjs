import DepartmentSelector from '../../../components/DepartmentSelector';
import EditorToolbar from '@/components/EditorToolbar';
import EmployeeInformation from '@/components/EmployeeInformation';
import PositionInformation from '@/components/PositionInformation';
import RequirementsArea from '@/components/RequirementsArea';
import SelectEmployee from '@/components/SelectEmployee';
import DateSelector from '@/components/DateSelector';

export default function Page()
{
    return (
    	<div className="grid grid-cols-4 gap-4">
            <div className="col-span-4 row-start-1">
                <DateSelector />
            </div>     

            <div className="col-span-2 row-start-2 row-span-1">
                <DepartmentSelector />
            </div>
            <div className="col-span-2 row-start-2 row-span-1">
                <SelectEmployee />
            </div>            

            <div className="col-span-3 row-start-3 row-span-1">
                <EmployeeInformation />
            </div>
            <div className="row-start-3 row-span-1">
                <PositionInformation />
            </div>

            <div className="col-span-4 row-start-4 row-span-1">
                <RequirementsArea />
            </div>
            <div className="col-span-5">
                <EditorToolbar />
            </div>
        
        </div>
    )
}