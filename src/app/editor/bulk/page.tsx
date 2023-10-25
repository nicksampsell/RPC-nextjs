import DepartmentSelector from '../../../components/DepartmentSelector';
import EditorToolbar from '@/components/EditorToolbar';
import EmployeeInformation from '@/components/EmployeeInformation';
import PositionInformation from '@/components/PositionInformation';
import RequirementsArea from '@/components/RequirementsArea';
import SelectEmployee from '@/components/SelectEmployee';
import BulkEmployeeSelector from '@/components/BulkEmployeeSelector';
import DateSelector from '@/components/DateSelector';

export default function Page()
{
    return (
    	<div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 row-start-1">
                <DateSelector isBulk={true} />
            </div>
            <div className="row-start-2">
                <DepartmentSelector isBulk={true} />
            </div>
            <div className="row-start-2">
                <BulkEmployeeSelector isBulk={true}/>
            </div>
            <div className="row-start-3 col-span-2">
                <RequirementsArea isBulk={true}/>
            </div>
            <div className="row-start-4 col-span-2">
                <EditorToolbar isBulk={true} />
            </div>    
       	</div>
    )
}