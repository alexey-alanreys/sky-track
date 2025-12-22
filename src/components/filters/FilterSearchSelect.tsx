import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from '@/components/ui/command';

import { cn } from '@/utils/cn';

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

interface Props {
	value: string | undefined;
	onChange: (value: string | undefined) => void;
	data: string[];
	entityName?: string;
}

// TODO: Maybe add flag for country and logo for airline
export const FilterSearchSelect = ({
	data,
	onChange,
	value,
	entityName
}: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleSelect = (currentValue: string) => {
		if (currentValue === value) return onChange(undefined);

		onChange(currentValue);
		setIsOpen(false);
	};

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					role='combobox'
					aria-expanded={isOpen}
					className='w-45 justify-between gap-0.5 opacity-70'
				>
					{value
						? data.find((item) => item === value)
						: `Select ${entityName}...`}
					<ChevronsUpDownIcon className='h-4 w-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-45 p-0'>
				<Command>
					<CommandInput placeholder={`Search ${entityName}...`} />
					<CommandList>
						<CommandEmpty>No {entityName} found.</CommandEmpty>
						<CommandGroup>
							{data.map((item) => (
								<CommandItem key={item} value={item} onSelect={handleSelect}>
									<CheckIcon
										className={cn(
											'mr-2 h-4 w-4',
											value === item ? 'opacity-100' : 'opacity-0'
										)}
									/>
									{item}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};
