export const useStepConversion = (step) => {
    if(!step)
    {
        return step;
    }

    switch(step.toLowerCase())
    {
        case 'entry':
            return 'EntryWage';
        case 'manual':
            return 'manual';
        case 'max':
            return 'MaxWage';
        case 'sr':
            return 'MaxWage';
        default:
            step = step.replace(/\D/g,'');
            if(step < 10)
            {
                return 'Step' + step;
            }
            else 
            {
                return 'Year' + step;
            }
    }
}