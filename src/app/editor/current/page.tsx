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
    	<div className="grid grid-cols-6 gap-4">
            <div className="col-span-6">
                <DateSelector />
            </div>     

            <div className="col-span-3">
                <DepartmentSelector />
            </div>
            <div className="col-span-3">
                <SelectEmployee />
            </div>            

            <div className="col-span-4">
                <EmployeeInformation />
            </div>
            <div className="col-span-2">
                <PositionInformation />
            </div>

            <div className="col-span-6">
                <RequirementsArea />
            </div>
            <div className="col-span-6">
                <EditorToolbar />
            </div>
        
        </div>
    )
}